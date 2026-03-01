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
        <p className="font-display text-xl md:text-2xl text-muted-foreground italic">
          Em manutenção... voltamos em breve! 🔧
        </p>
      </div>
    </section>
  );
}
