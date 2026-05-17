import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export default function FloatingCTA() {
  return (
    <motion.a
      href="#contact"
      aria-label="Contact me - Let's Talk"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '24px',
        zIndex: 999,
        padding: '14px 24px',
        borderRadius: '50px',
        background: 'var(--gradient-aurora)',
        color: 'white',
        fontWeight: 800,
        fontSize: '0.9rem',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        letterSpacing: '1px',
      }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <Zap size={18} />
      Let's Talk
    </motion.a>
  );
}
