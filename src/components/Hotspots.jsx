import React from 'react';
import { Info } from 'lucide-react';

const spots = [
  {
    id: 'china',
    label: 'China',
    color: 'bg-red-700',
    ring: 'ring-red-400',
    position: { top: '55%', left: '28%' },
    hint: 'Qing, comercio del té y las guerras del opio'
  },
  {
    id: 'japan',
    label: 'Japón',
    color: 'bg-amber-600',
    ring: 'ring-amber-300',
    position: { top: '50%', left: '60%' },
    hint: 'Restauración Meiji y modernización acelerada'
  },
  {
    id: 'philippines',
    label: 'Filipinas',
    color: 'bg-indigo-800',
    ring: 'ring-indigo-300',
    position: { top: '68%', left: '48%' },
    hint: 'Dominio colonial y cambio social-religioso'
  },
];

export default function Hotspots({ onSelect }) {
  return (
    <div className="absolute inset-0">
      {spots.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full ${s.color} ${s.ring} ring-2 px-3 py-2 text-amber-100 shadow-lg shadow-black/40 backdrop-blur-md hover:brightness-110 focus:outline-none focus-visible:ring-4`}
          style={{ top: s.position.top, left: s.position.left }}
          aria-label={`Ver información histórica de ${s.label}`}
        >
          <span className="relative flex h-3 w-3">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.ring} opacity-75`}></span>
            <span className={`relative inline-flex h-3 w-3 rounded-full bg-amber-200`}></span>
          </span>
          <span className="text-sm font-semibold tracking-wide">{s.label}</span>
          <Info className="h-4 w-4 opacity-90" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/60 px-2 py-1 text-[10px] opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100">
            {s.hint}
          </span>
        </button>
      ))}
    </div>
  );
}
