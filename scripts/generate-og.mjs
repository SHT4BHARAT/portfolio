import sharp from 'sharp';
import { writeFileSync } from 'fs';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a1a"/>
      <stop offset="50%" style="stop-color:#0f0f2e"/>
      <stop offset="100%" style="stop-color:#1a0a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
    <linearGradient id="subaccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22d3ee"/>
      <stop offset="100%" style="stop-color:#6366f1"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Grid pattern -->
  <g opacity="0.05">
    ${Array.from({length: 20}, (_, i) => 
      `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${HEIGHT}" stroke="#6366f1" stroke-width="0.5"/>`
    ).join('')}
    ${Array.from({length: 12}, (_, i) => 
      `<line x1="0" y1="${i * 60}" x2="${WIDTH}" y2="${i * 60}" stroke="#6366f1" stroke-width="0.5"/>`
    ).join('')}
  </g>

  <!-- Decorative circles -->
  <circle cx="200" cy="450" r="180" fill="none" stroke="#6366f1" stroke-width="1" opacity="0.15"/>
  <circle cx="950" cy="150" r="120" fill="none" stroke="#a855f7" stroke-width="1" opacity="0.12"/>
  <circle cx="1050" cy="500" r="80" fill="none" stroke="#22d3ee" stroke-width="1" opacity="0.1"/>

  <!-- Accent line top -->
  <rect x="60" y="60" width="120" height="4" rx="2" fill="url(#accent)"/>

  <!-- Name -->
  <text x="60" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="2">SHIVANSHU TIWARI</text>

  <!-- Role -->
  <text x="60" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="url(#subaccent)" letter-spacing="1">Forward Deployed Engineer &amp; AI-Native Builder</text>

  <!-- Tagline -->
  <text x="60" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#94a3b8" letter-spacing="0.5">
    <tspan x="60" dy="0">Autonomous AI Agents · Voice AI · LLM Pipelines · Rapid MVP</tspan>
    <tspan x="60" dy="32">LangChain · LangGraph · FastAPI · OpenAI · Gemini</tspan>
  </text>

  <!-- Bottom accent bar -->
  <rect x="60" y="540" width="1080" height="2" rx="1" fill="url(#accent)" opacity="0.3"/>

  <!-- URL -->
  <text x="60" y="580" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#475569" letter-spacing="1">sht-portfolio.vercel.app</text>

  <!-- Badge -->
  <rect x="950" y="555" width="190" height="36" rx="18" fill="url(#accent)" opacity="0.9"/>
  <text x="1045" y="579" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">OPEN TO WORK</text>
</svg>`;

async function generate() {
  const buffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  writeFileSync('public/og-image.png', buffer);
  const stats = await sharp(buffer).metadata();
  console.log(`OG image generated: ${stats.width}x${stats.height}, ${(buffer.length / 1024).toFixed(1)}KB`);
}

generate().catch(console.error);
