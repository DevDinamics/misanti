// src/components/VogueShowcase.tsx
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface ShowcaseItem {
  id: number;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  specDuration: string;
  specFormat: string;
  badge: string;
  features: string[];
  ctaLabel: string;
}

const items: ShowcaseItem[] = [
  {
    id: 1,
    number: "01",
    tag: "ALTA COSTURA EDITORIAL",
    title: "Cabina Vogue Monumental",
    subtitle: "Estructura de pasarela a escala real donde los invitados se convierten en protagonistas de portada con iluminación de estudio.",
    specDuration: "4 Horas de Servicio",
    specFormat: "Digital 4K + Opción Impresa",
    badge: "MÁS SOLICITADO EN EXPO 15",
    ctaLabel: "Cotizar Cabina Vogue",
    features: [
      "Fotografías digitales ilimitadas durante todo el evento con galería QR en vivo",
      "Back de tocador Hollywood con espejo e iluminación perimetral continua",
      "Alfombra roja y postes unifila dorados para delimitación y acceso VIP",
      "Diseño de carátula 100% personalizado con tipografía, nombres y fecha",
      "Utilería elegante seleccionada + Asistente técnico durante toda la sesión",
      "Complemento opcional con paquetes de impresiones térmicas profesionales 4×6"
    ]
  },
  {
    id: 2,
    number: "02",
    tag: "REFLEJOS & TENDENCIA 2026",
    title: "Cabina Espejada Inmersiva",
    subtitle: "Estructura futurista con superficies reflejantes que generan efectos visuales infinitos. El mayor imán para fotos y videos virales.",
    specDuration: "Servicio Individual o Combo",
    specFormat: "Efecto Infinito + Neón",
    badge: "EXPERIENCIA VIRAL",
    ctaLabel: "Cotizar Cabina Espejada",
    features: [
      "Estructura 100% espejada que produce reflejos y perspectiva infinita",
      "Letrero de neón decorativo exclusivo de diseño para fotos de alto impacto",
      "Ambientación con esferas decorativas (orbs) para sesiones de video",
      "Iluminación escénica calibrada específicamente para TikTok y Reels",
      "Montaje y desmontaje profesional adaptado a salones, jardines o haciendas",
      "Disponible en combo exclusivo missanti.premium junto a la Cabina Vogue"
    ]
  }
];

function Card3D({ item }: { item: ShowcaseItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 25 });

  // Inclinación 3D controlada para no romper layout en pantallas táctiles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Brillo radial que acompaña el cursor
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
      className="relative rounded-2xl bg-white/95 border border-black/[0.08] p-6 sm:p-9 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden group cursor-default select-none flex flex-col justify-between"
    >
      {/* Glare reflectivo sobre superficie de cristal */}
      <motion.div 
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 65%)`,
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      />

      {/* Marca de agua tipográfica monumental de fondo */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="absolute -top-3 right-4 font-['Playfair_Display'] text-8xl font-black text-black/[0.025] select-none pointer-events-none tracking-tighter">
        {item.number}
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="relative z-20 space-y-6">
        
        {/* Cabecera Editorial (Sin píldoras: línea de registro + metadatos limpios) */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#b8860b] tracking-wider">
              {item.number} //
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.25em] font-semibold text-[#1d1d1f]">
              {item.tag}
            </span>
          </div>

          <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#86868b] border-b border-[#b8860b]/40 pb-0.5">
            {item.badge}
          </span>
        </div>

        {/* Título y Subtítulo */}
        <div className="space-y-2">
          <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-normal text-[#1d1d1f] tracking-tight group-hover:text-[#b8860b] transition-colors duration-300 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-[#6e6e73] leading-relaxed font-light">
            {item.subtitle}
          </p>
        </div>

        {/* Ficha Técnica de 2 Columnas (Reemplaza píldoras por diseño de alta relojería) */}
        <div className="grid grid-cols-2 gap-4 py-3.5 px-4 bg-[#fbfbfd] border border-black/[0.05] rounded-xl text-left">
          <div className="space-y-0.5">
            <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#86868b] font-medium block">
              Tiempo en Evento
            </span>
            <span className="text-xs font-semibold text-[#1d1d1f] tracking-wide block">
              {item.specDuration}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-black/[0.06] pl-4">
            <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#86868b] font-medium block">
              Entrega / Formato
            </span>
            <span className="text-xs font-semibold text-[#1d1d1f] tracking-wide block">
              {item.specFormat}
            </span>
          </div>
        </div>

        {/* Lista de Características con Rombos Editoriales (✦) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#b8860b]"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#1d1d1f] font-semibold">
              Especificaciones de Montaje
            </span>
          </div>

          <ul className="text-xs text-[#424245] space-y-2.5 font-light">
            {item.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-snug">
                <span className="text-[#b8860b] text-[10px] leading-none mt-1 select-none font-serif">
                  ✦
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Botón de Acción Arquitectónico */}
      <div style={{ transform: "translateZ(25px)" }} className="pt-6 relative z-20 mt-6 border-t border-black/[0.05]">
        <a
          href="#apartar"
          className="group/btn w-full py-3.5 px-5 rounded-xl bg-[#1d1d1f] hover:bg-[#2c2c2e] text-white text-[10.5px] uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-between shadow-sm active:scale-[0.99]"
        >
          <span>{item.ctaLabel}</span>
          <span className="text-xs transform group-hover/btn:translate-x-1 transition-transform">
            &rarr;
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function VogueShowcase() {
  return (
    <section id="experiencias" className="my-20 sm:my-28 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
      
      {/* Encabezado Editorial (Con líneas doradas elegantes, cero píldoras) */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto mb-14 sm:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#b8860b]/40"></span>
          <span className="text-[9.5px] uppercase tracking-[0.32em] font-semibold text-[#b8860b]">
            Dúo Signature • Expo 15 México
          </span>
          <span className="h-px w-8 bg-[#b8860b]/40"></span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-['Playfair_Display'] text-3xl sm:text-5xl font-normal text-[#1d1d1f] tracking-tight leading-[1.14]">
          El foco de atención en <br />
          <span className="italic font-normal bg-gradient-to-r from-[#b8860b] via-[#cf9b38] to-[#8a6510] bg-clip-text text-transparent">
            cada momento clave
          </span>
        </motion.h2>

        <p className="text-xs sm:text-sm text-[#86868b] font-light leading-relaxed max-w-lg mx-auto">
          Dos propuestas de autor diseñadas para enriquecer la estética de tu salón y capturar recuerdos que trascienden en foto y video.
        </p>
      </div>

      {/* Grid 3D de 2 Columnas Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 perspective-[1200px]">
        {items.map((item) => (
          <Card3D key={item.id} item={item} />
        ))}
      </div>

      {/* Nota inferior de combinación "missanti.premium" */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#fbfbfd] border border-black/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-[#1d1d1f] tracking-wide">
            ¿Deseas combinar ambas cabinas en tu evento?
          </p>
          <p className="text-[11px] text-[#86868b] font-light">
            Pregunta en el stand por nuestra experiencia combinada <strong class="text-[#1d1d1f] font-medium">missanti.premium</strong> con tarifa preferencial de Expo.
          </p>
        </div>
        <a 
          href="#apartar" 
          className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1d1d1f] hover:text-[#b8860b] transition-colors inline-flex items-center gap-1.5"
        >
          <span>Cotizar Combo VIP</span>
          <span>&rarr;</span>
        </a>
      </div>

    </section>
  );
}