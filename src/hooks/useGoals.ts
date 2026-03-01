import { useState, useEffect } from "react";

export interface Goal {
  id: string;
  title: string;
  emoji: string;
  target: number;
  current: number;
}

const DEFAULT_GOALS: Goal[] = [
  { id: "casa", title: "Nossa Casa", emoji: "🏠", target: 30000, current: 0 },
  { id: "viagem", title: "Viagem dos Sonhos", emoji: "✈️", target: 8000, current: 0 },
  { id: "casamento", title: "Nosso Casamento", emoji: "💍", target: 15000, current: 0 },
];

const STORAGE_KEY = "couple-goals";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addContribution = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, current: Math.min(g.target, Math.max(0, g.current + amount)) }
          : g
      )
    );
  };

  const addGoal = (title: string, emoji: string, target: number) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      emoji,
      target,
      current: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const removeGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  return { goals, addContribution, addGoal, removeGoal, totalSaved, totalTarget };
}
