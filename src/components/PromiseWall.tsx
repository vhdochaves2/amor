import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Plus } from "lucide-react";

interface Promise {
  id: string;
  text: string;
  from: string;
}

const DEFAULT_PROMISES: Promise[] = [
  { id: "1", text: "Sempre te apoiar nos seus sonhos", from: "💙" },
  { id: "2", text: "Nunca dormir brigados", from: "💗" },
  { id: "3", text: "Te fazer rir todos os dias", from: "💙" },
  { id: "4", text: "Ser sua pessoa favorita pra sempre", from: "💗" },
  { id: "5", text: "Construir nossa vida juntos com amor", from: "💙" },
  { id: "6", text: "Sempre dizer eu te amo antes de dormir", from: "💗" },
];

const STORAGE_KEY = "couple-promises";

export function PromiseWall() {
  const [promises, setPromises] = useState<Promise[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_PROMISES;
  });
  const [newText, setNewText] = useState("");
  const [newFrom, setNewFrom] = useState("💙");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(promises));
  }, [promises]);

  const addPromise = () => {
    if (newText.trim()) {
      setPromises((prev) => [
        ...prev,
        { id: Date.now().toString(), text: newText.trim(), from: newFrom },
      ]);
      setNewText("");
    }
  };

  return (
    <section className="gradient-soft rounded-lg p-8 border border-border space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Muro das Promessas
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Promessas que fazemos um ao outro 🤞</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {promises.map((promise, i) => (
          <motion.div
            key={promise.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-lg p-4 flex items-start gap-3"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{promise.from}</span>
            <p className="font-body text-sm text-foreground italic">"{promise.text}"</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={newFrom}
          onChange={(e) => setNewFrom(e.target.value)}
          className="rounded-md border border-input bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="💙">💙</option>
          <option value="💗">💗</option>
        </select>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Eu prometo..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && addPromise()}
        />
        <button
          onClick={addPromise}
          className="gradient-romantic text-primary-foreground rounded-md px-3 py-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </div>
    </section>
  );
}
