import { Instagram, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="relative z-10 border-t border-border py-8 text-center px-4">
    <div className="max-w-7xl mx-auto space-y-3">
      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider">
        © 2026 RYFIO — RESILIENT YIELD FUSION INTELLIGENT OPERATIONS
      </p>
      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider flex items-center justify-center gap-1">
        BUILT IN PUBLIC FROM COIMBATORE, TN, INDIA 🇮🇳
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
        <a href="mailto:ryfioai@gmail.com" className="text-xs text-primary font-mono hover:underline">
          ryfioai@gmail.com
        </a>
        <div className="flex items-center gap-3">
          <a href="https://x.com/ryfioai" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter size={16} />
          </a>
          <a href="https://github.com/ryfio-ai" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={16} />
          </a>
          <a href="https://www.instagram.com/ryfio.ai/" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={16} />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pt-1">
        <Link to="/field-notes" className="text-[10px] font-mono text-muted-foreground hover:text-primary tracking-wider transition-colors">
          BRIEFINGS
        </Link>
        <Link to="/pillars" className="text-[10px] font-mono text-muted-foreground hover:text-primary tracking-wider transition-colors">
          PILLARS
        </Link>
        <Link to="/founder" className="text-[10px] font-mono text-muted-foreground hover:text-primary tracking-wider transition-colors">
          FOUNDER
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
