import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/hooks/useSfx';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'FOUNDER', path: '/founder' },
  { label: 'PILLARS', path: '/pillars' },
  { label: 'BRIEFINGS', path: '/field-notes', isNew: true },
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
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNav}
              onMouseEnter={sfx.hover}
              className={`font-display text-xs tracking-[0.15em] transition-colors duration-300 relative ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
              {item.isNew && (
                <span className="absolute -top-2 -right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <a href="https://x.com/ryfioai" target="_blank" rel="noopener noreferrer" onMouseEnter={sfx.hover}
              className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={16} />
            </a>
            <a href="https://github.com/ryfio-ai" target="_blank" rel="noopener noreferrer" onMouseEnter={sfx.hover}
              className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={16} />
            </a>
            <a href="https://www.instagram.com/ryfio.ai/" target="_blank" rel="noopener noreferrer" onMouseEnter={sfx.hover}
              className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={16} />
            </a>
          </div>
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
                  className={`block font-display text-sm tracking-[0.15em] py-3 px-2 rounded transition-colors relative ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground active:bg-muted'
                  }`}
                >
                  {item.label}
                  {item.isNew && (
                    <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              ))}
              <div className="flex items-center gap-3 py-3 px-2">
                <a href="https://x.com/ryfioai" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground text-sm font-display tracking-wider flex items-center gap-2">
                  <Twitter size={14} /> X
                </a>
                <a href="https://github.com/ryfio-ai" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground text-sm font-display tracking-wider flex items-center gap-2">
                  <Github size={14} /> GITHUB
                </a>
                <a href="https://www.instagram.com/ryfio.ai/" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground text-sm font-display tracking-wider flex items-center gap-2">
                  <Instagram size={14} /> IG
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
