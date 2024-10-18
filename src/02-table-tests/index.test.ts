import { simpleCalculator, Action } from './index';

const testCases = [
    // Addition
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // Subtraction
    { a: 3, b: 0, action: Action.Subtract, expected: 3 },
    { a: 8, b: 4, action: Action.Subtract, expected: 4 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    // Multiplication
    { a: 3, b: 1, action: Action.Multiply, expected: 3 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 2.5, b: 2, action: Action.Multiply, expected: 5 },
    // Division
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    // Exponentiation
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    // Error checks
    { a: "1", b: "2", action: Action.Add, expected: null },
    { a: 2, b: 2, action: ".", expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)("Should work as expected :)", (desc) => {
    expect(simpleCalculator({ a: desc.a, b: desc.b, action: desc.action })).toBe(desc.expected)
  })
});
