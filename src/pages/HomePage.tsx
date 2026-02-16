import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const letters = [
  { char: 'R', word: 'Resilient', color: 'text-primary' },
  { char: 'Y', word: 'Yield', color: 'text-secondary' },
  { char: 'F', word: 'Fusion', color: 'text-primary' },
  { char: 'I', word: 'Intelligent', color: 'text-accent' },
  { char: 'O', word: 'Operations', color: 'text-secondary' },
];

const fullText = 'Resilient Yield Fusion Intelligent Operations';

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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Letter Nodes */}
      <motion.div
        className="flex gap-4 md:gap-6 mb-8"
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
            <span className={`font-display text-3xl md:text-4xl font-bold ${l.color}`}>
              {l.char}
            </span>
            <span className="text-muted-foreground text-xs mt-1 font-body">{l.word}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Typing effect */}
      <motion.p
        className="font-mono text-sm md:text-base text-muted-foreground tracking-wider mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {typed}
        <span className="animate-pulse">|</span>
      </motion.p>

      {/* Tagline */}
      <motion.h1
        className="section-title text-gradient-cyan mb-4 glitch-hover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        BUILDING THE FUTURE
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg mb-10 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        From Tamil Nadu to the World — One Solopreneur at a Time
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Link to="/join" className="btn-cyan flex items-center gap-2 justify-center">
          JOIN THE MISSION <ArrowRight size={16} />
        </Link>
        <Link to="/contact" className="btn-orange flex items-center gap-2 justify-center">
          CONTACT US
        </Link>
      </motion.div>

      {/* Tamil Nadu time */}
      <motion.div
        className="glass-card px-6 py-2 flex items-center gap-4 text-xs font-mono text-muted-foreground mb-8"
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
  );
};

export default HomePage;
