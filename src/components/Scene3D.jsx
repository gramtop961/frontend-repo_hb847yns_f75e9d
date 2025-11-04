import React, { useState, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

// 3D scene wrapper with atmospheric overlays and cinematic lighting vibe
export default function Scene3D() {
  const scenes = [
    // Primary scene (can occasionally fail on some networks)
    'https://prod.spline.design/1yF0r0X0y2kE0m7Y/scene.splinecode',
    // Backup lightweight scene
    'https://prod.spline.design/4b2G5P7oF1Q7rYfK/scene.splinecode',
  ];

  const [sceneIndex, setSceneIndex] = useState(0);
  const [error, setError] = useState(null);

  const handleError = useCallback((e) => {
    const msg = e?.message || 'Error al cargar la escena 3D';
    // eslint-disable-next-line no-console
    console.error('Spline error:', e);
    setError(msg);
  }, []);

  const tryBackup = () => {
    if (sceneIndex < scenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
      setError(null);
    }
  };

  const retryCurrent = () => {
    // Force re-mount by toggling index back and forth when only one option left
    setError(null);
    setSceneIndex((i) => (i === 0 && scenes.length === 1 ? 0 : i));
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {!error ? (
        <Spline
          key={sceneIndex}
          scene={scenes[sceneIndex]}
          style={{ width: '100%', height: '100%' }}
          onError={handleError}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-amber-50">
          <h3 className="text-base font-semibold text-amber-200">No se pudo cargar la escena 3D</h3>
          <p className="mt-2 max-w-md text-center text-sm opacity-90">
            Puede ser un bloqueo de red o del navegador. Intenta recargar la vista previa o abrir en una pestaña privada.
          </p>
          <pre className="mt-3 max-w-lg overflow-auto rounded bg-white/5 p-2 text-xs text-amber-200/90">
            {String(error)}
          </pre>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={retryCurrent}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            >
              Reintentar escena actual
            </button>
            {sceneIndex < scenes.length - 1 && (
              <button
                onClick={tryBackup}
                className="rounded-md border border-amber-300/30 bg-amber-200/10 px-3 py-2 text-xs text-amber-100 hover:bg-amber-200/20"
              >
                Cargar escena alternativa
              </button>
            )}
          </div>
        </div>
      )}

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
