import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Matrix - Álgebra Lineal Interactiva',
  description: 'Aplicación educativa para operaciones con matrices',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-screen bg-surface-bright text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
        <div className="app-shell">
          <Navbar />
          <div className="flex min-h-screen justify-start px-2 sm:px-4">
            <div className="w-full max-w-full">
              {children}
            </div>
          </div>
          <footer className="w-full border-t border-slate-200 py-8 mt-auto bg-white transition-opacity duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <div className="font-bold text-slate-400">Matrix Research Lab</div>
                <p className="font-sans text-xs text-slate-500 Inter">© 2024 Matrix Research Lab. Suite de Álgebra de Precisión.</p>
              </div>
              <div className="flex gap-6">
                <a className="font-sans text-xs text-slate-500 Inter hover:text-slate-900 transition-colors underline decoration-teal-500/30 underline-offset-4" href="#">Documentación</a>
                <a className="font-sans text-xs text-slate-500 Inter hover:text-slate-900 transition-colors underline decoration-teal-500/30 underline-offset-4" href="#">Metodología</a>
                <a className="font-sans text-xs text-slate-500 Inter hover:text-slate-900 transition-colors underline decoration-teal-500/30 underline-offset-4" href="#">API</a>
                <a className="font-sans text-xs text-slate-500 Inter hover:text-slate-900 transition-colors underline decoration-teal-500/30 underline-offset-4" href="#">Privacidad</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
