import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/operations', label: 'Operaciones' },
  { to: '/transactions', label: 'Movimientos' },
  { to: '/rates', label: 'Tasas' },
];

function linkClasses(isActive: boolean): string {
  return `rounded-md px-2 py-1 text-sm transition-colors ${
    isActive ? 'font-medium text-brand-700' : 'text-muted hover:text-ink'
  }`;
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 text-base font-semibold text-brand-700"
        >
          <img src="/favicon.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          Escala Pay
        </NavLink>

        {/* Navegación principal (desktop) */}
        <nav aria-label="Principal" className="hidden gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClasses(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/*
          FE-2 (Caro): acá va el menú de usuario con el email y el botón de logout,
          usando useAuth(). Por ahora queda un espacio para no tocar el layout después.
        */}
        <div className="hidden w-24 justify-end md:flex" aria-hidden="true" />
      </div>

      {/* Navegación móvil: scroll horizontal para que sea usable desde celular (FE-3) */}
      <nav
        aria-label="Principal (móvil)"
        className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 md:hidden"
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClasses(isActive)}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
