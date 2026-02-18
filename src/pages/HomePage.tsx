import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Wrench, Users, Compass, Layers, Rocket, Zap, Globe, Flag, Radio, Activity, MapPin, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';

/* ── Counter hook (animated count-up) ── */
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
};

/* ── Data ── */
const roadmapPhases = [
  {
    phase: 'PHASE 01', title: 'GENESIS', period: 'Q1 2026', icon: Rocket, color: 'primary',
    items: ['Launch RYFIO platform MVP → first 100 operators onboarded', 'Release first AI workflow templates & playbooks', 'Establish founding community channels'],
    status: 'ACTIVE',
  },
  {
    phase: 'PHASE 02', title: 'EXPANSION', period: 'Q2 2026', icon: Zap, color: 'secondary',
    items: ['AI-powered product ideation tools', 'Mentorship matching system', 'Community collaboration features'],
    status: 'PREP',
  },
  {
    phase: 'PHASE 03', title: 'CONVERGENCE', period: 'Q3–Q4 2026', icon: Globe, color: 'accent',
    items: ['Global solopreneur network', 'Industry 4.0 integration toolkit', 'Automated go-to-market playbooks'],
    status: 'PLANNED',
  },
  {
    phase: 'PHASE 04', title: 'SINGULARITY', period: '2027+', icon: Flag, color: 'primary',
    items: ['Fully autonomous product launch pipeline', 'Cross-industry AI fusion platform', 'RYFIO becomes the solopreneur OS'],
    status: 'PLANNED',
  },
];

const letters = [
  { char: 'R', word: 'Resilient', color: 'text-primary' },
  { char: 'Y', word: 'Yield', color: 'text-secondary' },
  { char: 'F', word: 'Fusion', color: 'text-primary' },
  { char: 'I', word: 'Intelligent', color: 'text-accent' },
  { char: 'O', word: 'Operations', color: 'text-secondary' },
];

const fullText = 'Resilient Yield Fusion Intelligent Operations';

const helpBullets = [
  { icon: Wrench, title: 'Shared Resources', subtitle: 'Resource Cache', desc: 'Curated tools, templates, and AI workflows so you never start from zero.' },
  { icon: Users, title: 'Build Together', subtitle: 'Squad Link', desc: 'Find collaborators, accountability partners, and mentors while staying a solopreneur.' },
  { icon: Compass, title: 'Trend-Aligned', subtitle: 'Signal Scan', desc: 'Guidance rooted in current industry trends — AI, automation, SaaS, creator economy, Industry 4.0.' },
  { icon: Layers, title: 'End-to-End Support', subtitle: 'Ops Control', desc: 'From idea to launch, we help you design, build, and operate your products.' },
];

const useCases = [
  {
    title: 'AI Agent for RFQ Automation',
    industry: 'Manufacturing',
    log: 'Solo consultant deploys an AI agent that handles request-for-quote workflows for a one-person factory consultancy — 10× faster response times, zero extra hires.',
  },
  {
    title: 'SaaS Dashboard in 48 Hours',
    industry: 'Creator Economy',
    log: 'Indie hacker ships a full analytics SaaS for content creators using RYFIO templates — from idea to paying users in one weekend.',
  },
  {
    title: 'Predictive Maintenance Bot',
    industry: 'Industry 4.0',
    log: 'Solopreneur builds an IoT monitoring product for small factories using AI playbooks — lands pilot customers before writing a single line of backend code.',
  },
];

const testimonials = [
  {
    name: 'OPERATOR_01',
    role: 'Solo SaaS Founder',
    text: 'RYFIO gave me the playbook I didn\'t know I needed. Shipped my first product in 3 weeks instead of 3 months.',
  },
  {
    name: 'OPERATOR_02',
    role: 'AI Automation Builder',
    text: 'The community and templates cut my research time in half. Finally felt like I wasn\'t building alone.',
  },
  {
    name: 'OPERATOR_03',
    role: 'Industry 4.0 Consultant',
    text: 'Signal Scan pointed me to the exact market gap. My first paying client came from a use-case I would never have found solo.',
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-primary/20 text-primary border-primary/40',
  PREP: 'bg-secondary/20 text-secondary border-secondary/40',
  PLANNED: 'bg-muted text-muted-foreground border-border',
};

const HomePage = () => {
  const [typed, setTyped] = useState('');
  const [time, setTime] = useState('');

  // Simulated visitor counter (session-incremented seed)
  const visitorBase = 1276;
  const sessionBump = (() => {
    const key = 'ryfio-vc';
    const stored = sessionStorage.getItem(key);
    if (stored) return parseInt(stored, 10);
    const bump = Math.floor(Math.random() * 40) + 1;
    sessionStorage.setItem(key, String(bump));
    return bump;
  })();
  const visitorCount = visitorBase + sessionBump;
  const { count: animatedVisitors, ref: counterRef } = useCountUp(visitorCount, 2200);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; } else clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
        {/* Letter Nodes */}
        <motion.div className="flex gap-2 sm:gap-3 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {letters.map((l, i) => (
            <motion.div key={l.char} className="letter-node"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: '0 0 30px hsl(184 100% 50% / 0.4)' }}>
              <span className={`font-display text-xl sm:text-3xl md:text-4xl font-bold ${l.color}`}>{l.char}</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs mt-1 font-body">{l.word}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Typing effect */}
        <motion.p className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground tracking-wider mb-6 px-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          {typed}<span className="animate-pulse">|</span>
        </motion.p>

        {/* Hero headline */}
        <motion.h1 className="section-title text-gradient-cyan mb-4 glitch-hover text-2xl sm:text-4xl md:text-5xl lg:text-6xl px-2"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.6 }}>
          BUILD SERIOUS AI PRODUCTS
        </motion.h1>
        <motion.h2 className="font-display text-lg sm:text-xl md:text-2xl text-foreground/80 tracking-wider mb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          AS A SINGLE FOUNDER
        </motion.h2>

        {/* Sub-headline */}
        <motion.p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 font-body max-w-2xl px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
          A platform that helps solo founders deploy serious AI products across real industries — from SaaS dashboards to Industry 4.0 shopfloors.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
          <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-cyan flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            ENTER COMMAND DECK <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-orange flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            OPEN UPLINK
          </Link>
        </motion.div>

        {/* ── Telemetry strip: visitor counter + location ── */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
          {/* Visitor counter card */}
          <div ref={counterRef}
            className="glass-card px-5 py-3 flex items-center gap-3 border-primary/30 hover:glow-cyan transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div className="text-left">
              <p className="font-mono text-lg sm:text-xl font-bold text-primary tracking-wider">
                {animatedVisitors.toLocaleString()}
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] text-muted-foreground tracking-widest uppercase">
                Solopreneurs briefed in this sector
              </p>
            </div>
          </div>

          {/* System time */}
          <div className="glass-card px-4 py-2 flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            TN, INDIA — SYSTEM TIME {time} IST
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="text-muted-foreground" size={24} />
        </motion.div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="py-6 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p className="text-center font-mono text-[10px] sm:text-xs text-muted-foreground tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            For solo operators in: <span className="text-primary">Manufacturing</span> · <span className="text-secondary">SaaS</span> · <span className="text-accent">Automation</span> · <span className="text-primary">Recruiting</span> · <span className="text-secondary">Creator Economy</span> · <span className="text-accent">Finance</span>
          </motion.p>
        </div>
      </section>

      {/* ═══ WHAT IS RYFIO — SYSTEM BRIEFING ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div className="glass-card p-6 sm:p-8 md:p-12 hover:glow-cyan transition-all duration-500"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-header mb-3">// SYSTEM BRIEFING</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider text-primary mb-6">
              WHAT IS RYFIO?
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              <span className="text-primary font-semibold">RYFIO</span> (Resilient Yield Fusion Intelligent Operations) is a platform and community for solopreneurs who want to build serious, end‑to‑end AI products across modern industries — from manufacturing and operations to SaaS, creator tools, and automation.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              We bring solo founders, creators, and indie hackers together, give them resources, playbooks, and support, and help them ship real products — not just side projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SUPPORT MODULES ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-header mb-3">// SUPPORT MODULES</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider mb-12">
              HOW WE HELP <span className="text-primary">SOLOPRENEURS</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {helpBullets.map((item, i) => (
              <motion.div key={item.title}
                className="glass-card p-6 text-left hover:glow-cyan transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <item.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="font-mono text-[10px] text-secondary tracking-widest mb-1">{item.subtitle}</p>
                <h3 className="font-display text-sm tracking-[0.12em] mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSION LOGS (Use Cases) ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-header mb-3">// MISSION LOGS</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider">
              REAL <span className="text-primary">USE CASES</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title}
                className="glass-card p-6 hover:glow-cyan transition-all duration-300 border-l-2 border-l-primary/50"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={14} className="text-primary" />
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">{uc.industry}</span>
                </div>
                <h3 className="font-display text-sm tracking-wider mb-3">{uc.title}</h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed">{uc.log}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRANSMISSION LOGS (Social Proof) ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-header mb-3">// TRANSMISSION LOGS</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider">
              FROM THE <span className="text-primary">OPERATORS</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                className="glass-card p-6 hover:glow-purple transition-all duration-300"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}>
                <Quote size={16} className="text-accent mb-3 opacity-60" />
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="border-t border-border pt-3">
                  <p className="font-mono text-xs text-primary">{t.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-header mb-4">// TRAJECTORY</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
              THE <span className="text-gradient-cyan">ROADMAP</span>
            </h2>
            <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Our roadmap is a staged launch sequence for the RYFIO solopreneur OS.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8 sm:space-y-12">
              {roadmapPhases.map((phase, i) => (
                <motion.div key={phase.phase} className="relative pl-12 sm:pl-16"
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
                  <div className={`absolute left-2.5 sm:left-4 top-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                    phase.status === 'ACTIVE'
                      ? 'border-primary bg-primary animate-pulse'
                      : 'border-muted-foreground bg-background'
                  }`} />
                  <div className={`glass-card p-5 sm:p-6 transition-all duration-300 ${
                    phase.status === 'ACTIVE' ? 'glow-cyan border-primary/40' : 'hover:glow-cyan'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <phase.icon className={`text-${phase.color}`} size={20} />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-mono text-xs text-muted-foreground">{phase.phase}</span>
                        <h3 className="font-display text-base sm:text-lg tracking-wider">{phase.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 sm:ml-auto">
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${statusColors[phase.status]}`}>
                          {phase.status}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">{phase.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5 ml-0 sm:ml-9">
                      {phase.items.map((item) => (
                        <li key={item} className="text-muted-foreground text-sm font-body flex items-start gap-2">
                          <span className={`text-${phase.color} mt-1 text-xs`}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER NOTE ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-header mb-3">// FOUNDER TRANSMISSION</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              RYFIO is being built in public from Coimbatore, India. We believe every solopreneur deserves the same firepower as a funded startup — and we're building the platform to make that real.
            </p>
            <Link to="/founder" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="text-primary font-mono text-xs tracking-widest hover:underline inline-flex items-center gap-1">
              READ THE FOUNDER'S LOG <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div className="glass-card p-8 sm:p-12 glow-cyan border-primary/30"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-header mb-3">// INITIATE UPLINK</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider mb-4">
              READY TO <span className="text-primary">JOIN THE MISSION</span>?
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto">
              Whether you're shipping your first product or scaling your tenth, RYFIO is your command deck.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
                className="btn-cyan flex items-center gap-2 justify-center min-h-[48px]">
                ENTER COMMAND DECK <ArrowRight size={16} />
              </Link>
              <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
                className="btn-orange flex items-center gap-2 justify-center min-h-[48px]">
                OPEN UPLINK
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
