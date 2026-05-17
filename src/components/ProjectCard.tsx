import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card"
      style={{ padding: '48px', marginBottom: '32px' }}
    >
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{project.name}</h3>
      <p style={{ color: 'var(--text-dim)', marginBottom: '16px' }}>{project.desc}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {project.details.map((detail, i) => (
                <li key={i} className="project-details-item">{detail}</li>
              ))}
            </ul>
            <div className="action-buttons-container">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-secondary">
                <Github size={18} /> Repo
              </a>
              {project.deployed && (
                <a href={project.deployed} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary">
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>{project.tech}</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="theme-toggle-btn"
          style={{ background: 'var(--accent-primary)', color: 'white', padding: '8px 24px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 800 }}
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      </div>
    </motion.div>
  );
}
