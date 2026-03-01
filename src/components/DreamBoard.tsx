import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Plus, X } from "lucide-react";

interface Dream {
  id: string;
  text: string;
  color: string;
}

const COLORS = [
  "bg-primary/10 border-primary/20",
  "bg-accent/10 border-accent/20",
  "bg-secondary border-border",
  "bg-primary/5 border-primary/10",
];

const DEFAULT_DREAMS: Dream[] = [
  { id: "1", text: "Morar juntos 🏠", color: COLORS[0] },
  { id: "2", text: "Ter um pet 🐶", color: COLORS[1] },
  { id: "3", text: "Viajar pelo mundo 🌎", color: COLORS[2] },
  { id: "4", text: "Casar 💍", color: COLORS[3] },
  { id: "5", text: "Abrir um negócio juntos 💼", color: COLORS[0] },
  { id: "6", text: "Ter uma horta 🌱", color: COLORS[1] },
  { id: "8", text: "Aprender um idioma novo 🗣️", color: COLORS[3] },
];

const STORAGE_KEY = "couple-dream-board";

export function DreamBoard() {
  const [dreams, setDreams] = useState<Dream[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DREAMS;
  });
  const [newDream, setNewDream] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  }, [dreams]);

  const addDream = () => {
    if (newDream.trim()) {
      setDreams((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newDream.trim(),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
      ]);
      setNewDream("");
    }
  };

  const removeDream = (id: string) => {
    setDreams((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Cloud className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Mural dos Sonhos
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Nossos sonhos juntos em um só lugar ☁️</p>

      <div className="flex flex-wrap gap-3">
        {dreams.map((dream, i) => (
          <motion.div
            key={dream.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
            className={`group relative px-4 py-3 rounded-xl border ${dream.color} cursor-default`}
          >
            <span className="font-body text-sm text-foreground">{dream.text}</span>
            <button
              onClick={() => removeDream(dream.id)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newDream}
          onChange={(e) => setNewDream(e.target.value)}
          placeholder="Adicionar um sonho..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && addDream()}
        />
        <button
          onClick={addDream}
          className="gradient-romantic text-primary-foreground rounded-md px-3 py-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </div>
    </section>
  );
}
