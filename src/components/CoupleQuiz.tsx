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

      <div className="bg-card border border-border rounded-lg p-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-6"
            >
              <p className="text-5xl">🎉</p>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Quiz Completo!
              </h3>
              <p className="text-muted-foreground font-body">
                Vocês responderam {answers.length} perguntas juntos!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {answers.map((a, i) => (
                  <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-body">
                    {a}
                  </span>
                ))}
              </div>
              <button
                onClick={reset}
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1 mx-auto mt-4"
              >
                <RotateCcw size={14} /> Jogar novamente
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-body">
                  Pergunta {current + 1} de {QUESTIONS.length}
                </span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i <= current ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground text-center py-4">
                {QUESTIONS[current].q}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {QUESTIONS[current].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => answer(option)}
                    className="p-3 rounded-lg border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-sm font-body text-foreground text-center"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
