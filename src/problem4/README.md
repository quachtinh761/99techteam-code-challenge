# Three ways to sum to n

## Task

Provide 3 unique implementations of the following function in TypeScript.
- Comment on the complexity or efficiency of each function.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

## Solutions

> *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

With this assumption, as we have a mathematical formula for the summation of the first `n` natural numbers is `n * (n + 1) / 2`, we will validate `n` to be a positive integer, and `n >= sqrt(Number.MAX_SAFE_INTEGER)` to avoid overflow in the mathematical formula implementation.

### Validations

```typescript
function validateInput(n: number): void {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error("Input must be a positive integer.");
    }
    const maxN = Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER));
    if (n > maxN) {
        throw new Error(`Input must be less than or equal to ${maxN} to avoid overflow.`);
    }
}
```

### Implementation 1: Mathematical Formula

Sum to n can be calculated using the formula `n * (n + 1) / 2`.

```typescript
function sumToN_Math(n: number): number {
    return n * (n + 1) / 2;
}
```

- **Complexity**: O(1) - This implementation runs in constant time since it involves a fixed number of arithmetic operations regardless of the size of `n`.
- **Space Complexity**: O(1) - It uses a constant amount of space.
- **Advantages**: Very efficient for large values of `n`.
- **Disadvantages**: None for this specific problem.

### Implementation 2: Iterative Approach
This implementation uses a loop to sum the numbers from 1 to n.

```typescript
function sumToN_Iterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

- **Complexity**: O(n) - This implementation runs in linear time as it iterates through all numbers from 1 to n.
- **Space Complexity**: O(1) - It uses a constant amount of space.
- **Advantages**: Simple and easy to understand, go directly reflects the summation process.
- **Disadvantages**: Less efficient for large values of `n` compared to the mathematical formula.

### Implementation 3: Recursive Approach
This implementation uses recursion to sum the numbers from 1 to n.
```typescript
function sumToN_Recursive(n: number): number {
    if (n === 1) {
        return 1;
    }
    return n + sumToN_Recursive(n - 1);
}
```
- **Complexity**: O(n) - This implementation runs in linear time as it makes n recursive calls.
- **Space Complexity**: O(n) - This implementation uses O(n) space on the call stack due to recursion.
- **Advantages**: Elegant and concise, demonstrates the concept of recursion.
- **Disadvantages**: Less efficient for large values of `n` due to potential stack overflow and higher space usage.

**_Note_**: I do not highly recommend the recursive approach for large `n` due to stack overflow risks. I also do not really like it. Therefore, I will not implement this in my submissions.

### Implementation 4: Using Array.reduce
This implementation creates an array of numbers from 1 to n and uses the `reduce` method to sum them up.
```typescript
function sumToN_Reduce(n: number): number {
    const numbers = Array.from({ length: n }, (_, i) => i + 1);
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
```
- **Complexity**: O(n) - This implementation runs in linear time as it creates an array of size n and then reduces it.
- **Space Complexity**: O(n) - This implementation uses O(n) space to store the array of numbers.
- **Advantages**: Utilizes built-in array methods, which can be more readable for some developers.
- **Disadvantages**: Less efficient in terms of space and time compared to the mathematical formula and iterative approach.

## Setup Instructions
1. Ensure you have Node.js and npm installed.
2. Create a new TypeScript project and install necessary dependencies.
```bashnpm init -y
npm install typescript @types/node --save-dev
npx tsc --init
```
3. Create a file named `sum_to_n.ts` and copy the implementations above into it.
4. Compile the TypeScript file:
```bash

## Summary
- **Mathematical Formula**: Best for efficiency (O(1) time and space).
- **Iterative Approach**: Simple and effective (O(n) time, O(1 space)).
- **Array.reduce**: Readable but less efficient (O(n) time and space).

I prefer using the Iterative approach as it is simple and easy to understand.

## Time Log:
60 minutes
