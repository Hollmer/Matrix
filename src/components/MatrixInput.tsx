'use client';

import { useState, useEffect } from 'react';

interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
}

interface MatrixInputProps {
  matrix: Matrix;
  onChange: (matrix: Matrix) => void;
  readOnly?: boolean;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, onChange, readOnly = false }) => {
  const [localMatrix, setLocalMatrix] = useState<Matrix>(matrix);

  useEffect(() => {
    setLocalMatrix(matrix);
  }, [matrix]);

  const handleChange = (i: number, j: number, value: string) => {
    if (readOnly) return;

    const newData = localMatrix.data.map((row, ri) =>
      row.map((cell, ci) => (ri === i && ci === j ? parseFloat(value) || 0 : cell))
    );
    const newMatrix = { ...localMatrix, data: newData };
    setLocalMatrix(newMatrix);
    onChange(newMatrix);
  };

  const handleDimensionChange = (newRows: number, newCols: number) => {
    if (readOnly) return;

    const newData = Array.from({ length: newRows }, (_, i) =>
      Array.from({ length: newCols }, (_, j) =>
        i < localMatrix.rows && j < localMatrix.cols ? localMatrix.data[i][j] : 0
      )
    );
    const newMatrix = { rows: newRows, cols: newCols, data: newData };
    setLocalMatrix(newMatrix);
    onChange(newMatrix);
  };

  return (
    <div className="space-y-4">
      {!readOnly && (
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">Rows:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={localMatrix.rows}
              onChange={(e) => handleDimensionChange(Number(e.target.value), localMatrix.cols)}
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Columns:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={localMatrix.cols}
              onChange={(e) => handleDimensionChange(localMatrix.rows, Number(e.target.value))}
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
        </div>
      )}

      <div className="inline-block border border-gray-300 p-2 bg-white">
        {localMatrix.data.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              <input
                key={j}
                type="number"
                value={cell}
                onChange={(e) => handleChange(i, j, e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
                onClick={(e) => e.currentTarget.select()}
                readOnly={readOnly}
                className={`w-12 h-12 text-center border border-gray-200 ${
                  readOnly ? 'bg-gray-50' : 'bg-white'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixInput;
