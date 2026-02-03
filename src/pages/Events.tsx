import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Clock, Users, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Technical', 'Non-Technical', 'Workshop', 'Gaming'];

const events = [
  {
    id: 2,
    title: 'Hackathon 2025',
    category: 'Technical',
    description: '24-hour hackathon to build innovative solutions for real-world problems.',
    duration: '24 hours',
    team: '2-4 members',
    venue: 'Innovation Hub',
    prize: '₹50,000',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  },
  // Technical events
  {
    id: 9,
    title: 'Robo War',
    category: 'Technical',
    description: 'Battle of bots! Build and compete with your robot in an intense arena combat.',
    duration: '3 hours',
    team: '2-4 members',
    venue: 'Robotics Arena',
    prize: '₹30,000',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860b7b1e2?w=400&h=300&fit=crop',
  },
  {
    id: 10,
    title: 'Drone Racing Championship',
    category: 'Technical',
    description: 'High-speed FPV drone racing through challenging obstacle courses.',
    duration: '4 hours',
    team: 'Individual',
    venue: 'Outdoor Arena',
    prize: '₹20,000',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
  },
  {
    id: 11,
    title: 'Sand Rover',
    category: 'Technical',
    description: 'Design and build a rover that can navigate sandy terrain. Test your mechanical and control skills.',
    duration: '5 hours',
    team: '2-3 members',
    venue: 'Sand Arena',
    prize: '₹30,000',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    title: 'Technical Treasure Hunt',
    category: 'Technical',
    description: 'Solve technical puzzles and clues to find hidden treasures across the campus.',
    duration: '3 hours',
    team: '2-4 members',
    venue: 'Campus Wide',
    prize: '₹20,000',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  },
  {
    id: 13,
    title: 'Hydraulic Arm',
    category: 'Technical',
    description: 'Build a working hydraulic arm using syringes and demonstrate precision control.',
    duration: '4 hours',
    team: '2-3 members',
    venue: 'Workshop Hall',
    prize: '₹40,000',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
  },
  {
    id: 14,
    title: 'Circuit Debugging',
    category: 'Technical',
    description: 'Find and fix faults in electronic circuits under time pressure. Test your electronics expertise.',
    duration: '2 hours',
    team: '1-2 members',
    venue: 'Electronics Lab',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 15,
    title: 'Anadigix',
    category: 'Technical',
    description: 'Analog and digital electronics challenge. Design and implement circuits to solve given problems.',
    duration: '4 hours',
    team: '2 members',
    venue: 'Electronics Lab',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
  },
  {
    id: 16,
    title: 'Black Box',
    category: 'Technical',
    description: 'Analyze unknown components or problems and identify their function using logic and technical knowledge.',
    duration: '2–3 Hours',
    team: 'Team of 2–3 Members',
    venue: 'Announced Later',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39714a1d9?w=400&h=300&fit=crop',
  },
  // Gaming
  {
    id: 17,
    title: 'Esports Gaming Tournament',
    category: 'Gaming',
    description: 'Compete in our premier esports gaming tournament. Multiple games, fierce competition, great prizes.',
    duration: '2 days',
    team: 'Solo/Team',
    venue: 'Gaming Arena',
    prize: '₹40,000',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
  },
  {
    id: 18,
    title: 'B-Plan',
    category: 'Non-Technical',
    description: 'Pitch your bold startup ideas and innovative solutions to prove their real-world potential.',
    duration: '20 min per team',
    team: '1-4 members',
    venue: 'will be announced later',
    prize: 'Incubation support and mentorship under NIT Sikkim Incubation Centre.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  },
  {
    id: 19,
    title: 'Maths Olympiad',
    category: 'Non-Technical',
    description: 'Maths Olympiad is your chance to challenge your mind, solve exciting problems, and prove your mathematical skills against top competitors.',
    duration: '3 - Hours',
    team: '1 Member',
    venue: 'Announced Later',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
  },
  {
    id: 20,
    title: 'Line Follower',
    category: 'Technical',
    description: 'Design and construct an autonomous robot capable of following a black line on a white background with speed and precision.',
    duration: '3 - Hours',
    team: '2-4 Member',
    venue: 'Announce Later',
    prize: '₹20,000',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/40365_Line_Follower_Robot.jpg',
  },
  {
    id: 21,
    title: 'Indian Case Challenge',
    category: 'Non-Technical',
    description: 'Solve real-world business or social case problems and present practical, impactful solutions.',
    duration: '2–3 Hours',
    team: 'Team of 2–4 Members',
    venue: 'Announced Later',
    prize: '₹30,000',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
  },
  {
    id: 22,
    title: 'Best of Waste',
    category: 'Non-Technical',
    description: 'Turn waste materials into creative and useful products through innovation and design.',
    duration: '4-6 Hours',
    team: 'Team of 2–3 Members',
    venue: 'Announced Later',
    prize: '₹10,000',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
  },
  {
    id: 23,
    title: 'Bridge It',
    category: 'Technical',
    description: 'Design and build a strong and efficient bridge model under given constraints.',
    duration: '2–3 Hours',
    team: 'Team of 2–4 Members',
    venue: 'Announced Later',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1598223631980-60b6b0808381?w=400&h=300&fit=crop',
  },
  {
    id: 24,
    title: 'Seismic Building Design',
    category: 'Technical',
    description: 'Design an earthquake-resistant building model focusing on structural stability and safety.',
    duration: '2–3 Hours',
    team: 'Individual Participation',
    venue: 'Announced Later',
    prize: '₹10,000',
    image: 'https://images.unsplash.com/photo-1590059902640-c322b7d2f9d6?w=400&h=300&fit=crop',
  },
  {
    id: 25,
    title: 'Tech Exhibition',
    category: 'Technical',
    description: 'Showcase innovative projects, prototypes, or technical models demonstrating creativity and practical application of technology.',
    duration: '3–4 Hours (or Full Day Display)',
    team: 'Team of 2–4 Members',
    venue: 'Announced Later',
    prize: 'Trophy + Gifts',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
  },
  {
    id: 26,
    title: 'Town Planning',
    category: 'Technical',
    description: 'Design a smart and sustainable town layout focusing on infrastructure, planning, and resource management.',
    duration: '2–3 Hours',
    team: 'Team of 2–4 Members',
    venue: 'Announced Later',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
  },
  {
    id: 27,
    title: 'JAM (Just A Minute)',
    category: 'Non-Technical',
    description: 'Speak on a given topic for one minute to test confidence, spontaneity, and communication skills.',
    duration: '1–2 Hours (Depending on Rounds)',
    team: 'Individual Participation',
    venue: 'Announced Later',
    prize: 'Trophy + Gifts',
    image: 'https://images.unsplash.com/photo-1478737270239-2f52b06c6c22?w=400&h=300&fit=crop',
  },
  {
    id: 28,
    title: 'Autocat',
    category: 'Technical',
    description: 'Design or demonstrate automation-based solutions showcasing innovation and technical skills.',
    duration: '2–3 Hours',
    team: 'Team of 2–4 Members',
    venue: 'Announced Later',
    prize: '₹5,000',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop',
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
