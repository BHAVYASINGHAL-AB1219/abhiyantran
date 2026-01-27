import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Star, Gem, Award, Medal } from 'lucide-react';

const sponsorTiers = [
  {
    tier: 'Platinum',
    icon: Gem,
    color: 'from-cyan-400 to-blue-500',
    sponsors: [
      { name: 'TechCorp', logo: 'TC' },
      { name: 'InnovateLabs', logo: 'IL' },
    ],
  },
  {
    tier: 'Gold',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    sponsors: [
      { name: 'DevStudio', logo: 'DS' },
      { name: 'CloudBase', logo: 'CB' },
      { name: 'DataFlow', logo: 'DF' },
    ],
  },
  {
    tier: 'Silver',
    icon: Award,
    color: 'from-gray-300 to-gray-500',
    sponsors: [
      { name: 'WebWorks', logo: 'WW' },
      { name: 'CodeCraft', logo: 'CC' },
      { name: 'AppForge', logo: 'AF' },
      { name: 'ByteBuilders', logo: 'BB' },
    ],
  },
  {
    tier: 'Bronze',
    icon: Medal,
    color: 'from-orange-400 to-amber-600',
    sponsors: [
      { name: 'StartupX', logo: 'SX' },
      { name: 'TechHub', logo: 'TH' },
      { name: 'CodeLab', logo: 'CL' },
      { name: 'DevHouse', logo: 'DH' },
      { name: 'InnoSpace', logo: 'IS' },
    ],
  },
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

          {/* Sponsor Tiers */}
          <div className="space-y-16">
            {sponsorTiers.map((tier, tierIndex) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tierIndex * 0.1 }}
              >
                {/* Tier Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                    <tier.icon className="w-5 h-5 text-background" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">{tier.tier} Sponsors</h2>
                </div>

                {/* Sponsors Grid */}
                <div className={`grid gap-6 ${
                  tier.tier === 'Platinum' ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
                  tier.tier === 'Gold' ? 'grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto' :
                  'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
                }`}>
                  {tier.sponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tierIndex * 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <div className={`glass-hover rounded-2xl p-6 md:p-8 text-center aspect-[4/3] flex flex-col items-center justify-center ${
                        tier.tier === 'Platinum' ? 'min-h-[180px]' : ''
                      }`}>
                        {/* Logo Placeholder */}
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                          tier.tier === 'Platinum' ? 'w-20 h-20 md:w-24 md:h-24' : ''
                        }`}>
                          <span className={`font-display font-bold text-background ${
                            tier.tier === 'Platinum' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                          }`}>
                            {sponsor.logo}
                          </span>
                        </div>
                        <span className={`font-display font-semibold text-foreground/80 group-hover:text-foreground transition-colors ${
                          tier.tier === 'Platinum' ? 'text-lg' : 'text-sm md:text-base'
                        }`}>
                          {sponsor.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
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
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Become a <span className="text-gradient">Sponsor</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Partner with us to reach thousands of tech enthusiasts and future leaders. 
                Gain visibility and connect with top talent.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold glow-cyan"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
