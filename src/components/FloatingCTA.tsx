import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/hooks/useSfx';

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide on join/contact pages
  if (location.pathname === '/join' || location.pathname === '/contact') return null;

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3"
        >
          <div className="glass-card glow-subtle px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
            <Link
              to="/join"
              onClick={sfx.click}
              onMouseEnter={sfx.hover}
              className="btn-primary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              Join as Operator <ArrowRight size={12} />
            </Link>
            <Link
              to="/contact"
              onClick={sfx.click}
              onMouseEnter={sfx.hover}
              className="btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <MessageSquare size={12} /> Talk to Founder
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
