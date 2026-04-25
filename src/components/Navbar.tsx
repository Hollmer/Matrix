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
    <nav className="relative bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Matrix
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium">
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
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:hidden"
        >
          <span className="sr-only">Menú</span>
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full bottom-0 z-50 lg:hidden bg-slate-950/30 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-[min(90vw,320px)] bg-[#ffffff] p-6 shadow-2xl shadow-slate-900/20 rounded-l-[40px] border-l border-slate-200 animate-slide-in">
            <nav className="flex flex-col gap-4 bg-[#ffffff] rounded-[30px] p-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-3xl px-4 py-4 text-base font-semibold transition ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-900 hover:bg-slate-100'}`}
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
