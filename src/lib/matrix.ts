import { Matrix, Step, OperationResult } from './types';

function copyMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => [...row]);
}

function minorMatrix(matrix: Matrix, row: number, col: number): Matrix {
  return matrix
    .filter((_, r) => r !== row)
    .map((currentRow) => currentRow.filter((_, c) => c !== col));
}

export function determinant(matrix: Matrix): number {
  const n = matrix.length;
  if (n === 0) return 1;
  if (n === 1) return matrix[0][0];
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let det = 0;
  for (let col = 0; col < n; col++) {
    const sign = col % 2 === 0 ? 1 : -1;
    det += sign * matrix[0][col] * determinant(minorMatrix(matrix, 0, col));
  }

  return Number(det.toFixed(4));
}

export function transpose(matrix: Matrix): OperationResult {
  const result = Array.from({ length: matrix[0].length }, () => Array(matrix.length));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return {
    result,
    steps: [
      {
        matrix: result,
        operation: 'Transpuesta',
        type: 'swap'
      }
    ]
  };
}

export function gaussianElimination(matrix: Matrix): OperationResult {
  const m = copyMatrix(matrix);
  const steps: Step[] = [
    {
      matrix: copyMatrix(m),
      operation: 'Estado inicial',
      type: 'add'
    }
  ];

  const rows = m.length;
  const cols = m[0].length;
  let pivotRow = 0;

  for (let pivotCol = 0; pivotCol < cols && pivotRow < rows; pivotCol++) {
    let selectedRow = pivotRow;
    for (let i = pivotRow + 1; i < rows; i++) {
      if (Math.abs(m[i][pivotCol]) > Math.abs(m[selectedRow][pivotCol])) {
        selectedRow = i;
      }
    }

    if (Math.abs(m[selectedRow][pivotCol]) < 1e-9) {
      continue;
    }

    if (selectedRow !== pivotRow) {
      [m[pivotRow], m[selectedRow]] = [m[selectedRow], m[pivotRow]];
      steps.push({
        matrix: copyMatrix(m),
        operation: `Intercambia fila ${pivotRow + 1} con fila ${selectedRow + 1}`,
        type: 'swap'
      });
    }

    const pivot = m[pivotRow][pivotCol];
    if (Math.abs(pivot - 1) > 1e-9) {
      for (let j = pivotCol; j < cols; j++) {
        m[pivotRow][j] = Number((m[pivotRow][j] / pivot).toFixed(4));
      }
      steps.push({
        matrix: copyMatrix(m),
        operation: `Normaliza fila ${pivotRow + 1} dividiendo por ${pivot.toFixed(2)}`,
        type: 'scale'
      });
    }

    for (let row = pivotRow + 1; row < rows; row++) {
      const factor = m[row][pivotCol];
      if (Math.abs(factor) < 1e-9) continue;
      for (let j = pivotCol; j < cols; j++) {
        m[row][j] = Number((m[row][j] - factor * m[pivotRow][j]).toFixed(4));
      }
      steps.push({
        matrix: copyMatrix(m),
        operation: `R${row + 1} = R${row + 1} - (${factor.toFixed(2)})·R${pivotRow + 1}`,
        type: 'add'
      });
    }

    pivotRow += 1;
  }

  return {
    result: copyMatrix(m),
    steps
  };
}

export function gaussJordan(matrix: Matrix): OperationResult {
  const m = copyMatrix(matrix);
  const steps: Step[] = [
    {
      matrix: copyMatrix(m),
      operation: 'Estado inicial',
      type: 'add'
    }
  ];

  const rows = m.length;
  const cols = m[0].length;
  let pivotRow = 0;

  for (let pivotCol = 0; pivotCol < cols - 1 && pivotRow < rows; pivotCol++) {
    let selectedRow = pivotRow;
    for (let i = pivotRow; i < rows; i++) {
      if (Math.abs(m[i][pivotCol]) > Math.abs(m[selectedRow][pivotCol])) {
        selectedRow = i;
      }
    }

    if (Math.abs(m[selectedRow][pivotCol]) < 1e-9) {
      continue;
    }

    if (selectedRow !== pivotRow) {
      [m[pivotRow], m[selectedRow]] = [m[selectedRow], m[pivotRow]];
      steps.push({
        matrix: copyMatrix(m),
        operation: `Intercambia fila ${pivotRow + 1} con fila ${selectedRow + 1}`,
        type: 'swap'
      });
    }

    const pivot = m[pivotRow][pivotCol];
    if (Math.abs(pivot - 1) > 1e-9) {
      for (let j = pivotCol; j < cols; j++) {
        m[pivotRow][j] = Number((m[pivotRow][j] / pivot).toFixed(4));
      }
      steps.push({
        matrix: copyMatrix(m),
        operation: `Normaliza fila ${pivotRow + 1} dividiendo por ${pivot.toFixed(2)}`,
        type: 'scale'
      });
    }

    for (let row = 0; row < rows; row++) {
      if (row === pivotRow) continue;
      const factor = m[row][pivotCol];
      if (Math.abs(factor) < 1e-9) continue;
      for (let j = pivotCol; j < cols; j++) {
        m[row][j] = Number((m[row][j] - factor * m[pivotRow][j]).toFixed(4));
      }
      steps.push({
        matrix: copyMatrix(m),
        operation: `R${row + 1} = R${row + 1} - (${factor.toFixed(2)})·R${pivotRow + 1}`,
        type: 'add'
      });
    }

    pivotRow += 1;
  }

  return {
    result: copyMatrix(m),
    steps
  };
}

function cofactorMatrix(matrix: Matrix): Matrix {
  const n = matrix.length;
  return matrix.map((row, i) =>
    row.map((_, j) => {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      return Number((sign * determinant(minorMatrix(matrix, i, j))).toFixed(4));
    })
  );
}

export function inverseMatrix(matrix: Matrix): OperationResult {
  if (matrix.length === 0 || matrix.length !== matrix[0].length) {
    throw new Error('La matriz debe ser cuadrada para calcular la inversa');
  }

  const det = determinant(matrix);
  if (Math.abs(det) < 1e-9) {
    throw new Error('La matriz es singular y no tiene inversa');
  }

  const minors = matrix.map((row, i) =>
    row.map((_, j) => determinant(minorMatrix(matrix, i, j)))
  );

  const cofactors = matrix.map((row, i) =>
    row.map((_, j) => {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      return Number((sign * minors[i][j]).toFixed(4));
    })
  );

  const adjugate = cofactors[0].map((_, colIndex) =>
    cofactors.map((row) => row[colIndex])
  );

  const inverse = adjugate.map((row) =>
    row.map((value) => Number((value / det).toFixed(4)))
  );

  const steps: Step[] = [
    {
      matrix: copyMatrix(matrix),
      operation: 'Estado inicial',
      type: 'add'
    },
    {
      matrix: [[det]],
      operation: 'Determinante de A',
      type: 'add'
    },
    {
      matrix: minors,
      operation: 'Matriz de menores',
      type: 'add'
    },
    {
      matrix: cofactors,
      operation: 'Matriz de cofactores',
      type: 'add'
    },
    {
      matrix: adjugate,
      operation: 'Matriz adjunta (transpuesta de cofactores)',
      type: 'swap'
    },
    {
      matrix: inverse,
      operation: 'Matriz inversa final A⁻¹',
      type: 'scale'
    }
  ];

  return {
    result: inverse,
    steps
  };
}

export function inversePlaceholder(matrix: Matrix): OperationResult {
  return {
    result: matrix,
    steps: []
  };
}

function replaceColumn(matrix: Matrix, columnIndex: number, column: Matrix): Matrix {
  return matrix.map((row, rowIndex) =>
    row.map((value, colIndex) =>
      colIndex === columnIndex ? column[rowIndex][0] : value
    )
  );
}

export function cramerRule(a: Matrix, b: Matrix): OperationResult {
  const n = a.length;
  if (n === 0 || a[0].length !== n) {
    throw new Error('La matriz A debe ser cuadrada');
  }
  if (b.length !== n || b[0].length !== 1) {
    throw new Error('El vector B debe tener dimensión n × 1');
  }

  const detA = determinant(a);
  if (Math.abs(detA) < 1e-9) {
    throw new Error('El determinante de A es cero; no se puede aplicar la regla de Cramer');
  }

  const steps: Step[] = [
    {
      matrix: copyMatrix(a),
      operation: 'Estado inicial: matriz de coeficientes A',
      type: 'add'
    },
    {
      matrix: [[detA]],
      operation: 'Determinante principal |A|',
      type: 'add'
    }
  ];

  const solutions: number[] = [];
  for (let col = 0; col < n; col++) {
    const replaced = replaceColumn(a, col, b);
    const detAi = determinant(replaced);
    solutions.push(Number((detAi / detA).toFixed(4)));
    steps.push({
      matrix: replaced,
      operation: `Matriz A_${col + 1} con columna ${col + 1} reemplazada por B`,
      type: 'add'
    });
    steps.push({
      matrix: [[detAi]],
      operation: `Determinante det(A_${col + 1}) = ${detAi.toFixed(4)}`,
      type: 'add'
    });
  }

  const result: Matrix = solutions.map((value) => [value]);

  return {
    result,
    steps
  };
}
