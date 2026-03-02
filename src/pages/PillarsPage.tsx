import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Atom, Brain, Cog, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';

const pillars = [
  {
    letter: 'R',
    name: 'RESILIENT',
    subtitle: 'Unbreakable Systems',
    icon: Rocket,
    desc: "Solo operators need tools that don't break under pressure. Resilience isn't about avoiding failure — it's about making failure impossible to sustain.",
    solopreneur: 'Your stack keeps running even if one tool fails.',
    tags: ['Self-healing infrastructure', 'Adaptive supply chains', 'Anti-fragile architectures'],
    outcome: 'Build products that survive real-world chaos.',
  },
  {
    letter: 'Y',
    name: 'YIELD',
    subtitle: 'Maximum Output',
    icon: TrendingUp,
    desc: "Every product should generate revenue quickly. Yield isn't just about output — it's about extracting maximum value from minimum input.",
    solopreneur: 'Your first product earns revenue within weeks, not months.',
    tags: ['Resource optimization', 'Process refinement', 'Value extraction'],
    outcome: 'Ship faster, earn sooner.',
  },
  {
    letter: 'F',
    name: 'FUSION',
    subtitle: 'Intelligent Integration',
    icon: Atom,
    desc: 'AI + human creativity is unstoppable. Fusion is the art of combining disparate systems into something greater than the sum of its parts.',
    solopreneur: 'Your AI agents talk to your SaaS tools without manual glue code.',
    tags: ['AI + Human collaboration', 'System convergence', 'Seamless workflows'],
    outcome: 'Combine tools and talent into one powerful stack.',
  },
  {
    letter: 'I',
    name: 'INTELLIGENT',
    subtitle: 'Cognitive Operations',
    icon: Brain,
    desc: "Serious products need serious operations. Intelligence isn't programmed — it's cultivated through continuous learning and adaptation.",
    solopreneur: 'Let AI handle the heavy lifting so you focus on strategy.',
    tags: ['Machine learning', 'Predictive analytics', 'Autonomous decisions'],
    outcome: 'Let AI handle the heavy lifting.',
  },
  {
    letter: 'O',
    name: 'OPERATIONS',
    subtitle: '24/7 Execution',
    icon: Cog,
    desc: 'The engine that never stops. Operations is where strategy becomes reality — continuous, reliable, and global in scale.',
    solopreneur: 'Your business runs 24/7 even when you sleep.',
    tags: ['Always-on systems', 'Real-time monitoring', 'Global scale'],
    outcome: 'From idea to revenue, always running.',
  },
];

const implementations = [
  { name: 'RYFIO Agent OS', status: 'COMING SOON', desc: 'AI workflows and automation pipelines for solopreneurs.' },
  { name: 'RYFIO Ops Console', status: 'IN PROGRESS', desc: 'Dashboards for manufacturing & operations founders.' },
  { name: 'RYFIO Command Deck', status: 'ACTIVE', desc: 'Templates, playbooks, and launch automations.' },
];

const implStatusStyles: Record<string, string> = {
  'ACTIVE': 'bg-primary/15 text-primary border-primary/40',
  'IN PROGRESS': 'bg-primary/10 text-primary/70 border-primary/20',
  'COMING SOON': 'bg-muted text-muted-foreground border-border',
};

const PillarsPage = () => (
  <section className="min-h-screen py-20 sm:py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        // CORE ARCHITECTURE
      </motion.p>
      <motion.h1
        className="section-title mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        THE FIVE PILLARS
      </motion.h1>
      <motion.p
        className="text-muted-foreground mt-4 mb-4 font-body text-sm sm:text-base content-narrow mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Each letter of RYFIO stands for a principle that drives everything we build. These aren't buzzwords — they're operational commitments.
      </motion.p>
      <motion.p
        className="text-muted-foreground/70 mb-14 font-mono text-[11px] tracking-wider content-narrow mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The operating system philosophy behind every RYFIO product and service.
      </motion.p>

      {/* Visual engine: R → Y → F → I → O */}
      <motion.div
        className="flex items-center justify-center gap-1 sm:gap-2 mb-14 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {pillars.map((p, i) => (
          <div key={p.letter} className="flex items-center gap-1 sm:gap-2">
            <div className="glass-card px-3 py-2 sm:px-4 sm:py-2.5 text-center hover:glow-subtle transition-all">
              <span className="font-display text-lg sm:text-2xl font-bold text-primary">{p.letter}</span>
              <p className="font-mono text-[8px] sm:text-[9px] text-muted-foreground tracking-widest">{p.name}</p>
            </div>
            {i < pillars.length - 1 && (
              <span className="text-primary/30 font-mono text-xs sm:text-sm">→</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Pillar cards */}
      <div className="space-y-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.letter}
            className="glass-card p-5 sm:p-6 md:p-8 text-left group hover:glow-subtle transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                  {p.letter}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <p.icon className="text-primary" size={16} />
                  </div>
                  <h3 className="font-display text-base sm:text-lg tracking-[0.12em] text-foreground">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-xs font-mono tracking-widest mb-3">{p.subtitle}</p>
                <p className="text-muted-foreground font-body leading-relaxed mb-3 text-sm">{p.desc}</p>
                
                {/* For solopreneurs line */}
                <div className="bg-primary/5 border border-primary/10 rounded-lg px-4 py-2.5 mb-4">
                  <p className="font-mono text-[10px] text-primary/60 tracking-widest mb-1">FOR SOLOPRENEURS, THIS MEANS:</p>
                  <p className="text-foreground font-body text-sm font-medium">{p.solopreneur}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(tag => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>
                <p className="font-mono text-[11px] text-primary/80 tracking-wider pt-2 border-t border-border/50">
                  → {p.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How we implement this */}
      <motion.div
        className="mt-14 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Layers className="text-primary" size={20} />
          <h2 className="font-display text-sm sm:text-base tracking-[0.15em]">HOW WE IMPLEMENT THIS</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {implementations.map(impl => (
            <div key={impl.name} className="glass-card p-5 text-left hover:glow-subtle transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${implStatusStyles[impl.status]}`}>
                  {impl.status}
                </span>
              </div>
              <h3 className="font-display text-sm tracking-wide mb-2 text-foreground">{impl.name}</h3>
              <p className="text-muted-foreground text-xs font-body leading-relaxed">{impl.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="glass-card p-6 sm:p-8 glow-subtle text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-muted-foreground font-body text-sm mb-5">
          These pillars power every product we build and every operator we support.
        </p>
        <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
          className="btn-primary inline-flex items-center gap-2 min-h-[48px]">
          JOIN THE MISSION <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default PillarsPage;
