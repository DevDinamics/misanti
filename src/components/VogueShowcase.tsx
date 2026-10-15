// src/components/VogueShowcase.tsx
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Camera, Flame, Check } from 'lucide-react';

interface ShowcaseItem {
  id: number;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  features: string[];
  badge: string;
  icon: React.ReactNode;
}

const items: ShowcaseItem[] = [
  {
    id: 1,
    number: "01",
    tag: "SIGNATURE EXPERIENCE",
    title: "Cabina Vogue Monumental",
    subtitle: "La estructura icónica de pasarela que viste en TikTok, adaptada a la escala de tu salón o jardín.",
    badge: "Más Solicitado",
    icon: <Camera className="w-4 h-4 text-[#b8860b]" />,
    features: [
      "Carátula 100% personalizada con tipografía oficial de revista",
      "Iluminación continua de estudio fotográfico (suaviza piel en video)",
      "Impresiones fotográficas de alta resolución & entrega digital 4K",
      "Asistente y director de poses durante todo el servicio"
    ]
  },
  {
    id: 2,
    number: "02",
    tag: "PRODUCCIÓN CINEMATOGRÁFICA",
    title: "Vals de Ensueño & Chispas",
    subtitle: "El instante más emotivo de la noche con atmósfera de película y sincronización musical milimétrica.",
    badge: "Momento Cúspide",
    icon: <Flame className="w-4 h-4 text-[#b8860b]" />,
    features: [
      "Efecto nube bajo con hielo seco (sin olor, no activa alarmas de humo)",
      "Chispas frías de pirotecnia certificada 100% segura para interiores",
      "Máquinas profesionales de alto tiro para entrada triunfal y vals",
      "Coordinación técnica con el DJ y el salón para el momento exacto"
    ]
  }
];

function Card3D({ item }: { item: ShowcaseItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 25 });

  // Inclinación 3D sutil (estilo Apple Card)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Brillo reflejado que sigue el cursor
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl bg-white/90 border border-black/[0.08] p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden group cursor-default select-none"
    >
      {/* Glare / Reflejo de luz blanca pulida interactivo */}
      <motion.div 
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)`,
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      />

      {/* Marca de agua tipográfica de fondo estilo Atelier */}
      <div 
        style={{ transform: "translateZ(15px)" }}
        className="absolute top-2 right-4 font-['Playfair_Display'] text-7xl font-black text-black/[0.02] select-none pointer-events-none tracking-widest uppercase">
        {item.number}
      </div>

      <div style={{ transform: "translateZ(35px)" }} className="relative z-20 space-y-5">
        
        {/* Cabecera de la tarjeta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/20">
              {item.icon}
            </span>
            <span className="text-[9px] tracking-[0.3em] font-semibold text-[#b8860b] uppercase">
              {item.tag}
            </span>
          </div>
          
          <span className="text-[9px] uppercase tracking-wider text-[#86868b] bg-black/[0.03] border border-black/[0.05] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Sparkles className="w-2.5 h-2.5 text-[#b8860b]" />
            {item.badge}
          </span>
        </div>

        {/* Título y Subtítulo */}
        <div>
          <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight group-hover:text-[#b8860b] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-xs text-[#86868b] mt-2 leading-relaxed font-light">
            {item.subtitle}
          </p>
        </div>

        {/* Lista de características con checks minimalistas */}
        <div className="border-t border-black/[0.06] pt-5">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#1d1d1f] font-semibold mb-3">
            Qué incluye la experiencia:
          </p>
          <ul className="text-xs text-[#515154] space-y-2.5 font-light">
            {item.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-snug">
                <span className="w-4 h-4 rounded-full bg-[#b8860b]/10 text-[#b8860b] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón sutil de apartado */}
        <div className="pt-2">
          <a
            href="#apartar"
            className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1d1d1f] hover:text-[#b8860b] transition-colors group/link"
          >
            <span>Cotizar en este paquete</span>
            <span className="ml-1.5 transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>

      </div>
    </motion.div>
  );
}

export default function VogueShowcase() {
  return (
    <section id="experiencias" className="my-20 space-y-10 scroll-mt-24">
      {/* Encabezado de Sección */}
      <div className="text-center space-y-3 max-w-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.06]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]"></span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#86868b] font-medium">
            Colección Signature • Expo 15
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-['Playfair_Display'] text-3xl sm:text-5xl font-normal text-[#1d1d1f] tracking-tight">
          El foco de atención en <br />
          <span className="italic font-normal bg-gradient-to-r from-[#b8860b] via-[#cf9b38] to-[#8a6510] bg-clip-text text-transparent">
            cada momento clave
          </span>
        </motion.h2>

        <p className="text-xs sm:text-sm text-[#86868b] font-light leading-relaxed">
          Diseñados específicamente para resaltar el vestido, el maquillaje y la atmósfera en foto y video cinematográfico.
        </p>
      </div>

      {/* Grid 3D de Tarjetas */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 perspective-[1200px] px-2">
        {items.map((item) => (
          <Card3D key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}