import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

/**
 * Layout de la app autenticada: Navbar + contenido + footer.
 *
 * SLOT DEL CHATBOT (FE-7 — Seba): el widget se monta con createPortal()
 * dentro del div #chatbot-slot, sin modificar este archivo
 * (regla de convivencia #3: los compartidos los modifica Caro).
 */
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-line py-4 text-center text-xs text-muted">
        Escala Pay · Proyecto final Full Stack · Frontend: Caro &amp; Seba
      </footer>

      <div id="chatbot-slot" className="fixed right-4 bottom-4 z-40" />
    </div>
  );
}
