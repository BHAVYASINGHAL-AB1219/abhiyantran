import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Clock, Users, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Technical', 'Non-Technical', 'Workshop', 'Gaming'];

const events = [
  {
    id: 1,
    title: 'Code Wars',
    category: 'Technical',
    description: 'Intense competitive programming challenge. Solve algorithmic problems under time pressure.',
    duration: '3 hours',
    team: '1-2 members',
    venue: 'Lab Complex A',
    prize: '₹50,000',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Hackathon 2025',
    category: 'Technical',
    description: '24-hour hackathon to build innovative solutions for real-world problems.',
    duration: '24 hours',
    team: '2-4 members',
    venue: 'Innovation Hub',
    prize: '₹1,00,000',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'AI/ML Workshop',
    category: 'Workshop',
    description: 'Hands-on workshop on machine learning and artificial intelligence fundamentals.',
    duration: '4 hours',
    team: 'Individual',
    venue: 'Seminar Hall 1',
    prize: 'Certificate',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Valorant Tournament',
    category: 'Gaming',
    description: 'Compete in the ultimate Valorant esports tournament.',
    duration: '2 days',
    team: '5 members',
    venue: 'Gaming Arena',
    prize: '₹30,000',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Debate Competition',
    category: 'Non-Technical',
    description: 'Test your oratory skills in this exciting debate competition.',
    duration: '2 hours',
    team: '2 members',
    venue: 'Auditorium',
    prize: '₹15,000',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Web Dev Bootcamp',
    category: 'Workshop',
    description: 'Learn modern web development with React and Next.js.',
    duration: '6 hours',
    team: 'Individual',
    venue: 'Lab Complex B',
    prize: 'Certificate',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    title: 'Capture The Flag',
    category: 'Technical',
    description: 'Cybersecurity CTF challenge for aspiring hackers.',
    duration: '5 hours',
    team: '1-3 members',
    venue: 'Cyber Lab',
    prize: '₹40,000',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    title: 'Photography Contest',
    category: 'Non-Technical',
    description: 'Showcase your photography skills with tech-themed shots.',
    duration: 'All Day',
    team: 'Individual',
    venue: 'Campus Wide',
    prize: '₹10,000',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
  },
];

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
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  selectedCategory === category
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

                      <Button size="sm" className="w-full font-display group/btn">
                        Register
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
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
