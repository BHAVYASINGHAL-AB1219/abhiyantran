import { motion } from 'framer-motion';
import { ArrowRight, Code, Trophy, Lightbulb, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    icon: Code,
    title: 'Hackathon',
    description: '24-hour coding marathon with amazing prizes',
    color: 'from-primary to-neon-blue',
  },
  {
    icon: Trophy,
    title: 'Coding Contest',
    description: 'Compete with the best coders in the region',
    color: 'from-secondary to-neon-purple',
  },
  {
    icon: Lightbulb,
    title: 'Startup Pitch',
    description: 'Present your ideas to top investors',
    color: 'from-neon-purple to-primary',
  },
  {
    icon: Gamepad2,
    title: 'Gaming Arena',
    description: 'Esports tournaments and gaming challenges',
    color: 'from-neon-blue to-secondary',
  },
];

export const FeaturedEvents = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-display text-sm uppercase tracking-wider">What's Happening</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">
            Featured <span className="text-gradient">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From hackathons to workshops, experience the best of tech innovation
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="glass-hover rounded-2xl p-6 h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <event.icon className="w-7 h-7 text-background" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>

                {/* Link */}
                <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary font-display font-medium hover:gap-3 transition-all"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
