import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, GitCommit } from 'lucide-react';

const projectMetrics = {
  'Samvad — Voice AI Meeting Agent': { uptime: '99%+', latency: '<2s', speakers: 'Multi' },
  'Agentic Honey-Pot': { accuracy: '60%→90%', uptime: '99%+', platform: 'Railway' },
  'Call Center Compliance API': { auditReduction: '90%', sttLimit: 'Bypassed', platform: 'Vercel' },
  'EchoPay — Offline P2P Payment': { buildTime: '48hrs', speedBoost: '70%', award: 'Runner-up' },
  'Multilingual Mandi': { responseTime: '<200ms', languages: '10+', mlPowered: 'Yes' },
  'AI Email Categorization Agent': { apiCostReduction: '60%+', manualElimination: '100%', localFirst: 'Yes' },
  'OpenENV Cloud Security Audit Environment': { cicd: 'GitHub Actions', platform: 'Hugging Face', devops: 'Full' },
};

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const metrics = projectMetrics[project.name] || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card"
      style={{ padding: '48px', marginBottom: '32px' }}
    >
      <header>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{project.name}</h3>
        <p style={{ color: 'var(--text-dim)', marginBottom: '16px' }}>{project.desc}</p>
      </header>

      {Object.keys(metrics).length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {Object.entries(metrics).map(([key, value]) => (
            <span key={key} style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(var(--accent-primary-rgb), 0.1)', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
              {key}: {value}
            </span>
          ))}
        </div>
      )}
      
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
              <a href={`${project.link}/commits`} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-secondary">
                <GitCommit size={18} /> Commits
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

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>{project.tech}</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="theme-toggle-btn"
          style={{ background: 'var(--accent-primary)', color: 'white', padding: '8px 24px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 800 }}
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      </footer>
    </motion.div>
  );
}
