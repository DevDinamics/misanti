// src/components/AnimatedPromoForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Sparkles, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnimatedPromoFormProps {
  whatsappNumber: string;
  scriptUrl: string;
}

export default function AnimatedPromoForm({ whatsappNumber, scriptUrl }: AnimatedPromoFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    rol: 'Mamá / Papá de la Quinceañera',
    servicio: 'Cabina Vogue Monumental + Efecto Vals',
    fecha: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nombre: formData.nombre.trim(),
      telefono: formData.telefono.trim(),
      rol: formData.rol,
      servicio: formData.servicio,
      fecha: formData.fecha || 'Por definir',
      origen: 'QR Stand - Expo 15 Palacio de los Deportes',
      registradoEn: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
    };

    // 1. Envío blindado a Google Apps Script con Timeout de seguridad
    if (scriptUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s máx

      try {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'text/plain;charset=utf-8' 
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } catch (err) {
        console.warn('Sheets sync finalizado o timeout (continuando flujo):', err);
      } finally {
        clearTimeout(timeoutId);
      }
    }

    setLoading(false);
    setSuccess(true);

    // 2. Confeti estilo pasarela (Champagne, Dorado, Blanco Alabastro)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#b8860b', '#cf9b38', '#dfba73', '#ffffff', '#e2c9c5']
    });

    // 3. Preparar mensaje y abrir WhatsApp
    setTimeout(() => {
      const msg = `¡Hola Missanti Events! 👋\nMe acabo de registrar en su stand de *Expo 15 México* (Palacio de los Deportes):\n\n` +
        `• *Nombre:* ${payload.nombre}\n` +
        `• *Contacto:* ${payload.rol}\n` +
        `• *WhatsApp:* ${payload.telefono}\n` +
        `• *Interés:* ${payload.servicio}\n` +
        `• *Fecha estimada:* ${payload.fecha}\n\n` +
        `Quiero validar mi cortesía y apartar mi fecha de Expo.`;

      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    }, 1100);
  };

  return (
    <motion.section
      id="apartar"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="my-14 max-w-xl mx-auto bg-white/95 border border-black/[0.08] p-7 sm:p-10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-2xl relative overflow-hidden scroll-mt-24"
    >
      {/* Resplandor superior cálido */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-44 bg-gradient-to-b from-[#b8860b]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Cabecera del formulario */}
      <div className="text-center mb-7 space-y-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.06]">
          <Sparkles className="w-3 h-3 text-[#b8860b]" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#86868b] font-medium">
            Beneficio Exclusivo • Expo 15
          </span>
        </div>

        <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-normal text-[#1d1d1f] tracking-tight">
          Bloquea tu Fecha & Cortesía
        </h2>
        <p className="text-xs text-[#86868b] max-w-xs mx-auto leading-relaxed font-light">
          Registra tus datos para congelar la tarifa especial del evento o cotizar directamente en el stand.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-4"
          >
            <div className="w-14 h-14 bg-[#b8860b]/10 text-[#b8860b] rounded-full flex items-center justify-center mx-auto border border-[#b8860b]/30 shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-['Playfair_Display'] text-2xl text-[#1d1d1f]">¡Lugar Registrado!</h3>
              <p className="text-xs text-[#86868b] max-w-xs mx-auto font-light leading-relaxed">
                Tus datos quedaron asegurados. Te estamos redirigiendo a WhatsApp para enviarte tu confirmación en vivo...
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="lead-form"
            onSubmit={handleSubmit}
            className="space-y-4 relative z-10"
          >
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-[10px] uppercase tracking-[0.22em] text-[#6e6e73] font-medium mb-1.5">
                Nombre Completo
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Patricia Mendoza"
                className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1d1d1f] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#b8860b] focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Teléfono / WhatsApp */}
            <div>
              <label htmlFor="telefono" className="block text-[10px] uppercase tracking-[0.22em] text-[#6e6e73] font-medium mb-1.5">
                Número de WhatsApp (10 dígitos)
              </label>
              <input
                id="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="Ej. 55 1234 5678"
                className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1d1d1f] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#b8860b] focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Fila 2 columnas: Rol y Fecha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="rol" className="block text-[10px] uppercase tracking-[0.22em] text-[#6e6e73] font-medium mb-1.5">
                  ¿Quién solicita?
                </label>
                <select
                  id="rol"
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3.5 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition-all shadow-sm"
                >
                  <option value="Mamá / Papá">Mamá / Papá</option>
                  <option value="La Quinceañera">La Quinceañera</option>
                  <option value="Novios (Boda)">Novios (Boda)</option>
                  <option value="Padrino / Familiar">Padrino / Familiar</option>
                </select>
              </div>

              <div>
                <label htmlFor="fecha" className="block text-[10px] uppercase tracking-[0.22em] text-[#6e6e73] font-medium mb-1.5">
                  Fecha Aprox. del Evento
                </label>
                <input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3 py-2.5 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Servicio de Interés */}
            <div>
              <label htmlFor="servicio" className="block text-[10px] uppercase tracking-[0.22em] text-[#6e6e73] font-medium mb-1.5">
                Experiencia de Interés
              </label>
              <select
                id="servicio"
                value={formData.servicio}
                onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3.5 py-3 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition-all shadow-sm"
              >
                <option value="Paquete Completo (Cabina Vogue + Vals Soñado)">
                  Paquete Completo (Cabina Vogue + Vals Soñado)
                </option>
                <option value="Solo Cabina Vogue Monumental">
                  Solo Cabina Vogue Monumental
                </option>
                <option value="Efecto Nube & Chispas para Vals">
                  Efecto Nube & Chispas para Vals
                </option>
                <option value="Producción Integral / Personalizado">
                  Producción Integral / Personalizado
                </option>
              </select>
            </div>

            {/* Botón de Envío */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#1d1d1f] hover:bg-[#323236] text-white font-medium py-3.5 px-6 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Asegurando Lugar en Expo...</span>
                </>
              ) : (
                <>
                  <span>Bloquear Cortesía de Expo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-[#86868b] pt-1 font-light">
              <ShieldCheck className="w-3 h-3 text-[#b8860b]" />
              <span>Sin anticipo obligatorio en este formulario. Cupo limitado por fecha.</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}