import React from 'react';
import { Map } from 'lucide-react';

export default function LegendBar() {
  return (
    <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 mx-auto mt-6 flex w-[min(1100px,100%)] flex-col items-center gap-3 px-4 text-amber-50">
      <div className="pointer-events-auto flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Map className="h-5 w-5 text-amber-300" />
          <h1 className="text-base font-semibold tracking-wide">
            Transformaciones de Asia en el Siglo XIX
          </h1>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <LegendDot color="bg-red-700" label="China" />
          <LegendDot color="bg-amber-600" label="Japón" />
          <LegendDot color="bg-indigo-800" label="Filipinas" />
        </div>
      </div>

      {/* Animated maritime routes overlay */}
      <svg
        className="pointer-events-none absolute -z-0 h-56 w-full"
        viewBox="0 0 1200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M100,160 C360,40 640,220 900,80"
          stroke="url(#route)"
          strokeWidth="2"
        >
          <animate
            attributeName="stroke-dasharray"
            from="1, 8"
            to="8, 1"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M200,190 C420,120 600,120 1020,160"
          stroke="url(#route)"
          strokeWidth="2"
        >
          <animate attributeName="stroke-dasharray" from="1, 10" to="10, 1" dur="6s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block h-3 w-3 rounded-full ${color}`}></span>
      <span className="text-xs opacity-90">{label}</span>
    </div>
  );
}
