import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { EventRegistrationForm } from '@/components/EventRegistrationForm';
import { getEventById } from '@/data/eventsData';
import { Clock, Users, MapPin, Tag, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const event = getEventById(Number(id));

    if (!event) {
        return (
            <Layout>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-display text-4xl font-bold mb-4">Event Not Found</h1>
                        <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
                        <Link to="/events">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Events
                            </Button>
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Image Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[40vh] md:h-[50vh] overflow-hidden"
            >
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                {/* Back Button */}
                <Link to="/events" className="absolute top-24 left-4 md:left-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Events
                    </motion.button>
                </Link>

                {/* Event Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground mb-3">
                            {event.category}
                        </span>
                        <h1 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </motion.div>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-2xl p-6"
                            >
                                <h2 className="font-display text-xl font-bold mb-4">About This Event</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {event.description}
                                </p>
                            </motion.div>

                            {/* Rules Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass rounded-2xl p-6"
                            >
                                <h2 className="font-display text-xl font-bold mb-6">
                                    Rules & <span className="text-gradient">Guidelines</span>
                                </h2>
                                <ol className="space-y-4">
                                    {event.rules.map((rule, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-background">
                                                {index + 1}
                                            </span>
                                            <span className="text-muted-foreground">{rule}</span>
                                        </motion.li>
                                    ))}
                                </ol>
                            </motion.div>

                            {/* Registration Form */}
                            <EventRegistrationForm
                                eventId={event.id}
                                eventTitle={event.title}
                                maxTeamSize={event.maxTeamSize}
                            />
                        </div>

                        {/* Sidebar - Event Info */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass neon-border rounded-2xl p-6 sticky top-24"
                            >
                                <h3 className="font-display text-lg font-bold mb-6">Event Details</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Duration</p>
                                            <p className="font-medium">{event.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <Users className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Team Size</p>
                                            <p className="font-medium">{event.team}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Venue</p>
                                            <p className="font-medium">{event.venue}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <Tag className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Prize Pool</p>
                                            <p className="font-medium text-gradient">{event.prize}</p>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <h4 className="font-display text-sm font-semibold mb-3">What's Included</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                Certificate of Participation
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                Refreshments
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                Event Kit & Goodies
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EventDetail;
