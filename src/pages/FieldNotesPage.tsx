import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Radio, Lightbulb, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts, tagStyles, tagLabels, type PostTag } from '@/data/posts';
import { sfx } from '@/hooks/useSfx';

const tagIcons: Record<PostTag, typeof BookOpen> = {
  PLAYBOOK: BookOpen,
  CASE_LOG: FileText,
  SIGNAL_SCAN: Radio,
  MINDSET: Lightbulb,
};

const allTags: PostTag[] = ['PLAYBOOK', 'CASE_LOG', 'SIGNAL_SCAN', 'MINDSET'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const FieldNotesPage = () => {
  const [activeTag, setActiveTag] = useState<PostTag | 'ALL'>('ALL');

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const filtered = activeTag === 'ALL' ? sorted : sorted.filter(p => p.tag === activeTag);
  const featured = sorted.find(p => p.featured);

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            // SIGNAL ARCHIVE
          </motion.p>
          <motion.h1 className="section-title mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            FIELD NOTES & AI BRIEFINGS
          </motion.h1>
          <motion.p className="text-muted-foreground mt-4 font-body text-sm sm:text-base content-narrow mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Weekly dispatches for solo operators in manufacturing, SaaS, automation, and Industry 4.0.
          </motion.p>
          <motion.p className="text-primary/60 mt-2 font-mono text-[11px] tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Updated weekly — 1–2 new AI briefings for solo operators.
          </motion.p>
        </div>

        {/* Featured post */}
        {featured && (
          <motion.div className="glass-card p-5 sm:p-6 mb-8 glow-subtle relative" {...fadeUp(0.5)}>
            <span className="absolute top-3 right-3 bg-primary/15 text-primary text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border border-primary/30">
              ★ START HERE
            </span>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${tagStyles[featured.tag]}`}>
                {tagLabels[featured.tag]}
              </span>
              <span className="text-muted-foreground text-[11px] font-mono flex items-center gap-1">
                <Clock size={10} /> {featured.readTime}
              </span>
            </div>
            <h2 className="font-display text-base sm:text-lg tracking-wide text-foreground mb-2">{featured.title}</h2>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">{featured.summary}</p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-primary/70 tracking-wider flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                READ BRIEFING <ArrowRight size={11} />
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/60">
                {new Date(featured.date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        )}

        {/* Filter chips */}
        <motion.div className="flex flex-wrap gap-2 mb-8" {...fadeUp(0.6)}>
          <button
            onClick={() => setActiveTag('ALL')}
            className={`text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border transition-all ${
              activeTag === 'ALL'
                ? 'bg-primary/15 text-primary border-primary/40'
                : 'text-muted-foreground border-border hover:border-primary/30'
            }`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                activeTag === tag
                  ? tagStyles[tag]
                  : 'text-muted-foreground border-border hover:border-primary/30'
              }`}
            >
              {tagLabels[tag]}
            </button>
          ))}
        </motion.div>

        {/* Posts grid */}
        <div className="space-y-4">
          {filtered.map((post, i) => {
            const Icon = tagIcons[post.tag];
            return (
              <motion.div
                key={post.slug}
                className="glass-card p-5 sm:p-6 group hover:glow-subtle transition-all duration-300"
                {...fadeUp(i * 0.05)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border ${tagStyles[post.tag]}`}>
                        {tagLabels[post.tag]}
                      </span>
                      <span className="text-muted-foreground text-[11px] font-mono flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                      <span className="text-muted-foreground/50 text-[11px] font-mono">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base tracking-wide text-foreground group-hover:text-primary transition-colors mb-1.5">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-body leading-relaxed mb-3">{post.summary}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-primary/70 tracking-wider group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        READ BRIEFING <ArrowRight size={11} />
                      </span>
                      {post.relatedProduct && (
                        <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
                          → {post.relatedProduct}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div className="glass-card p-6 sm:p-8 mt-12 text-center" {...fadeUp()}>
          <p className="section-label mb-3">// NEXT STEP</p>
          <p className="text-muted-foreground font-body text-sm mb-5 max-w-md mx-auto">
            Turn these briefings into shipped products using RYFIO templates and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/join" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-primary flex items-center gap-2 justify-center min-h-[44px]">
              ENTER COMMAND DECK <ArrowRight size={14} />
            </Link>
            <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-secondary flex items-center gap-2 justify-center min-h-[44px]">
              OPEN UPLINK
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FieldNotesPage;
