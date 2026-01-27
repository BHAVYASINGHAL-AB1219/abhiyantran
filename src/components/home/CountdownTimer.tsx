import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeUnit {
  value: number;
  label: string;
}

const targetDate = new Date('2025-03-15T09:00:00');

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Days' },
    { value: 0, label: 'Hours' },
    { value: 0, label: 'Minutes' },
    { value: 0, label: 'Seconds' },
  ]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft([
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Minutes' },
          { value: seconds, label: 'Seconds' },
        ]);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      {timeLeft.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative"
        >
          <div className="glass neon-border rounded-xl p-3 md:p-6 min-w-[70px] md:min-w-[100px] text-center">
            <motion.span
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="block font-display text-2xl md:text-4xl font-bold text-gradient"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="text-xs md:text-sm text-muted-foreground font-body uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < timeLeft.length - 1 && (
            <span className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 text-2xl md:text-3xl text-primary font-bold">
              :
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};
