import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, CalendarRange, CalendarDays, Users, Handshake, Megaphone } from 'lucide-react';

const navLinks = [

  { path: '/', label: 'Home', icon: Home },
  { path: '/events', label: 'Events', icon: CalendarRange },
  { path: '/schedule', label: 'Schedule', icon: CalendarDays },
  { path: '/speakers', label: 'Speakers', icon: Users },
  { path: '/sponsors', label: 'Sponsors', icon: Handshake },
  { path: '/announcements', label: 'Announcements', icon: Megaphone },

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
          {/* Logo - NIT Sikkim */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="/nit-logo.png"
              alt="NIT Sikkim"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="font-display text-xl font-bold text-gradient">
                ABHIYANTRAN
              </span>
              <span className="text-xs text-muted-foreground font-body">NIT Sikkim</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 group flex items-center gap-2"

                >
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <motion.span
                      className="flex items-center"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-primary' : 'text-foreground/60 group-hover:text-primary'
                        }`}
                      />
                    </motion.span>
                    <span
                      className={`font-body text-sm font-medium transition-colors ${
                        isActive ? 'text-primary' : 'text-foreground/70 group-hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </span>
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Abhiyantran Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center"
          >
            <motion.img
              src="/abhilogo.svg"
              alt="Abhiyantran Logo"
              className="h-12 w-12 object-contain"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{ 
                scale: { type: 'spring', stiffness: 400, damping: 17 },
                rotate: { duration: 0.5 }
              }}
            />
          </motion.div>

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

              {/* Abhiyantran Logo in Mobile Menu */}

              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center py-4"
              >
                <motion.img
                  src="/abhilogo.svg"
                  alt="Abhiyantran Logo"
                  className="h-16 w-16 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
              </motion.div>
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === link.path
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, type: 'spring', stiffness: 200 }}
                        className="flex items-center"
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                      </motion.span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
