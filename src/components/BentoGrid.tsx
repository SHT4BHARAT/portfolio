import { useState } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Cpu: () => null,
  Terminal: () => null,
  Database: () => null,
  Rocket: () => null,
};

export default function BentoGrid() {
  const [tilt, setTilt] = useState({});

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt(prev => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
      {portfolioData.specializations.map((spec, i) => (
        <motion.div
          key={i}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={() => handleMouseLeave(i)}
          style={{
            transform: tilt[i] ? `perspective(1000px) rotateX(${tilt[i].y}deg) rotateY(${tilt[i].x}deg)` : 'perspective(1000px) rotateX(0) rotateY(0)',
            transition: 'transform 0.1s ease',
            transformStyle: 'preserve-3d',
          }}
          className="glass-card"
        >
          <div style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>{spec.title}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{spec.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
