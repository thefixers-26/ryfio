import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, BookOpen, FileText, Radio, Lightbulb } from 'lucide-react';
import { posts, tagStyles, tagLabels, type PostTag } from '@/data/posts';
import { sfx } from '@/hooks/useSfx';

const tagIcons: Record<PostTag, typeof BookOpen> = {
  PLAYBOOK: BookOpen,
  CASE_LOG: FileText,
  SIGNAL_SCAN: Radio,
  MINDSET: Lightbulb,
};

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/field-notes" replace />;

  const Icon = tagIcons[post.tag];
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex(p => p.slug === slug);
  const next = sorted[idx + 1];
  const prev = sorted[idx - 1];

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            to="/field-notes"
            onClick={sfx.click}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs tracking-wider mb-8"
          >
            <ArrowLeft size={12} /> BACK TO FIELD NOTES
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-[11px] font-mono tracking-wider px-3 py-1 rounded-full border ${tagStyles[post.tag]}`}>
              {tagLabels[post.tag]}
            </span>
            <span className="text-muted-foreground text-xs font-mono flex items-center gap-1">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="text-muted-foreground/50 text-xs font-mono">
              {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: '2-digit', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed mb-8">
            {post.summary}
          </p>
        </motion.div>

        {/* Content placeholder */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="text-primary" size={18} />
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-wider text-primary/60">// FULL BRIEFING</p>
              <p className="text-muted-foreground text-xs font-body">By RYFIO Operations</p>
            </div>
          </div>

          <div className="prose-custom space-y-4 text-muted-foreground font-body text-sm sm:text-base leading-relaxed">
            <p>
              This briefing is currently being prepared by the RYFIO team. Full content with actionable frameworks,
              code snippets, and implementation details will be published soon.
            </p>
            <p>
              In the meantime, explore the Command Deck for ready-to-use workflows and templates that complement this briefing.
            </p>
          </div>
        </motion.div>

        {/* Operator CTA */}
        <motion.div
          className="glass-card p-6 sm:p-8 glow-subtle mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <p className="section-label mb-3">// NEXT STEP</p>
          <h3 className="font-display text-lg sm:text-xl tracking-wide text-foreground mb-2">
            Apply this briefing with RYFIO
          </h3>
          <p className="text-muted-foreground font-body text-sm mb-5">
            Turn this idea into a shipped product using RYFIO templates and operator support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/command-deck" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-primary flex items-center gap-2 justify-center min-h-[44px]">
              ENTER COMMAND DECK <ArrowRight size={14} />
            </Link>
            <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-secondary flex items-center gap-2 justify-center min-h-[44px]">
              OPEN UPLINK
            </Link>
          </div>
        </motion.div>

        {/* Prev / Next nav */}
        <motion.div
          className="flex justify-between gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          {prev ? (
            <Link to={`/field-notes/${prev.slug}`} onClick={sfx.click}
              className="glass-card p-4 flex-1 group hover:glow-subtle transition-all">
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground/50 mb-1">← PREVIOUS</p>
              <p className="font-display text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prev.title}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link to={`/field-notes/${next.slug}`} onClick={sfx.click}
              className="glass-card p-4 flex-1 group hover:glow-subtle transition-all text-right">
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground/50 mb-1">NEXT →</p>
              <p className="font-display text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {next.title}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </motion.div>
      </div>
    </section>
  );
};

export default PostPage;
