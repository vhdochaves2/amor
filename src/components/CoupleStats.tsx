import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const START_DATE = new Date("2024-06-14");

function getStats() {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = days * 24;
  const heartbeats = Math.floor(hours * 60 * 72); // ~72 bpm
  const kisses = days * 8; // estimate
  const hugs = days * 6;
  const laughs = days * 15;

  return [
    { label: "Dias juntos", value: days.toLocaleString("pt-BR"), emoji: "📅" },
    { label: "Horas de amor", value: hours.toLocaleString("pt-BR"), emoji: "⏰" },
    { label: "Batimentos por você", value: heartbeats.toLocaleString("pt-BR"), emoji: "💓" },
    { label: "Beijos (estimativa)", value: kisses.toLocaleString("pt-BR"), emoji: "💋" },
    { label: "Abraços (estimativa)", value: hugs.toLocaleString("pt-BR"), emoji: "🤗" },
    { label: "Risadas juntos", value: laughs.toLocaleString("pt-BR"), emoji: "😂" },
  ];
}

export function CoupleStats() {
  const stats = getStats();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nossos Números
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Estatísticas do nosso amor em números 📊</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-5 text-center hover:shadow-romantic transition-shadow"
          >
            <p className="text-3xl mb-2">{stat.emoji}</p>
            <p className="font-body text-lg font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
