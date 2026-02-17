import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { sfx } from '@/hooks/useSfx';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('ryfio-theme');
    return stored ? stored === 'dark' : true; // default dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('ryfio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => { setDark(!dark); sfx.click(); }}
      onMouseEnter={sfx.hover}
      className="p-2 rounded text-muted-foreground hover:text-primary transition-colors"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
