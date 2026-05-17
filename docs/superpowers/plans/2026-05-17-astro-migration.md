# Astro Migration: Vite SPA → Astro SSG with React Islands

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate portfolio from client-side React SPA (Vite) to Astro SSG with React islands, eliminating blank-screen-on-load and shipping HTML-first content.

**Architecture:** Astro generates static HTML at build time. Interactive components (3D tilt, animations, scroll effects) become React islands with `client:visible` or `client:load` directives. All static content (text, images, links) renders as pure HTML — visible immediately, even without JavaScript.

**Tech Stack:** Astro 6.x, @astrojs/react 5.x, motion (framer-motion rename), lucide-react, sharp (image optimization)

---

## File Structure

```
D:\Swayam\Portfolio\
├── package.json                          # Modified: add astro deps, remove vite
├── astro.config.mjs                      # NEW: Astro configuration
├── tsconfig.json                         # NEW: TypeScript config for Astro
├── public/
│   ├── favicon.svg                       # Keep existing
│   ├── robots.txt                        # Keep existing
│   ├── sitemap.xml                       # Keep existing
│   └── shivanshu.jpg                     # NEW: Move profile image here (or keep in src/assets)
├── src/
│   ├── layouts/
│   │   └── Layout.astro                  # NEW: Base HTML shell with <head>, CSS, JSON-LD
│   ├── pages/
│   │   └── index.astro                   # NEW: Homepage — assembles all sections
│   ├── components/
│   │   ├── Navbar.astro                  # NEW: Static navbar (zero JS)
│   │   ├── NavbarMobile.tsx              # NEW: Interactive mobile menu (client:load)
│   │   ├── Hero3D.tsx                    # NEW: 3D hero animations (client:load)
│   │   ├── AboutSection.astro            # NEW: Static about content
│   │   ├── WhatIDoSection.astro          # NEW: Static "What I Do" cards
│   │   ├── ExperienceSection.astro       # NEW: Static experience timeline
│   │   ├── ProjectSection.astro          # NEW: Static project list
│   │   ├── ProjectCard.tsx               # NEW: Interactive expand/collapse (client:visible)
│   │   ├── AwardsSection.astro           # NEW: Static awards
│   │   ├── CertificationsSection.astro   # NEW: Static certifications
│   │   ├── EducationSection.astro        # NEW: Static education
│   │   ├── SkillsSection.astro           # NEW: Static skills with badges
│   │   ├── ContactSection.astro          # NEW: Static contact/footer
│   │   ├── ScrollProgress.tsx            # NEW: Scroll indicator (client:load)
│   │   ├── ParticleBackground.tsx        # NEW: Canvas particles (client:only="react")
│   │   ├── BackToTop.tsx                 # NEW: Floating button (client:visible)
│   │   ├── FloatingCTA.tsx               # NEW: Floating CTA (client:visible)
│   │   ├── TechnicalDecor.tsx            # NEW: Decorative elements (client:idle)
│   │   ├── SectionDivider.astro          # NEW: SVG wave divider
│   │   ├── BentoGrid.tsx                 # NEW: Interactive bento cards (client:visible)
│   │   ├── JsonLd.astro                  # NEW: JSON-LD schema injector
│   │   └── AnimatedCounter.tsx           # NEW: Count-up animation (client:visible)
│   ├── data/
│   │   └── portfolioData.ts              # NEW: Typed portfolio data (extracted from App.jsx)
│   ├── styles/
│   │   └── global.css                    # NEW: Migrated from src/index.css
│   └── env.d.ts                          # NEW: Astro type declarations
```

**Migration Strategy:**
- **Static components** (text, images, links, layout) → `.astro` files (zero JS shipped)
- **Interactive components** (animations, hover effects, scroll triggers) → `.tsx` files with `client:*` directives
- **CSS** → Migrate `index.css` to `src/styles/global.css`, imported in `Layout.astro`
- **Data** → Extract `portfolioData` from App.jsx to `src/data/portfolioData.ts` with TypeScript types
- **framer-motion** → Rename imports from `framer-motion` to `motion/react`

---

### Task 1: Initialize Astro Project

**Files:**
- Create: `D:\Swayam\Portfolio\astro.config.mjs`
- Create: `D:\Swayam\Portfolio\tsconfig.json`
- Create: `D:\Swayam\Portfolio\src\env.d.ts`
- Modify: `D:\Swayam\Portfolio\package.json`

- [ ] **Step 1: Install Astro dependencies**

Run:
```bash
cd D:\Swayam\Portfolio
npm install astro@latest @astrojs/react@latest @astrojs/sitemap@latest sharp
npm uninstall vite @vitejs/plugin-react
```

Expected: `astro` and `@astrojs/react` added, `vite` and `@vitejs/plugin-react` removed.

- [ ] **Step 2: Create astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sht-portfolio.vercel.app',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [],
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 4: Create src/env.d.ts**

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 5: Update package.json scripts**

Replace the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "astro check"
  }
}
```

- [ ] **Step 6: Verify Astro works**

Run:
```bash
cd D:\Swayam\Portfolio
npm run dev
```

Expected: Astro dev server starts at `http://localhost:4321`. Accessing it shows a default Astro page (we'll replace content in next tasks).

---

### Task 2: Extract Portfolio Data to TypeScript

**Files:**
- Create: `D:\Swayam\Portfolio\src\data\portfolioData.ts`
- Read: `D:\Swayam\Portfolio\src\App.jsx` (lines 9-220)

- [ ] **Step 1: Create typed portfolio data file**

Read the current `portfolioData` object from `src/App.jsx:9-220` and create `src/data/portfolioData.ts`:

```ts
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
  icon: string; // We'll map icon names to lucide-react in components
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
```

- [ ] **Step 2: Copy profile image to public folder**

Run:
```bash
cp D:\Swayam\Portfolio\public\shivanshu.jpg D:\Swayam\Portfolio\public\shivanshu.jpg
```

(If the image doesn't exist in public/, create a placeholder or note that user needs to add it.)

- [ ] **Step 3: Verify data file compiles**

Run:
```bash
cd D:\Swayam\Portfolio
npx tsc --noEmit src/data/portfolioData.ts
```

Expected: No TypeScript errors.

---

### Task 3: Migrate CSS and Create Layout

**Files:**
- Create: `D:\Swayam\Portfolio\src\styles\global.css`
- Create: `D:\Swayam\Portfolio\src\layouts\Layout.astro`
- Create: `D:\Swayam\Portfolio\src\components\JsonLd.astro`
- Read: `D:\Swayam\Portfolio\src\index.css` (all 691 lines)
- Read: `D:\Swayam\Portfolio\index.html` (all 55 lines)

- [ ] **Step 1: Copy index.css to global.css**

Read `src/index.css` entirely and copy it to `src/styles/global.css` without changes.

- [ ] **Step 2: Create Layout.astro**

```astro
---
import '../styles/global.css';
import JsonLd from '../components/JsonLd.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Forward Deployed Engineer specializing in Autonomous Agentic Workflows, Voice AI, LLM Pipelines, and rapid MVP development." } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Shivanshu Tiwari" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://sht-portfolio.vercel.app/" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/og-image.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <link rel="canonical" href="https://sht-portfolio.vercel.app/" />
    
    <JsonLd />
  </head>
  <body>
    <a href="#hero" class="skip-link" style="position: absolute; left: -9999px; z-index: 9999; padding: 16px 32px; background: var(--accent-primary); color: white; font-weight: 800; text-decoration: none; border-radius: 0 0 8px 0;" onFocus="this.style.left = '0'" onBlur="this.style.left = '-9999px'">
      Skip to main content
    </a>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Create JsonLd.astro**

```astro
---
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shivanshu Tiwari",
  "jobTitle": "Forward Deployed Engineer & AI-Native Builder",
  "url": "https://sht-portfolio.vercel.app/",
  "telephone": "+91 7509410237",
  "email": "sht4bharat@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bhopal",
    "addressRegion": "Madhya Pradesh",
    "addressCountry": "India"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Sagar Institute of Research & Technology"
  },
  "knowsAbout": ["Autonomous Agents", "LangChain", "LangGraph", "CrewAI", "Voice AI", "LLM Pipelines", "FastAPI", "AI Engineering", "MVP Development", "React", "Node.js", "Python", "Full Stack Development", "System Design", "Agentic Workflows", "GenAI"],
  "sameAs": [
    "https://github.com/SHT4BHARAT",
    "https://linkedin.com/in/sht4bharat"
  ]
};
---

<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

- [ ] **Step 4: Verify Layout works**

Create a minimal `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Shivanshu Tiwari | Forward Deployed Engineer">
  <h1>Hello from Astro</h1>
</Layout>
```

Run:
```bash
cd D:\Swayam\Portfolio
npm run dev
```

Expected: Page renders at localhost:4321 with "Hello from Astro" and proper meta tags in HTML source.

---

### Task 4: Create Static Components (Zero JS)

**Files:**
- Create: `D:\Swayam\Portfolio\src\components\Navbar.astro`
- Create: `D:\Swayam\Portfolio\src\components\AboutSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\WhatIDoSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\ExperienceSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\EducationSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\AwardsSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\CertificationsSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\SkillsSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\ContactSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\SectionDivider.astro`

- [ ] **Step 1: Create Navbar.astro**

```astro
---
import { portfolioData } from '../data/portfolioData';

const navItems = ['About', 'What I Do', 'Experience', 'Projects', 'Awards', 'Skills', 'Certifications', 'Contact'];
---

<nav class="nav-container" id="navbar">
  <style>
    .nav-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 20px 40px;
      transition: var(--transition-smooth);
    }
    .nav-container.scrolled {
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
    }
    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 900;
    }
    .nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    .nav-link {
      color: var(--text-dim);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: var(--transition-smooth);
    }
    .nav-link:hover, .nav-link.active {
      color: var(--accent-primary);
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  </style>

  <div class="nav-content">
    <a href="#hero" class="logo text-gradient">{portfolioData.name}<span style="color: var(--text-main)">{portfolioData.surname}</span></a>

    <div class="nav-links">
      {navItems.map((item) => {
        const href = `#${item.toLowerCase().replace(' ', '')}`;
        return <a href={href} class="nav-link">{item}</a>;
      })}
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Create AboutSection.astro**

```astro
---
import { portfolioData } from '../data/portfolioData';
---

<section id="about" class="section-wrapper">
  <h2 class="text-gradient" style="font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; margin-bottom: 48px;">
    About Me.
  </h2>
  
  <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-dim); max-width: 800px; margin-bottom: 60px;">
    {portfolioData.aboutText}
  </p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
    {portfolioData.education.map((edu) => (
      <div class="glass-card" style="padding: 40px;">
        <h4 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 12px;">{edu.degree}</h4>
        <p style="color: var(--text-dim); font-size: 1.1rem; font-weight: 600;">{edu.institution}</p>
        <div style="margin-top: 24px; display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--accent-primary); font-weight: 800;">
          <span>{edu.duration}</span>
          <span>{edu.grade}</span>
        </div>
        {edu.coursework && (
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--glass-border);">
            <p style="font-size: 0.85rem; font-weight: 800; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Coursework</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              {edu.coursework.map((course) => (
                <span style="padding: 4px 12px; border-radius: 8px; background: rgba(var(--accent-primary-rgb), 0.1); color: var(--accent-primary); font-size: 0.85rem; font-weight: 700;">{course}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
    
    <div class="glass-card" style="padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
      <p style="text-align: center; font-weight: 800; font-size: 1.2rem;">{portfolioData.contact.location}</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create remaining static sections**

Create `WhatIDoSection.astro`, `ExperienceSection.astro`, `EducationSection.astro`, `AwardsSection.astro`, `CertificationsSection.astro`, `SkillsSection.astro`, `ContactSection.astro`, and `SectionDivider.astro` following the same pattern:
- Import `portfolioData` from `../data/portfolioData`
- Use Astro syntax (`class` not `className`, `{variable}` for interpolation, `for` loops with `map()`)
- Include inline `<style>` for component-specific styles
- Keep all CSS classes from `global.css` (`.glass-card`, `.text-gradient`, `.section-wrapper`, etc.)

**WhatIDoSection.astro** — Maps `portfolioData.specializations` into bento-style cards
**ExperienceSection.astro** — Maps `portfolioData.experience` into timeline cards
**EducationSection.astro** — Renders education info (can be merged into AboutSection)
**AwardsSection.astro** — Maps `portfolioData.awards` into award cards
**CertificationsSection.astro** — Maps `portfolioData.certifications` into horizontal scroll cards
**SkillsSection.astro** — Renders skill badges from `portfolioData.skills`
**ContactSection.astro** — Renders contact info, email, phone, social links
**SectionDivider.astro** — SVG wave divider between sections

- [ ] **Step 4: Verify static sections render**

Update `src/pages/index.astro` to include all static sections:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import AboutSection from '../components/AboutSection.astro';
import WhatIDoSection from '../components/WhatIDoSection.astro';
import ExperienceSection from '../components/ExperienceSection.astro';
import AwardsSection from '../components/AwardsSection.astro';
import CertificationsSection from '../components/CertificationsSection.astro';
import SkillsSection from '../components/SkillsSection.astro';
import ContactSection from '../components/ContactSection.astro';
import SectionDivider from '../components/SectionDivider.astro';
---

<Layout title="Shivanshu Tiwari | Forward Deployed Engineer & AI-Native Builder">
  <Navbar />
  <main id="hero">
    <h1 style="text-align: center; padding: 200px 20px;">Hello from Astro (Hero coming next)</h1>
  </main>
  <SectionDivider />
  <AboutSection />
  <SectionDivider />
  <WhatIDoSection />
  <SectionDivider />
  <ExperienceSection />
  <SectionDivider />
  <AwardsSection />
  <SectionDivider />
  <CertificationsSection />
  <SectionDivider />
  <SkillsSection />
  <SectionDivider />
  <ContactSection />
</Layout>
```

Run:
```bash
cd D:\Swayam\Portfolio
npm run build
```

Expected: Build succeeds. Check `dist/index.html` — all content should be present as raw HTML (not inside `<script>` tags).

---

### Task 5: Create Interactive React Islands

**Files:**
- Create: `D:\Swayam\Portfolio\src\components\Hero3D.tsx`
- Create: `D:\Swayam\Portfolio\src\components\ProjectCard.tsx`
- Create: `D:\Swayam\Portfolio\src\components\ProjectSection.astro`
- Create: `D:\Swayam\Portfolio\src\components\BentoGrid.tsx`
- Create: `D:\Swayam\Portfolio\src\components\ScrollProgress.tsx`
- Create: `D:\Swayam\Portfolio\src\components\ParticleBackground.tsx`
- Create: `D:\Swayam\Portfolio\src\components\BackToTop.tsx`
- Create: `D:\Swayam\Portfolio\src\components\FloatingCTA.tsx`
- Create: `D:\Swayam\Portfolio\src\components\TechnicalDecor.tsx`
- Create: `D:\Swayam\Portfolio\src\components\AnimatedCounter.tsx`

- [ ] **Step 1: Create Hero3D.tsx**

Extract the Hero3D component from `App.jsx:886-1020`. Key changes:
- Change `import { motion } from 'framer-motion'` to `import { motion } from 'motion/react'`
- Keep all the 3D floating shapes, mouse parallax, rotating ring logic
- Export as default function component

```tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';

export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  // ... (copy the rest of Hero3D from App.jsx:890-1020)
  // Include: shapes array, metrics, profile image, badge, CTA buttons
  // Keep all framer-motion animations

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section-wrapper flex-center"
      style={{ minHeight: '100vh', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Copy all the motion.div shapes, profile image, text, buttons from App.jsx */}
    </section>
  );
}
```

- [ ] **Step 2: Create ProjectCard.tsx**

Extract the ProjectCard/ProjectExpansionCard from `App.jsx:1100-1200`. Key changes:
- Change `import { motion } from 'framer-motion'` to `import { motion } from 'motion/react'`
- Use `client:visible` directive (hydrates when scrolled into view)

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
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
      {/* Copy project card content from App.jsx */}
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
```

- [ ] **Step 3: Create ProjectSection.astro**

```astro
---
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
---

<section id="projects" class="section-wrapper">
  <h2 class="text-gradient" style="font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; margin-bottom: 60px;">
    Projects.
  </h2>

  {portfolioData.projects.map((project, i) => (
    <ProjectCard client:visible project={project} index={i} />
  ))}
</section>
```

- [ ] **Step 4: Create remaining interactive components**

**BentoGrid.tsx** — Extract from `App.jsx:1027-1107`. Use `client:visible`.
**ScrollProgress.tsx** — Extract from `App.jsx:264-300`. Use `client:load`.
**ParticleBackground.tsx** — Extract from `App.jsx:315-403`. Use `client:only="react"` (canvas can't SSR).
**BackToTop.tsx** — Extract from `App.jsx:406-446`. Use `client:visible`.
**FloatingCTA.tsx** — Extract from `App.jsx:449-480`. Use `client:visible`.
**TechnicalDecor.tsx** — Extract from `App.jsx:535-590`. Use `client:idle` (non-critical).
**AnimatedCounter.tsx** — Extract from `App.jsx:264-313`. Use `client:visible`.

For each:
- Change `import { motion, ... } from 'framer-motion'` to `import { motion, ... } from 'motion/react'`
- Add appropriate `client:*` directive when used in `.astro` files
- Keep all existing logic and styles

- [ ] **Step 5: Install motion package**

Run:
```bash
cd D:\Swayam\Portfolio
npm install motion
```

This installs the renamed `framer-motion` package (same engine, new name).

- [ ] **Step 6: Update all component imports**

In every `.tsx` file, replace:
```tsx
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
```
with:
```tsx
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';
```

---

### Task 6: Assemble index.astro

**Files:**
- Modify: `D:\Swayam\Portfolio\src\pages\index.astro`

- [ ] **Step 1: Create complete index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero3D from '../components/Hero3D';
import AboutSection from '../components/AboutSection.astro';
import WhatIDoSection from '../components/WhatIDoSection.astro';
import ExperienceSection from '../components/ExperienceSection.astro';
import ProjectSection from '../components/ProjectSection.astro';
import AwardsSection from '../components/AwardsSection.astro';
import CertificationsSection from '../components/CertificationsSection.astro';
import SkillsSection from '../components/SkillsSection.astro';
import ContactSection from '../components/ContactSection.astro';
import SectionDivider from '../components/SectionDivider.astro';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import BackToTop from '../components/BackToTop';
import FloatingCTA from '../components/FloatingCTA';
import TechnicalDecor from '../components/TechnicalDecor';
import BentoGrid from '../components/BentoGrid';
---

<Layout title="Shivanshu Tiwari | Forward Deployed Engineer & AI-Native Builder">
  <ScrollProgress client:load />
  <div class="bg-aurora" />
  <div class="bg-grid-overlay" />
  <ParticleBackground client:only="react" />
  <TechnicalDecor client:idle />

  <Navbar />
  
  <main id="main-content">
    <Hero3D client:load />
    
    <SectionDivider />
    <AboutSection />
    <BentoGrid client:visible />
    
    <SectionDivider />
    <WhatIDoSection />
    
    <SectionDivider />
    <ExperienceSection />
    
    <SectionDivider />
    <ProjectSection />
    
    <SectionDivider />
    <AwardsSection />
    
    <SectionDivider />
    <CertificationsSection />
    
    <SectionDivider />
    <SkillsSection />
    
    <SectionDivider />
    <ContactSection />
  </main>

  <BackToTop client:visible />
  <FloatingCTA client:visible />
</Layout>
```

- [ ] **Step 2: Build and verify**

Run:
```bash
cd D:\Swayam\Portfolio
npm run build
```

Expected: Build succeeds. Check `dist/index.html`:
- All text content present as raw HTML
- `<script>` tags only for React islands (with `client:*` directives)
- No blank screen when viewing without JavaScript

- [ ] **Step 3: Test without JavaScript**

Open `dist/index.html` in a browser with JavaScript disabled (or use DevTools → Disable JavaScript).

Expected: All text content visible. Layout intact. Only interactive features (animations, expand/collapse, scroll effects) missing.

- [ ] **Step 4: Preview production build**

Run:
```bash
cd D:\Swayam\Portfolio
npm run preview
```

Open `http://localhost:4321` and verify:
- Hero loads with 3D animations
- All sections render correctly
- Scroll animations work
- Project cards expand/collapse
- Navbar scrolls correctly
- Back to top appears after scroll
- Floating CTA visible

---

### Task 7: Clean Up and Remove Old Files

**Files:**
- Delete: `D:\Swayam\Portfolio\src\App.jsx`
- Delete: `D:\Swayam\Portfolio\src\main.jsx`
- Delete: `D:\Swayam\Portfolio\src\index.css` (already migrated to global.css)
- Delete: `D:\Swayam\Portfolio\index.html` (replaced by Layout.astro)
- Modify: `D:\Swayam\Portfolio\.gitignore`

- [ ] **Step 1: Remove old React SPA files**

Run:
```bash
cd D:\Swayam\Portfolio
del src\App.jsx
del src\main.jsx
del src\index.css
del index.html
del eslint.config.js
```

- [ ] **Step 2: Update .gitignore**

Add to `.gitignore`:
```
# Astro
.astro/
```

- [ ] **Step 3: Final build verification**

Run:
```bash
cd D:\Swayam\Portfolio
npm run build
```

Expected: Clean build with no errors.

- [ ] **Step 4: Check HTML output for SEO**

Run:
```bash
cd D:\Swayam\Portfolio
cat dist/index.html | head -50
```

Expected: Full HTML content visible — title, meta tags, JSON-LD, all text content.

---

### Task 8: Performance Verification

- [ ] **Step 1: Compare bundle sizes**

Run:
```bash
cd D:\Swayam\Portfolio
npm run build
ls -la dist/assets/
```

Expected: JavaScript bundle significantly smaller than previous 376KB (only React islands shipped, not entire app).

- [ ] **Step 2: Verify HTML-first content**

Run:
```bash
cd D:\Swayam\Portfolio
grep -c "Forward Deployed Engineer" dist/index.html
grep -c "Autonomous Agentic Workflows" dist/index.html
grep -c "Samvad" dist/index.html
```

Expected: All return counts > 0 (content present in raw HTML).

- [ ] **Step 3: Test Lighthouse**

Open Chrome DevTools → Lighthouse → Run audit on `http://localhost:4321`.

Expected scores:
- Performance: 90+ (was likely 50-70 with SPA)
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

- [ ] **Step 4: Verify no blank screen**

Open browser with throttled network (Fast 3G). 

Expected: Content visible immediately (HTML-first), animations load progressively.

---

## Verification Checklist

- [ ] `npm run build` succeeds with no errors
- [ ] `dist/index.html` contains all text content as raw HTML
- [ ] Page renders correctly with JavaScript disabled
- [ ] All React islands hydrate correctly (animations, interactivity)
- [ ] No console errors in browser
- [ ] Lighthouse Performance score 90+
- [ ] Old files (App.jsx, main.jsx, index.css) deleted
- [ ] No references to `framer-motion` (only `motion/react`)
- [ ] No references to `vite` in package.json scripts

## Anti-Pattern Guards

- DO NOT keep `framer-motion` imports — must use `motion/react`
- DO NOT use `className` in `.astro` files — use `class`
- DO NOT use `{children}` in `.astro` files — use `<slot />`
- DO NOT import `.astro` files from `.tsx` files — only `.astro` → `.tsx`
- DO NOT ship entire React app as one island — split into granular islands with appropriate `client:*` directives
- DO NOT use `client:load` for below-fold content — use `client:visible`
- DO NOT keep `vite.config.js` — Astro uses `astro.config.mjs`
