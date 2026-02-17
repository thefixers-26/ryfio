import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/hooks/useSfx';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'FOUNDER', path: '/founder' },
  { label: 'PILLARS', path: '/pillars' },
  { label: 'JOIN', path: '/join' },
  { label: 'UPLINK', path: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleNav = () => {
    sfx.navigate();
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-t-0 border-x-0 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
        <Link to="/" onClick={() => sfx.click()} className="font-display text-lg sm:text-xl font-bold text-primary tracking-[0.2em]">
          RYFIO
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNav}
              onMouseEnter={sfx.hover}
              className={`font-display text-xs tracking-[0.15em] transition-colors duration-300 ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/ryfio.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={sfx.hover}
            className="text-muted-foreground hover:text-secondary transition-colors"
          >
            <Instagram size={18} />
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button className="text-foreground p-2" onClick={() => { setOpen(!open); sfx.click(); }} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNav}
                  className={`block font-display text-sm tracking-[0.15em] py-3 px-2 rounded transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground active:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/ryfio.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground text-sm font-display tracking-wider py-3 px-2"
              >
                <Instagram size={16} /> INSTAGRAM
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
