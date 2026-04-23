import { useState } from "react";
import ComingSoon from "./ComingSoon";
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
    { time: "10:00 AM - 1:00 PM", title: "B-Plan", venue: "Shed-2 ECE dept", speaker: "", type: "event" },
    { time: "10:00 AM onwards", title: "Hackathon", venue: "CSE Dept", speaker: "", type: "event" },
    { time: "10:30 AM - 12:00 PM", title: "Inauguration", venue: "MPH", speaker: "", type: "ceremony" },
    { time: "1:00 PM - 4:00 PM", title: "Maths Olympiad", venue: "CLS", speaker: "", type: "event" },
    { time: "2:00 PM - 4:00 PM", title: "Sky High Heavyweight", venue: "Football ground", speaker: "", type: "event" },
    { time: "2:00 PM - 4:00 PM", title: "Black Box", venue: "TBA", speaker: "", type: "event" },
    { time: "2:00 PM - 5:00 PM", title: "Workshop", venue: "MPH", speaker: "", type: "workshop" },
    { time: "4:00 PM", title: "Talkshow 1", venue: "MPH", speaker: "", type: "keynote" },
    { time: "4:00 PM - 6:00 PM", title: "Sand rover", venue: "Volleyball ground", speaker: "", type: "event" },
    { time: "4:00 PM - 6:00 PM", title: "Circuit Debugging", venue: "CLS", speaker: "", type: "event" },
    { time: "4:00 PM - 7:00 PM", title: "Line Follower", venue: "Basketball ground", speaker: "", type: "event" },
    { time: "5:00 PM - 7:00 PM", title: "Analysis Arena", venue: "CLS", speaker: "", type: "event" },
  ],
  day2: [
    { time: "9:00 AM - 1:00 PM", title: "Robo war", venue: "Basketball ground", speaker: "", type: "event" },
    { time: "10:00 AM - 1:00 PM", title: "Laws of motion", venue: "TBA", speaker: "", type: "event" },
    { time: "11:30 AM - 1:30 PM", title: "Best of Waste", venue: "TBA", speaker: "", type: "event" },
    { time: "1:00 PM - 4:00 PM", title: "Bridge It", venue: "CLS", speaker: "", type: "event" },
    { time: "2:00 PM - 5:00 PM", title: "Town Planning", venue: "CLS", speaker: "", type: "event" },
    { time: "2:00 PM - 5:00 PM", title: "Drone racing", venue: "Football ground", speaker: "", type: "event" },
    { time: "3:00 PM - 4:30 PM", title: "Talkshow 2 and 3", venue: "MPH", speaker: "", type: "keynote" },
    { time: "3:00 PM - 5:00 PM", title: "Exoskeleton EMG Arm Demo", venue: "CLS", speaker: "", type: "event" },
    { time: "4:00 PM - 5:00 PM", title: "Circuit Forge", venue: "TBA", speaker: "", type: "event" },
  ],
  day3: [
    { time: "9:00 AM - 1:00 PM", title: "Tech Treasure hunt", venue: "Basketball/Football ground", speaker: "", type: "event" },
    { time: "10:00 AM", title: "Inter school innovation expo", venue: "Football ground/MPH", speaker: "", type: "event" },
    { time: "2:00 PM", title: "Prize distribution", venue: "MPH", speaker: "", type: "ceremony" },
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
                className={`px-6 py-4 rounded-xl font-display ${selectedDay === day.id ? "glass neon-border glow-cyan" : "glass-hover"
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
