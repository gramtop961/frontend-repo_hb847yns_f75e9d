import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Simple generative ambient using WebAudio (no external files)
export default function AmbientAudio() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = async () => {
    if (playing) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.0001; // start silent then fade in
    master.connect(ctx.destination);

    // Layered tones: koto-like pluck + airy drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = 'sine';
    drone.frequency.value = 196; // G3
    droneGain.gain.value = 0.02;
    drone.connect(droneGain).connect(master);
    drone.start();

    // Soft gong pulses
    const gong = ctx.createOscillator();
    const gongGain = ctx.createGain();
    gong.type = 'sine';
    gong.frequency.value = 392; // G4
    gongGain.gain.value = 0.0;
    gong.connect(gongGain).connect(master);
    gong.start();

    let t = 0;
    const interval = setInterval(() => {
      t += 1;
      // random gentle detune
      drone.frequency.setTargetAtTime(190 + Math.random() * 10, ctx.currentTime, 0.5);
      // pluck-like envelope
      const now = ctx.currentTime;
      gongGain.gain.cancelScheduledValues(now);
      gongGain.gain.setValueAtTime(0.0001, now);
      gongGain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
    }, 4000);

    ctxRef.current = { ctx, master, drone, droneGain, gong, gongGain, interval };
    gainRef.current = master;

    // fade in
    master.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 2.0);
    setPlaying(true);
  };

  const stop = () => {
    if (!playing || !ctxRef.current) return;
    const { ctx, drone, gong, interval, master } = ctxRef.current;
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    setTimeout(() => {
      drone.stop();
      gong.stop();
      clearInterval(interval);
      ctx.close();
      ctxRef.current = null;
      setPlaying(false);
    }, 700);
  };

  return (
    <div className="pointer-events-auto absolute right-4 top-4 z-20">
      {playing ? (
        <button
          onClick={stop}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs text-amber-100 shadow backdrop-blur hover:bg-black/60"
          aria-label="Detener ambiente musical"
        >
          <VolumeX className="h-4 w-4" />
          Detener ambiente
        </button>
      ) : (
        <button
          onClick={start}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs text-amber-100 shadow backdrop-blur hover:bg-black/60"
          aria-label="Iniciar ambiente musical"
        >
          <Volume2 className="h-4 w-4" />
          Música ambiental
        </button>
      )}
    </div>
  );
}
