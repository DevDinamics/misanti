// src/components/HeroVogueApple.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Camera, Sparkle } from 'lucide-react';

// Si tu imagen está en src/assets/images/, cambia a '../assets/images/Cabina_V_1.JPG'
import cabinaAsset from '../assets/images/Cabina_2_.JPG';

export default function HeroVogueApple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const photoUrl = typeof cabinaAsset === 'string' 
    ? cabinaAsset 
    : (cabinaAsset as any)?.src || '/Cabina_V_1.JPG';

  // Animaciones de Parallax y Opacidad vinculadas al scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // La imagen de fondo hace un zoom suave y baja sutilmente al scrollear
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden pt-8 pb-16"
    >
      
      {/* 1. IMAGEN DE FONDO CON PARALLAX */}
      <motion.div 
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 w-full h-full -z-20 pointer-events-none"
      >
        <img 
          src={photoUrl} 
          alt="Montaje Real Cabina Vogue Missanti Events" 
          className="w-full h-full object-cover object-[center_35%] filter brightness-[1.03] contrast-[1.02]"
          loading="eager"
        />
      </motion.div>

      {/* 2. CAPAS DE DEGRADADO EDITORIAL (Vogue/Apple White Canvas) */}
      {/* Velo blanco translúcido general para que la foto no compita con el texto */}
      <div className="absolute inset-0 bg-white/70 sm:bg-white/65 backdrop-blur-[1.5px] -z-10 pointer-events-none" />
      
      {/* Degradado superior para fundir con el Navbar */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#fbfbfd] via-[#fbfbfd]/80 to-transparent -z-10 pointer-events-none" />
      
      {/* Degradado inferior para transición imperceptible con la siguiente sección */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#fbfbfd] via-[#fbfbfd]/90 to-transparent -z-10 pointer-events-none" />

      {/* 3. CONTENIDO PRINCIPAL */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-5 text-center flex flex-col items-center space-y-6 sm:space-y-7"
      >
        
        {/* Badge Flotante Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/[0.08] shadow-sm backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6e6e73] font-medium">
            The Vogue Booth Experience • Expo 15 México
          </span>
        </motion.div>

        {/* Titular Principal Tipográfico */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-normal text-[#1d1d1f] tracking-tight leading-[1.08] max-w-3xl drop-shadow-sm"
        >
          Tu portada de revista. <br />
          <span className="italic font-normal bg-gradient-to-r from-[#b8860b] via-[#cf9b38] to-[#8a6510] bg-clip-text text-transparent">
            Inmortalizada en vivo.
          </span>
        </motion.h1>

        {/* Subtítulo enfocado en la experiencia física real */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#424245] text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Estructura monumental de pasarela, <strong class="text-[#1d1d1f] font-medium">tocador Hollywood con iluminación continua</strong> y unifilas VIP. La experiencia viral de TikTok para tus XV en CDMX y Edomex.
        </motion.p>

        {/* Botones de Acción (CTAs) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2"
        >
          <a 
            href="#apartar" 
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#1d1d1f] text-white font-medium text-xs uppercase tracking-widest hover:bg-[#323236] transition-all shadow-lg shadow-black/10 active:scale-95 flex items-center justify-center gap-2">
            <span>Apartar Fecha de Expo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a 
            href="#experiencias" 
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/75 hover:bg-white border border-black/[0.08] text-[#1d1d1f] font-medium text-xs uppercase tracking-widest transition-all shadow-sm backdrop-blur-sm">
            Ver Paquetes
          </a>
        </motion.div>

        {/* Pills de Montaje Real Flotantes (Detalles del setup) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-md border border-black/[0.06] py-2 px-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] uppercase tracking-wider font-medium text-[#1d1d1f]">Cabina 3D Monumental</span>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-black/[0.06] py-2 px-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] uppercase tracking-wider font-medium text-[#1d1d1f]">Tocador con Luces</span>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-black/[0.06] py-2 px-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] uppercase tracking-wider font-medium text-[#1d1d1f]">Unifilas VIP Doradas</span>
          </div>
        </motion.div>

        {/* Indicador sutil de scroll */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-2 text-[9px] uppercase tracking-[0.28em] text-[#86868b] flex items-center gap-1.5"
        >
          <span>Desliza para explorar</span>
          <span className="animate-bounce">&darr;</span>
        </motion.div>

      </motion.div>

    </section>
  );
}