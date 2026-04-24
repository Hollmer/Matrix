'use client';

import { useState } from 'react';
import MatrixInput from '@/components/MatrixInput';
import { gaussianElimination } from '@/lib/matrix';
import type { Matrix } from '@/lib/types';

export default function GaussianElimination() {
  const [matrix, setMatrix] = useState<Matrix>([
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
  ]);
  const [steps, setSteps] = useState<Array<{ matrix: Matrix; description: string }>>([]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [error, setError] = useState<string>('');

  const solve = () => {
    try {
      const operation = gaussianElimination(matrix);
      setSteps(operation.steps.map((step) => ({ matrix: step.matrix, description: step.operation })));
      setResult(operation.result);
      setError('');
    } catch (err) {
      setError('Error al procesar la matriz. Verifique los valores y dimensiones.');
      setSteps([]);
      setResult(null);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bright py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6">
        <div className="mx-auto w-full text-center mb-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-3">Eliminación Gaussiana</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-950">Gaussian Elimination</h1>
          <p className="mt-4 text-slate-600 leading-7">
            Introduce tu matriz aumentada y observa cómo el algoritmo transforma cada fila hasta alcanzar la forma escalonada.
          </p>
        </div>

        <div className="mx-auto w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 font-semibold">Matriz aumentada</p>
              <p className="text-slate-600 text-sm">Formato 3 × 4 con coeficientes y término independiente.</p>
            </div>
            <button
              type="button"
              onClick={solve}
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition"
            >
              Resolver con Gaussian Elimination
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
          <div className="mx-auto mt-8 w-full rounded-[2rem] border border-teal-100 bg-slate-950 p-8 shadow-2xl text-white">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-teal-300 font-semibold">Resultado final</p>
                <h2 className="text-3xl font-bold">Forma escalonada por filas</h2>
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
        )}
      </div>
    </main>
  );
}
