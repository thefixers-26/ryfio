import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Instagram, Send, CheckCircle, Clock, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { sfx } from '@/hooks/useSfx';

const schema = z.object({
  name: z.string().trim().min(2, 'Min 2 characters').max(100),
  email: z.string().trim().email('Valid email required'),
  inquiryType: z.string().min(1, 'Select inquiry type'),
  message: z.string().trim().min(20, 'Min 20 characters').max(1000, 'Max 1000 characters'),
});

type FormData = z.infer<typeof schema>;

const inquiryTypes = [
  'Platform & Templates Access',
  'Co-Build a Product with RYFIO',
  'AI Integration for My Business',
  'Partnership / Collaboration',
  'General Inquiry',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const ContactPage = () => {
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
        email: data.email,
        role: data.inquiryType,
        message: data.message,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }, 'M-LwCs_cNASdySqmG');
      setSuccess(true);
      sfx.success();
      setTimeout(() => { setSuccess(false); reset(); }, 5000);
    } catch {
      toast.error('Transmission failed. Try emailing ryfioai@gmail.com directly.');
      sfx.error();
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          // ESTABLISH UPLINK
        </motion.p>
        <motion.h1
          className="section-title mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          OPEN A CHANNEL
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-4 mb-12 font-body text-sm sm:text-base content-narrow mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Whether you're a solopreneur, SME, or potential collaborator — we'd love to hear from you.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-6 text-left">
          {/* Contact form — takes 3 cols */}
          <div className="lg:col-span-3">
            <AnimatePresence>
              {success && (
                <motion.div
                  className="glass-card glow-subtle p-6 sm:p-8 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                  <h2 className="font-display text-lg tracking-wider text-primary mb-2 text-center">TRANSMISSION COMPLETE</h2>
                  <p className="text-muted-foreground text-sm text-center">We'll reply within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!success && (
              <motion.form
                className="glass-card p-5 sm:p-8 space-y-5"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs text-primary tracking-[0.2em]">UPLINK FORM</span>
                </div>

                <div>
                  <label className="form-label">Name *</label>
                  <input {...register('name')} className="form-input" placeholder="Your name" />
                  {errors.name && <p className="text-destructive text-xs mt-1 font-mono">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="form-label">Email *</label>
                  <input {...register('email')} type="email" className="form-input" placeholder="your@email.com" />
                  {errors.email && <p className="text-destructive text-xs mt-1 font-mono">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="form-label">Inquiry Type *</label>
                  <select {...register('inquiryType')} className="form-input">
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.inquiryType && <p className="text-destructive text-xs mt-1 font-mono">{errors.inquiryType.message}</p>}
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea {...register('message')} className="form-input min-h-[140px] resize-none" placeholder="Tell us what you're working on or how we can help..." />
                  <div className="flex justify-between mt-1">
                    {errors.message && <p className="text-destructive text-xs font-mono">{errors.message.message}</p>}
                    <span className={`text-xs font-mono ml-auto ${messageLen > 1000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {messageLen}/1000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
                >
                  {sending ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>SEND TRANSMISSION <Send size={16} /></>
                  )}
                </button>

                <p className="text-muted-foreground text-[10px] font-mono text-center tracking-wider">
                  No data stored. Privacy-first transmission via EmailJS.
                </p>
              </motion.form>
            )}
          </div>

          {/* Sidebar info — takes 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {/* Response time */}
            <motion.div className="glass-card p-5" {...fadeUp(0.5)}>
              <Clock className="text-primary mb-3" size={22} />
              <h3 className="font-display text-xs tracking-[0.15em] mb-1.5">RESPONSE TIME</h3>
              <p className="text-muted-foreground text-sm font-body">
                We reply within <span className="text-primary font-semibold">24 hours</span>. Serious inquiries get priority.
              </p>
            </motion.div>

            {/* Email */}
            <motion.div className="glass-card p-5" {...fadeUp(0.6)}>
              <Mail className="text-primary mb-3" size={22} />
              <h3 className="font-display text-xs tracking-[0.15em] mb-1.5">EMAIL</h3>
              <a href="mailto:ryfioai@gmail.com" className="text-primary font-mono text-sm hover:underline">
                ryfioai@gmail.com
              </a>
              <p className="text-muted-foreground text-xs mt-1 font-body">
                For detailed inquiries and collaborations.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div className="glass-card p-5" {...fadeUp(0.7)}>
              <MapPin className="text-primary mb-3" size={22} />
              <h3 className="font-display text-xs tracking-[0.15em] mb-1.5">LOCATION</h3>
              <p className="text-foreground font-body text-sm">Coimbatore, Tamil Nadu, India 🇮🇳</p>
              <p className="text-muted-foreground text-xs mt-1 font-body">
                The Manchester of South India.
              </p>
            </motion.div>

            {/* Socials */}
            <motion.div className="glass-card p-5" {...fadeUp(0.8)}>
              <h3 className="font-display text-xs tracking-[0.15em] mb-3">CONNECT</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/ryfio.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 hover:glow-subtle transition-all flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary"
                >
                  <Instagram size={16} /> @ryfio.ai
                </a>
                <a
                  href="https://x.com/ryfioai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 hover:glow-subtle transition-all flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary"
                >
                  <Twitter size={16} /> @ryfioai
                </a>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div className="glass-card overflow-hidden" {...fadeUp(0.9)}>
              <iframe
                title="Coimbatore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250755.72662498!2d76.8205!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x5765c15e3a36d4b2!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Co-Build section */}
            <motion.div className="glass-card p-5" {...fadeUp(1.0)}>
              <h3 className="font-display text-xs tracking-[0.15em] mb-3">CO-BUILD WITH RYFIO</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">
                We partner with SMEs and solopreneurs to build AI-powered products. Revenue-share or fixed engagement models available.
              </p>
              <ul className="space-y-1.5 text-muted-foreground text-xs font-body">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Revenue-share: We build, you own, we share growth.</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Fixed build: Scoped AI product delivery in 4–8 weeks.</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Pilot sprint: 2-week proof-of-concept for your use case.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
