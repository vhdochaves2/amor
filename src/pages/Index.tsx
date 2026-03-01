import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";
import { GoalCard } from "@/components/GoalCard";
import { AddGoalDialog } from "@/components/AddGoalDialog";
import { TotalProgress } from "@/components/TotalProgress";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CountdownSection } from "@/components/CountdownSection";
import { LoveReasons } from "@/components/LoveReasons";
import { BucketList } from "@/components/BucketList";
import { RelationshipTimeline } from "@/components/RelationshipTimeline";
import { OurPlaylist } from "@/components/OurPlaylist";
import { LoveLetters } from "@/components/LoveLetters";
import { DateIdeas } from "@/components/DateIdeas";
import { CoupleQuiz } from "@/components/CoupleQuiz";
import { DreamBoard } from "@/components/DreamBoard";
import { PromiseWall } from "@/components/PromiseWall";
import { MoodTracker } from "@/components/MoodTracker";
import { CoupleStats } from "@/components/CoupleStats";
import { SecretMessages } from "@/components/SecretMessages";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { goals, addContribution, addGoal, removeGoal, totalSaved, totalTarget } = useGoals();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative container max-w-3xl mx-auto px-4 py-20 md:py-28 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-6"
          >
            <Heart
              className="text-primary-foreground animate-pulse-heart drop-shadow-lg"
              size={64}
              fill="currentColor"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-bold text-primary-foreground drop-shadow-lg"
          >
            Nossas Metas & Sonhos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/90 mt-3 font-body text-lg md:text-xl drop-shadow"
          >
            Construindo nosso futuro juntos, um passo de cada vez 💕
          </motion.p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-3 flex gap-4 overflow-x-auto text-sm font-body scrollbar-hide">
          {[
            { href: "#metas", label: "💰 Metas" },
            { href: "#stats", label: "📊 Números" },
            { href: "#momentos", label: "📸 Momentos" },
            { href: "#contagem", label: "⏰ Contagem" },
            { href: "#humor", label: "😊 Humor" },
            { href: "#timeline", label: "💫 Timeline" },
            { href: "#amor", label: "💕 Te Amo" },
            { href: "#cartas", label: "💌 Cartas" },
            { href: "#segredos", label: "🤫 Segredos" },
            { href: "#roleta", label: "🎰 Roleta" },
            { href: "#quiz", label: "❓ Quiz" },
            { href: "#sonhos", label: "☁️ Sonhos" },
            { href: "#promessas", label: "🤞 Promessas" },
            { href: "#bucket", label: "✨ Bucket List" },
            { href: "#playlist", label: "🎵 Playlist" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="container max-w-3xl mx-auto px-4 py-10 space-y-16">
        {/* Goals */}
        <section id="metas" className="scroll-mt-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Nossas Metas Financeiras
            </h2>
          </div>
          <TotalProgress totalSaved={totalSaved} totalTarget={totalTarget} />
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onContribute={addContribution} onRemove={removeGoal} />
            ))}
            <AddGoalDialog onAdd={addGoal} />
          </div>
        </section>

        {/* Stats */}
        <div id="stats" className="scroll-mt-16">
          <CoupleStats />
        </div>

        {/* Photos */}
        <div id="momentos" className="scroll-mt-16">
          <PhotoGallery />
        </div>

        {/* Countdown */}
        <div id="contagem" className="scroll-mt-16">
          <CountdownSection />
        </div>

        {/* Mood */}
        <div id="humor" className="scroll-mt-16">
          <MoodTracker />
        </div>

        {/* Timeline */}
        <div id="timeline" className="scroll-mt-16">
          <RelationshipTimeline />
        </div>

        {/* Love Reasons */}
        <div id="amor" className="scroll-mt-16">
          <LoveReasons />
        </div>

        {/* Love Letters */}
        <div id="cartas" className="scroll-mt-16">
          <LoveLetters />
        </div>

        {/* Secret Messages */}
        <div id="segredos" className="scroll-mt-16">
          <SecretMessages />
        </div>

        {/* Date Ideas */}
        <div id="roleta" className="scroll-mt-16">
          <DateIdeas />
        </div>

        {/* Quiz */}
        <div id="quiz" className="scroll-mt-16">
          <CoupleQuiz />
        </div>

        {/* Dream Board */}
        <div id="sonhos" className="scroll-mt-16">
          <DreamBoard />
        </div>

        {/* Promises */}
        <div id="promessas" className="scroll-mt-16">
          <PromiseWall />
        </div>

        {/* Bucket List */}
        <div id="bucket" className="scroll-mt-16">
          <BucketList />
        </div>

        {/* Playlist */}
        <div id="playlist" className="scroll-mt-16">
          <OurPlaylist />
        </div>
      </main>

      {/* Footer */}
      <footer className="gradient-romantic text-center py-10">
        <Heart className="mx-auto text-primary-foreground mb-3 animate-pulse-heart" size={28} fill="currentColor" />
        <p className="text-primary-foreground font-display text-lg">
          Feito com amor para nós dois
        </p>
        <p className="text-primary-foreground/70 text-sm font-body mt-1">
          Cada dia juntos é uma nova página da nossa história 💕
        </p>
      </footer>
    </div>
  );
};

export default Index;
