export default function About() {
  return (
    <main className="min-h-screen bg-surface-bright py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-3">Producto del curso: Álgebra Lineal</p>
          <h1 className="text-5xl font-bold text-slate-950 mb-4">Sobre Nosotros:</h1>
          <p className="mx-auto max-w-2xl text-slate-600 text-lg leading-8">
            Matrix es una suite educativa creada para facilitar el aprendizaje de álgebra lineal mediante visualizaciones limpias y procesos paso a paso. Esta plataforma combina cálculo interactivo con diseño claro para apoyar a los estudiantes en su proceso de aprendizaje.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] mb-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl">
            <div className="inline-flex items-center justify-center rounded-3xl bg-teal-600/10 px-4 py-2 text-sm font-semibold text-teal-700 mb-6">
              Objetivos
            </div>
            <h2 className="text-3xl font-bold text-slate-950 mb-4">Crear un producto educativo diseñado para aprender álgebra lineal.</h2>
            <p className="text-slate-600 leading-8">
              La plataforma Matrix está pensada para que los estudiantes experimenten con operaciones matriciales y comprendan métodos algebraicos complejos de forma interactiva. Cada cálculo es una oportunidad para aprender, no solo para resolver un ejercicio.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl">
            <div className="rounded-[1.75rem] overflow-hidden bg-slate-900">
              <div className="h-72 bg-[url('https://wallpaper-house.com/data/out/5/wallpaper2you_75296.png')] bg-cover bg-center" />
              <div className="p-6 bg-slate-950 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-teal-300 font-semibold mb-3">The Matrix</p>
                <p className="text-sm text-slate-300 leading-6">
                  Diseñamos una interfaz limpia, colores suaves y tarjetas bien definidas para que cada paso sea fácil de seguir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-3">Research & Development Team</p>
              <h2 className="text-3xl font-bold text-slate-950 mb-4">Hecho por</h2>
              <p className="text-slate-600 leading-8">
                Nuestro equipo desarrolló y trabajó en cada detalle para ofrecer una experiencia de aprendizaje fluida y agradable.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Hollmer Moncada Florez', 'Jerenimo Muñoz Muñoz', 'Cristian Villamarin Londoño', 'Mariana Rivera Tabares'].map((name) => (
                <div key={name} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
