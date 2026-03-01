import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface AddGoalDialogProps {
  onAdd: (title: string, emoji: string, target: number) => void;
}

const EMOJI_OPTIONS = ["🏠", "✈️", "💍", "🚗", "📱", "🎓", "👶", "🐶", "🎸", "💻"];

export function AddGoalDialog({ onAdd }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🏠");
  const [target, setTarget] = useState("");

  const handleSubmit = () => {
    const val = parseFloat(target);
    if (title.trim() && val > 0) {
      onAdd(title.trim(), emoji, val);
      setTitle("");
      setEmoji("🏠");
      setTarget("");
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border-2 border-dashed border-border p-6 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <Plus size={20} />
        <span className="font-body font-medium">Nova Meta</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-lg p-6 w-full max-w-md shadow-romantic border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Nova Meta do Casal
                </h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Nome da meta
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Nossa casa"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Emoji
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJI_OPTIONS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`text-2xl p-2 rounded-md transition-colors ${
                          emoji === e ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-secondary"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Valor da meta (R$)
                  </label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="30000"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full gradient-romantic text-primary-foreground rounded-md py-2.5 font-medium hover:opacity-90 transition-opacity"
                >
                  Criar Meta 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
