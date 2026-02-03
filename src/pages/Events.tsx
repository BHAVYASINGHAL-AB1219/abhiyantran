import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Clock, Users, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events, categories } from '@/data/eventsData';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-display text-sm uppercase tracking-wider">Explore</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              Our <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from 50+ exciting events across various categories
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'glass-hover text-foreground/70 hover:text-foreground'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                        {event.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {event.description}
                      </p>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-primary" />
                          <span>{event.team}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-primary" />
                          <span>{event.prize}</span>
                        </div>
                      </div>

                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" className="w-full font-display group/btn">
                          Register
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;

