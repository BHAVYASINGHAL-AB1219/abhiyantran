import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { Link } from "react-router-dom";


const stats = [
  { icon: Calendar, value: '3', label: 'Days' },
  { icon: Users, value: '20+', label: 'Events' },

];

const FLIP_INTERVAL_MS = 3000;

export const HeroSection = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowLogo((prev) => !prev), FLIP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-[80px] md:pt-[96px]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge - NIT Sikkim + Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass border border-primary/30 mb-8 mt-[-50px] flex-shrink-0"
          >
            <img src="/nit-logo.png" alt="NIT Sikkim" className="h-14 w-14 sm:h-16 sm:w-16 object-contain flex-shrink-0" />
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-sm sm:text-base font-body text-primary font-medium leading-snug">
                National Institute of Technology Sikkim
              </span>
              <span className="text-xs sm:text-sm font-body text-primary/90 font-small tracking-wider mt-0.5">
                An Institute of National Importance
              </span>
            </div>
          </motion.div>

          {/* Main Title - Flip between text and logo every 3s */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 min-h-[200px] sm:min-h-[220px] md:min-h-[260px] flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >


            
            <motion.div
              className="relative w-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: showLogo ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Front face: ABHIYANTRAN text */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center w-full"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-center">
                  <span className="text-gradient">ABHIYANTRAN</span>
                  <br />
                  <span className="text-foreground">THE FUTURE OF</span>
                  <br />
                  <span className="text-foreground">TECHNOLOGY STARTS HERE</span>
                </h1>
              </div>
              {/* Back face: Logo + Abhiyantran (flipped so it reads correctly when card rotates) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center w-full"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <img
                  src="/abhilogo.svg"
                  alt="Abhiyantran"
                  className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-contain mb-4"
                />
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                  Abhiyantran
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body"
          >
            Join thousands of innovators, developers, and tech enthusiasts at NIT Sikkim&apos;s annual tech fest — ABHIYANTRAN. Innovation, learning, and networking in the heart of Sikkim.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/events">
              <Button
                size="lg"
                variant="outline"
                className="font-display text-base border-primary/50 hover:bg-primary/10"
              >
                View Events
              </Button>
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-sm text-muted-foreground mb-4 font-body uppercase tracking-wider">Event Starts In</p>
            <CountdownTimer />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-primary mr-2" />
                  <span className="font-display text-3xl font-bold text-gradient">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground font-body">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
