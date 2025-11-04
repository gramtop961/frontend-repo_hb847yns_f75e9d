import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI error captured:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    // Try a soft reload
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-neutral-950 p-6 text-amber-50">
          <div className="w-[min(680px,100%)] rounded-2xl border border-white/10 bg-black/60 p-6 text-center shadow-xl backdrop-blur-md">
            <h2 className="text-lg font-semibold text-amber-200">Algo salió mal</h2>
            <p className="mt-2 text-sm opacity-90">
              Se produjo un error al renderizar la escena. Prueba recargando la vista previa. Si el problema persiste, abre la consola del navegador para ver detalles.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-4 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            >
              Recargar
            </button>
            {this.state.error && (
              <pre className="mt-4 max-h-40 overflow-auto rounded bg-black/40 p-3 text-left text-xs text-amber-200/90">
                {String(this.state.error)}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
