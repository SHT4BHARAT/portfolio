import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle, Loader2 } from 'lucide-react';

const GAS_URL = import.meta.env.PUBLIC_GAS_URL || '';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  field: string;
}

interface LeadCaptureModalProps {
  linkedinUrl: string;
}

const FIELDS = [
  'Forward Deployed Engineering',
  'AI / ML Engineering',
  'Software Engineering',
  'Data Science',
  'DevOps / Cloud',
  'Research / Academia',
  'Other'
];

export default function LeadCaptureModal({ linkedinUrl }: LeadCaptureModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', mobile: '', email: '', field: '' });
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => nameRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isValid = form.name.trim() && form.mobile.trim().length >= 10 && form.email.includes('@') && form.field;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    if (GAS_URL) {
      try {
        const params = new URLSearchParams({
          type: 'resume_request',
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          field: form.field,
          timestamp: new Date().toISOString(),
        });
        await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: params });
      } catch {}
    }

    setLoading(false);
    setStep('success');
    setTimeout(() => {
      window.open(linkedinUrl, '_blank', 'noopener');
      setOpen(false);
      setStep('form');
      setForm({ name: '', mobile: '', email: '', field: '' });
    }, 1200);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary resume-trigger"
        style={{ padding: '8px 24px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
      >
        Resume
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                padding: '40px',
                maxWidth: '480px',
                width: '100%',
                position: 'relative',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
              }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'none', border: 'none', color: 'var(--text-dim)',
                  cursor: 'pointer', padding: '8px', borderRadius: '8px',
                }}
              >
                <X size={20} />
              </button>

              {step === 'form' && (
                <>
                  <div style={{ marginBottom: '28px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>
                      Download <span className="text-gradient">Resume</span>
                    </h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      Share your details to get the resume. I'll also connect with you on LinkedIn.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <InputField ref={nameRef} label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Shivanshu Tiwari" />
                    <InputField label="Mobile / WhatsApp *" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} placeholder="+91 9876543210" type="tel" />
                    <InputField label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" type="email" />
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Interested Field *
                      </label>
                      <select
                        value={form.field}
                        onChange={(e) => setForm({ ...form, field: e.target.value })}
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          background: 'rgba(var(--accent-primary-rgb), 0.05)',
                          border: '1px solid var(--glass-border)', color: 'var(--text-main)',
                          fontSize: '1rem', outline: 'none',
                        }}
                      >
                        <option value="" disabled>Select a field</option>
                        {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={!isValid || loading}
                      style={{
                        marginTop: '8px', padding: '14px', borderRadius: '14px',
                        border: 'none', fontWeight: 800, fontSize: '1rem',
                        cursor: isValid ? 'pointer' : 'not-allowed',
                        opacity: isValid ? 1 : 0.5,
                        background: 'var(--gradient-aurora)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'opacity 0.2s',
                      }}
                    >
                      {loading ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={20} />}
                      {loading ? 'Submitting...' : 'Get Resume'}
                    </button>
                  </form>
                </>
              )}

              {step === 'success' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <CheckCircle size={56} style={{ color: '#22c55e', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Thank You!</h3>
                  <p style={{ color: 'var(--text-dim)' }}>Opening your resume download...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}

const InputField = ({ label, value, onChange, placeholder, type = 'text' }: InputFieldProps) => (
  <div>
    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '12px 16px', borderRadius: '12px',
        background: 'rgba(var(--accent-primary-rgb), 0.05)',
        border: '1px solid var(--glass-border)', color: 'var(--text-main)',
        fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
      }}
    />
  </div>
);
