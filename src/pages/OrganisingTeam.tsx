import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Phone, Mail, Users } from 'lucide-react';

const organizers = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Lead Organizer',
        phone: '+91 98765 43210',
        email: 'john.doe@example.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Co-Organizer',
        phone: '+91 98765 43211',
        email: 'jane.smith@example.com',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
        id: 3,
        name: 'Rahul Kumar',
        role: 'Technical Head',
        phone: '+91 98765 43212',
        email: 'rahul.kumar@example.com',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Priya Sharma',
        role: 'Event Coordinator',
        phone: '+91 98765 43213',
        email: 'priya.sharma@example.com',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
        id: 5,
        name: 'Amit Patel',
        role: 'Logistics Head',
        phone: '+91 98765 43214',
        email: 'amit.patel@example.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
        id: 6,
        name: 'Sneha Gupta',
        role: 'Marketing Head',
        phone: '+91 98765 43215',
        email: 'sneha.gupta@example.com',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
];

// Group photo URL - Update this with your actual group photo
const groupPhotoUrl = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop';

const OrganisingTeam = () => {
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
                        <span className="text-primary font-display text-sm uppercase tracking-wider">The People Behind</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
                            Organising <span className="text-gradient">Team</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Meet the dedicated team working behind the scenes to make this event a success
                        </p>
                    </motion.div>

                    {/* Main Organizers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {organizers.map((organizer, index) => (
                            <motion.div
                                key={organizer.id}
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
                                            src={organizer.image}
                                            alt={organizer.name}
                                            className="relative w-32 h-32 rounded-full object-cover border-4 border-background"
                                        />
                                    </div>

                                    {/* Info */}
                                    <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                                        {organizer.name}
                                    </h3>
                                    <p className="text-primary text-sm font-medium mb-4">{organizer.role}</p>

                                    {/* Contact Info */}
                                    <div className="space-y-3 flex-1">
                                        <a
                                            href={`tel:${organizer.phone.replace(/\s/g, '')}`}
                                            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>{organizer.phone}</span>
                                        </a>
                                        <a
                                            href={`mailto:${organizer.email}`}
                                            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span>{organizer.email}</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Group Photo Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12"
                    >
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <Users className="w-5 h-5 text-background" />
                                </div>
                                <h2 className="font-display text-2xl md:text-3xl font-bold">
                                    Our <span className="text-gradient">Team</span>
                                </h2>
                            </div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The complete team that makes everything possible
                            </p>
                        </div>

                        <div className="glass neon-border rounded-3xl p-4 md:p-6 overflow-hidden">
                            <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
                                <img
                                    src={groupPhotoUrl}
                                    alt="Organising Team Group Photo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default OrganisingTeam;
