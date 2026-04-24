interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
}

interface Step {
  description: string;
  matrices: Matrix[];
  result: Matrix;
}

interface StepViewerProps {
  steps: Step[];
}

const StepViewer: React.FC<StepViewerProps> = ({ steps }) => {
  const renderMatrix = (matrix: Matrix, label?: string) => (
    <div className="inline-block border border-gray-300 p-2 bg-white mr-4">
      {label && <div className="text-center font-semibold mb-2">{label}</div>}
      {matrix.data.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <span key={j} className="w-12 h-12 flex items-center justify-center border border-gray-200">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold text-lg mb-4">{step.description}</h3>

          <div className="flex flex-wrap items-start gap-4">
            {step.matrices.map((matrix, i) => (
              <div key={i}>
                {renderMatrix(matrix, `Matrix ${String.fromCharCode(65 + i)}`)}
              </div>
            ))}

            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 mx-4">
                {step.matrices.length === 2 ? '=' : '×'}
              </span>
            </div>

            {renderMatrix(step.result, 'Result')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepViewer;