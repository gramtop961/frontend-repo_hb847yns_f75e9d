import React from 'react';
import Spline from '@splinetool/react-spline';

// 3D scene wrapper with atmospheric overlays and cinematic lighting vibe
export default function Scene3D() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Spline 3D scene */}
      <Spline
        scene="https://prod.spline.design/1yF0r0X0y2kE0m7Y/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Warm cinematic gradient glow (non-interactive so it won't block the scene) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 60%, rgba(255,196,140,0.28) 0%, rgba(255,167,84,0.12) 35%, rgba(0,0,0,0.0) 70%)',
        }}
      />

      {/* Light mist/fog overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30">
        <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(0,0,0,0))]" />
      </div>

      {/* Floating particles for atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-amber-200/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatY ${10 + Math.random() * 20}s linear infinite`,
              opacity: 0.6,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
