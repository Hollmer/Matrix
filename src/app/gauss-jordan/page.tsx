'use client';

import { useState } from 'react';
import MatrixInput from '@/components/MatrixInput';
import { gaussJordan } from '@/lib/matrix';
import type { Matrix } from '@/lib/types';

export default function GaussJordan() {
  const [matrix, setMatrix] = useState<Matrix>([
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
  ]);
  const [steps, setSteps] = useState<Array<{ matrix: Matrix; description: string }>>([]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const solve = () => {
    try {
      const operation = gaussJordan(matrix);
      setSteps(operation.steps.map((step) => ({ matrix: step.matrix, description: step.operation })));
      setResult(operation.result);
      setError('');

      const newSolutions: string[] = [];
      const rows = operation.result.length;
      const cols = operation.result[0].length;

      for (let i = 0; i < Math.min(rows, cols - 1); i += 1) {
        const diag = operation.result[i][i];
        const value = operation.result[i][cols - 1];
        if (Math.abs(diag - 1) < 1e-9) {
          newSolutions.push(`x${i + 1} = ${value.toFixed(2)}`);
        }
      }
      setSolutions(newSolutions);
    } catch {
      setError('Error al procesar la matriz. Verifique los valores y dimensiones.');
      setSteps([]);
      setResult(null);
      setSolutions([]);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bright py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6">
        <div className="mx-auto w-full text-center mb-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-3">Gauss-Jordan Elimination</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-950">Gauss-Jordan Elimination</h1>
          <p className="mt-4 text-slate-600 leading-7">
            Ingresa la matriz aumentada para resolver el sistema lineal y obtener la forma reducida por filas con soluciones.
          </p>
        </div>

        <div className="mx-auto w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 font-semibold">Matriz aumentada</p>
              <p className="text-slate-600 text-sm">Introduce la matriz de coeficientes y el vector independiente.</p>
            </div>
            <button
              type="button"
              onClick={solve}
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition"
            >
              Resolver
            </button>
          </div>

          <div className="mx-auto max-w-3xl bg-slate-50 rounded-[1.75rem] border border-slate-200 p-6">
            <MatrixInput
              matrix={{ rows: matrix.length, cols: matrix[0].length, data: matrix }}
              onChange={(newMatrix) => setMatrix(newMatrix.data)}
            />
          </div>

          {error ? <p className="mt-4 text-sm text-red-600 text-center">{error}</p> : null}
        </div>

        {steps.length > 0 && (
          <div className="mx-auto mt-8 w-full space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.28em] text-teal-600 font-semibold">Paso {index + 1}</span>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">{step.description}</h2>
                  </div>
                  <div className="text-xs text-slate-500">Dimensión: {step.matrix.length} × {step.matrix[0].length}</div>
                </div>
                <div className="space-y-2">
                  {step.matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {row.map((value, colIndex) => (
                        <div key={colIndex} className="rounded-2xl border border-slate-200 bg-slate-50 py-3 text-center text-sm font-medium text-slate-700">
                          {Number.isFinite(value) ? value.toFixed(2) : value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="mx-auto mt-8 grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-2xl text-white">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-teal-300 font-semibold">Final Reduced Row Echelon Form</p>
                  <h2 className="text-3xl font-bold">Forma reducida por filas</h2>
                </div>
                <div className="rounded-full bg-teal-600/10 px-4 py-2 text-sm font-semibold text-teal-100">
                  {result.length} × {result[0].length}
                </div>
              </div>
              <div className="space-y-2">
                {result.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {row.map((value, colIndex) => (
                      <div key={colIndex} className="rounded-2xl border border-teal-900 bg-slate-900 py-4 text-center text-lg font-semibold text-white">
                        {Number.isFinite(value) ? value.toFixed(2) : value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="mb-5 flex items-center gap-3 text-slate-900">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white">✓</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-teal-600 font-semibold">Soluciones</p>
                  <h3 className="text-xl font-semibold">Resultados del sistema</h3>
                </div>
              </div>
              <div className="space-y-3">
                {solutions.length > 0 ? (
                  solutions.map((solution) => {
                    return (
                      <div key={solution} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 font-semibold">
                        {solution}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500">No se pudo extraer una solución única. Verifica la forma reducida.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
