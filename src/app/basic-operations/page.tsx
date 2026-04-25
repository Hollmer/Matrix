'use client';

import { useState } from 'react';

interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
}

export default function BasicOperations() {
  const [matrixA, setMatrixA] = useState<Matrix>({
    rows: 3,
    cols: 3,
    data: [
      [1, 0, 3],
      [2, 1, 0],
      [0, 1, 1]
    ]
  });

  const [matrixB, setMatrixB] = useState<Matrix>({
    rows: 3,
    cols: 3,
    data: [
      [0, 1, 1],
      [4, 0, 2],
      [1, 1, 3]
    ]
  });

  const [operation, setOperation] = useState<'addition' | 'subtraction' | 'multiplication' | 'scalar' | 'transpose' | 'equality'>('addition');
  const [scalar, setScalar] = useState<number>(1);
  const [result, setResult] = useState<Matrix | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showEqualityModal, setShowEqualityModal] = useState(false);
  const [equalityMessage, setEqualityMessage] = useState('');

  const handleMatrixAChange = (i: number, j: number, value: string) => {
    const newData = matrixA.data.map((row, ri) =>
      row.map((cell, ci) => (ri === i && ci === j ? parseFloat(value) || 0 : cell))
    );
    setMatrixA({ ...matrixA, data: newData });
  };

  const handleMatrixBChange = (i: number, j: number, value: string) => {
    const newData = matrixB.data.map((row, ri) =>
      row.map((cell, ci) => (ri === i && ci === j ? parseFloat(value) || 0 : cell))
    );
    setMatrixB({ ...matrixB, data: newData });
  };

  const resizeMatrix = (matrix: Matrix, rows: number, cols: number): Matrix => ({
    rows,
    cols,
    data: Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) => matrix.data[i]?.[j] ?? 0)
    )
  });

  const updateMatrixA = (rows: number, cols: number) => {
    setMatrixA(resizeMatrix(matrixA, rows, cols));
  };

  const updateMatrixB = (rows: number, cols: number) => {
    setMatrixB(resizeMatrix(matrixB, rows, cols));
  };

  const getCompatibilityWarning = () => {
    if (operation === 'addition' || operation === 'subtraction') {
      if (matrixA.rows !== matrixB.rows || matrixA.cols !== matrixB.cols) {
        return 'Las dimensiones deben coincidir para esta operación.';
      }
    }

    if (operation === 'multiplication' && matrixA.cols !== matrixB.rows) {
      return 'El número de columnas de A debe igualar el número de filas de B para multiplicar.';
    }

    return '';
  };

  const performOperation = () => {
    let newResult: Matrix;
    const compatibilityWarning = getCompatibilityWarning();

    if (compatibilityWarning) {
      setShowResult(false);
      return;
    }

    switch (operation) {
      case 'addition':
        if (matrixA.rows !== matrixB.rows || matrixA.cols !== matrixB.cols) {
          alert('Las dimensiones deben coincidir para la suma');
          return;
        }
        newResult = {
          rows: matrixA.rows,
          cols: matrixA.cols,
          data: matrixA.data.map((row, i) =>
            row.map((val, j) => val + matrixB.data[i][j])
          )
        };
        break;

      case 'subtraction':
        if (matrixA.rows !== matrixB.rows || matrixA.cols !== matrixB.cols) {
          alert('Las dimensiones deben coincidir para la resta');
          return;
        }
        newResult = {
          rows: matrixA.rows,
          cols: matrixA.cols,
          data: matrixA.data.map((row, i) =>
            row.map((val, j) => val - matrixB.data[i][j])
          )
        };
        break;

      case 'multiplication':
        if (matrixA.cols !== matrixB.rows) {
          alert('El número de columnas de A debe igualar el número de filas de B');
          return;
        }
        newResult = {
          rows: matrixA.rows,
          cols: matrixB.cols,
          data: Array(matrixA.rows).fill(0).map(() =>
            Array(matrixB.cols).fill(0)
          )
        };

        for (let i = 0; i < matrixA.rows; i++) {
          for (let j = 0; j < matrixB.cols; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA.cols; k++) {
              sum += matrixA.data[i][k] * matrixB.data[k][j];
            }
            newResult.data[i][j] = sum;
          }
        }
        break;

      case 'scalar':
        newResult = {
          rows: matrixA.rows,
          cols: matrixA.cols,
          data: matrixA.data.map(row => row.map(val => val * scalar))
        };
        break;

      case 'transpose':
        newResult = {
          rows: matrixA.cols,
          cols: matrixA.rows,
          data: Array(matrixA.cols).fill(0).map((_, i) =>
            Array(matrixA.rows).fill(0).map((_, j) => matrixA.data[j][i])
          )
        };
        break;

      case 'equality':
        const isEqual = matrixA.rows === matrixB.rows && matrixA.cols === matrixB.cols &&
          matrixA.data.every((row, i) =>
            row.every((val, j) => val === matrixB.data[i][j])
          );

        setEqualityMessage(isEqual ? 'Las matrices son iguales.' : 'Las matrices no son iguales.');
        setShowEqualityModal(true);
        setShowResult(false);
        return;

      default:
        return;
    }

    setResult(newResult);
    setShowResult(true);
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case 'addition': return 'add';
      case 'subtraction': return 'remove';
      case 'multiplication': return 'close';
      case 'scalar': return 'close';
      case 'transpose': return 'transform';
      case 'equality': return 'compare';
      default: return 'add';
    }
  };

  const getOperationText = () => {
    switch (operation) {
      case 'addition': return 'SUMA';
      case 'subtraction': return 'RESTA';
      case 'multiplication': return 'MULTIPLICACIÓN';
      case 'scalar': return 'PRODUCTO ESCALAR';
      case 'transpose': return 'TRANSPUESTA';
      case 'equality': return 'IGUALDAD';
      default: return 'SUMA';
    }
  };

  const getResultTitle = () => {
    switch (operation) {
      case 'addition': return 'A + B';
      case 'multiplication': return 'A × B';
      case 'scalar': return `${scalar} × A`;
      case 'transpose': return 'Aᵀ';
      case 'equality': return 'A = B';
      default: return 'A + B';
    }
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-start bg-surface-bright px-2 sm:px-4 py-10">
        <div className="w-full max-w-full">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Operaciones Básicas con Matrices</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Realice operaciones aritméticas fundamentales en estructuras lineales con precisión y visualice los resultados de forma clara.</p>
              </header>

              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-4 mb-10 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setOperation('addition')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'addition' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Suma
                </button>
                <button
                  onClick={() => setOperation('subtraction')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'subtraction' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Resta
                </button>
                <button
                  onClick={() => setOperation('multiplication')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'multiplication' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Multiplicación
                </button>
                <button
                  onClick={() => setOperation('scalar')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'scalar' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Producto Escalar
                </button>
                <button
                  onClick={() => setOperation('transpose')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'transpose' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Transpuesta
                </button>
                <button
                  onClick={() => setOperation('equality')}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${operation === 'equality' ? 'bg-primary text-on-primary' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Verificar Igualdad
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                <div className="bg-slate-50 rounded-[1.5rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500 font-semibold">Matriz A</span>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="uppercase tracking-[0.18em] text-slate-400">Orden</span>
                      <select
                        value={matrixA.rows}
                        onChange={(e) => updateMatrixA(Number(e.target.value), matrixA.cols)}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                      <span className="text-slate-400">×</span>
                      <select
                        value={matrixA.cols}
                        onChange={(e) => updateMatrixA(matrixA.rows, Number(e.target.value))}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-stretch">
                      <div className="matrix-bracket-left"></div>
                      <div className="grid gap-matrix-cell-gap bg-slate-200 border-2 border-slate-200 p-1" style={{ gridTemplateColumns: `repeat(${matrixA.cols}, minmax(4rem, 1fr))` }}>
                        {matrixA.data.map((row, i) =>
                          row.map((cell, j) => (
                            <input
                              key={`${i}-${j}`}
                              type="number"
                              value={cell}
                              onChange={(e) => handleMatrixAChange(i, j, e.target.value)}
                              className="w-16 h-16 text-center font-matrix-data text-matrix-data border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                          ))
                        )}
                      </div>
                      <div className="matrix-bracket-right"></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {getOperationSymbol() === 'close' ? '×' : getOperationSymbol() === 'add' ? '+' : getOperationSymbol() === 'remove' ? '-' : getOperationSymbol() === 'transform' ? '↷' : getOperationSymbol() === 'compare' ? '=' : '+'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.24em]">{getOperationText()}</div>
                </div>

                <div className="bg-slate-50 rounded-[1.5rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500 font-semibold">Matriz B</span>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="uppercase tracking-[0.18em] text-slate-400">Orden</span>
                      <select
                        value={matrixB.rows}
                        onChange={(e) => updateMatrixB(Number(e.target.value), matrixB.cols)}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                      <span className="text-slate-400">×</span>
                      <select
                        value={matrixB.cols}
                        onChange={(e) => updateMatrixB(matrixB.rows, Number(e.target.value))}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-stretch">
                      <div className="matrix-bracket-left"></div>
                      <div className="grid gap-matrix-cell-gap bg-slate-200 border-2 border-slate-200 p-1" style={{ gridTemplateColumns: `repeat(${matrixB.cols}, minmax(4rem, 1fr))` }}>
                        {matrixB.data.map((row, i) =>
                          row.map((cell, j) => (
                            <input
                              key={`${i}-${j}`}
                              type="number"
                              value={cell}
                              onChange={(e) => handleMatrixBChange(i, j, e.target.value)}
                              className="w-16 h-16 text-center font-matrix-data text-matrix-data border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                          ))
                        )}
                      </div>
                      <div className="matrix-bracket-right"></div>
                    </div>
                  </div>
                </div>
              </div>

              {operation === 'scalar' && (
                <div className="mt-8 flex justify-center">
                  <label className="flex flex-col items-center gap-2 text-sm text-slate-700">
                    Valor escalar
                    <input
                      type="number"
                      value={scalar}
                      onChange={(e) => setScalar(Number(e.target.value))}
                      className="w-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </label>
                </div>
              )}

              {getCompatibilityWarning() && (
                <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                  {getCompatibilityWarning()}
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <button
                  onClick={performOperation}
                  className="inline-flex items-center justify-center rounded-3xl bg-primary px-10 py-4 text-base font-semibold text-on-primary shadow-2xl shadow-slate-900/10 transition hover:opacity-95 active:scale-[0.98]"
                >
                  Calcular
                </button>
              </div>

              {showResult && result && (
                <div className="mt-10 bg-teal-50/70 rounded-[1.5rem] border border-teal-100 p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-teal-700 font-semibold">Resultado</p>
                      <h2 className="text-2xl font-bold text-slate-900">{getResultTitle()}</h2>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-stretch">
                      <div className="matrix-bracket-left border-teal-900"></div>
                      <div className="grid gap-matrix-cell-gap bg-white border-2 border-teal-100 p-1" style={{ gridTemplateColumns: `repeat(${result.cols}, minmax(4rem, 1fr))` }}>
                        {result.data.map((row, i) =>
                          row.map((cell, j) => (
                            <div key={`${i}-${j}`} className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white text-teal-900 font-semibold text-lg border border-teal-100">
                              {cell}
                            </div>
                          ))
                        )}
                      </div>
                      <div className="matrix-bracket-right border-teal-900"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showEqualityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-6">
            <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
              <div className="mb-6 text-center">
                <span className="material-symbols-outlined text-teal-600 text-4xl">compare</span>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Verificación de Igualdad</h2>
              </div>
              <p className="mb-8 text-center text-slate-600">{equalityMessage}</p>
              <button
                onClick={() => setShowEqualityModal(false)}
                className="w-full rounded-3xl bg-primary px-6 py-3 text-base font-semibold text-on-primary transition hover:opacity-95"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}