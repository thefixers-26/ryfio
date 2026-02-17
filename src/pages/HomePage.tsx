import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Wrench, Users, Compass, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';

const letters = [
  { char: 'R', word: 'Resilient', color: 'text-primary' },
  { char: 'Y', word: 'Yield', color: 'text-secondary' },
  { char: 'F', word: 'Fusion', color: 'text-primary' },
  { char: 'I', word: 'Intelligent', color: 'text-accent' },
  { char: 'O', word: 'Operations', color: 'text-secondary' },
];

const fullText = 'Resilient Yield Fusion Intelligent Operations';

const helpBullets = [
  { icon: Wrench, title: 'Shared Resources', desc: 'Curated tools, templates, and AI workflows so you never start from zero.' },
  { icon: Users, title: 'Build Together', desc: 'Find collaborators, accountability partners, and mentors while staying a solopreneur.' },
  { icon: Compass, title: 'Trend-Aligned', desc: 'Guidance rooted in current industry trends — AI, automation, SaaS, creator economy, Industry 4.0.' },
  { icon: Layers, title: 'End-to-End Support', desc: 'From idea to launch, we help you design, build, and operate your products.' },
];

const HomePage = () => {
  const [typed, setTyped] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Letter Nodes */}
        <motion.div
          className="flex gap-2 sm:gap-3 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {letters.map((l, i) => (
            <motion.div
              key={l.char}
              className="letter-node"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: '0 0 30px hsl(184 100% 50% / 0.4)' }}
            >
              <span className={`font-display text-xl sm:text-3xl md:text-4xl font-bold ${l.color}`}>
                {l.char}
              </span>
              <span className="text-muted-foreground text-[10px] sm:text-xs mt-1 font-body">{l.word}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Typing effect */}
        <motion.p
          className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground tracking-wider mb-6 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        {/* Hero headline */}
        <motion.h1
          className="section-title text-gradient-cyan mb-4 glitch-hover text-2xl sm:text-4xl md:text-5xl lg:text-6xl px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          BUILDING THE FUTURE
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="text-muted-foreground text-sm sm:text-base md:text-lg mb-10 font-body max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          A platform that helps solopreneurs start, build, and scale future‑ready products using AI and modern industry trends — from SaaS to Industry 4.0.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover} className="btn-cyan flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            JOIN THE MISSION <ArrowRight size={16} />
          </Link>
          <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover} className="btn-orange flex items-center gap-2 justify-center min-h-[48px] w-full sm:w-auto">
            CONTACT US
          </Link>
        </motion.div>

        {/* Tamil Nadu time */}
        <motion.div
          className="glass-card px-4 sm:px-6 py-2 flex items-center gap-4 text-xs font-mono text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            TAMIL NADU {time}
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-muted-foreground" size={24} />
        </motion.div>
      </section>

      {/* What is RYFIO */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass-card p-6 sm:p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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

      {/* How We Help Solopreneurs */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            HOW WE HELP <span className="text-primary">SOLOPRENEURS</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {helpBullets.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card p-6 text-left hover:glow-cyan transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <item.icon className="text-primary mb-3" size={24} />
                <h3 className="font-display text-sm tracking-[0.12em] mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
