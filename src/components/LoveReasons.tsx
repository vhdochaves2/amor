import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const DEFAULT_REASONS = [
  "Seu sorriso ilumina meu dia",
  "Você me faz querer ser melhor",
  "A forma como você me abraça",
  "Seu jeito carinhoso",
  "Porque você acredita em mim",
  "Seus olhos são meu lugar favorito",
  "Você é minha paz",
  "Cada dia com você é um presente",
  "Seu riso é minha música favorita",
  "Porque juntos somos imbatíveis",
];

const STORAGE_KEY = "couple-love-reasons";

export function LoveReasons() {
  const [reasons, setReasons] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_REASONS;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReason, setNewReason] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reasons));
  }, [reasons]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reasons.length]);

  const addReason = () => {
    if (newReason.trim()) {
      setReasons((prev) => [...prev, newReason.trim()]);
      setNewReason("");
    }
  };

  return (
    <section className="gradient-soft rounded-lg p-8 text-center space-y-6 border border-border">
      <Heart className="mx-auto text-primary animate-pulse-heart" size={36} fill="hsl(350, 60%, 55%)" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
        Razões Que Te Amo
      </h2>

      <div className="min-h-[80px] flex items-center justify-center">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="font-display text-xl md:text-2xl text-foreground italic"
        >
          "{reasons[currentIndex]}"
        </motion.p>
      </div>

      <p className="text-sm text-muted-foreground">
        {currentIndex + 1} de {reasons.length} razões 💕
      </p>

      <div className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
          placeholder="Adicionar nova razão..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && addReason()}
        />
        <button
          onClick={addReason}
          className="gradient-romantic text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          💕
        </button>
      </div>
    </section>
  );
}
