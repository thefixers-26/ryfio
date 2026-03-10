import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket, FileText, CheckSquare, Zap, Download, Send,
  ArrowRight, Cpu, Package, Users, Lightbulb, Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sfx } from '@/hooks/useSfx';
import { toast } from 'sonner';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

/* ── DATA ── */

const workflows = [
  {
    icon: Cpu,
    title: 'RFQ AutoPilot Starter',
    desc: 'Automate inbound RFQs with GPT + Make.com. Parse emails → extract specs → generate pricing in minutes.',
    steps: ['Connect email inbox to Make.com', 'Set up GPT extraction prompt', 'Map output to pricing sheet', 'Add Slack/WhatsApp notifications'],
    time: '2–3 hours',
    segment: 'Manufacturing',
  },
  {
    icon: Users,
    title: 'Inbound Lead Qualifier',
    desc: 'Score & route inbound leads automatically using an AI classifier + CRM webhook.',
    steps: ['Create lead intake form', 'Configure AI scoring prompt', 'Set routing rules by score', 'Connect to CRM or Google Sheets'],
    time: '1–2 hours',
    segment: 'SaaS',
  },
  {
    icon: Package,
    title: 'Content Ops Pipeline',
    desc: 'End-to-end content calendar with AI drafting, scheduling, and analytics tracking.',
    steps: ['Set up Notion content calendar', 'Configure AI draft generation', 'Connect to social scheduler', 'Add performance tracking sheet'],
    time: '3–4 hours',
    segment: 'Creator',
  },
];

const templates = [
  { title: 'AI SaaS PRD Template', desc: 'Complete product requirements doc for shipping an AI-powered SaaS.', format: 'Notion / Google Doc', segment: 'SaaS' },
  { title: 'RFQ Automation Spec', desc: 'Technical spec for building an RFQ parsing and pricing agent.', format: 'Google Doc', segment: 'Manufacturing' },
  { title: 'Content Calendar for Creators', desc: 'Weekly/monthly planner with AI prompt slots and analytics columns.', format: 'Notion', segment: 'Creator' },
  { title: 'Manufacturing Ops Checklist', desc: 'Digital transformation checklist for small factory operators.', format: 'Google Sheets', segment: 'Industry 4.0' },
  { title: 'Launch Playbook — AI SaaS', desc: 'Step-by-step checklist from idea to first 10 paying users.', format: 'Notion', segment: 'SaaS' },
  { title: 'Launch Playbook — Agent Product', desc: 'Go-to-market plan for shipping an AI agent to enterprise.', format: 'Notion', segment: 'Automation' },
];

const challengePersonas = ['Solo Founder', 'Freelancer', 'Student Builder', 'SME Operator'] as const;

const CommandDeckPage = () => {
  const [openWorkflow, setOpenWorkflow] = useState<number | null>(null);
  const [challengeForm, setChallengeForm] = useState({ name: '', email: '', persona: '', idea: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeForm.name.trim() || !challengeForm.email.trim() || !challengeForm.idea.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Challenge submitted! We\'ll be in touch within 48 hours.');
      setChallengeForm({ name: '', email: '', persona: '', idea: '' });
    }, 1200);
  };

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            // COMMAND DECK
          </motion.p>
          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mt-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            YOUR OPERATOR LAUNCHPAD
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-4 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Ready-to-use workflows, templates, and a 30-day build challenge — everything a solo operator needs to go from idea to revenue.
          </motion.p>
        </div>

        {/* ── LAUNCHPAD WORKFLOWS ── */}
        <motion.div className="mb-20" {...fadeUp(0.3)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="text-primary" size={16} />
            </div>
            <h2 className="font-display text-xl sm:text-2xl tracking-wide text-foreground">LAUNCHPAD WORKFLOWS</h2>
          </div>
          <p className="text-muted-foreground font-body text-sm sm:text-base mb-8 max-w-2xl">
            Pre-configured agent blueprints with stack suggestions and quick-start steps. Pick one and ship today.
          </p>

          <div className="grid gap-4">
            {workflows.map((wf, i) => {
              const Icon = wf.icon;
              const isOpen = openWorkflow === i;
              return (
                <motion.div
                  key={i}
                  className="glass-card overflow-hidden cursor-pointer group"
                  onClick={() => { setOpenWorkflow(isOpen ? null : i); sfx.click(); }}
                  onMouseEnter={sfx.hover}
                  {...fadeUp(i * 0.08)}
                >
                  <div className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-display text-base sm:text-lg tracking-wide text-foreground group-hover:text-primary transition-colors">
                          {wf.title}
                        </h3>
                        <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/30">
                          {wf.segment}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed">{wf.desc}</p>
                      <div className="flex items-center gap-2 mt-2 text-muted-foreground/60 text-[11px] font-mono">
                        <Clock size={10} /> Setup: {wf.time}
                      </div>
                    </div>
                    <ArrowRight
                      className={`text-muted-foreground/40 flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                      size={16}
                    />
                  </div>
                  {isOpen && (
                    <motion.div
                      className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/50"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.25 }}
                    >
                      <p className="font-mono text-[11px] tracking-wider text-primary/60 mt-4 mb-3">// QUICK-START STEPS</p>
                      <ol className="space-y-2.5">
                        {wf.steps.map((step, si) => (
                          <li key={si} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-mono text-primary">
                              {si + 1}
                            </span>
                            <span className="text-muted-foreground text-sm font-body">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-4 flex gap-3">
                        <Link to="/join" onClick={sfx.click} className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
                          BUILD THIS WITH RYFIO <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── TEMPLATES LIBRARY ── */}
        <motion.div className="mb-20" {...fadeUp(0.3)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="text-primary" size={16} />
            </div>
            <h2 className="font-display text-xl sm:text-2xl tracking-wide text-foreground">TEMPLATES LIBRARY</h2>
          </div>
          <p className="text-muted-foreground font-body text-sm sm:text-base mb-8 max-w-2xl">
            Battle-tested docs, checklists, and blueprints. Download and start building — no setup required.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl, i) => (
              <motion.div
                key={i}
                className="glass-card p-5 group hover:glow-subtle transition-all duration-300 flex flex-col"
                {...fadeUp(i * 0.06)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border bg-muted text-muted-foreground border-border">
                    {tpl.segment}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/50">{tpl.format}</span>
                </div>
                <h3 className="font-display text-sm sm:text-base tracking-wide text-foreground group-hover:text-primary transition-colors mb-2">
                  {tpl.title}
                </h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed mb-4 flex-1">{tpl.desc}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); sfx.click(); toast.info('Template download coming soon — join the waitlist for early access!'); }}
                  onMouseEnter={sfx.hover}
                  className="font-mono text-[11px] tracking-wider text-primary/70 hover:text-primary transition-colors flex items-center gap-1.5 self-start"
                >
                  <Download size={12} /> DOWNLOAD TEMPLATE
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 30-DAY BUILD CHALLENGE ── */}
        <motion.div className="mb-16" {...fadeUp(0.3)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Rocket className="text-primary" size={16} />
            </div>
            <h2 className="font-display text-xl sm:text-2xl tracking-wide text-foreground">30-DAY BUILD CHALLENGE</h2>
          </div>
          <p className="text-muted-foreground font-body text-sm sm:text-base mb-8 max-w-2xl">
            Submit your product idea and get a personalized launch roadmap, template pack, and weekly check-ins from the RYFIO team.
          </p>

          <div className="glass-card p-6 sm:p-8 max-w-2xl">
            <form onSubmit={handleChallengeSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-[11px] tracking-wider text-muted-foreground mb-2">YOUR NAME *</label>
                <input
                  type="text"
                  value={challengeForm.name}
                  onChange={e => setChallengeForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="Dinesh Kumar"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-wider text-muted-foreground mb-2">EMAIL *</label>
                <input
                  type="email"
                  value={challengeForm.email}
                  onChange={e => setChallengeForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="you@example.com"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-wider text-muted-foreground mb-2">WHAT BEST DESCRIBES YOU?</label>
                <div className="flex flex-wrap gap-2">
                  {challengePersonas.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setChallengeForm(f => ({ ...f, persona: p })); sfx.click(); }}
                      className={`text-xs font-mono tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                        challengeForm.persona === p
                          ? 'bg-primary/15 text-primary border-primary/40'
                          : 'text-muted-foreground border-border hover:border-primary/30'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-wider text-muted-foreground mb-2">YOUR PRODUCT IDEA *</label>
                <textarea
                  value={challengeForm.idea}
                  onChange={e => setChallengeForm(f => ({ ...f, idea: e.target.value }))}
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors min-h-[100px] resize-y"
                  placeholder="Describe what you want to build, who it's for, and the problem it solves…"
                  maxLength={1000}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                onMouseEnter={sfx.hover}
                className="btn-primary flex items-center gap-2 min-h-[44px] disabled:opacity-50"
              >
                {submitting ? 'SUBMITTING…' : 'SUBMIT CHALLENGE'} <Send size={14} />
              </button>
            </form>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div className="glass-card p-6 sm:p-8 text-center" {...fadeUp()}>
          <p className="section-label mb-3">// NOT SURE WHERE TO START?</p>
          <p className="text-muted-foreground font-body text-sm sm:text-base mb-5 max-w-md mx-auto">
            Read a briefing, grab a template, or talk to the founder directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/field-notes" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-secondary flex items-center gap-2 justify-center min-h-[44px]">
              <Lightbulb size={14} /> READ BRIEFINGS
            </Link>
            <Link to="/contact" onClick={sfx.click} onMouseEnter={sfx.hover}
              className="btn-secondary flex items-center gap-2 justify-center min-h-[44px]">
              TALK TO FOUNDER <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommandDeckPage;
