import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram } from 'lucide-react';

const ContactPage = () => (
  <section className="min-h-screen py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.p className="section-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        // ESTABLISH UPLINK
      </motion.p>
      <motion.h1
        className="section-title mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        CONTACT
      </motion.h1>
      <motion.p
        className="text-muted-foreground mt-4 mb-16 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Open a channel. Join the conversation. Build with us.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Email */}
        <motion.div
          className="glass-card p-8 text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Mail className="text-primary mb-4" size={28} />
          <h3 className="font-display text-sm tracking-[0.15em] mb-2">EMAIL</h3>
          <a href="mailto:ryfioai@gmail.com" className="text-primary font-mono text-sm hover:underline">
            ryfioai@gmail.com
          </a>
          <p className="text-muted-foreground text-sm mt-2 font-body">
            For detailed inquiries and collaborations.
          </p>
          <a href="mailto:ryfioai@gmail.com" className="btn-cyan inline-block mt-4 text-center">
            SEND EMAIL
          </a>
        </motion.div>

        {/* Instagram */}
        <motion.div
          className="glass-card p-8 text-left"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Instagram className="text-secondary mb-4" size={28} />
          <h3 className="font-display text-sm tracking-[0.15em] mb-2">INSTAGRAM</h3>
          <a
            href="https://www.instagram.com/ryfio.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-mono text-sm hover:underline"
          >
            @ryfio.ai
          </a>
          <p className="text-muted-foreground text-sm mt-2 font-body">
            Follow the build-in-public journey.
          </p>
          <a
            href="https://www.instagram.com/ryfio.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange inline-block mt-4 text-center"
          >
            FOLLOW US
          </a>
        </motion.div>
      </div>

      {/* Location */}
      <motion.div
        className="glass-card p-8 text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <MapPin className="text-accent mb-4" size={28} />
        <h3 className="font-display text-sm tracking-[0.15em] mb-2">LOCATION</h3>
        <p className="text-foreground font-body">Coimbatore, Tamil Nadu, India 🇮🇳</p>
        <p className="text-muted-foreground text-sm mt-2 font-body">
          Operating from the Manchester of South India. Building for the world.
        </p>
        <div className="mt-4 rounded overflow-hidden border border-border">
          <iframe
            title="Coimbatore Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250755.72662498!2d76.8205!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x5765c15e3a36d4b2!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactPage;
