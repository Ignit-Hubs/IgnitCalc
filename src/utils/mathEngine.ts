import { AngleMode } from '../types';

/**
 * ============================================================================
 * ACCURATE SCIENTIFIC MATH ENGINE
 * ============================================================================
 * Designed for precision, mathematical accuracy, and robust error handling.
 * Supports both Degree and Radian modes, full inverse trig, logarithms,
 * factorial, powers, and constants.
 */

// Helper to sanitize floating point inaccuracies (e.g. 0.1 + 0.2 = 0.30000000000000004)
export function formatResult(value: number, maxDecimals: number = 10): string {
  if (isNaN(value)) return 'Error';
  if (!isFinite(value)) return value > 0 ? 'Infinity' : '-Infinity';
  
  // Format to fixed decimals, then remove trailing zeros
  const fixed = value.toFixed(maxDecimals);
  const trimmed = parseFloat(fixed).toString();
  return trimmed;
}

// Factorial calculation: n! = n * (n - 1) * ... * 1
export function calculateFactorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // JS Number overflow threshold
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Convert angle based on DEG or RAD mode
export function toRadians(angle: number, mode: AngleMode): number {
  return mode === 'DEG' ? (angle * Math.PI) / 180 : angle;
}

export function fromRadians(radians: number, mode: AngleMode): number {
  return mode === 'DEG' ? (radians * 180) / Math.PI : radians;
}

// Unary scientific operations
export function calculateUnary(func: string, value: number, mode: AngleMode): { result: number; symbol: string } {
  let res = NaN;
  let symbol = `${func}(${value})`;

  switch (func) {
    case 'sin': {
      const rad = toRadians(value, mode);
      // Clean up common exact cases like sin(180) = 0
      res = Math.abs(Math.sin(rad)) < 1e-15 ? 0 : Math.sin(rad);
      break;
    }
    case 'cos': {
      const rad = toRadians(value, mode);
      // Clean up common exact cases like cos(90) = 0
      res = Math.abs(Math.cos(rad)) < 1e-15 ? 0 : Math.cos(rad);
      break;
    }
    case 'tan': {
      const rad = toRadians(value, mode);
      const cosVal = Math.cos(rad);
      if (Math.abs(cosVal) < 1e-15) {
        res = NaN; // Undefined (e.g. tan 90 deg)
      } else {
        res = Math.abs(Math.sin(rad)) < 1e-15 ? 0 : Math.tan(rad);
      }
      break;
    }
    case 'asin': {
      if (value < -1 || value > 1) {
        res = NaN;
      } else {
        const rad = Math.asin(value);
        res = fromRadians(rad, mode);
      }
      symbol = `sin⁻¹(${value})`;
      break;
    }
    case 'acos': {
      if (value < -1 || value > 1) {
        res = NaN;
      } else {
        const rad = Math.acos(value);
        res = fromRadians(rad, mode);
      }
      symbol = `cos⁻¹(${value})`;
      break;
    }
    case 'atan': {
      const rad = Math.atan(value);
      res = fromRadians(rad, mode);
      symbol = `tan⁻¹(${value})`;
      break;
    }
    case 'log': // Base 10 Logarithm
      res = value > 0 ? Math.log10(value) : NaN;
      symbol = `log(${value})`;
      break;
    case 'ln': // Natural Logarithm
      res = value > 0 ? Math.log(value) : NaN;
      symbol = `ln(${value})`;
      break;
    case 'sqrt':
      res = value >= 0 ? Math.sqrt(value) : NaN;
      symbol = `√(${value})`;
      break;
    case 'cbrt':
      res = Math.cbrt(value);
      symbol = `∛(${value})`;
      break;
    case 'pow2':
      res = Math.pow(value, 2);
      symbol = `${value}²`;
      break;
    case 'pow3':
      res = Math.pow(value, 3);
      symbol = `${value}³`;
      break;
    case 'inv': // 1/x
      res = value !== 0 ? 1 / value : NaN;
      symbol = `1/(${value})`;
      break;
    case 'abs':
      res = Math.abs(value);
      symbol = `|${value}|`;
      break;
    case 'fact':
      res = calculateFactorial(value);
      symbol = `${value}!`;
      break;
    case 'exp': // e^x
      res = Math.exp(value);
      symbol = `e^(${value})`;
      break;
    case 'tenPow': // 10^x
      res = Math.pow(10, value);
      symbol = `10^(${value})`;
      break;
    case 'percent':
      res = value / 100;
      symbol = `${value}%`;
      break;
    case 'negate':
      res = -value;
      symbol = `-(${value})`;
      break;
    default:
      res = value;
  }

  return { result: res, symbol };
}

// Binary operations (addition, subtraction, multiplication, division, power)
export function calculateBinary(a: number, b: number, op: string): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
    case '×':
      return a * b;
    case '/':
    case '÷':
      return b !== 0 ? a / b : NaN;
    case '^':
      return Math.pow(a, b);
    case 'mod':
    case '%':
      return b !== 0 ? a % b : NaN;
    default:
      return b;
  }
}
