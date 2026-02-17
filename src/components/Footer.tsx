import { Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="relative z-10 border-t border-border py-8 text-center px-4">
    <div className="max-w-7xl mx-auto space-y-3">
      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider">
        © 2026 RYFIO — RESILIENT YIELD FUSION INTELLIGENT OPERATIONS
      </p>
      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider">
        BUILT IN PUBLIC FROM COIMBATORE, TAMIL NADU, INDIA 🇮🇳
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
        <a href="mailto:ryfioai@gmail.com" className="text-xs text-primary font-mono hover:underline">
          ryfioai@gmail.com
        </a>
        <a
          href="https://www.instagram.com/ryfio.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-secondary transition-colors"
        >
          <Instagram size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
