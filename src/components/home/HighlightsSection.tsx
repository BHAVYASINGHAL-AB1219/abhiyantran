import { motion } from 'framer-motion';
import { Mic2, Award, Rocket, Globe } from 'lucide-react';

const highlights = [
  {
    icon: Mic2,
    title: '20+ Expert Speakers',
    description: 'Industry leaders sharing insights',
  },
  {
    icon: Award,
    title: '₹10L+ in Prizes',
    description: 'Win amazing rewards and goodies',
  },
  {
    icon: Rocket,
    title: '50+ Workshops',
    description: 'Hands-on learning experiences',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with tech enthusiasts worldwide',
  },
];

export const HighlightsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass neon-border rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
