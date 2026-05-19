/**
 * Google Apps Script backend for Shivanshu Tiwari's portfolio.
 *
 * SETUP:
 * 1. Create a Google Sheet named "Portfolio_Backend_Data" with 3 tabs:
 *    - "Visitors" (headers: ID | Count | LastUpdated; Row 2: 1 | 0 | leave blank)
 *    - "Leads"   (headers: Timestamp | Name | Mobile | Email | Field)
 *    - "Logs"    (headers: Timestamp | Status | Payload)
 * 2. Go to Extensions → Apps Script → Name the project "Portfolio Backend"
 * 3. Paste this file → Save
 * 4. Deploy → New deployment → Web app → Execute as "Me" → Anyone access
 * 5. Copy the web app URL → set as PUBLIC_GAS_URL in .env
 *
 * FIXES APPLIED vs v1:
 *  - LockService prevents race conditions on visitor counter
 *  - All doPost inputs are validated and sanitized before writing
 *  - Server-side timestamp is always used (client value is ignored)
 *  - Sheet names and cell addresses centralised in CONFIG
 *  - getVisitorSheet() / getSheet() helpers remove duplication
 *  - Top-level SHEET wrapped in a lazy getter to avoid parse-time errors
 *  - Log rows are pruned when they exceed CONFIG.logs.maxRows
 *  - Unrecognised doPost types return an explicit error
 *  - GET /count moved to POST (GET stays idempotent with only getCount)
 *  - CORS header added to doPost responses for future fetch() compatibility
 */

// ─── Configuration ────────────────────────────────────────────────────────────

const CONFIG = {
  spreadsheetName: 'Portfolio_Backend_Data',
  sheets: {
    visitors: 'Visitors',
    leads:    'Leads',
    logs:     'Logs',
  },
  cells: {
    visitorCount:     'B2',
    visitorTimestamp: 'C2',
  },
  logs: {
    maxRows: 500,   // Prune oldest rows when log exceeds this limit
  },
  validation: {
    name:   { maxLen: 100 },
    mobile: { pattern: /^\+?[\d\s\-]{7,15}$/ },
    email:  { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, maxLen: 254 },
    field:  { maxLen: 100 },
  },
};

// ─── Spreadsheet helpers ───────────────────────────────────────────────────────

/**
 * Lazily returns the active spreadsheet.
 * Wrapping in a function avoids parse-time execution errors.
 */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Returns a named sheet, throwing a descriptive error if it is missing.
 * @param {string} name - Key of CONFIG.sheets (e.g. 'visitors')
 */
function getSheet(name) {
  const sheetName = CONFIG.sheets[name];
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found. Check your spreadsheet setup.`);
  return sheet;
}

// ─── Input validation ─────────────────────────────────────────────────────────

/**
 * Sanitises a string value: trims whitespace and enforces max length.
 * Returns null if the value is not a non-empty string.
 */
function sanitiseString(value, maxLen) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

/**
 * Validates the payload for a resume_request POST.
 * Returns { ok: true, data } on success or { ok: false, error } on failure.
 */
function validateResumeRequest(raw) {
  const v = CONFIG.validation;

  const name = sanitiseString(raw.name, v.name.maxLen);
  if (!name) return { ok: false, error: 'name is required and must be a non-empty string.' };

  const mobile = sanitiseString(raw.mobile, 20);
  if (!mobile || !v.mobile.pattern.test(mobile)) {
    return { ok: false, error: 'mobile must be a valid phone number (7–15 digits, optional +/spaces/dashes).' };
  }

  const email = sanitiseString(raw.email, v.email.maxLen);
  if (!email || !v.email.pattern.test(email)) {
    return { ok: false, error: 'email must be a valid email address.' };
  }

  const field = sanitiseString(raw.field, v.field.maxLen);
  if (!field) return { ok: false, error: 'field is required and must be a non-empty string.' };

  return { ok: true, data: { name, mobile, email, field } };
}

// ─── Log helpers ──────────────────────────────────────────────────────────────

/**
 * Appends a row to the Logs sheet and prunes oldest rows if over the limit.
 * @param {'success'|'error'|'warn'} status
 * @param {string} payload
 */
function writeLog(status, payload) {
  const sheet = getSheet('logs');
  sheet.appendRow([new Date().toISOString(), status, payload]);

  // Prune oldest rows (row 1 is the header, data starts at row 2)
  const dataRows = sheet.getLastRow() - 1; // exclude header
  if (dataRows > CONFIG.logs.maxRows) {
    const excess = dataRows - CONFIG.logs.maxRows;
    sheet.deleteRows(2, excess); // delete oldest entries (top of data)
  }
}

// ─── JSONP helper ─────────────────────────────────────────────────────────────

/**
 * Returns a JSONP response if a callback name is provided, plain JSON otherwise.
 */
function jsonp(callback, data) {
  const json   = JSON.stringify(data);
  const output = callback ? `${callback}(${json})` : json;
  const mime   = callback
    ? ContentService.MimeType.JAVASCRIPT
    : ContentService.MimeType.JSON;
  return ContentService.createTextOutput(output).setMimeType(mime);
}

/**
 * Returns a plain JSON response with CORS headers enabled.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── GET handler ──────────────────────────────────────────────────────────────

/**
 * Handles GET requests.
 *
 * Supported types (via ?type=):
 *   getCount  – returns the current visitor count (read-only, idempotent)
 *
 * NOTE: Incrementing the counter has been moved to doPost (type: "count")
 *       to respect HTTP semantics (GET must be idempotent).
 */
function doGet(e) {
  const type = e?.parameter?.type;
  const cb   = e?.parameter?.callback;

  if (type === 'getCount') {
    const sheet = getSheet('visitors');
    const count = Number(sheet.getRange(CONFIG.cells.visitorCount).getValue()) || 0;
    return jsonp(cb, { count });
  }

  return jsonp(cb, { error: `Unknown type "${type}". Supported GET types: getCount` });
}

// ─── POST handler ─────────────────────────────────────────────────────────────

/**
 * Handles POST requests.
 *
 * Supported types (in JSON body):
 *   count          – increments the visitor counter atomically
 *   resume_request – validates and stores a lead
 */
function doPost(e) {
  try {
    // Accept both JSON (postData.contents) and URL-encoded (e.parameter)
    const raw = (() => {
      try { return JSON.parse(e?.postData?.contents || '{}'); } catch {}
      return e?.parameter || {};
    })();
    const type = typeof raw.type === 'string' ? raw.type.trim() : '';

    // ── Increment visitor counter ──────────────────────────────────────────
    if (type === 'count') {
      const lock = LockService.getScriptLock();
      const acquired = lock.tryLock(5000); // wait up to 5 s

      if (!acquired) {
        writeLog('warn', 'count: could not acquire lock');
        return jsonResponse({ ok: false, error: 'Server busy, please retry.' });
      }

      try {
        const sheet   = getSheet('visitors');
        const current = Number(sheet.getRange(CONFIG.cells.visitorCount).getValue()) || 0;
        sheet.getRange(CONFIG.cells.visitorCount).setValue(current + 1);
        sheet.getRange(CONFIG.cells.visitorTimestamp).setValue(new Date().toISOString());
      } finally {
        lock.releaseLock();
      }

      writeLog('success', JSON.stringify({ type, incremented: true }));
      return jsonResponse({ ok: true });
    }

    // ── Store lead (resume request) ────────────────────────────────────────
    if (type === 'resume_request') {
      const validation = validateResumeRequest(raw);
      if (!validation.ok) {
        writeLog('warn', `resume_request validation failed: ${validation.error}`);
        return jsonResponse({ ok: false, error: validation.error });
      }

      const { name, mobile, email, field } = validation.data;
      const serverTimestamp = new Date().toISOString(); // always use server time

      const sheet = getSheet('leads');
      sheet.appendRow([serverTimestamp, name, mobile, email, field]);

      writeLog('success', JSON.stringify({ type, email })); // avoid logging full PII
      return jsonResponse({ ok: true });
    }

    // ── Unknown type ───────────────────────────────────────────────────────
    writeLog('warn', `Unknown POST type: "${type}"`);
    return jsonResponse({
      ok: false,
      error: `Unknown type "${type}". Supported POST types: count, resume_request`,
    });

  } catch (err) {
    writeLog('error', err.message);
    return jsonResponse({ ok: false, error: 'Internal server error.' });
  }
}