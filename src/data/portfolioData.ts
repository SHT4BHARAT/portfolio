export interface Project {
  name: string;
  tech: string;
  link: string;
  deployed: string | null;
  desc: string;
  details: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
}

export interface Specialization {
  title: string;
  desc: string;
  icon: string;
  size: 'large' | 'medium' | 'small';
}

export interface Award {
  title: string;
  issuer: string;
  duration: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  platform: string;
  duration: string;
  id: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  coursework: string[];
}

export const portfolioData = {
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
      icon: 'Cpu',
      size: 'large'
    },
    {
      title: 'Voice & LLM Systems',
      desc: 'Voice agents, STT pipelines, Gemini & OpenAI APIs.',
      icon: 'Terminal',
      size: 'small'
    },
    {
      title: 'Backend Engineering',
      desc: 'FastAPI, Node.js, PostgreSQL, Redis, WebSocket.',
      icon: 'Database',
      size: 'small'
    },
    {
      title: 'Rapid Prototyping',
      desc: 'Idea to production in days. Hackathon-proven velocity.',
      icon: 'Rocket',
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
        "Verification: nptel.ac.in/noc/ECertificate/?q=NPTEL25CS08S642801064"
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
