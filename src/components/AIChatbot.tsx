import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const knowledgeBase = [
  {
    keywords: ['forward deployed', 'engineer', 'what do you do', 'what are you', 'your role', 'job title', 'position'],
    response: "I'm a Forward Deployed Engineer & AI-Native Builder. I bridge the gap between product development and real-world deployment, specializing in Autonomous Agentic Workflows, Voice AI, and LLM Pipelines. I build AI-native products that ship directly to production."
  },
  {
    keywords: ['project', 'built', 'made', 'work', 'portfolio', 'github'],
    response: "I've built 7 production-grade projects:\n\n1. **Samvad** — Voice AI Meeting Agent (FastAPI, Gemini, Sarvam AI)\n2. **Agentic Honey-Pot** — Autonomous scam detection agent\n3. **Call Center Compliance API** — Audio pipeline for audits\n4. **EchoPay** — Offline P2P payments via audio (48hr hackathon winner)\n5. **Multilingual Mandi** — Agricultural trading platform\n6. **AI Email Agent** — Local-first inbox automation\n7. **OpenENV** — Cloud security audit environment\n\nAll deployed with 99%+ uptime."
  },
  {
    keywords: ['samvad', 'voice', 'meeting', 'transcri'],
    response: "Samvad is a real-time Voice AI Meeting Agent built with FastAPI, Gemini, and Sarvam AI. It transcribes meetings, detects voice commands, and auto-generates intelligence reports. Features persistent Redis memory, PostgreSQL storage, and 99%+ uptime with sub-2s AI response latency."
  },
  {
    keywords: ['honeypot', 'honey-pot', 'scam', 'fraud', 'agentic'],
    response: "Agentic Honey-Pot is an autonomous AI-Agent that engages scammers to extract adversarial intelligence without human intervention. Built with FastAPI, Gemini AI, and Docker on Railway. Increased extraction accuracy from 60% to 90% through semantic classification pipelines. 99%+ uptime."
  },
  {
    keywords: ['echopay', 'payment', 'offline', 'audio', 'hackathon', '48 hour'],
    response: "EchoPay is an audio-powered offline P2P payment system using high-frequency sound (18-22kHz). Built from idea to MVP in under 48 hours during the MLBhopal GenAI Hackathon — won Runner-up! Features custom Kotlin MFSK engine, Goertzel algorithm decoding, HMAC-SHA256 security, and 70% speed optimization."
  },
  {
    keywords: ['skill', 'tech', 'technology', 'stack', 'know', 'language', 'framework', 'tool'],
    response: "My tech stack:\n\n**AI/ML:** LangChain, LangGraph, CrewAI, OpenAI API, Gemini API, LlamaIndex, Sarvam AI\n\n**Backend:** Python, FastAPI, Node.js, Express.js, PostgreSQL, Redis, SQLite\n\n**Frontend:** React, Next.js, TypeScript, JavaScript\n\n**Infrastructure:** Docker, AWS/GCP, Vercel, Railway, Hugging Face Spaces, GitHub Actions\n\n**Other:** Kotlin, C++, SQL, HTML/CSS"
  },
  {
    keywords: ['experience', 'work', 'job', 'company', 'blue planet', 'intern'],
    response: "I was Engineering Intern & Team Lead at Blue Planet Infosolutions India Pvt. Ltd. (Aug 2025 - Feb 2026). I directed a 10-person cross-functional team in a remote Agile environment, architected modular Android components (30% memory improvement), introduced Agile practices, and mentored 5 junior developers."
  },
  {
    keywords: ['education', 'college', 'university', 'degree', 'study', 'sagar', 'bhopal', 'gpa'],
    response: "I'm pursuing B.Tech in Computer Science & Information Technology at Sagar Institute of Research & Technology, Bhopal (2023-2027). GPA: 7.64/10.00. Coursework: DSA, OOP, DBMS, OS. Also certified in Blockchain (IIT Kharagpur/NPTEL) and Python Programming (AICTE/Robokwik)."
  },
  {
    keywords: ['award', 'hackathon', 'winner', 'runner', 'prize', 'recognition'],
    response: "I've won 3 hackathon awards:\n\n1. **MLBhopal GenAI Hackathon 2025** — Runner-up (EchoPay in 48hrs)\n2. **GUVI India AI Impact Buildathon 2026** — Delivered production-grade scam detection agent\n3. **OpenENV Cloud Security Hackathon 2026** — Built security audit environment on Hugging Face Spaces"
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'available', 'open', 'work together', 'collaborate', 'talk'],
    response: "I'm currently available for opportunities!\n\n📧 Email: sht4bharat@gmail.com\n📱 Phone: +91 7509410237\n📍 Location: Bhopal, India (Remote / Open to Relocation)\n\nI'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Scroll down to the contact section or email me directly!"
  },
  {
    keywords: ['mvp', 'speed', 'fast', 'quick', 'rapid', 'prototype', 'build time'],
    response: "I specialize in rapid prototyping — idea to production in days, not weeks. My fastest: EchoPay built in 48 hours (hackathon winner). I've shipped 7 production projects, most deployed with 99%+ uptime. My approach: build fast, iterate faster, deploy immediately."
  },
  {
    keywords: ['langchain', 'langgraph', 'crewai', 'agent', 'autonomous', 'agentic', 'ai agent'],
    response: "I specialize in AI Agent Orchestration using LangChain, LangGraph, and CrewAI. I've built autonomous agents that engage scammers (Honey-Pot), transcribe meetings (Samvad), and categorize emails. My agents run unattended, handle real-world data, and have persistent memory systems."
  },
  {
    keywords: ['location', 'where', 'based', 'india', 'bhopal', 'remote', 'relocate'],
    response: "I'm based in Bhopal, Madhya Pradesh, India. I'm fully remote-ready and open to relocation for the right opportunity. I've worked remotely with a 10-person team at Blue Planet Infosolutions in a distributed Agile environment."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    response: "Hey there! 👋 I'm Shivanshu Tiwari, a Forward Deployed Engineer & AI-Native Builder. Ask me about my projects, skills, experience, or anything else. I'm here to help!"
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    response: "You're welcome! If you have any more questions, feel free to ask. I'm always happy to chat about AI, engineering, or potential collaborations. 🚀"
  },
  {
    keywords: ['salary', 'compensation', 'rate', 'pay', 'cost', 'price', 'charge'],
    response: "I'm currently seeking opportunities and open to discussing compensation based on the role and project scope. Feel free to reach out via email at sht4bharat@gmail.com to discuss specifics!"
  }
];

const defaultResponse = "That's an interesting question! I'm specialized in AI engineering, autonomous agents, and rapid prototyping. Try asking about my projects, skills, experience, or how I can help your startup. You can also email me at sht4bharat@gmail.com for detailed discussions.";

function findBestMatch(input) {
  const lowerInput = input.toLowerCase();
  const words = lowerInput.split(/\s+/);
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const item of knowledgeBase) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (lowerInput.includes(keyword)) {
        score += keyword.split(' ').length * 2;
      } else {
        const keywordWords = keyword.split(' ');
        for (const word of keywordWords) {
          if (words.includes(word)) {
            score += 1;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }
  
  return bestMatch && bestScore >= 2 ? bestMatch.response : defaultResponse;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Shivanshu's AI assistant. Ask me about his projects, skills, experience, or anything else. I'm trained on his portfolio data!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = findBestMatch(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat assistant'}
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '24px',
          zIndex: 999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gradient-aurora)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(var(--accent-primary-rgb), 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '24px',
              zIndex: 999,
              width: 'min(400px, calc(100vw - 48px))',
              height: 'min(550px, calc(100vh - 140px))',
              borderRadius: '24px',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="white" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Shivanshu's AI Assistant</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-dim)' }}>Trained on portfolio data</p>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: msg.role === 'bot' ? 'var(--gradient-aurora)' : 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {msg.role === 'bot' ? <Bot size={14} color="white" /> : <User size={14} color="var(--text-main)" />}
                  </div>
                  <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? 'var(--accent-primary)' : 'rgba(var(--accent-primary-rgb), 0.08)', color: msg.role === 'user' ? 'white' : 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={14} color="white" />
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'rgba(var(--accent-primary-rgb), 0.08)', fontSize: '0.9rem' }}>
                    <span style={{ animation: 'typing 1.5s infinite' }}>...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, experience..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(var(--accent-primary-rgb), 0.05)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: input.trim() ? 'var(--accent-primary)' : 'var(--glass-border)',
                  border: 'none',
                  color: 'white',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
