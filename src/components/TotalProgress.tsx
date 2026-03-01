import { motion } from "framer-motion";

interface TotalProgressProps {
  totalSaved: number;
  totalTarget: number;
}

export function TotalProgress({ totalSaved, totalTarget }: TotalProgressProps) {
  const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="gradient-romantic rounded-lg p-6 text-primary-foreground shadow-romantic">
      <p className="text-sm opacity-90 font-body">Progresso Total do Casal</p>
      <p className="font-display text-3xl font-bold mt-1">
        {formatCurrency(totalSaved)}
      </p>
      <p className="text-sm opacity-80 mt-1">
        de {formatCurrency(totalTarget)}
      </p>

      <div className="relative h-3 rounded-full bg-primary-foreground/20 overflow-hidden mt-4">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary-foreground/80"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-sm opacity-80 text-right mt-1">
        {progress.toFixed(1)}%
      </p>
    </div>
  );
}
