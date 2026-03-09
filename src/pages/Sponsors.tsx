import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Handshake } from 'lucide-react';

const sponsors = [
  {
    name: 'Dopamine',
    role: 'Merchandise Partner',
    logo: '/dopamine-logo.png',
    color: 'from-pink-500 to-rose-500',
    url: 'https://thedopaminestore.in/',
  },
  {
    name: 'Summit Times',
    role: 'Media Partner',
    logo: '/summit-media-logo.png',
    color: 'from-sky-400 to-blue-600',
    url: 'https://summittimes.in/home',
  },
  {
      name: 'Ravangla Star',
      role: 'Hospitality Partner',
      logo: '/RavanglaStar.png',
      color: 'from-sky-400 to-blue-600',
      url: '#',
  }
];

const Sponsors = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-sm uppercase tracking-wider">Our Partners</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              Event <span className="text-gradient">Sponsors</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proudly supported by leading companies in technology and innovation
            </p>
          </motion.div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <div className="glass-hover rounded-2xl p-8 md:p-10 text-center flex flex-col items-center justify-center min-h-[260px]">
                    {/* Logo */}
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    {/* Name */}
                    <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {sponsor.name}
                    </h3>
                    {/* Role */}
                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      {sponsor.role}
                    </span>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>

          {/* Become a Sponsor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <div className="glass neon-border rounded-3xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                <Handshake className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Become a <span className="text-gradient">Sponsor</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Partner with us to reach thousands of tech enthusiasts and future leaders.
                Gain visibility and connect with top talent.
              </p>
              <a href="https://wa.me/917488252185" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold glow-cyan"
                >
                  Contact Us
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
