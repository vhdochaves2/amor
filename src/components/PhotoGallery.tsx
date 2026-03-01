import { motion } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import { Camera } from "lucide-react";

const photos = [
  { src: memory1, caption: "Nosso pôr do sol", span: "col-span-2" },
  { src: memory2, caption: "De mãos dadas", span: "row-span-2" },
  { src: memory3, caption: "Jantar especial", span: "col-span-1" },
  { src: memory4, caption: "Aventura juntos", span: "row-span-2" },
  { src: memory5, caption: "Noite aconchegante", span: "col-span-2" },
];

export function PhotoGallery() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Camera className="text-primary" size={24} />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Nossos Momentos
        </h2>
      </div>
      <p className="text-muted-foreground font-body">
        Memórias que guardamos no coração 📸
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`relative group overflow-hidden rounded-lg ${photo.span} cursor-pointer`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end">
              <motion.p
                className="text-primary-foreground font-body text-sm font-medium p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              >
                {photo.caption}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
