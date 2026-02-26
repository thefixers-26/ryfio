import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Atom, Brain, Cog, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';

const pillars = [
  {
    letter: 'R',
    name: 'RESILIENT',
    subtitle: 'Unbreakable Systems',
    icon: Rocket,
    desc: "Solo operators need tools that don't break under pressure. Resilience isn't about avoiding failure — it's about making failure impossible to sustain.",
    tags: ['Self-healing infrastructure', 'Adaptive supply chains', 'Anti-fragile architectures'],
    outcome: 'Build products that survive real-world chaos.',
  },
  {
    letter: 'Y',
    name: 'YIELD',
    subtitle: 'Maximum Output',
    icon: TrendingUp,
    desc: "Every product should generate revenue quickly. Yield isn't just about output — it's about extracting maximum value from minimum input.",
    tags: ['Resource optimization', 'Process refinement', 'Value extraction'],
    outcome: 'Ship faster, earn sooner.',
  },
  {
    letter: 'F',
    name: 'FUSION',
    subtitle: 'Intelligent Integration',
    icon: Atom,
    desc: 'AI + human creativity is unstoppable. Fusion is the art of combining disparate systems into something greater than the sum of its parts.',
    tags: ['AI + Human collaboration', 'System convergence', 'Seamless workflows'],
    outcome: 'Combine tools and talent into one powerful stack.',
  },
  {
    letter: 'I',
    name: 'INTELLIGENT',
    subtitle: 'Cognitive Operations',
    icon: Brain,
    desc: "Serious products need serious operations. Intelligence isn't programmed — it's cultivated through continuous learning and adaptation.",
    tags: ['Machine learning', 'Predictive analytics', 'Autonomous decisions'],
    outcome: 'Let AI handle the heavy lifting.',
  },
  {
    letter: 'O',
    name: 'OPERATIONS',
    subtitle: '24/7 Execution',
    icon: Cog,
    desc: 'The engine that never stops. Operations is where strategy becomes reality — continuous, reliable, and global in scale.',
    tags: ['Always-on systems', 'Real-time monitoring', 'Global scale'],
    outcome: 'From idea to revenue, always running.',
  },
];

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
        className="text-muted-foreground mt-4 mb-14 font-body text-sm sm:text-base content-narrow mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Each letter of RYFIO stands for a principle that drives everything we build. These aren't buzzwords — they're operational commitments.
      </motion.p>

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
                <p className="text-muted-foreground font-body leading-relaxed mb-4 text-sm">{p.desc}</p>
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

      {/* CTA */}
      <motion.div
        className="mt-12 glass-card p-6 sm:p-8 glow-subtle text-center"
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
