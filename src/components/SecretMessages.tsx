import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Plus } from "lucide-react";

interface Secret {
  id: string;
  message: string;
  revealed: boolean;
}

const DEFAULT_SECRETS: Secret[] = [
  { id: "1", message: "Eu sabia que te amava desde o primeiro dia 💕", revealed: false },
  { id: "2", message: "Você é a primeira pessoa em quem penso ao acordar 🌅", revealed: false },
  { id: "3", message: "Guardo todas as nossas fotos na pasta favorita do celular 📱", revealed: false },
  { id: "4", message: "Meu coração acelera quando vejo sua mensagem 💌", revealed: false },
  { id: "5", message: "Já sonhei com nosso casamento várias vezes 💍", revealed: false },
];

const STORAGE_KEY = "couple-secrets";

export function SecretMessages() {
  const [secrets, setSecrets] = useState<Secret[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SECRETS;
  });
  const [newSecret, setNewSecret] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(secrets));
  }, [secrets]);

  const reveal = (id: string) => {
    setSecrets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, revealed: true } : s))
    );
  };

  const addSecret = () => {
    if (newSecret.trim()) {
      setSecrets((prev) => [
        ...prev,
        { id: Date.now().toString(), message: newSecret.trim(), revealed: false },
      ]);
      setNewSecret("");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Lock className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Segredinhos
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Toque para revelar os segredos 🤫</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {secrets.map((secret, i) => (
          <motion.div
            key={secret.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => !secret.revealed && reveal(secret.id)}
            className={`rounded-lg p-5 border transition-all cursor-pointer ${
              secret.revealed
                ? "bg-card border-primary/20"
                : "bg-primary/5 border-primary/10 hover:bg-primary/10"
            }`}
          >
            {secret.revealed ? (
              <div className="flex items-start gap-3">
                <Unlock size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-foreground italic">{secret.message}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 justify-center py-2">
                <Lock size={16} className="text-primary" />
                <p className="font-body text-sm text-primary font-medium">Toque para revelar</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSecret}
          onChange={(e) => setNewSecret(e.target.value)}
          placeholder="Adicionar um segredinho..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && addSecret()}
        />
        <button
          onClick={addSecret}
          className="gradient-romantic text-primary-foreground rounded-md px-3 py-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </div>
    </section>
  );
}
