import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, RotateCcw } from "lucide-react";

interface Question {
  q: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { q: "Qual foi nosso primeiro encontro? 🥰", options: ["Cinema", "Restaurante", "Parque", "Shopping"] },
  { q: "Qual é a comida favorita do casal? 🍕", options: ["Pizza", "Sushi", "Hambúrguer", "Churrasco"] },
  { q: "Onde foi nosso primeiro beijo? 💋", options: ["Na rua", "No cinema", "Em casa", "Na praia"] },
  { q: "Qual é a música do casal? 🎵", options: ["Perfect", "All of Me", "Thinking Out Loud", "A Thousand Years"] },
  { q: "Qual viagem dos sonhos? ✈️", options: ["Paris", "Maldivas", "Grécia", "Japão"] },
  { q: "O que mais amamos fazer juntos? 💕", options: ["Cozinhar", "Viajar", "Assistir séries", "Passear"] },
];

export function CoupleQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const answer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Quiz do Casal
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Quanto vocês se conhecem? 🤔</p>

      <div className="bg-card border border-border rounded-lg p-6 min-h-[280px] flex items-center justify-center">
        <p className="font-display text-xl md:text-2xl text-muted-foreground italic text-center">
          Em manutenção... voltamos em breve! 🔧
        </p>
      </div>
    </section>
  );
}
