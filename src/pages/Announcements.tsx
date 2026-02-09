import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Bell, Pin, Calendar, AlertCircle, Info, CheckCircle } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'Registration Deadline Extended!',
    content: 'Good news! The registration deadline for all events has been extended to March 10, 2025. Don\'t miss your chance to participate in ABHIYANTRAN, NIT Sikkim\'s annual tech fest.',
    date: 'January 25, 2025',
    type: 'important',
    pinned: true,
  },
  {
    id: 2,
    title: 'Hackathon Problem Statements Released',
    content: 'The problem statements for Hackathon are now live! Check out the challenges and start preparing your innovative solutions.',
    date: 'January 24, 2025',
    type: 'info',
    pinned: true,
  },
  {
    id: 3,
    title: 'New Speaker Announcement: Dr. Sarah Chen',
    content: 'We are excited to announce Dr. Sarah Chen from Google DeepMind as our keynote speaker. She will be sharing insights on the Future of AI.',
    date: 'January 23, 2025',
    type: 'success',
    pinned: false,
  },
  {
    id: 5,
    title: 'Accommodation Available',
    content: 'Limited accommodation is available for outstation participants. Book your stay at our partner hotels at discounted rates.',
    date: 'January 20, 2025',
    type: 'info',
    pinned: false,
  },
  {
    id: 6,
    title: 'Workshop Registrations Open',
    content: 'Registrations for all workshops are now open. Limited seats available!',
    date: 'January 18, 2025',
    type: 'info',
    pinned: false,
  },
  {
    id: 7,
    title: 'Prize Pool Increased to ₹15L',
    content: 'Thanks to our generous sponsors, the total prize pool has been increased to ₹15 lakhs. More reasons to participate and win!',
    date: 'January 15, 2025',
    type: 'success',
    pinned: false,
  },
];

const typeConfig: Record<string, { icon: typeof AlertCircle; color: string; bg: string }> = {
  important: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
  warning: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/20' },
};

const Announcements = () => {
  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const regularAnnouncements = announcements.filter(a => !a.pinned);

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
            <span className="text-primary font-display text-sm uppercase tracking-wider">Stay Updated</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              <span className="text-gradient">Announcements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest updates, news, and important information about ABHIYANTRAN
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Pinned Announcements */}
            {pinnedAnnouncements.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Pin className="w-4 h-4 text-primary" />
                  <span className="font-display text-sm text-primary uppercase tracking-wider">Pinned</span>
                </div>
                <div className="space-y-4">
                  {pinnedAnnouncements.map((announcement, index) => {
                    const config = typeConfig[announcement.type];
                    return (
                      <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass neon-border rounded-2xl p-6 relative overflow-hidden"
                      >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                              <config.icon className={`w-5 h-5 ${config.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-display text-lg font-semibold">{announcement.title}</h3>
                                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">Pinned</span>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">{announcement.content}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{announcement.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regular Announcements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="font-display text-sm text-muted-foreground uppercase tracking-wider">Recent Updates</span>
              </div>
              <div className="space-y-4">
                {regularAnnouncements.map((announcement, index) => {
                  const config = typeConfig[announcement.type];
                  return (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pinnedAnnouncements.length * 0.1 + index * 0.05 }}
                      whileHover={{ x: 8 }}
                      className="glass-hover rounded-xl p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                          <config.icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-base font-semibold mb-1">{announcement.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{announcement.content}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{announcement.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Subscribe CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="glass rounded-2xl p-6 md:p-8 text-center">
                <Bell className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-display text-xl font-semibold mb-2">Never Miss an Update</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                  Subscribe to our newsletter to receive the latest announcements directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-medium glow-cyan"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;
