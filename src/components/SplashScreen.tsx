import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = [
  { char: 'R', color: 'text-primary' },
  { char: 'Y', color: 'text-secondary' },
  { char: 'F', color: 'text-primary' },
  { char: 'I', color: 'text-accent' },
  { char: 'O', color: 'text-secondary' },
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // wait for exit animation
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-3 sm:gap-5">
            {letters.map((l, i) => (
              <motion.span
                key={l.char}
                className={`font-display text-4xl sm:text-6xl md:text-7xl font-bold ${l.color}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
              >
                {l.char}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="font-mono text-xs sm:text-sm text-muted-foreground tracking-[0.3em] mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            INITIALIZING...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
