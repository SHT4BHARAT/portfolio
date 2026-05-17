import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';

export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = [
    { top: '15%', left: '10%', size: 60, border: true, color: 'var(--accent-primary)', delay: 0 },
    { top: '20%', right: '15%', size: 40, border: false, color: 'var(--accent-secondary)', delay: -2 },
    { bottom: '25%', right: '10%', size: 50, border: true, color: 'var(--accent-primary)', delay: -6 },
    { bottom: '60%', left: '20%', size: 35, border: false, color: 'var(--accent-secondary)', delay: -3 },
    { top: '40%', right: '25%', size: 45, border: true, color: 'var(--accent-tertiary)', delay: -5 },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section-wrapper flex-center"
      style={{ minHeight: '100vh', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
          style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.border ? '12px' : '50%',
            border: shape.border ? `2px solid ${shape.color}` : 'none',
            background: shape.border ? 'transparent' : shape.color,
            opacity: 0.15,
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '50px', background: 'rgba(var(--accent-primary-rgb), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          {portfolioData.isOpenForInternships ? 'AVAILABLE FOR STARTUPS & BUILDERS' : 'CURRENTLY BUILDING'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}
        >
          I Build <span className="text-gradient">{portfolioData.heroHighlight}</span> That Ship Themselves
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}
        >
          {portfolioData.heroText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="action-btn action-btn-primary" style={{ padding: '16px 40px', fontSize: '1rem', textDecoration: 'none' }}>
            View My Work
          </a>
          <a href={portfolioData.socials.email} className="action-btn action-btn-secondary" style={{ padding: '16px 40px', fontSize: '1rem', textDecoration: 'none' }}>
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
