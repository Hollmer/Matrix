'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
          aria-label="Menú"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
