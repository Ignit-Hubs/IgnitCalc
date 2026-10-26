/**
 * ============================================================================
 * BEGINNER'S GUIDE TO TYPESCRIPT IN THIS PROJECT
 * ============================================================================
 * Welcome to TypeScript! If you are new to TypeScript, here is what you need
 * to know:
 *
 * 1. "type": An alias for a shape or specific set of values (e.g. 'standard' | 'scientific').
 *    This prevents typos! If you misspell 'scintific', TypeScript warns you immediately.
 * 2. "interface": Used to define the blueprint/structure of an object (like a User or Course).
 * 3. "?" (optional): When you see `remark?: string`, it means that property can be omitted.
 * 4. Arrays: `CourseItem[]` means a list containing items of type `CourseItem`.
 * ============================================================================
 */

// Top-level application views requested by user: Welcome, Sign In, Sign Up, and Main App
export type AppView = 'welcome' | 'signin' | 'signup' | 'main';

// The active calculation tool selected in the calculator suite
export type CalculatorMode = 'standard' | 'scientific' | 'cgpa' | 'history' | 'contact';

// Angle mode for trigonometric functions (Degrees vs Radians)
export type AngleMode = 'DEG' | 'RAD';

// History log structure for storing completed calculations
export interface CalculationHistoryItem {
  id: number;
  type: 'STANDARD' | 'SCIENTIFIC' | 'CGPA';
  operation: string;
  result: string;
  timestamp: string;
  remark?: string;
}

// Single academic course entry for CGPA calculations
export interface CourseItem {
  id: number;
  title: string;
  unit: string;
  grade: string; // Letter grade weight: '5' (A), '4' (B), '3' (C), '2' (D), '1' (E), '0' (F)
}

// User account details for Google, Apple, or Email authentication
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
  isVerified: boolean;
  createdAt: string;
}

// Cloudflare Turnstile "Verify you are human" state
export type TurnstileStatus = 'idle' | 'verifying' | 'verified' | 'failed';

// Standard calculator state blueprint
export interface StandardCalcState {
  current: string;
  previous: string;
  operation: string | null;
}

// Scientific calculator state blueprint
export interface ScientificCalcState {
  current: string;
  previous: string;
  operation: string | null;
  unaryOp: string | null;
  angleMode: AngleMode;
  isSecondFn: boolean;
  memory: number;
}
