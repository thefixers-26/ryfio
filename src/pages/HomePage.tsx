import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Wrench, Users, Compass, Layers,
  Rocket, Zap, Globe, Flag, Gauge, Quote, Clock, UserCircle,
  Package, FileText, BookOpen, Radio, TrendingUp, Cpu, BadgeCheck, Sparkles,
  Lightbulb, Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';
import { supabase } from '@/integrations/supabase/client';
import { posts, tagStyles, tagLabels, type PostTag } from '@/data/posts';

/* ── Fade-up viewport animation ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' as const },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
});

/* ── Counter hook (animated count-up) ── */
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
};

/* ══════════ DATA ══════════ */

const letters = [
  { char: 'R', word: 'Resilient', color: 'text-primary' },
  { char: 'Y', word: 'Yield', color: 'text-primary' },
  { char: 'F', word: 'Fusion', color: 'text-primary' },
  { char: 'I', word: 'Intelligent', color: 'text-primary' },
  { char: 'O', word: 'Operations', color: 'text-primary' },
];

const helpBullets = [
  { icon: Wrench, title: 'Shared Resources', subtitle: 'RESOURCE CACHE', desc: 'Curated tools, templates, and AI workflows so you never start from zero.', outcome: 'Ship v1 in under 30 days' },
  { icon: Users, title: 'Build Together', subtitle: 'SQUAD LINK', desc: 'Find collaborators, accountability partners, and mentors — while staying independent.', outcome: 'Never build alone again' },
  { icon: Compass, title: 'Trend-Aligned', subtitle: 'SIGNAL SCAN', desc: 'Ongoing guidance rooted in current AI, automation, SaaS, and Industry 4.0 trends.', outcome: 'Spot market gaps early' },
  { icon: Layers, title: 'End-to-End Support', subtitle: 'OPS CONTROL', desc: 'From idea to launch and ongoing operations — we help you design, build, and operate.', outcome: 'Idea → revenue, guided' },
];

/* ── Product Bay data ── */
const products = [
  {
    name: 'RFQ AutoPilot',
    tag: 'MANUFACTURING',
    builtBy: 'RYFIO',
    desc: 'AI agent that automates request-for-quote workflows for small manufacturers and consultancies.',
    metric: '10× faster RFQ response, 0 additional hires',
    status: 'ACTIVE',
    isNew: true,
  },
  {
    name: 'CreatorDash',
    tag: 'CREATOR ECONOMY',
    builtBy: 'WITH RYFIO',
    desc: 'Analytics SaaS for content creators — from signup to revenue insights in a single dashboard.',
    metric: 'First 10 paying users in 48 hours',
    status: 'ACTIVE',
    isNew: true,
  },
  {
    name: 'PredictiveOps',
    tag: 'INDUSTRY 4.0',
    builtBy: 'RYFIO',
    desc: 'IoT monitoring and predictive maintenance bot for small factories using AI playbooks.',
    metric: 'Pilot customers before writing backend code',
    status: 'BETA',
    isNew: false,
  },
  {
    name: 'HireSignal',
    tag: 'RECRUITING',
    builtBy: 'WITH RYFIO',
    desc: 'AI-powered candidate screening pipeline that automates 80% of initial outreach and filtering.',
    metric: '5× faster shortlisting, 60% recruiter time saved',
    status: 'INBOUND',
    isNew: false,
  },
];

const productStatusStyles: Record<string, string> = {
  ACTIVE: 'bg-primary/15 text-primary border-primary/40',
  BETA: 'bg-accent/15 text-accent border-accent/40',
  INBOUND: 'bg-muted text-muted-foreground border-border',
};

/* ── Mission Logs (Use Cases) ── */
const useCases = [
  {
    title: 'AI Agent for RFQ Automation',
    industry: 'MANUFACTURING',
    who: 'Solo consultant',
    metric: '10× faster RFQ response, 0 additional hires',
    log: 'Deployed an AI agent that handles request-for-quote workflows for a one-person factory consultancy — from inbound RFQ to pricing in minutes.',
  },
  {
    title: 'SaaS Dashboard in 48 Hours',
    industry: 'CREATOR ECONOMY',
    who: 'Indie hacker',
    metric: 'First 10 paying users in 48 hours',
    log: 'Shipped a full analytics SaaS for content creators using RYFIO templates — idea to revenue in one weekend.',
  },
  {
    title: 'Predictive Maintenance Bot',
    industry: 'INDUSTRY 4.0',
    who: 'Solopreneur',
    metric: 'Pilot customers before writing backend code',
    log: 'Built an IoT monitoring product for small factories using AI playbooks — landed pilots before a single line of backend code.',
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: 'Solo SaaS Founder, Chennai',
    role: 'Bootstrapped SaaS',
    text: 'RYFIO gave me the playbook I didn\'t know I needed. Shipped my first product in 3 weeks instead of 3 months.',
    avatar: '🚀',
  },
  {
    name: 'AI Automation Builder, Bangalore',
    role: 'Freelance → Product',
    text: 'The community and templates cut my research time in half. Finally felt like I wasn\'t building alone.',
    avatar: '⚡',
  },
  {
    name: 'Industry 4.0 Consultant, Coimbatore',
    role: 'Manufacturing + AI',
    text: 'Signal Scan pointed me to the exact market gap. My first paying client came from a use-case I would never have found solo.',
    avatar: '🎯',
  },
];

/* ── Roadmap ── */
const roadmapPhases = [
  {
    phase: 'PHASE 01', title: 'GENESIS', period: 'Q1 2026', icon: Rocket,
    items: ['Launch RYFIO platform MVP → first 100 operators onboarded', 'Release first AI workflow templates & playbooks', 'Establish founding community channels'],
    status: 'ACTIVE',
    briefing: 'ship-ai-saas-30-days',
    briefingTitle: 'How to Ship an AI SaaS in 30 Days',
  },
  {
    phase: 'PHASE 02', title: 'EXPANSION', period: 'Q2 2026', icon: Zap,
    items: ['AI-powered product ideation tools', 'Mentorship matching system', 'Community collaboration features'],
    status: 'PREP',
    briefing: 'solo-operators-win-ai-2026',
    briefingTitle: 'Where Solo Operators Can Still Win',
  },
  {
    phase: 'PHASE 03', title: 'CONVERGENCE', period: 'Q3–Q4 2026', icon: Globe,
    items: ['Global solopreneur network', 'Industry 4.0 integration toolkit', 'Automated go-to-market playbooks'],
    status: 'PLANNED',
  },
  {
    phase: 'PHASE 04', title: 'SINGULARITY', period: '2027+', icon: Flag,
    items: ['Fully autonomous product launch pipeline', 'Cross-industry AI fusion platform', 'RYFIO becomes the solopreneur OS'],
    status: 'PLANNED',
  },
];

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-primary/15 text-primary border-primary/40',
  PREP: 'bg-primary/10 text-primary/70 border-primary/20',
  PLANNED: 'bg-muted text-muted-foreground border-border',
};

const tagIcons: Record<PostTag, typeof BookOpen> = {
  PLAYBOOK: BookOpen,
  CASE_LOG: FileText,
  SIGNAL_SCAN: Radio,
  MINDSET: Lightbulb,
};

/* ── Waitlist segments ── */
const waitlistSegments = ['Manufacturing', 'SaaS', 'Automation', 'Creator', 'Other'] as const;

/* ══════════ COMPONENT ══════════ */

const HomePage = () => {
  const [typed, setTyped] = useState('');
  const [time, setTime] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSegment, setWaitlistSegment] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { count: animatedVisitors, ref: counterRef } = useCountUp(visitorCount, 2200);
  const fullText = 'Resilient Yield Fusion Intelligent Operations';

  const latestPost = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const daysAgo = Math.floor((Date.now() - new Date(latestPost.date).getTime()) / (1000 * 60 * 60 * 24));

  // Real visitor counter
  useEffect(() => {
    const key = 'ryfio-counted';
    const alreadyCounted = sessionStorage.getItem(key);
    const fetchCount = async () => {
      try {
        const res = await supabase.functions.invoke('visitor-count', {
          body: { method: alreadyCounted ? 'get' : 'increment' },
        });
        if (res.data?.count) {
          setVisitorCount(res.data.count);
          if (!alreadyCounted) sessionStorage.setItem(key, '1');
        }
      } catch {
        setVisitorCount(1276);
      }
    };
    fetchCount();
  }, []);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; } else clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // System clock
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const timeParts = time.split(':');

  // Field notes for home — 2 featured + 2 latest
  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const homePosts = sortedPosts.slice(0, 4);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSubmitted(true);
    sfx.success();
    setTimeout(() => setWaitlistSubmitted(false), 4000);
    setWaitlistEmail('');
    setWaitlistSegment('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    sfx.success();
    setTimeout(() => setNewsletterSubmitted(false), 4000);
    setNewsletterEmail('');
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(186 100% 56% / 0.15), transparent 70%)' }} />
        </div>

        {/* Letter Nodes */}
        <motion.div className="flex gap-2 sm:gap-3 md:gap-5 mb-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {letters.map((l, i) => (
            <motion.div key={l.char} className="letter-node"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}>
              <span className={`font-display text-xl sm:text-3xl md:text-4xl font-bold ${l.color}`}>{l.char}</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs mt-1 font-body">{l.word}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider mb-6 px-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {typed}<span className="animate-pulse">|</span>
        </motion.p>

        <motion.h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-cyan mb-3 glitch-hover leading-tight"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.6 }}>
          BUILD SERIOUS AI PRODUCTS
        </motion.h1>

        <motion.p className="font-display text-base sm:text-lg md:text-xl text-foreground/70 tracking-wide mb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          AS A SINGLE FOUNDER
        </motion.p>

        <motion.p className="text-muted-foreground text-sm sm:text-base mb-6 font-body content-narrow px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          RYFIO helps solopreneurs design, build, and scale AI‑powered operations — starting from India, built for the world.
        </motion.p>

        {/* Mini waitlist capture */}
        <motion.div className="w-full max-w-md px-4 mb-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
          {!waitlistSubmitted ? (
            <form onSubmit={handleWaitlistSubmit} className="glass-card p-3 sm:p-4">
              <p className="font-mono text-[10px] text-primary/70 tracking-widest mb-3 text-center">JOIN THE NEXT OPERATOR BATCH</p>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input !py-2.5 text-sm flex-1"
                />
                <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs flex items-center gap-1.5 justify-center">
                  JOIN <ArrowRight size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {waitlistSegments.map(seg => (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => setWaitlistSegment(seg)}
                    className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                      waitlistSegment === seg
                        ? 'bg-primary/15 text-primary border-primary/40'
                        : 'text-muted-foreground border-border hover:border-primary/30'
                    }`}
                  >
                    {seg}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground/50 text-[9px] font-mono text-center mt-2">What are you building?</p>
            </form>
          ) : (
            <div className="glass-card p-4 text-center glow-subtle">
              <p className="text-primary font-mono text-xs tracking-wider">✓ YOU'RE IN — CHECK YOUR EMAIL</p>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div className="flex flex-col sm:flex-row gap-3 mb-3 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
          <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-primary flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            ENTER COMMAND DECK <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-secondary flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            OPEN UPLINK
          </Link>
        </motion.div>

        {/* Telemetry strip */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
          <div ref={counterRef}
            className="glass-card px-5 py-3 flex items-center gap-3 transition-all duration-300 hover:glow-subtle">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div className="text-left">
              <p className="font-mono text-lg sm:text-xl font-bold text-primary tracking-wider">
                {animatedVisitors.toLocaleString()}
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] text-muted-foreground tracking-widest uppercase">
                Operators briefed
              </p>
            </div>
          </div>

          <div className="glass-card px-4 py-2.5 flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>TN, INDIA — </span>
            <span className="text-primary">
              {timeParts[0]}<span className="blink-colon">:</span>{timeParts[1]}<span className="blink-colon">:</span>{timeParts[2]} IST
            </span>
          </div>
        </motion.div>

        {/* Activity ticker */}
        <motion.p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider mb-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          Last briefing: <span className="text-primary/70">"{latestPost.title}"</span> — updated {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
        </motion.p>

        <motion.div className="absolute bottom-8" animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="text-muted-foreground/50" size={24} />
        </motion.div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="py-5 border-y border-border/30">
        <div className="content-narrow px-4">
          <motion.p className="text-center font-mono text-[10px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase"
            {...fadeUp()}>
            For solo operators in: <span className="text-primary">Manufacturing</span> · <span className="text-primary/70">SaaS</span> · <span className="text-primary">Automation</span> · <span className="text-primary/70">Recruiting</span> · <span className="text-primary">Creator Economy</span> · <span className="text-primary/70">Industry 4.0</span>
          </motion.p>
        </div>
      </section>

      {/* ═══ SYSTEM BRIEFING ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-narrow">
          <motion.div className="glass-card p-6 sm:p-8 md:p-10" {...fadeUp()}>
            <p className="section-label mb-3">// SYSTEM BRIEFING</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[28px] tracking-wide text-primary mb-5">
              WHAT IS RYFIO?
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-3 text-sm sm:text-base">
              <span className="text-primary font-semibold">RYFIO</span> (Resilient Yield Fusion Intelligent Operations) is a platform and community for solopreneurs who want to build serious, end‑to‑end AI products — not side projects — across manufacturing, SaaS, creator tools, automation, and Industry 4.0.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed text-sm sm:text-base mb-5">
              We give you the resources, playbooks, support, and a clear path from <span className="text-primary">idea → revenue</span>. Whether you're launching your first AI product or scaling your operations, RYFIO is your command deck.
            </p>
            {/* What you get bullets */}
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[
                'AI products & agent blueprints',
                'Launch templates & playbooks',
                'Operator community access',
                'Weekly briefings & trend scans',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                  <span className="text-primary text-xs">▸</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SUPPORT MODULES ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide text-center">
          <motion.div {...fadeUp()}>
            <p className="section-label mb-3">// SUPPORT MODULES</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[30px] tracking-wide mb-10">
              HOW WE HELP <span className="text-primary">SOLOPRENEURS</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {helpBullets.map((item, i) => (
              <motion.div key={item.title}
                className="glass-card p-5 sm:p-6 text-left group hover:glow-subtle transition-all duration-300"
                {...fadeUp(i * 0.08)}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-primary/60 tracking-widest mb-0.5">{item.subtitle}</p>
                    <h3 className="font-display text-sm tracking-wide mb-1.5 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-2">{item.desc}</p>
                    <p className="font-mono text-[11px] text-primary/80 tracking-wider">→ {item.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT BAY ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <p className="section-label mb-3">// PRODUCT BAY</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[30px] tracking-wide mb-3">
              PRODUCTS <span className="text-primary">WE BUILD & LAUNCH</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm content-narrow mx-auto">
              RYFIO builds its own AI products <em>and</em> helps business owners launch theirs. Every product here was built by a solo operator.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p, i) => (
              <motion.div key={p.name}
                className="glass-card p-5 sm:p-6 group hover:glow-subtle transition-all duration-300 relative"
                {...fadeUp(i * 0.08)}>
                {p.isNew && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-primary/15 text-primary text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30">
                    <Sparkles size={10} /> NEW
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="tag-badge">{p.tag}</span>
                  <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${productStatusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">
                  {p.builtBy === 'RYFIO' ? '▸ BUILT BY RYFIO' : '▸ BUILT WITH RYFIO'}
                </p>
                <h3 className="font-display text-base sm:text-lg tracking-wide mb-2 text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">{p.desc}</p>
                <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                  <Gauge size={12} className="text-primary" />
                  <p className="font-mono text-[11px] text-primary/80 tracking-wide">{p.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSION LOGS ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <p className="section-label mb-3">// MISSION LOGS</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[30px] tracking-wide">
              REAL <span className="text-primary">USE CASES</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-2 content-narrow mx-auto">
              Concrete, outcome-focused examples of what solopreneurs built using RYFIO.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title}
                className="glass-card p-5 sm:p-6 group hover:glow-subtle transition-all duration-300"
                {...fadeUp(i * 0.1)}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag-badge">{uc.industry}</span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">▸ {uc.who}</p>
                <h3 className="font-display text-sm tracking-wide mb-2 text-foreground">{uc.title}</h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed mb-3">{uc.log}</p>
                <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                  <Gauge size={12} className="text-primary" />
                  <p className="font-mono text-[11px] text-primary/80 tracking-wide">{uc.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRANSMISSION LOGS (Testimonials) ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <p className="section-label mb-3">// TRANSMISSION LOGS</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[30px] tracking-wide">
              FROM THE <span className="text-primary">OPERATORS</span>
            </h2>
          </motion.div>

          {/* Desktop: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                className="glass-card p-5 sm:p-6 hover:glow-subtle transition-all duration-300"
                {...fadeUp(i * 0.1)}>
                <Quote size={14} className="text-primary/40 mb-3" />
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">"{t.text}"</p>
                <div className="border-t border-border/50 pt-3 flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="font-mono text-xs text-primary">{t.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div className="md:hidden">
            <motion.div className="glass-card p-6" {...fadeUp()}>
              <Quote size={14} className="text-primary/40 mb-3" />
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">"{testimonials[activeTestimonial].text}"</p>
              <div className="border-t border-border/50 pt-3 flex items-center gap-3">
                <span className="text-2xl">{testimonials[activeTestimonial].avatar}</span>
                <div>
                  <p className="font-mono text-xs text-primary">{testimonials[activeTestimonial].name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FIELD NOTES & AI BRIEFINGS ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <p className="section-label">// SIGNAL ARCHIVE</p>
              <span className="bg-primary/15 text-primary text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30 animate-pulse">
                NEW
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-[30px] tracking-wide mb-3">
              FIELD NOTES & <span className="text-primary">AI BRIEFINGS</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm content-narrow mx-auto">
              Playbooks, case logs, and signal scans — everything you need to stay sharp and ship faster.
            </p>
            <p className="text-primary/50 font-mono text-[10px] tracking-wider mt-2">
              Updated weekly — 1–2 new AI briefings for solo operators.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homePosts.map((post, i) => {
              const Icon = tagIcons[post.tag];
              return (
                <motion.div key={post.slug}
                  className="glass-card p-5 sm:p-6 group hover:glow-subtle transition-all duration-300 flex flex-col relative"
                  {...fadeUp(i * 0.08)}>
                  {post.featured && (
                    <span className="absolute top-3 right-3 bg-primary/15 text-primary text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30">
                      ★ START HERE
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${tagStyles[post.tag]}`}>
                      {tagLabels[post.tag]}
                    </span>
                    <span className="text-muted-foreground text-[10px] font-mono flex items-center gap-1">
                      <Clock size={9} /> {post.readTime}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <h3 className="font-display text-sm tracking-wide mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed mb-4 flex-1">{post.summary}</p>
                  <div className="space-y-1.5 pt-2 border-t border-border/50">
                    <span className="font-mono text-[11px] text-primary/70 tracking-wider group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                      READ BRIEFING <ArrowRight size={11} />
                    </span>
                    {post.relatedProduct && (
                      <span className="font-mono text-[10px] text-muted-foreground/50 tracking-wider block">
                        Next step: {post.relatedProduct}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="text-center mt-6" {...fadeUp(0.3)}>
            <Link to="/field-notes" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="text-primary font-mono text-xs tracking-widest hover:underline inline-flex items-center gap-1">
              VIEW ALL BRIEFINGS <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-wide">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <p className="section-label mb-3">// TRAJECTORY</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
              THE <span className="text-gradient-cyan">ROADMAP</span>
            </h2>
            <p className="text-muted-foreground font-body mt-3 content-narrow mx-auto text-sm sm:text-base">
              Our staged launch sequence for the RYFIO solopreneur OS.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="absolute left-4 sm:left-6 top-0 w-px bg-primary/60"
              style={{ height: '25%' }} />

            <div className="space-y-6 sm:space-y-8">
              {roadmapPhases.map((phase, i) => (
                <motion.div key={phase.phase} className="relative pl-12 sm:pl-16"
                  {...fadeUp(i * 0.1)}>
                  <div className={`absolute left-2.5 sm:left-4 top-5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all ${
                    phase.status === 'ACTIVE'
                      ? 'border-primary bg-primary shadow-[0_0_12px_hsl(186_100%_56%_/_0.5)]'
                      : phase.status === 'PREP'
                        ? 'border-primary/40 bg-primary/20'
                        : 'border-muted-foreground/40 bg-background'
                  }`} />
                  <div className={`glass-card p-5 sm:p-6 transition-all duration-300 ${
                    phase.status === 'ACTIVE' ? 'glow-subtle' : ''
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <phase.icon className="text-primary" size={18} />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground">{phase.phase}</span>
                        <h3 className="font-display text-base sm:text-lg tracking-wide">{phase.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 sm:ml-auto">
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${statusStyles[phase.status]}`}>
                          {phase.status}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">{phase.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5 ml-0 sm:ml-8">
                      {phase.items.map((item) => (
                        <li key={item} className="text-muted-foreground text-sm font-body flex items-start gap-2">
                          <span className="text-primary mt-1 text-xs">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* Recommended briefing */}
                    {phase.briefing && (
                      <div className="mt-3 ml-0 sm:ml-8 flex items-center gap-1.5">
                        <BookOpen size={11} className="text-primary/50" />
                        <Link to="/field-notes" className="font-mono text-[10px] text-primary/50 tracking-wider hover:text-primary transition-colors">
                          Related: {phase.briefingTitle}
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER NOTE ═══ */}
      <section className="py-10 px-4">
        <div className="content-narrow text-center">
          <motion.div {...fadeUp()}>
            <p className="section-label mb-3">// FOUNDER TRANSMISSION</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-2">
              RYFIO is being built in public from Coimbatore, India. We believe every solopreneur deserves the same firepower as a funded startup.
            </p>
            <p className="text-muted-foreground/60 font-mono text-[10px] tracking-wider mb-4">
              Built in public from Coimbatore, TN — From India to the world 🇮🇳
            </p>
            <Link to="/founder" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="text-primary font-mono text-xs tracking-widest hover:underline inline-flex items-center gap-1">
              READ THE FOUNDER'S LOG <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-10 px-4">
        <div className="content-narrow">
          <motion.div className="glass-card p-6 sm:p-8 text-center" {...fadeUp()}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail size={16} className="text-primary" />
              <p className="section-label">RYFIO SIGNAL</p>
            </div>
            <p className="text-muted-foreground font-body text-sm mb-4 max-w-md mx-auto">
              Weekly briefings for solo operators — playbooks, trend scans, and operator dispatches. No spam, just ops and AI.
            </p>
            {!newsletterSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input !py-2.5 text-sm flex-1"
                />
                <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs">
                  SUBSCRIBE
                </button>
              </form>
            ) : (
              <p className="text-primary font-mono text-xs tracking-wider">✓ SUBSCRIBED — FIRST DISPATCH INCOMING</p>
            )}
            <p className="text-muted-foreground/40 font-mono text-[9px] mt-2 tracking-wider">Max 1–2 emails per month</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="content-narrow text-center">
          <motion.div className="glass-card p-8 sm:p-10 glow-subtle"
            {...fadeUp()}>
            <p className="section-label mb-3">// INITIATE UPLINK</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-[28px] tracking-wide mb-4">
              READY TO <span className="text-primary">JOIN THE MISSION</span>?
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-4 max-w-md mx-auto">
              Whether you're shipping your first product or scaling your tenth, RYFIO is your command deck.
            </p>
            <p className="text-muted-foreground font-body text-xs mb-6 max-w-sm mx-auto">
              Use RYFIO's platform and templates. Co‑build products with the team. Get help integrating AI into your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
                className="btn-primary flex items-center gap-2 justify-center min-h-[48px]">
                ENTER COMMAND DECK <ArrowRight size={16} />
              </Link>
              <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
                className="btn-secondary flex items-center gap-2 justify-center min-h-[48px]">
                OPEN UPLINK
              </Link>
            </div>
            <p className="text-muted-foreground/50 font-mono text-[10px] tracking-wider">
              Prefer to lurk first? <Link to="/field-notes" className="text-primary hover:underline">Read this week's briefing</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
