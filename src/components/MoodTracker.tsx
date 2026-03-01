import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";

interface MoodEntry {
  id: string;
  mood: string;
  date: string;
  note: string;
}

const MOODS = [
  { emoji: "😍", label: "Apaixonado(a)" },
  { emoji: "🥰", label: "Carinhoso(a)" },
  { emoji: "😊", label: "Feliz" },
  { emoji: "🤗", label: "Grato(a)" },
  { emoji: "😌", label: "Em paz" },
  { emoji: "🥺", label: "Com saudade" },
];

const STORAGE_KEY = "couple-mood-tracker";

export function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (selectedMood) {
      setEntries((prev) => [
        {
          id: Date.now().toString(),
          mood: selectedMood,
          date: new Date().toISOString().split("T")[0],
          note: note.trim(),
        },
        ...prev,
      ]);
      setSelectedMood(null);
      setNote("");
    }
  };

  const todayEntry = entries.find(
    (e) => e.date === new Date().toISOString().split("T")[0]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Smile className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Como Estamos Hoje?
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Registre o sentimento do casal 💭</p>

      {todayEntry ? (
        <div className="bg-card border border-border rounded-lg p-6 text-center space-y-2">
          <p className="text-4xl">{todayEntry.mood}</p>
          <p className="font-body text-sm text-foreground">Humor de hoje registrado!</p>
          {todayEntry.note && (
            <p className="text-sm text-muted-foreground italic">"{todayEntry.note}"</p>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {MOODS.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                  selectedMood === mood.emoji
                    ? "border-primary bg-primary/10 scale-110"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs font-body text-muted-foreground">{mood.label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Uma notinha sobre hoje... (opcional)"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={addEntry}
                className="gradient-romantic text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity w-full"
              >
                Registrar humor 💕
              </button>
            </motion.div>
          )}
        </div>
      )}

      {entries.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {entries.slice(0, 14).map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="text-center"
              title={`${entry.date}${entry.note ? `: ${entry.note}` : ""}`}
            >
              <span className="text-xl">{entry.mood}</span>
              <p className="text-[10px] text-muted-foreground font-body">
                {new Date(entry.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
