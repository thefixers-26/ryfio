import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Wrench, Users, Compass, Layers,
  Gauge, Quote, Clock, Mail, Sparkles, Target, Eye,
  BookOpen, FileText, Radio, Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';
import { supabase } from '@/integrations/supabase/client';
import { posts, tagStyles, tagLabels, type PostTag } from '@/data/posts';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' as const },
  transition: { delay, duration: 0.4, ease: 'easeOut' as const },
});

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

const letters = [
  { char: 'R', word: 'Resilient', color: 'text-primary' },
  { char: 'Y', word: 'Yield', color: 'text-primary' },
  { char: 'F', word: 'Fusion', color: 'text-primary' },
  { char: 'I', word: 'Intelligent', color: 'text-primary' },
  { char: 'O', word: 'Operations', color: 'text-primary' },
];

const products = [
  { name: 'RFQ AutoPilot', tag: 'MANUFACTURING', desc: 'AI agent that automates RFQ workflows for manufacturers.', metric: '10× faster RFQ response', isNew: true },
  { name: 'CreatorDash', tag: 'CREATOR ECONOMY', desc: 'Analytics SaaS for content creators — signup to revenue in one dashboard.', metric: '10 paying users in 48 hours', isNew: true },
  { name: 'PredictiveOps', tag: 'INDUSTRY 4.0', desc: 'IoT monitoring and predictive maintenance for small factories.', metric: 'Pilots before backend code', isNew: false },
  { name: 'HireSignal', tag: 'RECRUITING', desc: 'AI-powered candidate screening that automates 80% of filtering.', metric: '60% recruiter time saved', isNew: false },
];

const testimonials = [
  { name: 'Solo SaaS Founder, Chennai', text: 'Shipped my first product in 3 weeks instead of 3 months.', avatar: '🚀' },
  { name: 'AI Builder, Bangalore', text: 'Templates cut my research time in half. Finally not building alone.', avatar: '⚡' },
  { name: 'Industry 4.0, Coimbatore', text: 'Signal Scan pointed me to the exact market gap. First paying client came from it.', avatar: '🎯' },
];

const tagIcons: Record<PostTag, typeof BookOpen> = {
  PLAYBOOK: BookOpen, CASE_LOG: FileText, SIGNAL_SCAN: Radio, MINDSET: Lightbulb,
};

const waitlistSegments = ['Manufacturing', 'SaaS', 'Automation', 'Creator', 'Other'] as const;

const HomePage = () => {
  const [typed, setTyped] = useState('');
  const [time, setTime] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSegment, setWaitlistSegment] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { count: animatedVisitors, ref: counterRef } = useCountUp(visitorCount, 2200);
  const fullText = 'Resilient Yield Fusion Intelligent Operations';

  const latestPost = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const daysAgo = Math.floor((Date.now() - new Date(latestPost.date).getTime()) / (1000 * 60 * 60 * 24));
  const homePosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);

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
      } catch { setVisitorCount(1276); }
    };
    fetchCount();
  }, []);

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

  const timeParts = time.split(':');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSubmitted(true);
    sfx.success();
    setTimeout(() => setWaitlistSubmitted(false), 4000);
    setWaitlistEmail(''); setWaitlistSegment('');
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
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(186 100% 56% / 0.15), transparent 70%)' }} />
        </div>

        <motion.div className="flex gap-2 sm:gap-4 mb-8"
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

        <motion.p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {typed}<span className="animate-pulse">|</span>
        </motion.p>

        <motion.h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-cyan mb-3 glitch-hover leading-tight"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.6 }}>
          BUILD SERIOUS AI PRODUCTS
        </motion.h1>

        <motion.p className="font-display text-base sm:text-lg text-foreground/70 tracking-wide mb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          AS A SINGLE FOUNDER
        </motion.p>

        <motion.p className="text-muted-foreground text-sm sm:text-base mb-6 font-body max-w-lg px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          RYFIO helps solopreneurs design, build, and scale AI‑powered products — from India to the world.
        </motion.p>

        {/* Waitlist */}
        <motion.div className="w-full max-w-md px-4 mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
          {!waitlistSubmitted ? (
            <form onSubmit={handleWaitlistSubmit} className="glass-card p-3 sm:p-4">
              <p className="font-mono text-[10px] text-primary/70 tracking-widest mb-3 text-center">JOIN THE NEXT OPERATOR BATCH</p>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input type="email" required value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)}
                  placeholder="your@email.com" className="form-input !py-2.5 text-sm flex-1" />
                <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs flex items-center gap-1.5 justify-center">
                  JOIN <ArrowRight size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {waitlistSegments.map(seg => (
                  <button key={seg} type="button" onClick={() => setWaitlistSegment(seg)}
                    className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                      waitlistSegment === seg ? 'bg-primary/15 text-primary border-primary/40' : 'text-muted-foreground border-border hover:border-primary/30'
                    }`}>{seg}</button>
                ))}
              </div>
            </form>
          ) : (
            <div className="glass-card p-4 text-center glow-subtle">
              <p className="text-primary font-mono text-xs tracking-wider">✓ YOU'RE IN — CHECK YOUR EMAIL</p>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div className="flex gap-3 mb-4 px-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
          <Link to="/join" onClick={sfx.click} className="btn-primary flex items-center gap-2 min-h-[48px]">
            ENTER COMMAND DECK <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={sfx.click} className="btn-secondary flex items-center gap-2 min-h-[48px]">
            OPEN UPLINK
          </Link>
        </motion.div>

        {/* Status strip */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-3 mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
          <div ref={counterRef} className="glass-card px-5 py-3 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div className="text-left">
              <p className="font-mono text-lg font-bold text-primary tracking-wider">{animatedVisitors.toLocaleString()}</p>
              <p className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">Operators briefed</p>
            </div>
          </div>
          <div className="glass-card px-4 py-2.5 flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>TN, INDIA — </span>
            <span className="text-primary">{timeParts[0]}<span className="blink-colon">:</span>{timeParts[1]}<span className="blink-colon">:</span>{timeParts[2]} IST</span>
          </div>
        </motion.div>

        <motion.p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider mb-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          Last briefing: <span className="text-primary/70">"{latestPost.title}"</span> — {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
        </motion.p>

        <motion.div className="absolute bottom-8" animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <ChevronDown className="text-muted-foreground/50" size={24} />
        </motion.div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp()}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
              Why <span className="text-primary">RYFIO</span> Exists
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div className="glass-card p-6 sm:p-8" {...fadeUp(0.1)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-xl tracking-wide text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Empower solo founders to build serious, revenue-generating AI products — not side projects — with the same tools and support a funded startup gets.
              </p>
            </motion.div>

            <motion.div className="glass-card p-6 sm:p-8" {...fadeUp(0.15)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-xl tracking-wide text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                A world where one person with the right system can build, launch, and scale an AI business — from anywhere, starting from India.
              </p>
            </motion.div>
          </div>

          {/* What you get */}
          <motion.div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3" {...fadeUp(0.2)}>
            {[
              { icon: Wrench, label: 'Templates & Playbooks' },
              { icon: Users, label: 'Operator Community' },
              { icon: Compass, label: 'Trend & Signal Scans' },
              { icon: Layers, label: 'End-to-End Support' },
            ].map(item => (
              <div key={item.label} className="glass-card p-4 text-center">
                <item.icon className="text-primary mx-auto mb-2" size={20} />
                <p className="text-muted-foreground text-xs font-body">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
              Products <span className="text-primary">We Build</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Built by solo operators using RYFIO.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p, i) => (
              <motion.div key={p.name} className="glass-card p-5 group hover:glow-subtle transition-all duration-300 relative" {...fadeUp(i * 0.08)}>
                {p.isNew && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-primary/15 text-primary text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30">
                    <Sparkles size={10} /> NEW
                  </span>
                )}
                <span className="tag-badge mb-3 inline-block">{p.tag}</span>
                <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-primary transition-colors mb-1.5">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{p.desc}</p>
                <div className="flex items-center gap-1.5 pt-2 border-t border-border/50">
                  <Gauge size={12} className="text-primary" />
                  <p className="font-mono text-[11px] text-primary/80 tracking-wide">{p.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
              From the <span className="text-primary">Operators</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="glass-card p-5" {...fadeUp(i * 0.08)}>
                <Quote size={14} className="text-primary/40 mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="border-t border-border/50 pt-3 flex items-center gap-3">
                  <span className="text-xl">{t.avatar}</span>
                  <p className="font-mono text-xs text-primary">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FIELD NOTES ═══ */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-10" {...fadeUp()}>
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-2">
              Field Notes & <span className="text-primary">AI Briefings</span>
            </h2>
            <p className="text-muted-foreground text-sm">Playbooks, case logs, and signal scans for solo operators.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homePosts.map((post, i) => {
              const Icon = tagIcons[post.tag];
              return (
                <motion.div key={post.slug} className="glass-card p-5 group hover:glow-subtle transition-all duration-300 flex flex-col relative" {...fadeUp(i * 0.08)}>
                  {post.featured && (
                    <span className="absolute top-3 right-3 bg-primary/15 text-primary text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30">★ START HERE</span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${tagStyles[post.tag]}`}>{tagLabels[post.tag]}</span>
                    <span className="text-muted-foreground text-[10px] font-mono flex items-center gap-1"><Clock size={9} /> {post.readTime}</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <h3 className="font-display text-sm tracking-wide text-foreground group-hover:text-primary transition-colors leading-snug mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">{post.summary}</p>
                  <Link to={`/field-notes/${post.slug}`} className="font-mono text-[11px] text-primary/70 tracking-wider hover:text-primary transition-colors flex items-center gap-1 pt-2 border-t border-border/50">
                    READ BRIEFING <ArrowRight size={11} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="text-center mt-6" {...fadeUp(0.3)}>
            <Link to="/field-notes" className="text-primary font-mono text-xs tracking-widest hover:underline inline-flex items-center gap-1">
              VIEW ALL BRIEFINGS <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div className="glass-card p-6 text-center" {...fadeUp()}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail size={16} className="text-primary" />
              <p className="font-display text-lg tracking-wide text-foreground">RYFIO Signal</p>
            </div>
            <p className="text-muted-foreground text-sm mb-4">Weekly briefings for solo operators. No spam, just ops and AI.</p>
            {!newsletterSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com" className="form-input !py-2.5 text-sm flex-1" />
                <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs">SUBSCRIBE</button>
              </form>
            ) : (
              <p className="text-primary font-mono text-xs tracking-wider">✓ SUBSCRIBED</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <motion.div className="glass-card p-8 glow-subtle" {...fadeUp()}>
            <h2 className="font-display text-2xl tracking-tight mb-3">
              Ready to <span className="text-primary">Join</span>?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Whether you're shipping your first product or scaling operations, RYFIO is your launchpad.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/join" onClick={sfx.click} className="btn-primary flex items-center gap-2 min-h-[48px]">
                JOIN <ArrowRight size={16} />
              </Link>
              <Link to="/contact" onClick={sfx.click} className="btn-secondary flex items-center gap-2 min-h-[48px]">
                CONTACT
              </Link>
            </div>
            <p className="text-muted-foreground/50 font-mono text-[10px] tracking-wider mt-4">
              Built in public from Coimbatore, India 🇮🇳
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
