import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import type { Goal } from "@/hooks/useGoals";

interface GoalCardProps {
  goal: Goal;
  onContribute: (id: string, amount: number) => void;
  onRemove: (id: string) => void;
}

export function GoalCard({ goal, onContribute, onRemove }: GoalCardProps) {
  const [amount, setAmount] = useState("");
  const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
  const isComplete = progress >= 100;

  const handleAdd = () => {
    const val = parseFloat(amount);
    if (val > 0) {
      onContribute(goal.id, val);
      setAmount("");
    }
  };

  const handleSubtract = () => {
    const val = parseFloat(amount);
    if (val > 0) {
      onContribute(goal.id, -val);
      setAmount("");
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-lg bg-card p-6 shadow-card border border-border hover:shadow-romantic transition-shadow duration-300"
    >
      <button
        onClick={() => onRemove(goal.id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        aria-label="Remover meta"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{goal.emoji}</span>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {goal.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 rounded-full bg-secondary overflow-hidden mb-1">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${isComplete ? "bg-accent" : "gradient-romantic"}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-right mb-4">
        {progress.toFixed(1)}%
        {isComplete && " 🎉"}
      </p>

      {/* Contribution controls */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="R$ valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="flex items-center justify-center h-9 w-9 rounded-md gradient-romantic text-primary-foreground hover:opacity-90 transition-opacity"
          aria-label="Adicionar"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={handleSubtract}
          className="flex items-center justify-center h-9 w-9 rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
          aria-label="Subtrair"
        >
          <Minus size={18} />
        </button>
      </div>
    </motion.div>
  );
}
