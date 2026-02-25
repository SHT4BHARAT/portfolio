import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu, Code, Briefcase, ExternalLink, Menu, X, Terminal, Sparkles, Database, Layers, MapPin, GraduationCap, Calendar, Sun, Moon, Award } from 'lucide-react';
import './index.css';

/**
 * EDIT YOUR INFORMATION HERE
 */
const portfolioData = {
  name: "SHIVANSHU",
  surname: " TIWARI",
  tagline: "Result driven Pre Final-year B.Tech student exploring the Digital Edge.",
  heroHighlight: "Digital Edge.",
  heroText: "Android and Full Stack Developer. Pre-final year B.Tech student at SIRT Bhopal. I build AI-powered mobile and web applications using modern technologies like React, Python, and Google Gemini to solve real-world problems.",
  isOpenForInternships: true,
  aboutText: "I am a results-driven B.Tech student specializing in Computer Science and Information Technology. My focus is on developing high-performance Android apps and full-stack web solutions. I enjoy bridging the gap between machine learning research and practical business applications. Currently, I am seeking opportunities to apply my skills in AI, system design, and mobile development through challenging internships.",

  contact: {
    email: "sht4bharat@gmail.com",
    location: "Bhopal, Madhya Pradesh, India"
  },

  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Information Technology",
      institution: "Sagar Institute of Research & Technology | Bhopal",
      duration: "2023-2027",
      grade: "GPA: 7.5/10.00",
      coursework: ["Course 1", "Course 2", "Course 3"]
    }
  ],

  experience: [
    {
      role: "Android App Developer",
      company: "Blue Planet Infosolutions Pvt. Ltd. India",
      location: "Remote",
      duration: "August 2025 - Present",
      points: [
        "Developed and implemented high-performance mobile applications.",
        "Increased efficiency and managed outcomes using relevant technologies.",
        "Focused on impact and outcomes using modern tools and methodologies."
      ]
    }
  ],

  specializations: [
    {
      title: 'Android Dev',
      desc: 'Expertise in building scalable mobile experiences.',
      icon: Briefcase,
      size: 'large'
    },
    {
      title: 'Full Stack',
      desc: 'MERN, Python & Django Enthusiast.',
      icon: Terminal,
      size: 'small'
    },
    {
      title: 'AI & ML',
      desc: 'TensorFlow, PyTorch & Gemini Integration.',
      icon: Cpu,
      size: 'small'
    },
    {
      title: 'System Design',
      desc: 'Docker, Kubernetes & AWS Infrastructure.',
      icon: Layers,
      size: 'medium'
    }
  ],

  projects: [
    {
      name: 'Agentic Honey-Pot',
      tech: 'Python • FastAPI • Gemini AI',
      link: 'https://github.com/SHT4BHARAT/agentic-honeypot-scam-detection',
      deployed: 'https://agentic-honeypot.vercel.app',
      desc: 'Autonomously detects scammers for critical data extraction aimed at combating financial fraud.',
      details: [
        'Implemented autonomous detection using Google Gemini AI for behavioral analysis.',
        'Extracted critical intelligence from scam conversations in real-time.',
        'Integrated FastAPI for high-performance extraction and reporting.',
        'Designed for combating financial fraud via honey-pot strategies.'
      ]
    },
    {
      name: 'Multilingual Mandi',
      tech: 'Node.js • Express • PostgreSQL',
      link: 'https://github.com/SHT4BHARAT/multilingual-mandi',
      deployed: 'https://mandi-app.com',
      desc: 'Agricultural trading platform with real-time multilingual AI-powered price discovery.',
      details: [
        'Developed a real-time price discovery system using large-scale agricultural data.',
        'Integrated AI-powered translation for multilingual accessibility across rural regions.',
        'Optimized PostgreSQL queries for fast search and discovery features.',
        'Built a responsive UI for multi-device compatibility (Web & Mobile).'
      ]
    },
    {
      name: 'Crypto Pulse',
      tech: 'React • WebSocket • D3.js',
      link: '#',
      deployed: '#',
      desc: 'Real-time cryptocurrency tracking and visual analysis tool.',
      details: [
        'Leveraged WebSockets for real-time live data streaming of asset prices.',
        'Utilized D3.js for advanced data visualization and trend modeling.',
        'Implemented custom alerting systems for price volatility detection.',
        'Designed a high-throughput dashboard for institutional-grade monitoring.'
      ]
    }
  ],

  skills: {
    programming: ['Python', 'Java', 'JavaScript', 'C++', 'SQL', 'HTML/CSS'],
    frameworks: ['React', 'Node.js', 'Django', 'Spring Boot', 'TensorFlow', 'PyTorch'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Jenkins', 'MongoDB', 'PostgreSQL'],
    other: ['Agile/Scrum', 'Machine Learning', 'Data Analysis', 'REST APIs', 'Microservices', 'CI/CD']
  },

  socials: {
    github: "https://github.com/SHT4BHARAT",
    linkedin: "https://linkedin.com/in/sht4bharat",
    email: "mailto:sht4bharat@gmail.com"
  },

  leadership: [
    {
      role: "Class Representative",
      organization: "Jawahar Navodaya Vidyalaya",
      duration: "Apr 2016 - Mar 2017",
      points: [
        "Fostered positive relationships with peers through active listening and genuine concern for wellbeing.",
        "Served as liaison between students and faculty, addressing concerns and facilitating communication.",
        "Provided academic assistance and tutoring to students in need of support.",
        "Supported representatives in navigating challenges through teamwork and collaboration.",
        "Promoted open dialogue between students and instructors to enhance classroom environment.",
        "Attended school and board meetings to remain informed on policies and procedures."
      ]
    },
    {
      role: "Student Coordinator",
      organization: "Technical Hub | SIRT",
      duration: "2024 - Present",
      points: [
        "Leading student initiatives and coordinating technical events to foster a culture of innovation."
      ]
    }
  ],

  volunteer: [
    {
      role: "Student Coordinator",
      organization: "Jawahar Navodaya Vidyalaya",
      duration: "Jul 2019 - Jun 2021",
      points: [
        "Maintained clean and operational facilities to support program needs.",
        "Facilitated engaging events through effective organization and planning.",
        "Utilized strong interpersonal communication skills to convey important information."
      ]
    },

    {
      role: "Training & Placement Cell Coordinator",
      organization: "Sagar Institute of Research and Technology",
      duration: "September 2025 - December 2025",
      points: [
        "Managed the complete bridge between students and employers by coordinating placement drives and training programs.",
        "Maintained relationships with corporate recruiters and guided students through their career development journey.",
        "Organized recruitment events and facilitated smooth communication between all stakeholders."
      ]
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
    <div className="tech-decor-layer">
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

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Leadership', 'Volunteer', 'Contact'];

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
        }
        .nav-link:hover {
          color: var(--accent-primary);
        }
        .theme-toggle-btn {
          background: rgba(var(--accent-primary), 0.1);
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
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link uppercase tracking-widest">{item}</a>
          ))}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Resume</button>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="theme-toggle-btn mobile-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: '1.2rem' }} onClick={() => setIsMobileMenuOpen(false)}>{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LeadershipSection = () => (
  <section id="leadership" className="section-wrapper">
    <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Leadership.</h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.leadership.map((item, i) => (
        <div key={i} className="scroll-card">
          <ProjectExpansionCard item={item} icon={Sparkles} />
        </div>
      ))}
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="section-wrapper">
    <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Volunteer.</h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.volunteer.map((item, i) => (
        <div key={i} className="scroll-card">
          <ProjectExpansionCard item={item} icon={Code} />
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
            key={i}
            whileHover={{ scale: 1.03, y: -5 }}
            className="glass-card"
            style={{ padding: '48px', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px', flexShrink: 0 }}>
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

const ProjectExpansionCard = ({ item, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    className="glass-card"
    style={{ padding: '48px', height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px', flexShrink: 0 }}>
      <Icon size={24} style={{ color: 'var(--accent-primary)' }} />
    </div>
    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{item.role}</h3>
    <p style={{ color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '24px' }}>{item.organization}</p>

    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flexGrow: 1 }}>
      {item.points.map((point, i) => (
        <li key={i} style={{ color: 'var(--text-dim)', position: 'relative', paddingLeft: '24px', marginBottom: '12px', fontSize: '1rem', lineHeight: 1.6 }}>
          <span style={{ position: 'absolute', left: 0, color: 'var(--accent-primary)', fontWeight: 900 }}>▹</span>
          {point}
        </li>
      ))}
    </ul>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700, borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
      <Calendar size={18} />
      <span>{item.duration}</span>
    </div>
  </motion.div>
);

const Hero = () => (
  <section className="section-wrapper flex-center" style={{ minHeight: '100vh', textAlign: 'center' }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="profile-photo-container">
        <div className="profile-image-glow" />
        <div className="profile-photo-inner">
          {portfolioData.profileImage ? (
            <img src={portfolioData.profileImage} alt={portfolioData.name} loading="lazy" />
          ) : (
            <div style={{ color: 'var(--accent-primary)', opacity: 0.5 }}>
              <Terminal size={80} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-center" style={{ gap: '12px', marginBottom: '24px' }}>
        {portfolioData.isOpenForInternships && (
          <div className="glass-card flex-center" style={{ padding: '8px 24px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--accent-primary)', border: '2px solid var(--accent-primary)' }}>
            <Sparkles size={16} style={{ marginRight: '8px' }} />
            OPEN FOR INTERNSHIPS
          </div>
        )}
      </div>

      <h1 className="text-glow" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '40px' }}>
        Designing the <br />
        <span className="text-gradient">{portfolioData.heroHighlight}</span>
      </h1>

      <p style={{ maxWidth: '650px', margin: '0 auto 60px', color: 'var(--text-dim)', fontSize: '1.3rem', fontWeight: 500 }}>
        {portfolioData.heroText}
      </p>

      <div className="flex-center" style={{ gap: '24px' }}>
        <a href="#projects" className="btn-primary">View My Work</a>
        <a href="#contact" className="btn-secondary">Let's Connect</a>
      </div>
    </motion.div>
  </section>
);

const BentoGrid = () => {
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

  return (
    <motion.div
      layout
      className={`glass-card ${isExpanded ? 'project-card-expanded' : ''}`}
      style={{ padding: '48px', height: 'fit-content' }}
    >
      <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(var(--accent-primary), 0.1)', border: '1px solid var(--glass-border)', marginBottom: '32px' }}>
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
              <a href={project.deployed} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary">
                <ExternalLink size={18} /> Live Demo
              </a>
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
    <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Experience.</h2>
    <div className="horizontal-scroll-wrapper">
      {portfolioData.experience.map((exp, i) => (
        <div key={i} className="scroll-card">
          <div className="glass-card" style={{ padding: '48px', height: '100%' }}>
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
          </div>
        </div>
      ))}
    </div>
  </section>
);

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="main-container">
      <div className="bg-aurora" />
      <div className="bg-grid-overlay" />
      <TechnicalDecor />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />

      <section id="about" className="section-wrapper">
        <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '32px' }}>About Me.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-dim)', maxWidth: '900px', lineHeight: 1.6, fontWeight: 500 }}>
            {portfolioData.aboutText}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {portfolioData.education.map((edu, i) => (
              <div key={i} className="glass-card" style={{ padding: '40px' }}>
                <GraduationCap size={40} style={{ marginBottom: '24px', color: 'var(--accent-primary)' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>{edu.degree}</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 600 }}>{edu.institution}</p>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 800 }}>
                  <span className="flex-center" style={{ gap: '8px' }}><Calendar size={16} /> {edu.duration}</span>
                  <span className="flex-center" style={{ gap: '8px' }}><Sparkles size={16} /> {edu.grade}</span>
                </div>
              </div>
            ))}
            <div className="glass-card flex-center" style={{ padding: '40px', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(255, 106, 0, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <MapPin size={48} style={{ color: 'var(--accent-tertiary)' }} />
              </div>
              <p style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.2rem' }}>{portfolioData.contact.location}</p>
            </div>
          </div>

          <BentoGrid />
        </div>
      </section>

      <ExperienceSection />

      <CertificationSection />

      <LeadershipSection />

      <VolunteerSection />

      <ProjectSection />

      <section id="skills" className="section-wrapper">
        <h2 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '80px' }}>Skills.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {Object.entries(portfolioData.skills).map(([category, list]) => (
            <div key={category}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '32px', color: 'var(--text-main)', opacity: 0.6 }}>{category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {list.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-primary)', color: 'white' }}
                    className="glass-card"
                    style={{ padding: '14px 32px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 700, cursor: 'default' }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="section-wrapper" style={{ textAlign: 'center', borderTop: '2px solid var(--glass-border)', marginTop: '160px', paddingBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '32px' }}>Ready to build something <span className="text-gradient">epic?</span></h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '60px', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 60px' }}>{portfolioData.heroText}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginBottom: '80px', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-main)', padding: '16px 32px', borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
            <Mail size={24} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontWeight: 800 }}>{portfolioData.contact.email}</span>
          </motion.div>
        </div>

        <div className="flex-center" style={{ gap: '48px', marginBottom: '80px' }}>
          <motion.a whileHover={{ y: -8, color: 'var(--accent-primary)' }} href={portfolioData.socials.github} target="_blank" style={{ color: 'var(--text-dim)' }}><Github size={32} /></motion.a>
          <motion.a whileHover={{ y: -8, color: 'var(--accent-primary)' }} href={portfolioData.socials.linkedin} target="_blank" style={{ color: 'var(--text-dim)' }}><Linkedin size={32} /></motion.a>
          <motion.a whileHover={{ y: -8, color: 'var(--accent-primary)' }} href={portfolioData.socials.email} style={{ color: 'var(--text-dim)' }}><Mail size={32} /></motion.a>
        </div>

        <p style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '4px', fontWeight: 800 }}>© 2026 {portfolioData.name.toUpperCase()}{portfolioData.surname.toUpperCase()} • BUILT FOR THE FUTURE</p>
      </footer>
    </div>
  );
};

export default App;
