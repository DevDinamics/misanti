// src/components/HeroVogueApple.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

// Importación directa de la foto de montaje real
import cabinaAsset from '../assets/images/Cabina_2_.JPG';

export default function HeroVogueApple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const photoUrl = typeof cabinaAsset === 'string' 
    ? cabinaAsset 
    : (cabinaAsset as any)?.src || '/Cabina_2_.JPG';

  // Control de scroll suave para Parallax inmersivo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  // Efectos en scroll: zoom cinematográfico suave y elevación de capas
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-12 pb-16 px-4 sm:px-6"
    >
      
      {/* 1. FOTOGRAFÍA DE FONDO CON ZOOM PARALLAX */}
      <motion.div 
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 w-full h-full -z-20 pointer-events-none"
      >
        <img 
          src={photoUrl} 
          alt="Montaje Real Missanti Events" 
          className="w-full h-full object-cover object-[center_30%] filter brightness-[1.02] contrast-[1.02]"
          loading="eager"
        />
      </motion.div>

      {/* 2. VELO EDITORIAL DE CRISTAL ALABASTRO (Legibilidad absoluta sin tapar el jardín) */}
      <div className="absolute inset-0 bg-white/75 sm:bg-white/70 backdrop-blur-[2px] -z-10 pointer-events-none" />
      
      {/* Difuminado superior e inferior para transición imperceptible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fbfbfd] via-[#fbfbfd]/80 to-transparent -z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fbfbfd] via-[#fbfbfd]/90 to-transparent -z-10 pointer-events-none" />

      {/* 3. CONTENIDO CENTRAL EDITORIAL */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-8"
      >
        
        {/* Cabecera Estilo Alta Joyería / Atelier (Sin píldoras) */}
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-[#1d1d1f]"
        >
          <span className="w-8 sm:w-12 h-px bg-[#b8860b]/50"></span>
          <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.35em] text-[#6e6e73] font-mono font-medium">
            Missanti.Events • Expo 15 México
          </span>
          <span className="w-8 sm:w-12 h-px bg-[#b8860b]/50"></span>
        </motion.div>

        {/* Titular Principal Tipográfico */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-normal text-[#1d1d1f] tracking-tight leading-[1.08] drop-shadow-sm">
            Tu portada de revista. <br />
            <span className="italic font-normal bg-gradient-to-r from-[#b8860b] via-[#cf9b38] to-[#8a6510] bg-clip-text text-transparent">
              Inmortalizada en vivo.
            </span>
          </h1>

          {/* Lema sutil integrado de la marca */}
          <p className="text-[11px] font-['Playfair_Display'] italic text-[#b8860b] tracking-widest pt-1">
            "¿Y por qué no?"
          </p>
        </motion.div>

        {/* Subtítulo alineado a los servicios de Missanti */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#424245] text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed"
        >
          Especialistas en montajes de alta gama para XV años y bodas: desde la monumental <strong className="text-[#1d1d1f] font-medium">Cabina Vogue</strong> con tocador iluminado y la <strong className="text-[#1d1d1f] font-medium">Cabina Espejada</strong>, hasta nuestra exclusiva boutique <strong className="text-[#1d1d1f] font-medium">missanti.store</strong>.
        </motion.p>

        {/* Botones de Acción Geométricos y Estilizados (Adiós píldoras) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto pt-1"
        >
          {/* Botón Principal: Marco Rectangular Atelier */}
          <a 
            href="#apartar" 
            className="group px-8 py-3.5 bg-[#1d1d1f] hover:bg-[#323236] text-white text-[11px] uppercase tracking-[0.24em] font-medium rounded-lg transition-all duration-300 shadow-lg shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-2.5 border border-black/20"
          >
            <span>Bloquear Fecha en Expo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#dfba73] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Botón Secundario: Cristal Rectangular */}
          <a 
            href="#servicios" 
            className="px-7 py-3.5 bg-white/80 hover:bg-white text-[#1d1d1f] text-[11px] uppercase tracking-[0.24em] font-medium rounded-lg border border-black/10 hover:border-black/25 transition-all duration-300 shadow-sm backdrop-blur-md text-center"
          >
            Explorar Servicios
          </a>
        </motion.div>

        {/* 4. TRÍPTICO EDITORIAL DE CRISTAL (En lugar de píldoras flotantes) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-3xl pt-4"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06] overflow-hidden text-left">
            
            {/* Columna 1: Cabina Vogue */}
            <div className="p-4 sm:p-5 flex flex-col justify-between group hover:bg-white/90 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-[#b8860b] font-bold tracking-widest uppercase">SIGNATURE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]/40 group-hover:bg-[#b8860b] transition-colors"></span>
              </div>
              <p className="font-['Playfair_Display'] text-sm font-semibold text-[#1d1d1f]">Cabina Vogue</p>
              <p className="text-[10px] text-[#6e6e73] font-light mt-1 leading-snug">
                4 hrs de fotos ilimitadas, tocador Hollywood iluminado y unifilas doradas.
              </p>
            </div>

            {/* Columna 2: Cabina Espejada */}
            <div className="p-4 sm:p-5 flex flex-col justify-between group hover:bg-white/90 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-[#86868b] font-bold tracking-widest uppercase">INMERSIVO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#b8860b] transition-colors"></span>
              </div>
              <p className="font-['Playfair_Display'] text-sm font-semibold text-[#1d1d1f]">Cabina Espejada</p>
              <p className="text-[10px] text-[#6e6e73] font-light mt-1 leading-snug">
                Superficies reflejantes, letrero de neón y esferas orbs para videos virales.
              </p>
            </div>

            {/* Columna 3: missanti.store */}
            <div className="p-4 sm:p-5 flex flex-col justify-between group hover:bg-white/90 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-[#86868b] font-bold tracking-widest uppercase">EXCLUSIVO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#b8860b] transition-colors"></span>
              </div>
              <p className="font-['Playfair_Display'] text-sm font-semibold text-[#1d1d1f]">missanti.store</p>
              <p className="text-[10px] text-[#6e6e73] font-light mt-1 leading-snug">
                Boutique iluminada con ceremonia de inauguración y tijeras gigantes.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Indicador tipográfico de scroll */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-1 text-[9px] uppercase tracking-[0.3em] text-[#86868b] flex items-center gap-2"
        >
          <span>Desliza para explorar el catálogo</span>
          <span className="animate-bounce text-[#b8860b]">&darr;</span>
        </motion.div>

      </motion.div>

    </section>
  );
}