export type Matrix = number[][];

export interface Step {
  matrix: Matrix;
  operation: string;
  type: 'swap' | 'scale' | 'add';
}

export interface OperationResult {
  result: Matrix;
  steps: Step[];
}