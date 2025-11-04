import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  china: {
    title: 'China en el Siglo XIX — Qing, comercio y conflicto',
    palette: 'Dorado imperial, rojo bermellón, marfil, negro carbón',
    body: (
      <>
        <p>
          El impacto del imperialismo occidental transformó los puertos y el tejido social: tratados desiguales,
          concesiones en ciudades como Shanghái, y la centralidad del té, la seda y la porcelana.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-100/90">
          <li><b>Primer plano:</b> juncos frente a cajas de té y pergaminos con caligrafía.</li>
          <li><b>Plano medio:</b> buques europeos y rutas marítimas trazadas con luz.</li>
          <li><b>Fondo:</b> skyline emergente de concesiones extranjeras en Shanghái.</li>
          <li><b>Texturas:</b> pergamino, seda y bronce envejecido con pátina.</li>
        </ul>
      </>
    ),
  },
  japan: {
    title: 'Japón Meiji — Modernización y tradición en diálogo',
    palette: 'Rojo bermellón, negro carbón, marfil, azul marino',
    body: (
      <>
        <p>
          La Restauración Meiji impulsó una modernización acelerada: ferrocarriles, industria, educación y
          un Estado-nación que negoció con Occidente sin perder su identidad.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-100/90">
          <li><b>Primer plano:</b> templo de madera laqueada y estandartes con mon familiar.</li>
          <li><b>Plano medio:</b> talleres, telégrafo y uniformes occidentales.</li>
          <li><b>Fondo:</b> Tokio en expansión bajo un cielo rojizo de amanecer.</li>
          <li><b>Efectos:</b> bruma cálida y pétalos en suspensión, símbolo de tránsito temporal.</li>
        </ul>
      </>
    ),
  },
  philippines: {
    title: 'Filipinas — Cambios coloniales y despertar ilustrado',
    palette: 'Dorado, índigo profundo, marfil',
    body: (
      <>
        <p>
          Encrucijada de fe y comercio: iglesias coloniales frente a puertos, circulación de ideas ilustradas
          y movimientos que anunciaron nuevas identidades colectivas.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-100/90">
          <li><b>Primer plano:</b> iglesia de piedra tallada y símbolos devocionales.</li>
          <li><b>Plano medio:</b> rutas de galeones, mercancías, imprentas y prensa.</li>
          <li><b>Fondo:</b> Manila portuaria, reflejos en el agua y horizonte tropical.</li>
          <li><b>Texturas:</b> madera, piedra coralina y papel impreso.</li>
        </ul>
      </>
    ),
  },
};

export default function InfoPanel({ selection, onClose }) {
  const item = selection ? content[selection] : null;
  return (
    <AnimatePresence>
      {item && (
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="absolute bottom-4 left-4 right-4 z-20 mx-auto w-[min(900px,100%)] overflow-hidden rounded-2xl border border-white/10 bg-black/60 text-amber-50 shadow-2xl backdrop-blur-md"
          role="dialog"
          aria-labelledby="panel-title"
        >
          <div className="flex items-start gap-4 p-5">
            <div className="flex-1">
              <h3 id="panel-title" className="text-lg font-semibold tracking-wide text-amber-200">
                {item.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-amber-300/80">
                Paleta: {item.palette}
              </p>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                {item.body}
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-2 rounded-md border border-white/10 bg-white/5 p-2 text-amber-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              aria-label="Cerrar panel informativo"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="border-t border-white/10 bg-gradient-to-r from-amber-500/10 via-amber-300/10 to-amber-500/10 p-3 text-xs text-amber-100/80">
            Consejo: explora los puntos brillantes para descubrir conexiones de comercio, religión y modernización.
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
