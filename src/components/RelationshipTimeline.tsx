import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  emoji: string;
  description: string;
}

const events: TimelineEvent[] = [];

export function RelationshipTimeline() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Milestone className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nossa Timeline
        </h2>
      </div>
      <p className="text-muted-foreground font-body">A história do nosso amor 💫</p>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-sm text-primary font-body font-medium">
          Salvar datas na próxima att - segunda 02/03 📅
        </p>
      </div>

    </section>
  );
}
