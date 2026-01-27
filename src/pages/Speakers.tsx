import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Twitter, Linkedin, Globe } from 'lucide-react';

const speakers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'AI Research Lead',
    company: 'Google DeepMind',
    bio: 'Pioneer in artificial general intelligence research with over 15 years of experience.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
  {
    id: 2,
    name: 'Alex Johnson',
    role: 'CTO',
    company: 'Web3 Foundation',
    bio: 'Blockchain expert and advocate for decentralized technologies.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    role: 'ML Engineer',
    company: 'Microsoft Research',
    bio: 'Specializes in natural language processing and computer vision.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
  {
    id: 4,
    name: 'Michael Roberts',
    role: 'Founder & CEO',
    company: 'TechStart Ventures',
    bio: 'Serial entrepreneur who has founded 5 successful startups.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
  {
    id: 5,
    name: 'Emily Davis',
    role: 'VP of Engineering',
    company: 'Meta',
    bio: 'Leading metaverse development and AR/VR innovation.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
  {
    id: 6,
    name: 'Dr. Rajesh Kumar',
    role: 'Professor',
    company: 'IIT Delhi',
    bio: 'Expert in cybersecurity and cryptography.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    social: { twitter: '#', linkedin: '#', website: '#' },
  },
];

const Speakers = () => {
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
            <span className="text-primary font-display text-sm uppercase tracking-wider">Learn From The Best</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              Our <span className="text-gradient">Speakers</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry leaders and experts sharing their knowledge and insights
            </p>
          </motion.div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="glass-hover rounded-2xl p-6 text-center h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-background"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-1">{speaker.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{speaker.company}</p>
                  <p className="text-muted-foreground text-sm flex-1 mb-6">{speaker.bio}</p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {[
                      { icon: Twitter, href: speaker.social.twitter },
                      { icon: Linkedin, href: speaker.social.linkedin },
                      { icon: Globe, href: speaker.social.website },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Speakers;
