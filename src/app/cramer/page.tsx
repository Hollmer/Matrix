'use client';

import { useState } from 'react';
import MatrixInput from '@/components/MatrixInput';
import { cramerRule, determinant } from '@/lib/matrix';
import type { Matrix, Step } from '@/lib/types';

const initialA: Matrix = [
  [3, -2, 1],
  [1, 2, 1],
  [1, -1, 2]
];

const initialB: Matrix = [
  [11],
  [9],
  [6]
];

const formatNumber = (value: number) => Number.isFinite(value) ? value.toFixed(2) : String(value);

export default function Cramer() {
  const [matrixA, setMatrixA] = useState<Matrix>(initialA);
  const [vectorB, setVectorB] = useState<Matrix>(initialB);
  const [steps, setSteps] = useState<Step[]>([]);
  const [solutions, setSolutions] = useState<Matrix | null>(null);
  const [detA, setDetA] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    try {
      const operation = cramerRule(matrixA, vectorB);
      setSolutions(operation.result);
      setSteps(operation.steps);
      setDetA(determinant(matrixA));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setSteps([]);
      setSolutions(null);
      setDetA(null);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bright py-10">
      <div className="w-full max-w-full px-2 sm:px-4">
        <div className="mx-auto w-full max-w-[98%] text-center mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-600 font-semibold mb-2">Cramer&apos;s Rule Solver</p>
          <h1 className="text-5xl font-bold text-slate-950 mb-4">Cramer&apos;s Rule Solver</h1>
          <p className="text-slate-600 text-lg leading-8">
            Aplica la regla de Cramer para resolver sistemas de ecuaciones lineales usando determinantes, mostrando cada reemplazo de columna y cada valor calculado.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Coefficient Matrix A</p>
                    <p className="text-slate-500 text-sm">Matriz cuadrada de coeficientes.</p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">3 × 3</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                  <MatrixInput matrix={{ rows: matrixA.length, cols: matrixA[0].length, data: matrixA }} onChange={(newMatrix) => setMatrixA(newMatrix.data)} />
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Vector B</p>
                    <p className="text-slate-500 text-sm">Vector independiente del sistema.</p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">3 × 1</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                  <MatrixInput matrix={{ rows: vectorB.length, cols: vectorB[0].length, data: vectorB }} onChange={(newMatrix) => setVectorB(newMatrix.data)} />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={calculate}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Calcular Soluciones
              </button>
            </div>

            {error ? (
              <div className="mt-8 rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-teal-600 font-semibold mb-4">Procedimiento matemático</p>
            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current step</p>
                <p className="mt-3 text-slate-950 font-semibold">Consulta cada determinante y reemplazo de columna.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-600">|A| = {detA !== null ? detA.toFixed(2) : '—'}</p>
                <p className="mt-3 text-sm text-slate-500">Una matriz con determinante distinto de cero garantiza solución única.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-600">Variables</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {['x', 'y', 'z'].map((label, index) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700">
                      {label.toUpperCase()}
                      <div className="mt-2 text-2xl text-slate-900">{solutions ? formatNumber(solutions[index][0]) : '—'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {steps.length > 0 && (
          <section className="mt-10 space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-teal-600 font-semibold">Step {index + 1}</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">{step.operation}</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {step.matrix.length} × {step.matrix[0].length}
                  </div>
                </div>
                <div className="space-y-2">
                  {step.matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 gap-2">
                      {row.map((value, colIndex) => (
                        <div key={colIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700">
                          {formatNumber(value)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {solutions && (
          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-white shadow-2xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-teal-300 font-semibold">Operation complete</p>
                <h2 className="mt-2 text-3xl font-bold">Final Solution Set</h2>
                <p className="mt-2 text-sm text-slate-300">El sistema tiene solución única identificada mediante la regla de Cramer.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {solutions.map((row, index) => (
                  <div key={index} className="rounded-[1.5rem] bg-slate-900/95 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{index === 0 ? 'x' : index === 1 ? 'y' : 'z'}</p>
                    <p className="mt-3 text-3xl font-bold text-white">{formatNumber(row[0])}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
