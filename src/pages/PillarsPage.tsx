import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Atom, Brain, Cog } from 'lucide-react';

const pillars = [
  {
    letter: 'R',
    name: 'RESILIENT',
    subtitle: 'Unbreakable Systems',
    icon: Rocket,
    color: 'text-primary',
    desc: "Building systems that adapt, recover, and grow stronger under pressure. Resilience isn't about avoiding failure — it's about making failure impossible to sustain.",
    tags: ['Self-healing infrastructure', 'Adaptive supply chains', 'Anti-fragile architectures'],
  },
  {
    letter: 'Y',
    name: 'YIELD',
    subtitle: 'Maximum Output',
    icon: TrendingUp,
    color: 'text-secondary',
    desc: "Every resource optimized. Every process refined. Yield isn't just about output — it's about extracting maximum value from minimum input.",
    tags: ['Resource optimization', 'Process refinement', 'Value extraction'],
  },
  {
    letter: 'F',
    name: 'FUSION',
    subtitle: 'Intelligent Integration',
    icon: Atom,
    color: 'text-primary',
    desc: 'Where AI meets human ingenuity. Fusion is the art of combining disparate systems into something greater than the sum of its parts.',
    tags: ['AI + Human collaboration', 'System convergence', 'Seamless workflows'],
  },
  {
    letter: 'I',
    name: 'INTELLIGENT',
    subtitle: 'Cognitive Operations',
    icon: Brain,
    color: 'text-accent',
    desc: 'Systems that think, learn, and evolve. Intelligence isn\'t programmed — it\'s cultivated through continuous learning and adaptation.',
    tags: ['Machine learning', 'Predictive analytics', 'Autonomous decisions'],
  },
  {
    letter: 'O',
    name: 'OPERATIONS',
    subtitle: '24/7 Execution',
    icon: Cog,
    color: 'text-secondary',
    desc: 'The engine that never stops. Operations is where strategy becomes reality — continuous, reliable, and global in scale.',
    tags: ['Always-on systems', 'Real-time monitoring', 'Global scale'],
  },
];

const PillarsPage = () => (
  <section className="min-h-screen py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.p className="section-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
        className="text-muted-foreground mt-4 mb-16 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Each letter. Each domain. Each pillar of the RYFIO framework.
      </motion.p>

      <div className="space-y-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.letter}
            className="glass-card p-8 md:p-10 text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="flex items-start gap-6">
              <span className={`font-display text-5xl md:text-6xl font-bold ${p.color} opacity-40`}>
                {p.letter}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p.icon className={p.color} size={20} />
                  <h3 className={`font-display text-lg tracking-[0.15em] ${p.color}`}>{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-xs font-mono mb-4">{p.subtitle}</p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 border border-border rounded text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PillarsPage;
