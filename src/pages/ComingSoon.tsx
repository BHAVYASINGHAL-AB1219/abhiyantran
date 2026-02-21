import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title?: string;
}

const ComingSoon = ({ title = 'This Section' }: ComingSoonProps) => {
  return (
    <Layout>
      <section className="py-20 md:py-32 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
              className="mb-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse opacity-40 blur-xl" />
                <div className="relative w-24 h-24 rounded-full glass neon-border flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Clock className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary font-display text-sm uppercase tracking-wider">
                {title}
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
                Coming <span className="text-gradient">Soon</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-muted-foreground text-lg max-w-md mx-auto mb-10"
            >
              We're working hard to finalize this section. Stay tuned for updates!
            </motion.p>

            {/* Decorative dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-2 mb-10"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-primary/60"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>

            {/* Back Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold glow-cyan"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Home
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ComingSoon;
