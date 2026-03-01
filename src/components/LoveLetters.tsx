import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Plus, X, Send } from "lucide-react";

interface Letter {
  id: string;
  from: string;
  message: string;
  date: string;
}

const DEFAULT_LETTERS: Letter[] = [
  {
    id: "1",
    from: "💕",
    message: "Cada dia ao seu lado é o melhor dia da minha vida. Você me faz a pessoa mais feliz do mundo.",
    date: "2025-01-15",
  },
  {
    id: "2",
    from: "🥰",
    message: "Obrigado(a) por ser meu porto seguro. Te amo mais do que palavras podem expressar.",
    date: "2025-02-14",
  },
];

const STORAGE_KEY = "couple-love-letters";

export function LoveLetters() {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_LETTERS;
  });
  const [open, setOpen] = useState<string | null>(null);
  const [writing, setWriting] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [newFrom, setNewFrom] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  }, [letters]);

  const addLetter = () => {
    if (newMsg.trim()) {
      setLetters((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          from: newFrom.trim() || "💕",
          message: newMsg.trim(),
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewMsg("");
      setNewFrom("");
      setWriting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Mail className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Cartas de Amor
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Palavras que guardam nosso amor 💌</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {letters.map((letter, i) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, rotateY: -10 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setOpen(open === letter.id ? null : letter.id)}
            className="cursor-pointer"
          >
            <div className="relative bg-card border border-border rounded-lg p-5 hover:shadow-romantic transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{letter.from}</span>
                <span className="text-xs text-muted-foreground font-body">
                  {new Date(letter.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <AnimatePresence>
                {open === letter.id ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-body text-sm text-foreground italic leading-relaxed"
                  >
                    "{letter.message}"
                  </motion.p>
                ) : (
                  <p className="font-body text-sm text-muted-foreground truncate">
                    Toque para abrir a carta...
                  </p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {writing ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-5 space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg font-semibold text-foreground">Nova Carta</h3>
            <button onClick={() => setWriting(false)} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          <input
            type="text"
            value={newFrom}
            onChange={(e) => setNewFrom(e.target.value)}
            placeholder="De quem? (emoji ou nome)"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Escreva sua carta de amor..."
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <button
            onClick={addLetter}
            className="gradient-romantic text-primary-foreground rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Send size={14} /> Enviar carta
          </button>
        </motion.div>
      ) : (
        <button
          onClick={() => setWriting(true)}
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          <Plus size={14} /> Escrever nova carta
        </button>
      )}
    </section>
  );
}
