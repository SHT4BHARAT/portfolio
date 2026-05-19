import { useState, useEffect } from 'react';

const GAS_URL = import.meta.env.PUBLIC_GAS_URL || '';

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!GAS_URL) return;

    // Fire-and-forget: increment visitor count
    fetch(`${GAS_URL}?type=count`, { mode: 'no-cors' }).catch(() => {});

    // Try to read count via JSONP fallback
    const callbackName = '__vc' + Date.now();
    (window as any)[callbackName] = (data: any) => {
      setCount(Number(data?.count) || 0);
      delete (window as any)[callbackName];
    };

    injectScript(`${GAS_URL}?type=getCount&callback=${callbackName}`)
      .catch(() => setCount(0));

    return () => { delete (window as any)[callbackName]; };
  }, []);

  if (count === null || count === 0) return null;

  return (
    <div
      style={{
        fontSize: '0.8rem',
        color: 'var(--text-dim)',
        opacity: 0.6,
        letterSpacing: '1px',
        marginTop: '24px',
        fontWeight: 600,
      }}
    >
      {count.toLocaleString()} visitor{count !== 1 ? 's' : ''}
    </div>
  );
}
