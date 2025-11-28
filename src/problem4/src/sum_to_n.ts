function validateInput(n: number): void {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input must be a positive integer.");
  }
}

export function sum_to_n_a(n: number): number {
  validateInput(n);
  return (n * (n + 1)) / 2;
}

export function sum_to_n_b(n: number): number {
  validateInput(n);
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

export function sum_to_n_c(n: number): number {
  validateInput(n);
  const numbers = Array.from({ length: n }, (_, i) => i + 1);

  return numbers.reduce((sum, currentValue) => sum + currentValue, 0);
}

// Example usage:
// console.log(sum_to_n_a(5)); // Output: 15
// console.log(sum_to_n_b(5)); // Output: 15
// console.log(sum_to_n_c(5)); // Output: 15
