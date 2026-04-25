'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/basic-operations', label: 'Operaciones Básicas' },
  { href: '/gaussian-elimination', label: 'Eliminación Gaussiana' },
  { href: '/gauss-jordan', label: 'Gauss-Jordan' },
  { href: '/inverse', label: 'Inversa' },
  { href: '/cramer', label: 'Regla de Cramer' },
  { href: '/about', label: 'Acerca de' }
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Matrix
        </Link>

        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="inline-flex flex-col justify-between h-8 w-8 md:hidden focus:outline-none focus:ring-2 focus:ring-teal-500"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="block h-0.5 w-full rounded-full bg-slate-900" />
          <span className="block h-0.5 w-full rounded-full bg-slate-900" />
          <span className="block h-0.5 w-full rounded-full bg-slate-900" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50">
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold text-slate-900">Navegación</div>
              <button
                type="button"
                aria-label="Cerrar menú"
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-medium transition ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
