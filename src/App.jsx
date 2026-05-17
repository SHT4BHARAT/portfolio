import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu, Code, ExternalLink, Menu, X, Terminal, Sparkles, Database, Layers, MapPin, GraduationCap, Calendar, Sun, Moon, Award, Rocket, Zap, ArrowUp } from 'lucide-react';
import './index.css';

/**
 * EDIT YOUR INFORMATION HERE
 */
const portfolioData = {
  name: "SHIVANSHU",
  surname: " TIWARI",
  tagline: "Forward Deployed Engineer & AI-Native Builder. I architect autonomous agentic workflows and ship AI-native products.",
  heroHighlight: "Autonomous AI Agents",
  heroText: "Forward Deployed Engineer specializing in architecting Autonomous Agentic Workflows and scaling the GenAI Lifecycle. I build and ship AI-native products — from voice agents and LLM pipelines to deployed REST APIs — using OpenAI, Gemini, and autonomous agent frameworks.",
  isOpenForInternships: true,
  aboutText: "I'm a Forward Deployed Engineer and AI-Native Builder specialized in architecting Autonomous Agentic Workflows. I build and ship AI-native products — from voice agents and LLM pipelines to deployed REST APIs — using OpenAI, Gemini, and autonomous agent frameworks. I have hands-on experience integrating AI APIs into real systems that run unattended and handle real-world data without manual intervention. Proven track record of leading high-performance engineering teams and iterating rapidly under hackathon constraints. Currently seeking opportunities to collaborate with ambitious founders building the next big thing.",

  contact: {
    email: "sht4bharat@gmail.com",
    phone: "+91 7509410237",
    location: "Bhopal, Madhya Pradesh, India (Remote / Open to Relocation)"
  },

  education: [
    {
      degree: "Bachelor of Technology — Computer Science & Information Technology",
      institution: "Sagar Institute of Research & Technology | Bhopal",
      duration: "2023-2027",
      grade: "GPA: 7.64/10.00",
      coursework: ["DSA", "OOP", "DBMS", "OS"]
    }
  ],

  experience: [
    {
      role: "Engineering Intern & Team Lead",
      company: "Blue Planet Infosolutions India Pvt. Ltd.",
      location: "Remote",
      duration: "Aug 2025 - Feb 2026",
      points: [
        "Directed a 10-person cross-functional team across a remote Agile environment — translated founder requirements into technical roadmaps.",
        "Architected modular components for an enterprise Android codebase, reducing startup time and improving memory efficiency by 30%.",
        "Introduced structured Agile practices and code quality standards, reducing bug recurrence; mentored 5 junior developers.",
        "Picked up unfamiliar codebase and shipped independently within the first week."
      ]
    }
  ],

  specializations: [
    {
      title: 'AI Agent Orchestration',
      desc: 'LangChain, LangGraph, CrewAI, autonomous agent loops.',
      icon: Cpu,
      size: 'large'
    },
    {
      title: 'Voice & LLM Systems',
      desc: 'Voice agents, STT pipelines, Gemini & OpenAI APIs.',
      icon: Terminal,
      size: 'small'
    },
    {
      title: 'Backend Engineering',
      desc: 'FastAPI, Node.js, PostgreSQL, Redis, WebSocket.',
      icon: Database,
      size: 'small'
    },
    {
      title: 'Rapid Prototyping',
      desc: 'Idea to production in days. Hackathon-proven velocity.',
      icon: Rocket,
      size: 'medium'
    }
  ],

  projects: [
    {
      name: 'Samvad — Voice AI Meeting Agent',
      tech: 'Python • FastAPI • Gemini • Sarvam AI • WebSocket • Redis',
      link: 'https://github.com/SHT4BHARAT',
      deployed: null,
      desc: 'Real-time voice AI agent that transcribes meetings, detects voice commands, and auto-generates intelligence reports.',
      details: [
        'Built a real-time voice AI agent with end-to-end production deployment.',
        'Designed automated LLM pipeline using Sarvam API to classify transcript segments and extract action items.',
        'Implemented persistent Redis memory and PostgreSQL storage for complex multi-speaker sessions.',
        '99%+ uptime with sub-2s AI response latency on self-hosted infrastructure.'
      ]
    },
    {
      name: 'Agentic Honey-Pot',
      tech: 'Python • FastAPI • Gemini AI • Docker • Railway',
      link: 'https://github.com/SHT4BHARAT/agentic-honeypot-scam-detection',
      deployed: 'https://agentic-honeypot.vercel.app',
      desc: 'Autonomous AI-Agent that engages scammers to extract adversarial intelligence without human intervention.',
      details: [
        'Architected autonomous AI-Agent to dynamically engage scammers and extract adversarial intelligence.',
        'Implemented continuous observability guardrails with re-prompting loops triggered on schema failures.',
        'Semantic classification pipeline increased extraction accuracy from 60% to 90%.',
        'Dockerized REST API on Railway with 99%+ uptime.'
      ]
    },
    {
      name: 'Call Center Compliance API',
      tech: 'Python • FastAPI • Sarvam AI STT • Vercel',
      link: 'https://github.com/SHT4BHARAT',
      deployed: null,
      desc: 'End-to-end automation pipeline for call center audits: Audio Ingestion → STT → LLM Validation → Analytics.',
      details: [
        'Built end-to-end pipeline: Audio Ingestion → STT Transcription → LLM SOP Validation → Analytics.',
        'Engineered custom audio chunking system to bypass 30-second STT API limits for full-length calls.',
        'Reduced manual audit time by 90% through full automation.',
        'Modular serverless API on Vercel integrated with existing CRM workflows.'
      ]
    },
    {
      name: 'EchoPay — Offline P2P Payment',
      tech: 'Kotlin • Node.js • Express • MFSK Audio • HMAC-SHA256',
      link: 'https://github.com/SHT4BHARAT',
      deployed: null,
      desc: 'Audio-powered offline P2P payment system using high-frequency sound. Hackathon runner-up.',
      details: [
        'Shipped production Android app using custom Kotlin MFSK engine for audio-based data transfer (18-22kHz).',
        'Engineered real-time signal decoding using Goertzel algorithm, optimizing speeds by 70%.',
        'Implemented HMAC-SHA256 integrity checks and UUID replay protection.',
        'Vibe-coded from idea to MVP in under 48 hours — GenAI Hackathon Runner-up.'
      ]
    },
    {
      name: 'Multilingual Mandi',
      tech: 'Node.js • Express • PostgreSQL • Redis • WebSocket • React',
      link: 'https://github.com/SHT4BHARAT/multilingual-mandi',
      deployed: null,
      desc: 'Full-stack agricultural trading platform with real-time multilingual negotiation and ML price recommendations.',
      details: [
        'Built complete full-stack marketplace with product design, backend API, and normalized database schema.',
        'Engineered sub-200ms API responses through Redis caching and optimized PostgreSQL schema.',
        'Implemented real-time multilingual negotiation (10+ languages) via WebSocket.',
        'ML-powered price recommendation engine using Scikit-learn.'
      ]
    },
    {
      name: 'AI Email Categorization Agent',
      tech: 'Python • Gemini API • Gmail API • OAuth2',
      link: 'https://github.com/SHT4BHARAT',
      deployed: null,
      desc: 'Local-first inbox automation agent that semantically classifies and labels emails using Gemini AI.',
      details: [
        'Built automated local-first Gmail workflow with OAuth2 and Gemini AI semantic classification.',
        'Designed persistent memory system mapping senders to labels for learning over time.',
        'Reduced redundant API calls, lowering long-term API costs by 60%+.',
        'Eliminated manual email sorting entirely through agentic automation.'
      ]
    },
    {
      name: 'OpenENV Cloud Security Audit Environment',
      tech: 'Docker • GitHub Actions CI/CD • Bash • Hugging Face Spaces',
      link: 'https://github.com/SHT4BHARAT',
      deployed: null,
      desc: 'Cloud Infrastructure Security Audit and Remediation environment with full DevOps pipeline.',
      details: [
        'Architected and deployed a Cloud Infrastructure Security Audit and Remediation environment.',
        'Demonstrated full DevOps ownership from design to production deployment.',
        'Deployed dynamically on Hugging Face Spaces with robust automated CI/CD pipelines via GitHub Actions.',
        'Built automated security scanning and remediation workflows using Docker and Bash.'
      ]
    }
  ],

  skills: {
    aiAgentOrchestration: ['LangChain', 'LangGraph', 'CrewAI', 'Prompt Engineering', 'Agentic Loop Design', 'OpenAI API', 'Gemini API', 'LlamaIndex', 'Sarvam AI'],
    backendSystems: ['Python', 'JavaScript', 'TypeScript', 'Kotlin', 'C++', 'SQL', 'HTML/CSS', 'FastAPI', 'Node.js', 'Express.js', 'Next.js', 'React'],
    infrastructure: ['Docker', 'AWS/GCP', 'Vercel', 'Railway', 'Hugging Face Spaces', 'GitHub Actions', 'PostgreSQL', 'Redis', 'SQLite'],
    solutionsEngineering: ['Rapid PoC Development', 'Technical Consulting', 'Stakeholder Management', 'Agile/Scrum', 'API Integration', 'System Design']
  },

  socials: {
    github: "https://github.com/SHT4BHARAT",
    linkedin: "https://linkedin.com/in/sht4bharat",
    email: "mailto:sht4bharat@gmail.com"
  },

  awards: [
    {
      title: "GenAI Hackathon Runner-up",
      issuer: "MLBhopal",
      duration: "2025",
      description: "Vibe-coded an Audio-Based Offline P2P Payment System (EchoPay) in under 48 hours."
    },
    {
      title: "AI Impact Buildathon",
      issuer: "GUVI India",
      duration: "2026",
      description: "Delivered production-grade autonomous scam detection agent (Honey-Pot) for financial fraud prevention."
    },
    {
      title: "Cloud Security Hackathon",
      issuer: "OpenENV",
      duration: "2026",
      description: "Built and deployed Cloud Infrastructure Security Audit environment on Hugging Face Spaces with GitHub Actions CI/CD."
    }
  ],

  certifications: [
    {
      title: "Blockchain and its Applications",
      issuer: "IIT Kharagpur",
      platform: "NPTEL / Swayam",
      duration: "Jan-Apr 2025 (12 Weeks)",
      id: "NPTEL25CS08S642801064",
      points: [
        "Online Assignments: 14.69/25",
        "Proctored Exam: 34.5/75",
        "Consolidated Score: 49%",
        "Recommended Credits: 3 or 4",
        "Verification: nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS08S642801064"
      ]
    },
    {
      title: "Python Programming (Internship)",
      issuer: "AICTE / Robokwik",
      platform: "Corporate Internship Training",
      duration: "10 Sep - 6 Nov 2025 (8 Weeks)",
      id: "EIS/AICTE-CER/25-530",
      points: [
        "AICTE ORID: CORPORATE661c559ad159f1713132954",
        "Verification: robokwik.com/certificatevalidation",
        "Issued On: 11/06/2025",
        "Completed comprehensive training on Python fundamentals and applications."
      ]
    }
  ],

  profileImage: "/shivanshu.jpg"
};

const SkillLevels = {
  AI_Agent_Orchestration: [
    { name: 'LangChain/LangGraph', level: 90 },
    { name: 'Gemini API', level: 92 },
    { name: 'OpenAI API', level: 88 },
    { name: 'CrewAI', level: 85 },
    { name: 'Prompt Engineering', level: 92 },
    { name: 'Agentic Loop Design', level: 88 },
    { name: 'LLM Evaluation', level: 80 },
    { name: 'Distributed Tracing', level: 75 },
  ],
  Backend_Systems: [
    { name: 'Python', level: 90 },
    { name: 'JavaScript/TypeScript', level: 85 },
    { name: 'FastAPI', level: 88 },
    { name: 'Node.js/Express', level: 85 },
    { name: 'Kotlin', level: 72 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'Redis', level: 78 },
    { name: 'WebSocket', level: 80 },
  ],
  Infrastructure: [
    { name: 'Docker', level: 82 },
    { name: 'AWS/GCP', level: 75 },
    { name: 'Vercel/Railway', level: 88 },
    { name: 'GitHub Actions', level: 85 },
    { name: 'Linux/Bash', level: 80 },
    { name: 'REST APIs', level: 92 },
    { name: 'OAuth2/JWT', level: 78 },
  ],
  Solutions_Engineering: [
    { name: 'Rapid PoC Development', level: 95 },
    { name: 'Technical Consulting', level: 85 },
    { name: 'Stakeholder Management', level: 82 },
    { name: 'Agile/Scrum Leadership', level: 80 },
    { name: 'API Integration', level: 90 },
    { name: 'System Design', level: 78 },
  ],
};

const AnimatedCounter = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = parseFloat(value) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= parseFloat(value)) {
        setCount(parseFloat(value));
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '8px' }}
      >
        {Math.round(count)}{suffix}
      </motion.div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{label}</div>
    </div>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth * 0.03), 50);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6a00';
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = '#ff6a00';
            ctx.globalAlpha = 0.05 * (1 - dist / 120);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 250);
    });
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -5,
        pointerEvents: 'none',
      }}
    />
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 999,
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'var(--gradient-aurora)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const FloatingCTA = () => (
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

const SkillProgressBar = ({ name, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setWidth(level), 300 + index * 50);
    return () => clearTimeout(timer);
  }, [isInView, level, index]);

  return (
    <div ref={ref} style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{name}</span>
        <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-primary)' }}>{level}%</span>
      </div>
      <div style={{ height: '8px', borderRadius: '4px', background: 'var(--glass-border)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${width}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
          style={{
            height: '100%',
            borderRadius: '4px',
            background: 'var(--gradient-aurora)',
            boxShadow: '0 0 12px rgba(var(--accent-primary-rgb), 0.3)',
          }}
        />
      </div>
    </div>
  );
};

const SectionDivider = () => (
  <div style={{ position: 'relative', height: '80px', overflow: 'hidden', marginTop: '-40px' }}>
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}
    >
      <motion.path
        initial={{ d: 'M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z' }}
        whileInView={{ d: 'M0,40 C360,0 720,80 1440,40 L1440,80 L0,80 Z' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        fill="var(--accent-primary)"
        opacity="0.03"
      />
    </svg>
  </div>
);

const TechnicalDecor = () => {
  const items = [
    { text: '01010101', top: '10%', left: '5%' },
    { text: '<div />', top: '25%', left: '85%' },
    { text: 'function init()', top: '65%', left: '12%' },
    { text: 'import { ... }', top: '45%', left: '75%' },
    { text: 'const data = []', top: '85%', left: '45%' },
    { text: '=> async', top: '15%', left: '60%' },
    { text: '{ "id": 1 }', top: '75%', left: '90%' },
    { text: 'git commit', top: '35%', left: '15%' }
  ];

  return (
    <div className="tech-decor-layer" aria-hidden="true">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="tech-item"
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {item.text}
        </motion.div>
      ))}

      <motion.div
        className="tech-item tech-icon-decor"
        style={{ top: '20%', left: '20%' }}
        animate={{ rotate: 360, opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Cpu size={160} />
      </motion.div>

      <motion.div
        className="tech-item tech-icon-decor"
        style={{ top: '70%', left: '70%' }}
        animate={{ rotate: -360, opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Layers size={180} />
      </motion.div>
    </div>
  );
};

const Navbar = ({ theme, toggleTheme, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'What I Do', 'Experience', 'Projects', 'Awards', 'Skills', 'Certifications', 'Contact'];

  return (
    <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      <style>{`
        .nav-container {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 24px 0;
          transition: all 0.4s ease;
        }
        .nav-container.scrolled {
          padding: 16px 0;
          background: var(--bg-card);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -1px;
          cursor: pointer;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-dim);
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-link.active {
          color: var(--accent-primary);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .nav-link:hover {
          color: var(--accent-primary);
        }
        .theme-toggle-btn {
          background: rgba(var(--accent-primary-rgb), 0.1);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          padding: 8px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .theme-toggle-btn:hover {
          background: var(--accent-primary);
          color: white;
          transform: rotate(15deg);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
      <div className="nav-content">
        <div className="logo italic text-gradient">{portfolioData.name}<span style={{ color: 'var(--text-main)' }}>{portfolioData.surname}</span></div>

        <div className="nav-links">
          {navItems.map((item) => {
            const itemId = item.toLowerCase().replace(' ', '');
            return (
              <a 
                key={item} 
                href={`#${itemId}`} 
                className={`nav-link uppercase tracking-widest ${activeSection === itemId ? 'active' : ''}`}
                aria-current={activeSection === itemId ? 'location' : undefined}
              >
                {item}
              </a>
            );
          })}
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="theme-toggle-btn mobile-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mobile-menu glass-card"
            style={{ position: 'absolute', top: '100%', left: '20px', right: '20px', padding: '32px', zIndex: 999, marginTop: '10px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '')}`} 
                  className="nav-link" 
                  style={{ fontSize: '1.2rem' }} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'var(--gradient-aurora)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1001,
      }}
    />
  );
};

const AwardsSection = () => (
  <section id="awards" className="section-wrapper">
    <motion.h2
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-gradient"
      style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}
    >
      Awards.
    </motion.h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.awards.map((item, i) => (
        <div key={i} className="scroll-card">
          <ProjectExpansionCard item={item} icon={Award} />
        </div>
      ))}
    </div>
  </section>
);

const CertificationSection = () => (
  <section id="certifications" className="section-wrapper">
    <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Certifications.</h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.certifications.map((cert, i) => (
        <div key={i} className="scroll-card">
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            className="glass-card"
            style={{ padding: '48px', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary-rgb), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px', flexShrink: 0 }}>
              <Award size={24} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{cert.title}</h3>
            <p style={{ color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '8px' }}>{cert.issuer}</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '24px', fontWeight: 600 }}>{cert.platform}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flexGrow: 1 }}>
              {cert.points.map((point, i) => (
                <li key={i} style={{ color: 'var(--text-dim)', position: 'relative', paddingLeft: '24px', marginBottom: '12px', fontSize: '1rem', lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent-primary)', fontWeight: 900 }}>▹</span>
                  {point}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700 }}>
                <Calendar size={18} />
                <span>{cert.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>
                <span style={{ color: 'var(--accent-primary)' }}>Roll No:</span>
                <span>{cert.id}</span>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);

const ProjectExpansionCard = ({ item, icon }) => {
  const title = item.role || item.title;
  const org = item.organization || item.issuer;
  const points = item.points || (item.description ? [item.description] : []);
  const duration = item.duration;

  return (
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    className="glass-card"
    style={{ padding: '48px', height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary-rgb), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px', flexShrink: 0 }}>
      {icon && <icon size={24} style={{ color: 'var(--accent-primary)' }} />}
    </div>
    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '24px' }}>{org}</p>

    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flexGrow: 1 }}>
      {points.map((point, i) => (
        <li key={i} style={{ color: 'var(--text-dim)', position: 'relative', paddingLeft: '24px', marginBottom: '12px', fontSize: '1rem', lineHeight: 1.6 }}>
          <span style={{ position: 'absolute', left: 0, color: 'var(--accent-primary)', fontWeight: 900 }}>▹</span>
          {point}
        </li>
      ))}
    </ul>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700, borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
      <Calendar size={18} />
      <span>{duration}</span>
    </div>
  </motion.div>
  );
};

const Hero3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = [
    { top: '15%', left: '10%', size: 60, border: true, color: 'var(--accent-primary)', delay: 0 },
    { top: '25%', right: '15%', size: 80, border: true, color: 'var(--accent-secondary)', delay: -2 },
    { bottom: '35%', left: '8%', size: 40, border: false, color: 'var(--accent-tertiary)', delay: -4 },
    { bottom: '25%', right: '10%', size: 50, border: true, color: 'var(--accent-primary)', delay: -6 },
    { top: '60%', left: '20%', size: 35, border: false, color: 'var(--accent-secondary)', delay: -3 },
    { top: '40%', right: '25%', size: 45, border: true, color: 'var(--accent-tertiary)', delay: -5 },
  ];

  return (
    <section id="hero" className="section-wrapper flex-center" style={{ minHeight: '100vh', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: shape.size,
            height: shape.size,
            border: shape.border ? `2px solid ${shape.color}` : 'none',
            background: shape.border ? 'transparent' : `${shape.color}20`,
            borderRadius: i % 2 === 0 ? '12px' : '50%',
            animationDelay: `${shape.delay}s`,
            transform: `perspective(1000px) translate(${mousePos.x * (10 + i * 2)}px, ${mousePos.y * (10 + i * 2)}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="profile-photo-container" style={{ marginBottom: '40px' }}>
          <motion.div
            className="rotating-ring"
            style={{
              position: 'absolute',
              inset: '-15px',
              border: '3px solid var(--accent-primary)',
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
          <div className="profile-image-glow" />
          <div className="profile-photo-inner">
            {portfolioData.profileImage ? (
              <img src={portfolioData.profileImage} alt={`Portrait photo of ${portfolioData.name}${portfolioData.surname}, Forward Deployed Engineer`} loading="lazy" />
            ) : (
              <div style={{ color: 'var(--accent-primary)', opacity: 0.5 }}>
                <Terminal size={80} />
              </div>
            )}
          </div>
        </div>

        {portfolioData.isOpenForInternships && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card flex-center"
            style={{
              padding: '10px 28px',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '2px',
              color: 'var(--accent-secondary)',
              border: '2px solid var(--accent-secondary)',
              marginBottom: '32px',
              display: 'inline-flex',
            }}
          >
            <Sparkles size={16} style={{ marginRight: '8px' }} />
            AVAILABLE FOR STARTUPS & BUILDERS
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-glow"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '32px',
          }}
        >
          I Build <span className="text-gradient">Autonomous AI Agents</span>
          <br />
          That Ship Themselves
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            maxWidth: '700px',
            margin: '0 auto 48px',
            color: 'var(--text-dim)',
            fontSize: '1.3rem',
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          {portfolioData.heroText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex-center"
          style={{ gap: '24px', marginBottom: '64px' }}
        >
          <a href="#projects" className="btn-primary">See My Work</a>
          <a href="#contact" className="btn-secondary">Let's Talk</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            paddingTop: '40px',
            borderTop: '1px solid var(--glass-border)',
            flexWrap: 'wrap',
          }}
        >
          <AnimatedCounter value="3" suffix="+" label="Projects Shipped" />
          <AnimatedCounter value="2" suffix="+" label="Years Building" />
          <AnimatedCounter value="10" suffix="+" label="Technologies" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const BentoGrid = () => {
  const [tilt, setTilt] = useState({});

  const handleMouseMove = (e, index) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt(prev => ({ ...prev, [index]: { x: y * -10, y: x * 10 } }));
  };

  const handleTouchMove = (e, index) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setTilt(prev => ({ ...prev, [index]: { x: y * -10, y: x * 10 } }));
  };

  const handleMouseLeave = (index) => {
    setTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <div className="bento-container">
      <style>{`
        .bento-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 220px);
          gap: 24px;
          margin-top: 60px;
        }
        .bento-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: transform 0.3s ease;
        }
        .bento-icon {
          position: absolute;
          top: 32px;
          right: 32px;
          opacity: 0.15;
          color: var(--accent-primary);
        }
        .large { grid-column: span 2; grid-row: span 2; }
        .medium { grid-column: span 2; }
        .small { grid-column: span 1; }
        @media (max-width: 992px) {
          .bento-container { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
          .large, .medium, .small { grid-column: span 2; height: 280px; }
        }
      `}</style>
      {portfolioData.specializations.map((card, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -12 }}
          className={`glass-card bento-card ${card.size}`}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onTouchMove={(e) => handleTouchMove(e, i)}
          onMouseLeave={() => handleMouseLeave(i)}
          onTouchEnd={() => handleMouseLeave(i)}
          style={{
            transform: tilt[i] ? `perspective(1000px) rotateX(${tilt[i].x}deg) rotateY(${tilt[i].y}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          }}
        >
          <card.icon className="bento-icon" size={100} />
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>{card.title}</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 500 }}>{card.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      className={`glass-card ${isExpanded ? 'project-card-expanded' : ''}`}
      style={{
        padding: '48px',
        height: 'fit-content',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary-rgb), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px' }}>
        <Code size={24} style={{ color: 'var(--accent-primary)' }} />
      </div>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>{project.name}</h3>
      <p style={{ color: 'var(--text-dim)', marginBottom: isExpanded ? '24px' : '40px', lineHeight: 1.7 }}>{project.desc}</p>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: '40px', overflow: 'hidden' }}
          >
            <ul className="project-details-list">
              {project.details.map((point, i) => (
                <li key={i} className="project-details-item">
                  {point}
                </li>
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
};

const ProjectSection = () => (
  <section id="projects" className="section-wrapper">
    <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Projects.</h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.projects.map((p, i) => (
        <div key={i} className="scroll-card">
          <ProjectCard project={p} />
        </div>
      ))}
    </div>
  </section>
);

const ExperienceSection = () => (
  <section id="experience" className="section-wrapper">
    <motion.h2
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-gradient"
      style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}
    >
      Experience.
    </motion.h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.experience.map((exp, i) => (
        <div key={i} className="scroll-card">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
            className="glass-card"
            style={{ padding: '48px', height: '100%', transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px' }}>{exp.role}</h3>
                <p style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.2rem' }}>{exp.company}</p>
                <p style={{ color: 'var(--text-dim)', fontWeight: 600 }}>{exp.location}</p>
              </div>
              <div className="glass-card flex-center" style={{ padding: '12px 24px', gap: '10px', color: 'var(--text-dim)', background: 'transparent', flexShrink: 0 }}>
                <Calendar size={20} />
                <span style={{ fontWeight: 700 }}>{exp.duration}</span>
              </div>
            </div>
            <ul style={{ marginTop: '32px', listStyle: 'none' }}>
              {exp.points.map((point, j) => (
                <li key={j} style={{ color: 'var(--text-dim)', position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '1.1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent-primary)', fontWeight: 900 }}>→</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);

const WhatIDoSection = () => {
  const offerings = [
    {
      icon: Cpu,
      title: 'Autonomous Agent Workflows',
      desc: 'I architect AI agents that run unattended — from voice agents and LLM pipelines to fully autonomous data extraction systems that handle real-world data without human intervention.',
      color: 'var(--accent-primary)'
    },
    {
      icon: Rocket,
      title: 'Rapid PoC → Production',
      desc: 'I ship production-grade APIs in days, not months. Proven velocity: vibe-coded a working offline payment MVP in under 48 hours (Hackathon Runner-up).',
      color: 'var(--accent-secondary)'
    },
    {
      icon: Layers,
      title: 'Full-Stack AI Systems',
      desc: 'End-to-end systems from audio ingestion pipelines to real-time WebSocket backends with Redis caching, PostgreSQL storage, and Dockerized deployment.',
      color: 'var(--accent-tertiary)'
    }
  ];

  return (
    <section id="whatido" className="section-wrapper">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-gradient"
        style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '60px' }}
      >
        What I Do For Startups.
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {offerings.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -12, rotateX: 5, rotateY: -5 }}
            className="glass-card"
            style={{ 
              padding: '48px', 
              transformStyle: 'preserve-3d', 
              perspective: '1000px',
              textAlign: 'center'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex-center"
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '24px', 
                background: `${item.color}20`,
                margin: '0 auto 32px',
                border: `2px solid ${item.color}40`
              }}
            >
              <item.icon size={36} style={{ color: item.color }} />
            </motion.div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.6 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = ['hero', 'about', 'whatido', 'experience', 'projects', 'awards', 'skills', 'certifications', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="main-container">
      <a href="#hero" className="skip-link" style={{ position: 'absolute', left: '-9999px', zIndex: 9999, padding: '16px 32px', background: 'var(--accent-primary)', color: 'white', fontWeight: 800, textDecoration: 'none', borderRadius: '0 0 8px 0' }} onFocus={(e) => e.target.style.left = '0'} onBlur={(e) => e.target.style.left = '-9999px'}>
        Skip to main content
      </a>
      <ScrollProgress />
      <div className="bg-aurora" />
      <div className="bg-grid-overlay" />
      <ParticleBackground />
      <TechnicalDecor />

      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <Hero3D />

      <SectionDivider />

      <section id="about" className="section-wrapper">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gradient"
          style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '32px' }}
        >
          About Me.
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.4rem', color: 'var(--text-dim)', maxWidth: '900px', lineHeight: 1.6, fontWeight: 500 }}
          >
            {portfolioData.aboutText}
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {portfolioData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
                className="glass-card"
                style={{ padding: '40px', transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <GraduationCap size={40} style={{ marginBottom: '24px', color: 'var(--accent-primary)' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>{edu.degree}</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>{edu.institution}</p>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 800 }}>
                  <span className="flex-center" style={{ gap: '8px' }}><Calendar size={16} /> {edu.duration}</span>
                  <span className="flex-center" style={{ gap: '8px' }}><Sparkles size={16} /> {edu.grade}</span>
                </div>
                {edu.coursework && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Coursework</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {edu.coursework.map((course, j) => (
                        <span key={j} style={{ padding: '4px 12px', borderRadius: '8px', background: 'rgba(var(--accent-primary-rgb), 0.1)', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700 }}>{course}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card flex-center"
              style={{ padding: '40px', flexDirection: 'column', gap: '20px' }}
            >
              <div style={{ background: 'rgba(255, 106, 0, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <MapPin size={48} style={{ color: 'var(--accent-tertiary)' }} />
              </div>
              <p style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.2rem' }}>{portfolioData.contact.location}</p>
            </motion.div>
          </div>

          <BentoGrid />
        </div>
      </section>

      <SectionDivider />

      <WhatIDoSection />

      <SectionDivider />

      <ExperienceSection />

      <SectionDivider />

      <ProjectSection />

      <SectionDivider />

      <AwardsSection />

      <SectionDivider />

      <CertificationSection />

      <SectionDivider />

      <section id="skills" className="section-wrapper">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gradient"
          style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '60px' }}
        >
          Skills.
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
          {Object.entries(SkillLevels).map(([category, skills]) => (
            <div key={category}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '28px', color: 'var(--text-main)', opacity: 0.6 }}>
                {category}
              </h3>
              {skills.map((skill, i) => (
                <SkillProgressBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '80px', borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '32px', color: 'var(--text-main)', opacity: 0.6, textAlign: 'center' }}>
            TECH STACK
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {portfolioData.skills.aiAgentOrchestration.concat(portfolioData.skills.backendSystems, portfolioData.skills.infrastructure, portfolioData.skills.solutionsEngineering).map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.15, backgroundColor: 'var(--accent-primary)', color: 'white', y: -5 }}
                className="glass-card skill-badge-3d"
                style={{ padding: '10px 22px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700, cursor: 'default' }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <SectionDivider />

      <footer id="contact" className="section-wrapper" style={{ textAlign: 'center', marginTop: '80px', paddingBottom: '120px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '32px' }}
        >
          Ready to build something <span className="text-gradient">epic?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ color: 'var(--text-dim)', marginBottom: '60px', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 60px' }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '80px', flexWrap: 'wrap' }}
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href={portfolioData.socials.email}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-main)', padding: '20px 40px', borderRadius: '24px', background: 'var(--bg-card)', border: '2px solid var(--accent-primary)', textDecoration: 'none', boxShadow: '0 10px 40px rgba(var(--accent-primary-rgb), 0.2)' }}
          >
            <Mail size={28} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{portfolioData.contact.email}</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href={`tel:${portfolioData.contact.phone.replace(/\s/g, '')}`}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-main)', padding: '20px 40px', borderRadius: '24px', background: 'var(--bg-card)', border: '2px solid var(--glass-border)', textDecoration: 'none' }}
          >
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{portfolioData.contact.phone}</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-center"
          style={{ gap: '48px', marginBottom: '80px' }}
        >
          <motion.a
            whileHover={{ y: -10, color: 'var(--accent-primary)', scale: 1.2 }}
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{ color: 'var(--text-dim)', transition: 'all 0.3s ease' }}
          >
            <Github size={36} />
          </motion.a>
          <motion.a
            whileHover={{ y: -10, color: 'var(--accent-primary)', scale: 1.2 }}
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            style={{ color: 'var(--text-dim)', transition: 'all 0.3s ease' }}
          >
            <Linkedin size={36} />
          </motion.a>
          <motion.a
            whileHover={{ y: -10, color: 'var(--accent-primary)', scale: 1.2 }}
            href={portfolioData.socials.email}
            aria-label="Send email"
            style={{ color: 'var(--text-dim)', transition: 'all 0.3s ease' }}
          >
            <Mail size={36} />
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '4px', fontWeight: 800 }}
        >
          © 2026 {portfolioData.name.toUpperCase()}{portfolioData.surname.toUpperCase()} • FORWARD DEPLOYED ENGINEER
        </motion.p>
      </footer>

      <BackToTop />
      <FloatingCTA />
    </div>
  );
};

export default App;
