import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shuffle } from "lucide-react";

const IDEAS = [
  { text: "Piquenique no parque ao pôr do sol 🌅", category: "Ao ar livre" },
  { text: "Noite de cinema em casa com pipoca 🍿", category: "Em casa" },
  { text: "Aula de culinária juntos 👨‍🍳", category: "Experiência" },
  { text: "Caminhada romântica na praia 🏖️", category: "Ao ar livre" },
  { text: "Jantar à luz de velas 🕯️", category: "Romântico" },
  { text: "Spa day caseiro 🧖‍♀️", category: "Em casa" },
  { text: "Visitar uma feira de artesanato 🎨", category: "Passeio" },
  { text: "Karaokê a dois 🎤", category: "Diversão" },
  { text: "Observar as estrelas à noite ⭐", category: "Romântico" },
  { text: "Workshop de cerâmica 🏺", category: "Experiência" },
  { text: "Pedalar pela cidade juntos 🚲", category: "Ao ar livre" },
  { text: "Maratona de série favorita 📺", category: "Em casa" },
  { text: "Jantar em um restaurante novo 🍽️", category: "Passeio" },
  { text: "Pintar um quadro juntos 🎨", category: "Experiência" },
  { text: "Dançar no quarto 💃", category: "Romântico" },
  { text: "Café da manhã na cama ☕", category: "Romântico" },
];

export function DateIdeas() {
  const [current, setCurrent] = useState<typeof IDEAS[0] | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setCurrent(IDEAS[Math.floor(Math.random() * IDEAS.length)]);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Roleta de Encontros
        </h2>
      </div>
      <p className="text-muted-foreground font-body">Sem ideia pro date? Gira a roleta! 🎰</p>

      <div className="bg-card border border-border rounded-lg p-8 text-center space-y-6">
        <div className="min-h-[100px] flex flex-col items-center justify-center">
          {current ? (
            <motion.div
              key={current.text}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-2"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                {current.category}
              </span>
              <p className="font-display text-xl md:text-2xl font-semibold text-foreground">
                {current.text}
              </p>
            </motion.div>
          ) : (
            <p className="text-muted-foreground font-body text-lg">
              Clique no botão para sortear! ✨
            </p>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="gradient-romantic text-primary-foreground rounded-full px-8 py-3 font-body font-medium flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          <Shuffle size={18} className={spinning ? "animate-spin" : ""} />
          {spinning ? "Sorteando..." : "Girar Roleta"}
        </button>
      </div>
    </section>
  );
}
