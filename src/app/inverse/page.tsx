'use client';

import { useState } from 'react';
import MatrixInput from '@/components/MatrixInput';
import { determinant, inverseMatrix } from '@/lib/matrix';
import type { Matrix, Step } from '@/lib/types';

const initialMatrix: Matrix = [
  [2, -1, 0],
  [1, 2, 1],
  [0, -1, 3]
];

const formatValue = (value: number) => Number.isFinite(value) ? value.toFixed(2) : String(value);

export default function Inverse() {
  const [matrix, setMatrix] = useState<Matrix>(initialMatrix);
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [detValue, setDetValue] = useState<number | null>(null);
  const [invertible, setInvertible] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  const checkInvertibility = () => {
    try {
      const det = determinant(matrix);
      setDetValue(det);
      setInvertible(Math.abs(det) > 1e-9);
      setError('');
    } catch (err) {
      setError('La matriz debe ser cuadrada y tener valores válidos.');
      setDetValue(null);
      setInvertible(false);
    }
  };

  const solve = () => {
    try {
      const operation = inverseMatrix(matrix);
      setSteps(operation.steps);
      setResult(operation.result);
      setDetValue(determinant(matrix));
      setInvertible(true);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la inversa.');
      setSteps([]);
      setResult(null);
      setInvertible(false);
      setDetValue(null);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bright py-10">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-2">MATRIX INVERSE SOLVER</p>
          <h1 className="text-5xl font-bold text-slate-950 mb-4">Inverse Matrix Solver</h1>
          <p className="text-slate-600 text-lg leading-8">
            Utiliza el método adjunto para calcular la inversa de una matriz cuadrada y visualiza cada paso del proceso.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Matrix [A]</p>
                <p className="mt-2 text-slate-600 text-sm">Ingresar una matriz cuadrada para calcular su inversa.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Input dimension {matrix.length} × {matrix[0].length}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <MatrixInput
                matrix={{ rows: matrix.length, cols: matrix[0].length, data: matrix }}
                onChange={(newMatrix) => setMatrix(newMatrix.data)}
              />
            </div>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-2xl text-white">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.28em] text-teal-300 font-semibold">Controls</p>
              <h2 className="mt-4 text-2xl font-semibold">Verifique si la matriz es no-singular antes de continuar.</h2>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={checkInvertibility}
                className="w-full rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
              >
                Confirmar Invertibilidad
              </button>
              <button
                type="button"
                onClick={solve}
                className="w-full rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Solución Paso a Paso
              </button>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-slate-900/90 p-5 border border-slate-800">
              <p className="text-xs uppercase tracking-[0.24em] text-teal-300 font-semibold mb-3">Metodo de la Adjunta</p>
              <p className="text-sm text-slate-300 leading-6">
                El proceso incluye cálculo de determinante, matriz de menores, matriz de cofactores y transposición para obtener la matriz adjunta antes de multiplicar por 1/det(A).
              </p>
            </div>

            <div className="mt-8 space-y-3 rounded-[1.5rem] border border-slate-800 bg-slate-900/95 p-5">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Determinante</span>
                <span className="font-semibold text-white">{detValue !== null ? detValue.toFixed(2) : '—'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Estado</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${invertible ? 'bg-emerald-500 text-slate-950' : invertible === false ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {invertible === null ? 'Pendiente' : invertible ? 'Invertible' : 'Singular'}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {error ? (
          <div className="mt-8 rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {steps.length > 0 && (
          <section className="mt-10 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {steps.map((step, index) => (
                <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-teal-600 font-semibold">Step {index + 1}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.operation}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{step.matrix.length}×{step.matrix[0].length}</span>
                  </div>
                  <div className="space-y-2">
                    {step.matrix.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-3 gap-2">
                        {row.map((value, colIndex) => (
                          <div key={colIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700">
                            {formatValue(value)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {result && (
              <div className="rounded-[2rem] border border-teal-100 bg-white p-8 shadow-2xl">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-teal-600 font-semibold">The Final Inverse A⁻¹</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-950">Resultado final</h2>
                  </div>
                  <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    1 / det(A)
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Escalar final</p>
                    <div className="rounded-3xl bg-white px-4 py-5 text-center text-3xl font-bold text-slate-950 shadow-sm">
                      1 / {detValue !== null ? detValue.toFixed(2) : 'det(A)'}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Matriz inversa</p>
                    <div className="space-y-2">
                      {result.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-3 gap-2">
                          {row.map((value, colIndex) => (
                            <div key={colIndex} className="rounded-2xl border border-slate-200 bg-white p-3 text-center text-sm font-semibold text-slate-900">
                              {formatValue(value)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
