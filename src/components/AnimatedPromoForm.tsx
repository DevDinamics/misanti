// src/components/AnimatedPromoForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Sparkles, Check, ArrowRight, Camera, Sparkle, Store, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnimatedPromoFormProps {
  whatsappNumber: string;
  scriptUrl: string;
}

export default function AnimatedPromoForm({ whatsappNumber, scriptUrl }: AnimatedPromoFormProps) {
  // Datos de contacto
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipoEvento, setTipoEvento] = useState('XV Años');

  // Personalizador de paquete
  const [cabinaVogue, setCabinaVogue] = useState(true); // Seleccionada por defecto
  const [cabinaEspejada, setCabinaEspejada] = useState(false);
  const [missantiStore, setMissantiStore] = useState(false);
  const [impresiones, setImpresiones] = useState<'0' | '100' | '150' | '200'>('150'); // 150 recomendadas por defecto

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calcula el texto del resumen
  const obtenerServiciosSeleccionados = () => {
    const list: string[] = [];
    if (cabinaVogue) list.push('Cabina Vogue (4 Horas)');
    if (cabinaEspejada) list.push('Cabina Espejada Inmersiva');
    if (missantiStore) list.push('missanti.store (Boutique de recuerdos con inauguración)');
    
    if (impresiones === '100') list.push('100 Impresiones 4×6 ($3,500 MXN)');
    else if (impresiones === '150') list.push('150 Impresiones 4×6 ($5,250 MXN)');
    else if (impresiones === '200') list.push('200 Impresiones 4×6 ($7,000 MXN)');
    else list.push('Solo fotografías digitales');

    return list;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cabinaVogue && !cabinaEspejada && !missantiStore) {
      alert('Por favor selecciona al menos una experiencia para tu evento.');
      return;
    }

    setLoading(true);

    const servicios = obtenerServiciosSeleccionados();

    const payload = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo.trim() || 'No proporcionado',
      tipoEvento,
      fecha: fecha || 'Por definir',
      servicios: servicios.join(', '),
      impresiones: impresiones === '0' ? 'Sin impresiones' : `${impresiones} fotos 4x6`,
      origen: 'Cotizador Interactivo • Expo 15',
      registradoEn: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
    };

    // 1. Envío a Google Apps Script con Timeout de protección (3.5 seg)
    if (scriptUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      try {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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

    // 2. Confeti Champagne & Oro
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#b8860b', '#cf9b38', '#f3e8d2', '#1d1d1f']
    });

    // 3. Abrir WhatsApp con la cotización desglosada
    setTimeout(() => {
      const listadoTexto = servicios.map(s => `  • ${s}`).join('\n');
      
      const msg = `¡Hola Missanti Events! ✨\n` +
        `Acabo de armar mi cotización personalizada en su portal de *Expo 15 México*:\n\n` +
        `📋 *DATOS DEL EVENTO*\n` +
        `• *Nombre:* ${payload.nombre}\n` +
        `• *WhatsApp:* ${payload.telefono}\n` +
        `• *Correo:* ${payload.correo}\n` +
        `• *Celebración:* ${payload.tipoEvento}\n` +
        `• *Fecha tentativa:* ${payload.fecha}\n\n` +
        `🛎️ *PAQUETE PERSONALIZADO:*\n` +
        `${listadoTexto}\n\n` +
        `Quiero validar disponibilidad para mi fecha y apartar con mi tarifa especial de Expo.`;

      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    }, 1100);
  };

  return (
    <section id="apartar" class="my-20 max-w-3xl mx-auto px-4 scroll-mt-24">
      
      <div className="bg-white border border-black/[0.08] p-6 sm:p-10 md:p-12 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden">
        
        {/* Cabecera Editorial */}
        <div className="border-b border-black/[0.06] pb-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#b8860b] block">
              Cotizador a Medida • Expo 15
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-normal text-[#1d1d1f] tracking-tight">
              Personaliza tu Experiencia
            </h2>
            <p className="text-xs text-[#86868b] font-light max-w-md leading-relaxed">
              Elige los servicios que deseas para tu fiesta. Te enviaremos disponibilidad inmediata a WhatsApp y correo.
            </p>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-black/[0.05]">
            <span className="text-[10px] text-[#86868b] uppercase tracking-wider block">Reserva oficial con</span>
            <span className="text-sm font-semibold text-[#1d1d1f]">20% de Anticipo</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success-box"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-14 h-14 bg-[#b8860b]/10 text-[#b8860b] rounded-2xl flex items-center justify-center mx-auto border border-[#b8860b]/30">
                <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-['Playfair_Display'] text-2xl text-[#1d1d1f]">¡Cotización Registrada!</h3>
                <p className="text-xs text-[#86868b] max-w-sm mx-auto font-light leading-relaxed">
                  Tus datos han sido registrados con éxito. Te estamos redirigiendo a WhatsApp para darte atención directa y enviarte tu propuesta formal.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* PASO 1: CONTACTO Y FECHA */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-[#b8860b]">01.</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1d1d1f]">
                    Datos de la Celebración
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6e6e73] mb-1 font-medium">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Sofía Mendoza"
                      className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6e6e73] mb-1 font-medium">
                      Teléfono / WhatsApp (10 dígitos) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Ej. 55 1234 5678"
                      className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] uppercase tracking-wider text-[#6e6e73] mb-1 font-medium">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6e6e73] mb-1 font-medium">
                      Tipo de Evento
                    </label>
                    <select
                      value={tipoEvento}
                      onChange={(e) => setTipoEvento(e.target.value)}
                      className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition"
                    >
                      <option value="XV Años">XV Años</option>
                      <option value="Boda">Boda</option>
                      <option value="Graduación">Graduación</option>
                      <option value="Cumpleaños / Social">Cumpleaños / Social</option>
                      <option value="Empresarial">Evento Empresarial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6e6e73] mb-1 font-medium">
                      Fecha Estimada
                    </label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full bg-[#fbfbfd] border border-black/[0.08] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1d1d1f] focus:outline-none focus:border-[#b8860b] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* PASO 2: SELECCIÓN DE EXPERIENCIAS PRINCIPALES */}
              <div className="space-y-4 pt-4 border-t border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[#b8860b]">02.</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1d1d1f]">
                      Selecciona tus Experiencias
                    </span>
                  </div>
                  <span className="text-[10px] text-[#86868b] font-light">Puedes combinar varias</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Tarjeta Cabina Vogue */}
                  <div
                    onClick={() => setCabinaVogue(!cabinaVogue)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      cabinaVogue
                        ? 'border-[#b8860b] bg-[#fffdf9] shadow-sm'
                        : 'border-black/[0.08] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Camera className={`w-4 h-4 ${cabinaVogue ? 'text-[#b8860b]' : 'text-[#86868b]'}`} />
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                        cabinaVogue ? 'bg-[#b8860b] border-[#b8860b] text-white' : 'border-black/20'
                      }`}>
                        {cabinaVogue && '✓'}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">Cabina Vogue</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">4 Horas Continuas</div>
                    <p className="text-[10px] text-[#86868b] font-light mt-1.5 leading-snug">
                      Fotos digitales ilimitadas, tocador Hollywood, unifilas y utilería.
                    </p>
                  </div>

                  {/* Tarjeta Cabina Espejada */}
                  <div
                    onClick={() => setCabinaEspejada(!cabinaEspejada)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      cabinaEspejada
                        ? 'border-[#b8860b] bg-[#fffdf9] shadow-sm'
                        : 'border-black/[0.08] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Sparkle className={`w-4 h-4 ${cabinaEspejada ? 'text-[#b8860b]' : 'text-[#86868b]'}`} />
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                        cabinaEspejada ? 'bg-[#b8860b] border-[#b8860b] text-white' : 'border-black/20'
                      }`}>
                        {cabinaEspejada && '✓'}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">Cabina Espejada</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">Efecto Infinito</div>
                    <p className="text-[10px] text-[#86868b] font-light mt-1.5 leading-snug">
                      Superficies reflejantes, letrero de neón y esferas orbs inmersivas.
                    </p>
                  </div>

                  {/* Tarjeta missanti.store */}
                  <div
                    onClick={() => setMissantiStore(!missantiStore)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      missantiStore
                        ? 'border-[#b8860b] bg-[#fffdf9] shadow-sm'
                        : 'border-black/[0.08] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Store className={`w-4 h-4 ${missantiStore ? 'text-[#b8860b]' : 'text-[#86868b]'}`} />
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                        missantiStore ? 'bg-[#b8860b] border-[#b8860b] text-white' : 'border-black/20'
                      }`}>
                        {missantiStore && '✓'}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">missanti.store</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">Tienda de Recuerdos</div>
                    <p className="text-[10px] text-[#86868b] font-light mt-1.5 leading-snug">
                      Boutique de exhibición con ceremonia de corte de listón y tijeras gigantes.
                    </p>
                  </div>

                </div>
              </div>

              {/* PASO 3: COMPLEMENTO DE IMPRESIONES FÍSICAS */}
              <div className="space-y-4 pt-4 border-t border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[#b8860b]">03.</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1d1d1f]">
                      Impresiones Fotográficas 4×6 (Opcional)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#86868b] font-light">Papel térmico profesional</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  
                  <div
                    onClick={() => setImpresiones('0')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      impresiones === '0'
                        ? 'border-[#1d1d1f] bg-black/[0.04]'
                        : 'border-black/[0.06] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1d1d1f]">Solo Digital</div>
                    <div className="text-[10px] text-[#86868b] mt-0.5">Sin fotos impresas</div>
                  </div>

                  <div
                    onClick={() => setImpresiones('100')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      impresiones === '100'
                        ? 'border-[#b8860b] bg-[#fffdf9] ring-1 ring-[#b8860b]/30'
                        : 'border-black/[0.06] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1d1d1f]">100 Fotos</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">$3,500 MXN</div>
                  </div>

                  <div
                    onClick={() => setImpresiones('150')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      impresiones === '150'
                        ? 'border-[#b8860b] bg-[#fffdf9] ring-1 ring-[#b8860b]/30 shadow-sm'
                        : 'border-black/[0.06] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1d1d1f]">150 Fotos</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">$5,250 MXN</div>
                  </div>

                  <div
                    onClick={() => setImpresiones('200')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      impresiones === '200'
                        ? 'border-[#b8860b] bg-[#fffdf9] ring-1 ring-[#b8860b]/30'
                        : 'border-black/[0.06] bg-[#fbfbfd] hover:border-black/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1d1d1f]">200 Fotos</div>
                    <div className="text-[10px] text-[#b8860b] font-medium mt-0.5">$7,000 MXN</div>
                  </div>

                </div>
              </div>

              {/* CAJA DE RESUMEN DE COTIZACIÓN */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#86868b] font-semibold">
                  Resumen de tu selección:
                </div>
                <div className="text-xs text-[#1d1d1f] font-light space-y-1">
                  {obtenerServiciosSeleccionados().map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#b8860b]" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÓN DE ACCIÓN */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1d1d1f] hover:bg-[#323236] text-white font-medium py-4 px-6 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Generando tu Cotización...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar y Bloquear Fecha en WhatsApp</span>
                      <ArrowRight className="w-4 h-4 text-[#dfba73]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#86868b] font-light">
                  🔒 Sin cobro inmediato. Recibirás tu presupuesto formal y disponibilidad de salón en segundos.
                </p>
              </div>

            </form>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}