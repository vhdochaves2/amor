import { motion } from "framer-motion";
import { Music } from "lucide-react";

const songs = [
  { title: "Perfect", artist: "Ed Sheeran", emoji: "🎶" },
  { title: "All of Me", artist: "John Legend", emoji: "🎵" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", emoji: "🎶" },
  { title: "A Thousand Years", artist: "Christina Perri", emoji: "🎵" },
  { title: "Just the Way You Are", artist: "Bruno Mars", emoji: "🎶" },
  { title: "Marry You", artist: "Bruno Mars", emoji: "🎵" },
];

export function OurPlaylist() {
  return (
    <section className="gradient-soft rounded-lg p-8 border border-border space-y-6">
      <div className="flex items-center gap-3">
        <Music className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nossa Playlist
        </h2>
      </div>
      <p className="text-muted-foreground font-body">As músicas que são a trilha do nosso amor 🎧</p>

      <div className="grid gap-2">
        {songs.map((song, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:shadow-card transition-shadow"
          >
            <span className="text-xl">{song.emoji}</span>
            <div>
              <p className="font-body text-sm font-medium text-foreground">{song.title}</p>
              <p className="font-body text-xs text-muted-foreground">{song.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
