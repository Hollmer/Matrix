import Link from 'next/link';

const tiles = [
  {
    title: 'Operaciones Básicas',
    description: 'Suma, resta, multiplicación de matrices y más.',
    href: '/basic-operations'
  },
  {
    title: 'Eliminación Gaussiana',
    description: 'Resuelve sistemas de ecuaciones paso a paso.',
    href: '/gaussian-elimination'
  },
  {
    title: 'Gauss-Jordan',
    description: 'Forma reducida de matrices.',
    href: '/gauss-jordan'
  },
  {
    title: 'Matriz Inversa',
    description: 'Calcula la inversa usando el método de la adjunta.',
    href: '/inverse'
  },
  {
    title: 'Regla de Cramer',
    description: 'Resuelve sistemas usando determinantes.',
    href: '/cramer'
  },
  {
    title: 'Acerca de',
    description: 'Información del proyecto y créditos.',
    href: '/about'
  },
  {
    title: 'Recursos de Aprendizaje',
    description: 'Notaciones, ejemplos y ejercicios guiados.',
    href: '/about'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-bright py-14">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.32em] text-teal-600 font-semibold mb-3">Bienvenido a Matrix</p>
          <h1 className="text-5xl font-bold text-slate-950 mb-4">Bienvenido a Matrix</h1>
          <p className="text-slate-600 text-lg leading-8">
            Una aplicación educativa para aprender Álgebra Lineal de forma interactiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <Link key={tile.title} href={tile.href} className="group block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-slate-950">{tile.title}</h2>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white text-lg font-bold">+</span>
              </div>
              <p className="text-slate-600 leading-7">{tile.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
