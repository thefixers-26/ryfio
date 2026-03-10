import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Users, Gift, Zap, Shield, FileText, UserCheck, MessageSquare, Rocket, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { sfx } from '@/hooks/useSfx';

const schema = z.object({
  name: z.string().trim().min(2, 'Min 2 characters').max(100),
  mobile: z.string().trim().regex(/^\+?\d{10,15}$/, 'Valid phone (10-15 digits)'),
  email: z.string().trim().email('Valid email required').max(255),
  role: z.string().min(1, 'Select a role'),
  experience: z.string().min(1, 'Select experience'),
  availability: z.string().min(1, 'Select availability'),
  message: z.string().trim().min(50, 'Min 50 characters').max(500, 'Max 500 characters'),
  portfolio: z.string().trim().url('Valid URL required'),
  skills: z.string().max(300).optional(),
});

type FormData = z.infer<typeof schema>;

const roles = [
  { value: 'AI/ML Engineer', label: 'AI/ML Engineer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'Manufacturing Operations', label: 'Manufacturing Operations' },
  { value: 'Business Development', label: 'Business Development' },
  { value: 'Design/Creative', label: 'Design / Creative' },
  { value: 'Community / Ops', label: 'Community / Ops' },
  { value: 'Other', label: 'Other' },
];

const experiences = [
  { value: 'Student / Fresher', label: 'Student / Fresher' },
  { value: '0-2 years', label: '0–2 years' },
  { value: '3-5 years', label: '3–5 years' },
  { value: '5+ years', label: '5+ years' },
  { value: 'Solopreneur/Freelancer', label: 'Solopreneur / Freelancer' },
];

const availabilities = [
  { value: 'Immediate', label: 'Immediate', note: '0–2 weeks' },
  { value: '1 month notice', label: '1 month notice', note: '~30 days' },
  { value: '2-3 months', label: '2–3 months', note: 'Flexible start' },
  { value: 'Exploring opportunities', label: 'Exploring', note: 'Just looking' },
];

const whatYouGet = [
  { icon: Rocket, text: 'Build real products used by solopreneurs.' },
  { icon: Users, text: 'Direct access to founder, zero bureaucracy.' },
  { icon: Gift, text: 'Ship under your own name — build your portfolio & personal brand.' },
  { icon: Zap, text: 'Potential ESOP / equity for long-term core contributors.' },
];

const recruitmentSteps = [
  { step: '01', icon: Send, title: 'SUBMIT SIGNAL', desc: 'Fill this form — takes 3 minutes.' },
  { step: '02', icon: UserCheck, title: 'FOUNDER REVIEW', desc: 'Reviewed within 72 hours.' },
  { step: '03', icon: MessageSquare, title: 'ASYNC TASK / CALL', desc: 'Short task or intro call.' },
  { step: '04', icon: Shield, title: 'TRIAL SPRINT', desc: 'Trial sprint, then core team invite.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { delay, duration: 0.5 },
});

const JoinPage = () => {
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const messageLen = (watch('message') || '').length;

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      await emailjs.send('service_w941zax', 'template_q2uypfa', {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        role: data.role,
        experience: data.experience,
        availability: data.availability,
        message: data.message,
        portfolio: data.portfolio,
        skills: data.skills || 'Not provided',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }, 'M-LwCs_cNASdySqmG');
      setSuccess(true); sfx.success();
      setTimeout(() => { setSuccess(false); reset(); }, 5000);
    } catch {
      toast.error('Transmission failed. Try emailing ryfioai@gmail.com directly.'); sfx.error();
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <motion.p className="section-label" {...fadeUp()}>// RECRUITMENT PROTOCOL</motion.p>
          <motion.h1 className="section-title mt-4" {...fadeUp(0.15)}>JOIN THE MISSION</motion.h1>
          <motion.p className="text-muted-foreground mt-4 mb-10 font-body text-sm sm:text-base px-2 content-narrow mx-auto" {...fadeUp(0.3)}>
            We're assembling a small, focused crew of builders who want to ship real products for real solopreneurs. If you're tired of theory and want to build in public, this is your command deck.
          </motion.p>
        </div>

        {/* Who we're looking for */}
        <motion.div className="glass-card p-6 sm:p-8 mb-6" {...fadeUp(0.4)}>
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-primary" size={22} />
            <h2 className="font-display text-sm sm:text-base tracking-[0.12em] text-primary">WHO WE'RE LOOKING FOR</h2>
          </div>
          <ul className="space-y-2.5 text-muted-foreground font-body text-sm leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              Early builders obsessed with AI, manufacturing, and solopreneur tools.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              People comfortable with ambiguity, experimentation, and building in public.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              Part-time, remote-friendly; internships and co-founder-track roles open.
            </li>
          </ul>
        </motion.div>

        {/* What you get */}
        <motion.div className="glass-card p-6 sm:p-8 mb-6" {...fadeUp(0.5)}>
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-primary" size={22} />
            <h2 className="font-display text-sm sm:text-base tracking-[0.12em] text-primary">WHAT YOU GET</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatYouGet.map(item => (
              <div key={item.text} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <item.icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recruitment Protocol Steps */}
        <motion.div className="glass-card p-6 sm:p-8 mb-10" {...fadeUp(0.6)}>
          <div className="flex items-center gap-3 mb-5">
            <FileText className="text-primary" size={22} />
            <h2 className="font-display text-sm sm:text-base tracking-[0.12em] text-primary">RECRUITMENT PROTOCOL</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recruitmentSteps.map(s => (
              <div key={s.step} className="text-center p-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                  <s.icon size={16} className="text-primary" />
                </div>
                <p className="font-mono text-[10px] text-primary/60 tracking-widest mb-1">STEP {s.step}</p>
                <p className="font-display text-[11px] tracking-wider text-foreground mb-1">{s.title}</p>
                <p className="text-muted-foreground text-[10px] font-body leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Success state */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="glass-card glow-cyan p-6 sm:p-8 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CheckCircle className="text-primary mx-auto mb-4" size={48} />
              <h2 className="font-display text-lg sm:text-xl tracking-wider text-primary mb-2 text-center">TRANSMISSION COMPLETE</h2>
              <p className="text-muted-foreground text-sm text-center">✓ Application sent successfully</p>
              <p className="text-muted-foreground text-sm text-center">✓ Founder will review within 72 hours and contact you via email</p>
              <p className="text-muted-foreground text-sm mt-2 text-center">No data stored. Privacy maintained.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {!success && (
          <motion.form
            className="glass-card p-5 sm:p-8 text-left space-y-5 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            {...fadeUp(0.7)}
          >
            <p className="font-mono text-[10px] text-primary/60 tracking-widest text-center mb-2">▸ STEP 01 — SUBMIT SIGNAL</p>

            {/* Name */}
            <div>
              <label className="form-label">Full Name *</label>
              <input {...register('name')} className="form-input" placeholder="Enter your full name" />
              {errors.name && <p className="text-destructive text-xs mt-1 font-mono">{errors.name.message}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="form-label">Mobile Number *</label>
              <input {...register('mobile')} className="form-input" placeholder="+91 98765 43210" />
              {errors.mobile && <p className="text-destructive text-xs mt-1 font-mono">{errors.mobile.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address *</label>
              <input {...register('email')} type="email" className="form-input" placeholder="your@email.com" />
              {errors.email && <p className="text-destructive text-xs mt-1 font-mono">{errors.email.message}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="form-label">Role *</label>
              <p className="text-muted-foreground text-[11px] font-body mb-2">Choose the role that best matches how you want to contribute.</p>
              <select {...register('role')} className="form-input">
                <option value="">Select a role</option>
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              {errors.role && <p className="text-destructive text-xs mt-1 font-mono">{errors.role.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="form-label">Experience Level *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experiences.map(e => (
                  <label key={e.value} className="glass-card p-3 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" value={e.value} {...register('experience')} className="accent-primary" />
                    <span className="text-sm font-body text-foreground">{e.label}</span>
                  </label>
                ))}
              </div>
              {errors.experience && <p className="text-destructive text-xs mt-1 font-mono">{errors.experience.message}</p>}
            </div>

            {/* Availability */}
            <div>
              <label className="form-label">Availability *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availabilities.map(a => (
                  <label key={a.value} className="glass-card p-3 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" value={a.value} {...register('availability')} className="accent-primary" />
                    <div>
                      <span className="text-sm font-body text-foreground">{a.label}</span>
                      <span className="text-[10px] text-muted-foreground font-mono ml-2">({a.note})</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.availability && <p className="text-destructive text-xs mt-1 font-mono">{errors.availability.message}</p>}
            </div>

            {/* Why RYFIO */}
            <div>
              <label className="form-label">Why RYFIO and why you? *</label>
              <p className="text-muted-foreground text-[11px] font-body mb-2">Share 3–5 lines about your story, motivation, and what you want to build.</p>
              <textarea {...register('message')} className="form-input min-h-[120px] resize-none" placeholder="What excites you about building for solopreneurs? What have you shipped before?" />
              <div className="flex justify-between mt-1">
                {errors.message && <p className="text-destructive text-xs font-mono">{errors.message.message}</p>}
                <span className={`text-xs font-mono ml-auto ${messageLen > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {messageLen}/500
                </span>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <label className="form-label">GitHub, Portfolio, or LinkedIn *</label>
              <input {...register('portfolio')} className="form-input" placeholder="https://github.com/you or https://linkedin.com/in/you" />
              {errors.portfolio && <p className="text-destructive text-xs mt-1 font-mono">{errors.portfolio.message}</p>}
            </div>

            {/* Skills */}
            <div>
              <label className="form-label">Skills <span className="text-muted-foreground">(optional)</span></label>
              <textarea {...register('skills')} className="form-input min-h-[80px] resize-none" placeholder="Tech, tools, and strengths (e.g., React, Python, Figma, community ops…)" />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-cyan w-full flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
            >
              {sending ? (
                <span className="animate-pulse">TRANSMITTING...</span>
              ) : (
                <>SUBMIT APPLICATION <Send size={16} /></>
              )}
            </button>

            <p className="text-muted-foreground text-[10px] font-mono text-center tracking-wider leading-relaxed">
              No data stored. Privacy-first transmission via EmailJS.<br />
              <span className="text-muted-foreground/70">Used only to contact you regarding RYFIO opportunities.</span>
            </p>
          </motion.form>
        )}
        {/* FAQ Section */}
        <motion.div className="glass-card p-6 sm:p-8 mt-12" {...fadeUp(0.8)}>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-primary" size={22} />
            <h2 className="font-display text-base sm:text-lg tracking-[0.12em] text-primary">FREQUENTLY ASKED</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="paid" className="border-primary/10">
              <AccordionTrigger className="font-display text-base sm:text-lg tracking-wide text-foreground hover:text-primary hover:no-underline py-5">
                Is this paid?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed pb-5">
                Early contributors work on a <span className="text-primary font-semibold">project-based or equity-track</span> model — not a traditional salary. 
                Core team members who stay through the trial sprint are offered ESOP / revenue-share arrangements. 
                Think of it as co-building a company, not joining one.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="parttime" className="border-primary/10">
              <AccordionTrigger className="font-display text-base sm:text-lg tracking-wide text-foreground hover:text-primary hover:no-underline py-5">
                Can I join part-time while studying or working?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed pb-5">
                <span className="text-primary font-semibold">Absolutely.</span> Most of our early crew are students, freelancers, or people with day jobs. 
                We value <span className="text-primary">consistent output over clocked hours</span> — 10–15 hrs/week of focused shipping beats 40 hrs of meetings. 
                Internship-track roles are also available for students.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="remote" className="border-primary/10">
              <AccordionTrigger className="font-display text-base sm:text-lg tracking-wide text-foreground hover:text-primary hover:no-underline py-5">
                Do you accept remote collaborators outside India?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed pb-5">
                <span className="text-primary font-semibold">Yes — RYFIO is fully remote.</span> We're built in Coimbatore but designed for the world. 
                All you need is a reliable internet connection, async communication skills, and the drive to ship. 
                We work across time zones with a bias toward IST overlap for syncs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="stack" className="border-primary/10">
              <AccordionTrigger className="font-display text-base sm:text-lg tracking-wide text-foreground hover:text-primary hover:no-underline py-5">
                What tech stack does RYFIO use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed pb-5">
                Our core stack includes <span className="text-primary font-semibold">React, TypeScript, Tailwind CSS, Supabase, and Python</span> for AI/ML pipelines. 
                We also use <span className="text-primary">Framer Motion</span> for UI, <span className="text-primary">OpenAI / Gemini APIs</span> for agent workflows, 
                and various automation tools like Make and n8n. We pick the right tool for each product — no dogma, just results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
};

export default JoinPage;
