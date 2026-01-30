import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/speakers', label: 'Speakers' },
  { path: '/sponsors', label: 'Sponsors' },
  { path: '/announcements', label: 'Announcements' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-background" />
            </motion.div>
            <span className="font-display text-xl font-bold text-gradient hidden sm:block">
              ABHIYANTRAN
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block font-body -mt-0.5">NIT Sikkim</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 group"
              >
                <span
                  className={`font-body text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/70 group-hover:text-foreground'
                  }`}
                >
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Register Button (Desktop) */}
          <div className="hidden md:block">
            <Button className="font-display text-sm glow-cyan">
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-primary/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary/20 text-primary'
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2"
              >
                <Button className="w-full font-display text-sm glow-cyan">
                  Register Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
