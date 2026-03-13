import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, FileText, Zap, Download, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { delay, duration: 0.4 },
});

const workflows = [
  {
    title: 'RFQ AutoPilot Starter',
    desc: 'Automate inbound RFQs — parse emails, extract specs, generate pricing in minutes.',
    segment: 'Manufacturing',
  },
  {
    title: 'Inbound Lead Qualifier',
    desc: 'Score and route leads automatically using an AI classifier and CRM webhook.',
    segment: 'SaaS',
  },
  {
    title: 'Content Ops Pipeline',
    desc: 'AI-powered content calendar with drafting, scheduling, and analytics.',
    segment: 'Creator',
  },
];

const templates = [
  { title: 'AI SaaS PRD', desc: 'Product requirements doc for AI-powered SaaS.', segment: 'SaaS' },
  { title: 'RFQ Automation Spec', desc: 'Technical spec for an RFQ parsing agent.', segment: 'Manufacturing' },
  { title: 'Content Calendar', desc: 'Weekly planner with AI prompt slots.', segment: 'Creator' },
  { title: 'Ops Checklist', desc: 'Digital transformation checklist for factories.', segment: 'Industry 4.0' },
  { title: 'SaaS Launch Playbook', desc: 'From idea to first 10 paying users.', segment: 'SaaS' },
  { title: 'Agent Go-to-Market', desc: 'GTM plan for shipping an AI agent.', segment: 'Automation' },
];

const personas = ['Solo Founder', 'Freelancer', 'Student Builder', 'SME Operator'] as const;

const CommandDeckPage = () => {
  const [form, setForm] = useState({ name: '', email: '', persona: '', idea: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.idea.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Challenge submitted! We'll be in touch within 48 hours.");
      setForm({ name: '', email: '', persona: '', idea: '' });
    }, 1200);
  };

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
            Command Deck
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            Workflows, templates, and a build challenge — everything you need to go from idea to revenue.
          </p>
        </motion.div>

        {/* Workflows */}
        <motion.div className="mb-20" {...fadeUp(0.1)}>
          <div className="flex items-center gap-2.5 mb-6">
            <Zap className="text-primary" size={20} />
            <h2 className="font-display text-2xl tracking-wide text-foreground">Workflows</h2>
          </div>

          <div className="grid gap-3">
            {workflows.map((wf, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="font-display text-lg text-foreground">{wf.title}</h3>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/10">
                      {wf.segment}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{wf.desc}</p>
                </div>
                <Link to="/join" className="text-primary text-sm font-mono hover:underline whitespace-nowrap mt-1">
                  Start →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Templates */}
        <motion.div className="mb-20" {...fadeUp(0.15)}>
          <div className="flex items-center gap-2.5 mb-6">
            <FileText className="text-primary" size={20} />
            <h2 className="font-display text-2xl tracking-wide text-foreground">Templates</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map((tpl, i) => (
              <div key={i} className="glass-card p-5 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground/60 mb-2">{tpl.segment}</span>
                <h3 className="font-display text-base text-foreground mb-1.5">{tpl.title}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-3">{tpl.desc}</p>
                <button
                  onClick={() => toast.info('Coming soon — join the waitlist for early access.')}
                  className="text-primary text-xs font-mono flex items-center gap-1.5 hover:underline self-start"
                >
                  <Download size={12} /> Download
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 30-Day Build Challenge */}
        <motion.div className="mb-20" {...fadeUp(0.2)}>
          <div className="flex items-center gap-2.5 mb-6">
            <Rocket className="text-primary" size={20} />
            <h2 className="font-display text-2xl tracking-wide text-foreground">30-Day Build Challenge</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6 max-w-lg">
            Submit your idea and get a personalized roadmap, templates, and weekly check-ins.
          </p>

          <form onSubmit={handleSubmit} className="glass-card p-6 max-w-lg space-y-4">
            <div>
              <label className="block text-xs font-mono tracking-wider text-muted-foreground mb-1.5">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-mono tracking-wider text-muted-foreground mb-1.5">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono tracking-wider text-muted-foreground mb-1.5">You are a…</label>
              <div className="flex flex-wrap gap-2">
                {personas.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, persona: p }))}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                      form.persona === p
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
              <label className="block text-xs font-mono tracking-wider text-muted-foreground mb-1.5">Your idea *</label>
              <textarea
                value={form.idea}
                onChange={e => setForm(f => ({ ...f, idea: e.target.value }))}
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[80px] resize-y"
                placeholder="What do you want to build and who is it for?"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit'} <Send size={14} />
            </button>
          </form>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className="text-center" {...fadeUp()}>
          <p className="text-muted-foreground text-sm mb-4">Not sure where to start?</p>
          <div className="flex gap-3 justify-center">
            <Link to="/field-notes" className="btn-secondary flex items-center gap-2">
              Read Briefings
            </Link>
            <Link to="/contact" className="btn-secondary flex items-center gap-2">
              Talk to Founder <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommandDeckPage;
