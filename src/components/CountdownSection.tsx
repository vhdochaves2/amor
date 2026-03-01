import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarHeart } from "lucide-react";

interface CountdownItem {
  id: string;
  title: string;
  emoji: string;
  date: string;
}

const DEFAULT_COUNTDOWNS: CountdownItem[] = [
  { id: "aniversario", title: "Nosso Aniversário", emoji: "💕", date: "2025-06-14" },
  { id: "viagem", title: "Próxima Viagem", emoji: "✈️", date: "2025-12-20" },
];

const STORAGE_KEY = "couple-countdowns";

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
}

export function CountdownSection() {
  const [countdowns, setCountdowns] = useState<CountdownItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_COUNTDOWNS;
  });
  const [times, setTimes] = useState(countdowns.map((c) => getTimeLeft(c.date)));
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
  }, [countdowns]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(countdowns.map((c) => getTimeLeft(c.date)));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdowns]);

  const addCountdown = () => {
    if (newTitle.trim() && newDate) {
      setCountdowns((prev) => [
        ...prev,
        { id: Date.now().toString(), title: newTitle, emoji: "🎉", date: newDate },
      ]);
      setNewTitle("");
      setNewDate("");
      setAdding(false);
    }
  };

  const removeCountdown = (id: string) => {
    setCountdowns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <CalendarHeart className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Contagem Regressiva
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Dias especiais chegando... ⏰</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {countdowns.map((countdown, i) => {
          const time = times[i] || getTimeLeft(countdown.date);
          return (
            <motion.div
              key={countdown.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group gradient-romantic rounded-lg p-6 text-primary-foreground shadow-romantic"
            >
              <button
                onClick={() => removeCountdown(countdown.id)}
                className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary-foreground/60 hover:text-primary-foreground text-sm"
              >
                ✕
              </button>
              <p className="text-3xl mb-2">{countdown.emoji}</p>
              <h3 className="font-display text-lg font-semibold">{countdown.title}</h3>
              {time.passed ? (
                <p className="text-sm mt-2 opacity-90">🎉 Já aconteceu!</p>
              ) : (
                <div className="flex gap-4 mt-3">
                  {[
                    { val: time.days, label: "dias" },
                    { val: time.hours, label: "h" },
                    { val: time.minutes, label: "min" },
                    { val: time.seconds, label: "s" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-2xl font-bold font-body">{item.val}</p>
                      <p className="text-xs opacity-80">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs opacity-70 mt-3">
                {new Date(countdown.date).toLocaleDateString("pt-BR")}
              </p>
            </motion.div>
          );
        })}
      </div>

      {adding ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nome do evento"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button onClick={addCountdown} className="gradient-romantic text-primary-foreground rounded-md px-4 py-2 text-sm font-medium">
            Adicionar
          </button>
          <button onClick={() => setAdding(false)} className="text-muted-foreground text-sm px-3">
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          <Clock size={14} /> Adicionar contagem
        </button>
      )}
    </section>
  );
}
