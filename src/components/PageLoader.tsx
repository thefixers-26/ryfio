import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full bg-primary rounded-r"
            style={{ boxShadow: '0 0 10px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.5)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
