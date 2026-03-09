import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sponsors = [
    {
        name: 'Dopamine',
        role: 'Merchandise Partner',
        logo: '/dopamine-logo.png',
        color: 'from-pink-500 to-rose-500',
        url: 'https://thedopaminestore.in/',
    },
    {
        name: 'Summit Times',
        role: 'Media Partner',
        logo: '/summit-media-logo.png',
        color: 'from-sky-400 to-blue-600',
        url: 'https://summittimes.in/home',
    },
    {
        name: 'Ravangla Star',
        role: 'Hospitality Partner',
        logo: '/RavanglaStar.png',
        color: 'from-sky-400 to-blue-600',
        url: '#',
    },
];

export const SponsorsShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sponsors.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const sponsor = sponsors[activeIndex];

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
                    <span className="text-primary font-display text-sm uppercase tracking-wider">Backed By The Best</span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">
                        Our <span className="text-gradient">Sponsors</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Partnering with industry leaders to bring you an unforgettable experience
                    </p>
                </motion.div>

                {/* Rotating Sponsor Card */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={sponsor.name}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="w-full"
                            >
                                <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                                    <div className="glass neon-border rounded-2xl p-8 md:p-10 text-center flex flex-col items-center cursor-pointer">
                                        {/* Logo */}
                                        <motion.div
                                            className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center mb-5"
                                            animate={{ rotate: [0, 2, -2, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <img
                                                src={sponsor.logo}
                                                alt={`${sponsor.name} logo`}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </motion.div>

                                        {/* Name & Role */}
                                        <h3 className="font-display text-2xl font-semibold mb-1">
                                            {sponsor.name}
                                        </h3>
                                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                            {sponsor.role}
                                        </span>
                                    </div>
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {sponsors.map((s, i) => (
                        <button
                            key={s.name}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex
                                ? 'bg-primary scale-125 shadow-[0_0_8px_hsl(180_100%_50%/0.6)]'
                                : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                                }`}
                            aria-label={`Show ${s.name}`}
                        />
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        to="/sponsors"
                        className="inline-flex items-center gap-2 text-primary font-display font-medium hover:gap-3 transition-all"
                    >
                        View All Sponsors
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
