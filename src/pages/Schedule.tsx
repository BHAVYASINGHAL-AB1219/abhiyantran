import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapPin, User, Plane } from "lucide-react";

const days = [
  { id: "day1", label: "Day 1", date: "March 15" },
  { id: "day2", label: "Day 2", date: "March 16" },
  { id: "day3", label: "Day 3", date: "March 17" },
];

const scheduleData = {
  day1: [
    { time: "09:00 AM", title: "Opening Ceremony", venue: "Main Auditorium", speaker: "Dr. Rajesh Kumar", type: "ceremony" },
    { time: "10:00 AM", title: "Keynote: Future of AI", venue: "Seminar Hall 1", speaker: "Prof. Sarah Chen", type: "keynote" },
    { time: "11:30 AM", title: "Hackathon Begins", venue: "Innovation Hub", speaker: "", type: "event" },
    { time: "12:30 PM", title: "Lunch Break", venue: "Food Court", speaker: "", type: "break" },
    { time: "02:00 PM", title: "Web Dev Workshop", venue: "Lab Complex A", speaker: "John Doe", type: "workshop" },
    { time: "06:00 PM", title: "Gaming Tournament", venue: "Gaming Arena", speaker: "", type: "event" },
  ],
  day2: [
    { time: "09:00 AM", title: "Startup Pitch Session", venue: "Main Auditorium", speaker: "Investor Panel", type: "event" },
    { time: "12:30 PM", title: "Lunch Break", venue: "Food Court", speaker: "", type: "break" },
    { time: "06:00 PM", title: "Tech Talk: Web3", venue: "Seminar Hall 2", speaker: "Alex Johnson", type: "keynote" },
    { time: "08:00 PM", title: "DJ Night", venue: "Open Grounds", speaker: "DJ Nova", type: "entertainment" },
  ],
  day3: [
    { time: "09:00 AM", title: "Hackathon Judging", venue: "Innovation Hub", speaker: "Judge Panel", type: "event" },
    { time: "11:00 AM", title: "Project Expo", venue: "Exhibition Hall", speaker: "", type: "event" },
    { time: "12:30 PM", title: "Lunch Break", venue: "Food Court", speaker: "", type: "break" },
    { time: "02:00 PM", title: "Panel Discussion", venue: "Main Auditorium", speaker: "Industry Leaders", type: "keynote" },
    { time: "04:00 PM", title: "Award Ceremony", venue: "Main Auditorium", speaker: "Chief Guest", type: "ceremony" },
    { time: "06:00 PM", title: "Closing Ceremony", venue: "Main Auditorium", speaker: "Vice Chancellor", type: "ceremony" },
  ],
};

const typeColors: Record<string, string> = {
  ceremony: "from-neon-purple to-secondary",
  keynote: "from-primary to-neon-blue",
  event: "from-secondary to-neon-purple",
  workshop: "from-neon-blue to-primary",
  break: "from-muted to-muted",
  entertainment: "from-secondary to-primary",
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("day1");

  // Track PAGE scroll
  const { scrollYProgress } = useScroll();

  // Plane movement distance (adjust 700 if needed)
  const planeY = useTransform(scrollYProgress, [0, 1], [0, 950]);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-12">
            <span className="text-primary font-display text-sm uppercase tracking-wider">Plan Your Visit</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              Event <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three days packed with exciting events, workshops, and entertainment
            </p>
          </div>

          {/* DAY SELECTOR */}
          <div className="flex justify-center gap-4 mb-12">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-6 py-4 rounded-xl font-display ${
                  selectedDay === day.id ? "glass neon-border glow-cyan" : "glass-hover"
                }`}
              >
                <span className={`block text-lg font-bold ${selectedDay === day.id ? "text-primary" : ""}`}>
                  {day.label}
                </span>
                <span className="text-sm text-muted-foreground">{day.date}</span>
              </button>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="max-w-4xl mx-auto relative">

            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-primary/30" />

            {/* ✈️ Moving airplane */}
            <motion.div style={{ y: planeY }} className="absolute left-[0.5px] top-0 z-20">
              <Plane className="w-6 h-6 text-primary rotate-[135deg]" />
            </motion.div>

            {scheduleData[selectedDay as keyof typeof scheduleData].map((item, index) => (
              <motion.div key={index} className="relative pl-8 pb-8">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br ${typeColors[item.type]} flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>

                <motion.div whileHover={{ x: 8 }} className="glass-hover rounded-xl p-5 ml-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                      {item.time}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColors[item.type]} text-background capitalize`}>
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{item.venue}</span>
                    </div>
                    {item.speaker && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-primary" />
                        <span>{item.speaker}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
