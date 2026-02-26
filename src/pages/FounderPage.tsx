import { motion } from 'framer-motion';
import { Rocket, Heart, Users, Globe, ArrowRight, MapPin, Code, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const manifesto = [
  { icon: Rocket, title: 'BUILD IN PUBLIC', desc: "Every line of code, every decision, every failure — shared openly. Transparency isn't weakness; it's the ultimate strength." },
  { icon: Heart, title: 'SOLOPRENEURS UNITE', desc: "You don't need a massive team or VC funding. One person with conviction can reshape industries." },
  { icon: Users, title: 'COMMUNITY FIRST', desc: "RYFIO isn't just a company — it's a movement. Every contributor, every supporter is part of the mission." },
  { icon: Globe, title: 'FROM INDIA TO THE WORLD', desc: "Tamil Nadu isn't just our location — it's our identity. We prove that world-class innovation comes from anywhere." },
];

const stats = [
  { label: 'Products Shipped', value: '4+' },
  { label: 'Industries Targeted', value: '6' },
  { label: 'Team Size', value: '1' },
  { label: 'VC Funding', value: '₹0' },
];

const FounderPage = () => (
  <section className="min-h-screen py-20 sm:py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        // THE FOUNDER
      </motion.p>
      <motion.h1
        className="section-title mt-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ONE PERSON. ONE MISSION.
      </motion.h1>
      <motion.p
        className="text-muted-foreground font-body text-sm sm:text-base mb-12 content-narrow mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        The story behind RYFIO — why a solo founder from Coimbatore is building the future of solopreneur operations.
      </motion.p>

      {/* Founder identity */}
      <motion.div
        className="glass-card p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
          <span className="text-4xl sm:text-5xl">🚀</span>
        </div>
        <div className="text-left">
          <h2 className="font-display text-lg sm:text-xl tracking-wide text-foreground mb-1">SOLO FOUNDER</h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-body mb-3">
            <MapPin size={14} className="text-primary" />
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['AI/ML', 'Manufacturing', 'SaaS', 'Full-Stack', 'Automation'].map(tag => (
              <span key={tag} className="tag-badge">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {stats.map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-primary">{s.value}</p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest mt-1">{s.label.toUpperCase()}</p>
          </div>
        ))}
      </motion.div>

      {/* Transmission */}
      <motion.div
        className="glass-card p-6 sm:p-8 md:p-10 text-left mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary tracking-[0.2em]">TRANSMISSION FROM FOUNDER</span>
        </div>
        <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-sm sm:text-base">
          <p>
            I'm a solo founder from <span className="text-primary font-semibold">Coimbatore, Tamil Nadu</span>. No venture capital. No co-founders. No shortcuts. Just a vision to build something that matters.
          </p>
          <p>
            <span className="text-primary font-semibold">RYFIO</span> — Resilient Yield Fusion Intelligent Operations — is my answer to how manufacturing, AI, and operations should work in 2050. Not incremental improvements. Complete reinvention.
          </p>
          <p>
            I started building because I saw a gap: solo founders and small operators have the talent and vision, but lack the infrastructure, playbooks, and community that funded startups take for granted. RYFIO bridges that gap.
          </p>
          <p>
            I build in public because I believe in <span className="text-primary font-semibold">radical transparency</span>. Every breakthrough, every setback, every pivot — documented and shared. If this inspires even one solopreneur to start, the mission succeeds.
          </p>
          <p className="text-primary font-display text-base sm:text-lg italic pt-4 border-t border-border/50">
            "The future doesn't wait for permission. Neither do I."
          </p>
        </div>
      </motion.div>

      {/* Why RYFIO exists */}
      <motion.div
        className="glass-card p-6 sm:p-8 text-left mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="text-primary" size={18} />
          </div>
          <h3 className="font-display text-sm tracking-[0.15em]">WHY RYFIO EXISTS</h3>
        </div>
        <ul className="space-y-3 text-muted-foreground font-body text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">▸</span>
            Solo founders build 80% of indie products but have 0% of the infrastructure funded teams enjoy.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">▸</span>
            Manufacturing and Industry 4.0 are ripe for AI disruption — but no one is building tools for the small operator.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">▸</span>
            The best ideas come from people closest to the problem. RYFIO gives those people the firepower to execute.
          </li>
        </ul>
      </motion.div>

      {/* Manifesto */}
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        // MANIFESTO
      </motion.p>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {manifesto.map((item, i) => (
          <motion.div
            key={item.title}
            className="glass-card p-6 sm:p-8 text-left hover:glow-subtle transition-all duration-300"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <item.icon className="text-primary" size={20} />
            </div>
            <h3 className="font-display text-sm tracking-[0.15em] mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="glass-card p-6 sm:p-8 glow-subtle text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-label mb-3">// JOIN THE MISSION</p>
        <p className="text-muted-foreground font-body text-sm mb-6 max-w-md mx-auto">
          If you're a solopreneur, builder, or operator who believes in this vision — let's build together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-primary flex items-center gap-2 justify-center min-h-[48px]">
            ENTER COMMAND DECK <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
            className="btn-secondary flex items-center gap-2 justify-center min-h-[48px]">
            OPEN UPLINK
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FounderPage;
