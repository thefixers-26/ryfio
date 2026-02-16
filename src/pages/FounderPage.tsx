import { motion } from 'framer-motion';
import { Rocket, Heart, Users, Globe } from 'lucide-react';

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

const FounderPage = () => (
  <section className="min-h-screen py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.p className="section-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        // THE FOUNDER
      </motion.p>
      <motion.h1
        className="section-title mt-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ONE PERSON. ONE MISSION.
      </motion.h1>

      {/* Transmission */}
      <motion.div
        className="glass-card p-8 md:p-12 text-left mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary tracking-[0.2em]">TRANSMISSION FROM FOUNDER</span>
        </div>
        <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
          <p>
            I'm a solo founder from <span className="text-primary">Tamil Nadu, India</span>. No venture capital. No co-founders. No shortcuts. Just a vision to build something that matters.
          </p>
          <p>
            <span className="text-primary">RYFIO</span> — Resilient Yield Fusion Intelligent Operations — is my answer to how manufacturing, AI, and operations should work in 2050. Not incremental improvements. Complete reinvention.
          </p>
          <p>
            I build in public because I believe in <span className="text-primary">radical transparency</span>. Every breakthrough, every setback, every pivot — documented and shared. If this inspires even one solopreneur to start, the mission succeeds.
          </p>
          <p className="text-secondary font-display text-lg italic pt-4">
            "The future doesn't wait for permission. Neither do I."
          </p>
        </div>
      </motion.div>

      {/* Manifesto */}
      <motion.p
        className="section-header mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        // MANIFESTO
      </motion.p>
      <div className="grid md:grid-cols-2 gap-6">
        {manifesto.map((item, i) => (
          <motion.div
            key={item.title}
            className="glass-card p-8 text-left hover:glow-cyan transition-all duration-300"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <item.icon className="text-primary mb-4" size={28} />
            <h3 className="font-display text-sm tracking-[0.15em] mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FounderPage;
