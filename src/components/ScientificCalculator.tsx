import React, { useState, useCallback } from 'react';
import { RotateCcw, Delete, Compass } from 'lucide-react';
import { AngleMode } from '../types';
import { calculateUnary, calculateBinary, formatResult } from '../utils/mathEngine';

interface ScientificCalculatorProps {
  onSaveHistory: (operation: string, result: string) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onSaveHistory }) => {
  const [current, setCurrent] = useState<string>('0');
  const [previous, setPrevious] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [isSecondFn, setIsSecondFn] = useState<boolean>(false);
  const [formulaPreview, setFormulaPreview] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Toggle DEG / RAD
  const toggleAngleMode = () => {
    setAngleMode(prev => (prev === 'DEG' ? 'RAD' : 'DEG'));
  };

  // Toggle 2nd Functions (sin -> asin, cos -> acos, etc.)
  const toggleSecondFn = () => {
    setIsSecondFn(prev => !prev);
  };

  // Append digit or decimal
  const handleNumber = useCallback((val: string) => {
    if (isCalculated) {
      setCurrent(val);
      setFormulaPreview('');
      setIsCalculated(false);
      return;
    }
    if (val === '.' && current.includes('.')) return;
    setCurrent(prev => (prev === '0' && val !== '.' ? val : prev + val));
  }, [current, isCalculated]);

  // Insert constants (π, e)
  const handleConstant = (name: 'pi' | 'e') => {
    const val = name === 'pi' ? Math.PI.toString() : Math.E.toString();
    const formatted = formatResult(parseFloat(val), 8);
    setCurrent(formatted);
    setIsCalculated(false);
  };

  // Immediate Unary Scientific Functions (sin, cos, log, ln, sqrt, etc.)
  const handleUnaryFunction = (func: string) => {
    const val = parseFloat(current);
    if (isNaN(val)) return;

    const { result, symbol } = calculateUnary(func, val, angleMode);
    const formatted = formatResult(result);

    onSaveHistory(symbol, formatted);
    setFormulaPreview(symbol);
    setCurrent(formatted);
    setIsCalculated(true);
  };

  // Binary operation (+, -, *, /, ^, mod)
  const handleOperation = (op: string) => {
    if (previous && operation && !isCalculated) {
      const p = parseFloat(previous);
      const c = parseFloat(current);
      if (!isNaN(p) && !isNaN(c)) {
        const res = calculateBinary(p, c, operation);
        const formatted = formatResult(res);
        setPrevious(formatted);
      }
    } else {
      setPrevious(current);
    }
    setOperation(op);
    setFormulaPreview(`${current} ${op}`);
    setCurrent('0');
    setIsCalculated(false);
  };

  // Calculate binary operation
  const handleCalculate = () => {
    if (!previous || !operation) return;
    const p = parseFloat(previous);
    const c = parseFloat(current);
    if (isNaN(p) || isNaN(c)) return;

    const res = calculateBinary(p, c, operation);
    const formatted = formatResult(res);
    const fullOp = `${previous} ${operation} ${current}`;

    onSaveHistory(fullOp, formatted);
    setFormulaPreview(fullOp);
    setCurrent(formatted);
    setPrevious('');
    setOperation(null);
    setIsCalculated(true);
  };

  // Clear / AC
  const handleClear = () => {
    setCurrent('0');
    setPrevious('');
    setOperation(null);
    setFormulaPreview('');
    setIsCalculated(false);
  };

  // Delete / Backspace
  const handleDelete = () => {
    if (isCalculated) {
      handleClear();
      return;
    }
    setCurrent(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  // Random number between 0 and 1
  const handleRandom = () => {
    const rnd = Math.random();
    const formatted = formatResult(rnd, 6);
    setCurrent(formatted);
    setFormulaPreview('RAND()');
    setIsCalculated(true);
  };

  return (
    <div className="w-full max-w-[650px] mx-auto animate-slideUp">
      <div className="calc-card glass p-6 sm:p-8 rounded-[3rem] shadow-2xl border border-white/10">
        
        {/* Scientific Display */}
        <div className="display bg-black/50 rounded-3xl p-6 mb-6 text-right flex flex-col justify-end min-h-[145px] border border-white/5 shadow-inner select-all relative overflow-hidden">
          
          {/* Top Status Row: DEG/RAD badge & 2nd indicator */}
          <div className="flex justify-between items-center text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider border ${
                angleMode === 'DEG' 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {angleMode}
              </span>
              {isSecondFn && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                  2nd
                </span>
              )}
            </div>
            <div className="text-slate-400 font-mono text-xs truncate max-w-[280px]">
              {formulaPreview || (previous ? `${previous} ${operation}` : '')}
            </div>
          </div>

          {/* Primary Number Display */}
          <div className="text-3xl sm:text-5xl font-black font-outfit tracking-tighter text-white truncate">
            {current}
          </div>
        </div>

        {/* Scientific Controls Grid (5 Columns) */}
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
          
          {/* Row 1: DEG/RAD Toggle, 2nd, Factorial, AC, DEL */}
          <button 
            onClick={toggleAngleMode}
            className="calc-btn bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            {angleMode}
          </button>
          <button 
            onClick={toggleSecondFn}
            className={`calc-btn py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all active:scale-95 ${
              isSecondFn 
                ? 'bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-md shadow-cyan-500/30' 
                : 'bg-white/5 hover:bg-white/10 text-cyan-300 border-white/5'
            }`}
          >
            2nd
          </button>
          <button 
            onClick={() => handleUnaryFunction('fact')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
            title="Factorial (n!)"
          >
            n!
          </button>
          <button 
            onClick={handleClear}
            className="calc-btn bg-red-500/15 hover:bg-red-500/25 text-red-400 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> AC
          </button>
          <button 
            onClick={handleDelete}
            className="calc-btn bg-white/5 hover:bg-white/10 text-slate-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-white/5 active:scale-95 transition-all flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>

          {/* Row 2: Trig Functions (sin/asin, cos/acos, tan/atan), Divide, Multiply */}
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'asin' : 'sin')}
            className="calc-btn bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-indigo-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? 'sin⁻¹' : 'sin'}
          </button>
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'acos' : 'cos')}
            className="calc-btn bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-indigo-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? 'cos⁻¹' : 'cos'}
          </button>
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'atan' : 'tan')}
            className="calc-btn bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-indigo-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? 'tan⁻¹' : 'tan'}
          </button>
          <button 
            onClick={() => handleOperation('÷')}
            className="calc-btn bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 py-3 sm:py-3.5 rounded-xl font-bold text-xl border border-indigo-500/25 active:scale-95 transition-all"
          >
            ÷
          </button>
          <button 
            onClick={() => handleOperation('×')}
            className="calc-btn bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 py-3 sm:py-3.5 rounded-xl font-bold text-xl border border-indigo-500/25 active:scale-95 transition-all"
          >
            ×
          </button>

          {/* Row 3: Logarithms & Roots, 7, 8, 9, Minus */}
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'tenPow' : 'log')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? '10ˣ' : 'log'}
          </button>
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'exp' : 'ln')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? 'eˣ' : 'ln'}
          </button>
          <button 
            onClick={() => handleNumber('7')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            7
          </button>
          <button 
            onClick={() => handleNumber('8')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            8
          </button>
          <button 
            onClick={() => handleNumber('9')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            9
          </button>

          {/* Row 4: Powers & Roots, 4, 5, 6, Plus */}
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'cbrt' : 'sqrt')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? '∛' : '√'}
          </button>
          <button 
            onClick={() => handleUnaryFunction(isSecondFn ? 'pow3' : 'pow2')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            {isSecondFn ? 'x³' : 'x²'}
          </button>
          <button 
            onClick={() => handleNumber('4')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            4
          </button>
          <button 
            onClick={() => handleNumber('5')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            5
          </button>
          <button 
            onClick={() => handleNumber('6')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            6
          </button>

          {/* Row 5: x^y, 1/x, 1, 2, 3 */}
          <button 
            onClick={() => handleOperation('^')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            xʸ
          </button>
          <button 
            onClick={() => handleUnaryFunction('inv')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold italic text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            1/x
          </button>
          <button 
            onClick={() => handleNumber('1')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            1
          </button>
          <button 
            onClick={() => handleNumber('2')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            2
          </button>
          <button 
            onClick={() => handleNumber('3')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            3
          </button>

          {/* Row 6: π, e, 0, ., Equals */}
          <button 
            onClick={() => handleConstant('pi')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            π
          </button>
          <button 
            onClick={() => handleConstant('e')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            e
          </button>
          <button 
            onClick={() => handleNumber('0')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            0
          </button>
          <button 
            onClick={() => handleNumber('.')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white py-3 sm:py-3.5 rounded-xl font-bold text-lg border border-white/5 active:scale-95 transition-all"
          >
            .
          </button>
          <button 
            onClick={handleCalculate}
            className="calc-btn bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-400 hover:to-purple-500 text-white py-3 sm:py-3.5 rounded-xl font-bold text-2xl shadow-xl shadow-indigo-500/30 border border-indigo-400/30 active:scale-95 transition-all flex items-center justify-center"
          >
            =
          </button>

          {/* Row 7: |x| (abs), % (mod/percent), ± (negate), RAND, + / - Operators */}
          <button 
            onClick={() => handleUnaryFunction('abs')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            |x|
          </button>
          <button 
            onClick={() => handleUnaryFunction('percent')}
            className="calc-btn bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-purple-500/20 active:scale-95 transition-all"
          >
            %
          </button>
          <button 
            onClick={() => handleUnaryFunction('negate')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-slate-300 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-white/5 active:scale-95 transition-all"
          >
            ±
          </button>
          <button 
            onClick={handleRandom}
            className="calc-btn bg-white/5 hover:bg-white/10 text-slate-300 py-3 sm:py-3.5 rounded-xl font-bold text-[10px] sm:text-xs border border-white/5 active:scale-95 transition-all"
          >
            RAND
          </button>
          <div className="grid grid-cols-2 gap-1.5">
            <button 
              onClick={() => handleOperation('+')}
              className="calc-btn bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 rounded-xl font-bold text-lg border border-indigo-500/25 active:scale-95 transition-all"
            >
              +
            </button>
            <button 
              onClick={() => handleOperation('-')}
              className="calc-btn bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 rounded-xl font-bold text-lg border border-indigo-500/25 active:scale-95 transition-all"
            >
              −
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
