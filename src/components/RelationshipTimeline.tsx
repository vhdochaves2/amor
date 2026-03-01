import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  emoji: string;
  description: string;
}

const events: TimelineEvent[] = [
  { date: "Dia 1", title: "Nos conhecemos", emoji: "👀", description: "O começo de tudo" },
  { date: "Primeiro mês", title: "Primeiro beijo", emoji: "💋", description: "Aquele momento mágico" },
  { date: "3 meses", title: "Oficializamos", emoji: "💕", description: "Agora é sério!" },
  { date: "6 meses", title: "Primeira viagem", emoji: "🏖️", description: "Nossa primeira aventura juntos" },
  { date: "1 ano", title: "Bodas de papel", emoji: "🎉", description: "Um ano de muito amor" },
  { date: "Futuro", title: "Nossa casa", emoji: "🏠", description: "O sonho que estamos construindo" },
];

export function RelationshipTimeline() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Milestone className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nossa Timeline
        </h2>
      </div>
      <p className="text-muted-foreground font-body">A história do nosso amor 💫</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative flex gap-4 items-start"
            >
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full gradient-romantic flex items-center justify-center text-lg shadow-romantic">
                {event.emoji}
              </div>
              {/* Content */}
              <div className="pb-2">
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                  {event.date}
                </p>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
