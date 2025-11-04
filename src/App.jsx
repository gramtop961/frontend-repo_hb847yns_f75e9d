import React, { useState } from 'react';
import Scene3D from './components/Scene3D';
import Hotspots from './components/Hotspots';
import InfoPanel from './components/InfoPanel';
import LegendBar from './components/LegendBar';

export default function App() {
  const [selection, setSelection] = useState(null);

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-950 text-amber-50">
      <div className="relative h-full w-full">
        {/* 3D immersive scene */}
        <Scene3D />

        {/* Title + legend + animated routes (also hosts audio control if desired) */}
        <LegendBar />

        {/* Interactive hotspots for each country */}
        <Hotspots onSelect={(id) => setSelection(id)} />

        {/* Contextual information panel */}
        <InfoPanel selection={selection} onClose={() => setSelection(null)} />

        {/* Cinematic bottom gradient that doesn't block interactions */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/40 to-transparent"
        />
      </div>
    </div>
  );
}
