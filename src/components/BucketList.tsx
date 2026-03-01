import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Plus, ListChecks } from "lucide-react";

interface BucketItem {
  id: string;
  text: string;
  done: boolean;
}

const DEFAULT_ITEMS: BucketItem[] = [
  { id: "1", text: "Assistir o nascer do sol juntos", done: false },
  { id: "2", text: "Viajar para a Europa", done: false },
  { id: "3", text: "Ter nosso próprio lar", done: false },
  { id: "5", text: "Acampar sob as estrelas", done: false },
  { id: "7", text: "Fazer uma road trip", done: false },
  { id: "8", text: "Plantar uma árvore juntos", done: false },
];

const STORAGE_KEY = "couple-bucket-list";

export function BucketList() {
  const [items, setItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
  });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems((prev) => [
        ...prev,
        { id: Date.now().toString(), text: newItem.trim(), done: false },
      ]);
      setNewItem("");
    }
  };

  const completed = items.filter((i) => i.done).length;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <ListChecks className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Bucket List do Casal
        </h2>
      </div>
      <p className="text-muted-foreground font-body">
        {completed} de {items.length} aventuras concluídas ✨
      </p>

      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggle(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
              item.done
                ? "bg-primary/5 border-primary/20"
                : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                item.done
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30"
              }`}
            >
              {item.done && <Check size={14} className="text-primary-foreground" />}
            </div>
            <span
              className={`font-body text-sm flex-1 transition-all ${
                item.done
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {item.text}
            </span>
            {item.done && <span className="text-xs">🎉</span>}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar novo sonho..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button
          onClick={addItem}
          className="gradient-romantic text-primary-foreground rounded-md px-3 py-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </div>
    </section>
  );
}
