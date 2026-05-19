import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
        transformOrigin: 'left',
        scaleX: progress / 100,
        zIndex: 1001,
      }}
    />
  );
}
