import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
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

const roles = ['AI/ML Engineer', 'Full Stack Developer', 'Manufacturing Operations', 'Business Development', 'Design/Creative', 'Other'];
const experiences = ['0-2 years', '3-5 years', '5+ years', 'Solopreneur/Freelancer'];
const availabilities = ['Immediate', '1 month notice', '2-3 months', 'Exploring opportunities'];

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
    <section className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p className="section-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          // RECRUITMENT PROTOCOL
        </motion.p>
        <motion.h1
          className="section-title mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          JOIN THE MISSION
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-4 mb-12 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          No data stored. Privacy-first transmission via EmailJS.
        </motion.p>

        <AnimatePresence>
          {success && (
            <motion.div
              className="glass-card glow-cyan p-8 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CheckCircle className="text-primary mx-auto mb-4" size={48} />
              <h2 className="font-display text-xl tracking-wider text-primary mb-2">TRANSMISSION COMPLETE</h2>
              <p className="text-muted-foreground text-sm">✓ Application sent successfully</p>
              <p className="text-muted-foreground text-sm">✓ Founder will review and contact you via email</p>
              <p className="text-muted-foreground text-sm mt-2">No data stored. Privacy maintained.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <motion.form
            className="glass-card p-8 text-left space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Name */}
            <div>
              <label className="form-label">Full Name *</label>
              <input {...register('name')} className="form-input" placeholder="Enter your full name" />
              {errors.name && <p className="text-destructive text-xs mt-1 font-mono">{errors.name.message}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="form-label">Mobile Number *</label>
              <input {...register('mobile')} className="form-input" placeholder="+91" />
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
              <select {...register('role')} className="form-input">
                <option value="">Select a role</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <p className="text-destructive text-xs mt-1 font-mono">{errors.role.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="form-label">Experience *</label>
              <div className="grid grid-cols-2 gap-3">
                {experiences.map(e => (
                  <label key={e} className="glass-card p-3 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" value={e} {...register('experience')} className="accent-primary" />
                    <span className="text-sm font-body text-foreground">{e}</span>
                  </label>
                ))}
              </div>
              {errors.experience && <p className="text-destructive text-xs mt-1 font-mono">{errors.experience.message}</p>}
            </div>

            {/* Availability */}
            <div>
              <label className="form-label">Availability *</label>
              <div className="grid grid-cols-2 gap-3">
                {availabilities.map(a => (
                  <label key={a} className="glass-card p-3 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" value={a} {...register('availability')} className="accent-primary" />
                    <span className="text-sm font-body text-foreground">{a}</span>
                  </label>
                ))}
              </div>
              {errors.availability && <p className="text-destructive text-xs mt-1 font-mono">{errors.availability.message}</p>}
            </div>

            {/* Why RYFIO */}
            <div>
              <label className="form-label">Why RYFIO? *</label>
              <textarea {...register('message')} className="form-input min-h-[120px] resize-none" placeholder="Tell us why you want to join..." />
              <div className="flex justify-between mt-1">
                {errors.message && <p className="text-destructive text-xs font-mono">{errors.message.message}</p>}
                <span className={`text-xs font-mono ml-auto ${messageLen > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {messageLen}/500
                </span>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <label className="form-label">Portfolio / LinkedIn *</label>
              <input {...register('portfolio')} className="form-input" placeholder="https://..." />
              {errors.portfolio && <p className="text-destructive text-xs mt-1 font-mono">{errors.portfolio.message}</p>}
            </div>

            {/* Skills */}
            <div>
              <label className="form-label">Skills <span className="text-muted-foreground">(optional)</span></label>
              <textarea {...register('skills')} className="form-input min-h-[80px] resize-none" placeholder="React, Python, ML..." />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-cyan w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                <span className="animate-pulse">TRANSMITTING...</span>
              ) : (
                <>SUBMIT APPLICATION <Send size={16} /></>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default JoinPage;
