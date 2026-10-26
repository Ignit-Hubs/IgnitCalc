import React, { useState, useEffect, useCallback } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { calculateBinary, formatResult } from '../utils/mathEngine';

interface StandardCalculatorProps {
  onSaveHistory: (operation: string, result: string) => void;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({ onSaveHistory }) => {
  const [current, setCurrent] = useState<string>('0');
  const [previous, setPrevious] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Number input handler
  const handleNumber = useCallback((num: string) => {
    if (isCalculated) {
      setCurrent(num);
      setIsCalculated(false);
      return;
    }
    if (num === '.' && current.includes('.')) return;
    setCurrent(prev => (prev === '0' && num !== '.' ? num : prev + num));
  }, [current, isCalculated]);

  // Operation (+, -, *, /)
  const handleOperation = useCallback((op: string) => {
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
    setCurrent('0');
    setIsCalculated(false);
  }, [previous, current, operation, isCalculated]);

  // Equals / Calculate
  const handleCalculate = useCallback(() => {
    if (!previous || !operation) return;
    const p = parseFloat(previous);
    const c = parseFloat(current);
    if (isNaN(p) || isNaN(c)) return;

    const res = calculateBinary(p, c, operation);
    const formatted = formatResult(res);
    const opDisplay = `${previous} ${operation} ${current}`;

    onSaveHistory(opDisplay, formatted);
    setCurrent(formatted);
    setPrevious('');
    setOperation(null);
    setIsCalculated(true);
  }, [previous, current, operation, onSaveHistory]);

  // Clear / AC
  const handleClear = useCallback(() => {
    setCurrent('0');
    setPrevious('');
    setOperation(null);
    setIsCalculated(false);
  }, []);

  // Delete / Backspace
  const handleDelete = useCallback(() => {
    if (isCalculated) {
      handleClear();
      return;
    }
    setCurrent(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  }, [isCalculated, handleClear]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
      if (e.key === '.') handleNumber('.');
      if (e.key === '+' || e.key === '-') handleOperation(e.key);
      if (e.key === '*') handleOperation('×');
      if (e.key === '/') {
        e.preventDefault();
        handleOperation('÷');
      }
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      }
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Escape') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperation, handleCalculate, handleDelete, handleClear]);

  return (
    <div className="w-full max-w-[420px] mx-auto animate-slideUp">
      <div className="calc-card glass p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
        
        {/* Modern Calculator Screen */}
        <div className="display bg-black/50 rounded-3xl p-6 mb-6 text-right flex flex-col justify-end min-h-[130px] border border-white/5 shadow-inner select-all">
          <div className="text-slate-400 text-sm font-medium tracking-wider min-h-[24px]">
            {previous} {operation || ''}
          </div>
          <div className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter text-white truncate">
            {current}
          </div>
        </div>

        {/* Calculator Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button 
            onClick={handleClear}
            className="calc-btn bg-red-500/10 hover:bg-red-500/20 text-red-400 h-14 sm:h-16 rounded-2xl font-bold text-base flex items-center justify-center border border-red-500/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-1" /> AC
          </button>
          <button 
            onClick={handleDelete}
            className="calc-btn bg-white/5 hover:bg-white/10 text-slate-300 h-14 sm:h-16 rounded-2xl font-bold text-base flex items-center justify-center border border-white/5 active:scale-95 transition-all"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleOperation('÷')}
            className={`calc-btn h-14 sm:h-16 rounded-2xl font-bold text-2xl flex items-center justify-center border transition-all ${
              operation === '÷' 
                ? 'bg-indigo-600 text-white border-indigo-400' 
                : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
            }`}
          >
            ÷
          </button>
          <button 
            onClick={() => handleOperation('×')}
            className={`calc-btn h-14 sm:h-16 rounded-2xl font-bold text-2xl flex items-center justify-center border transition-all ${
              operation === '×' 
                ? 'bg-indigo-600 text-white border-indigo-400' 
                : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
            }`}
          >
            ×
          </button>

          {/* Numbers 7, 8, 9 & Subtraction */}
          {['7', '8', '9'].map(num => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="calc-btn bg-white/5 hover:bg-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold text-xl border border-white/5 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => handleOperation('-')}
            className={`calc-btn h-14 sm:h-16 rounded-2xl font-bold text-2xl flex items-center justify-center border transition-all ${
              operation === '-' 
                ? 'bg-indigo-600 text-white border-indigo-400' 
                : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
            }`}
          >
            −
          </button>

          {/* Numbers 4, 5, 6 & Addition */}
          {['4', '5', '6'].map(num => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="calc-btn bg-white/5 hover:bg-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold text-xl border border-white/5 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => handleOperation('+')}
            className={`calc-btn h-14 sm:h-16 rounded-2xl font-bold text-2xl flex items-center justify-center border transition-all ${
              operation === '+' 
                ? 'bg-indigo-600 text-white border-indigo-400' 
                : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
            }`}
          >
            +
          </button>

          {/* Numbers 1, 2, 3 */}
          {['1', '2', '3'].map(num => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="calc-btn bg-white/5 hover:bg-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold text-xl border border-white/5 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}

          {/* Equals Button spanning 2 rows vertically */}
          <button 
            onClick={handleCalculate}
            className="row-span-2 calc-btn bg-gradient-to-b from-indigo-500 via-purple-600 to-indigo-700 hover:from-indigo-400 hover:to-purple-600 text-white rounded-2xl font-bold text-3xl shadow-xl shadow-indigo-500/30 border border-indigo-400/30 active:scale-95 transition-all flex items-center justify-center"
          >
            =
          </button>

          {/* Zero spanning 2 columns, and Decimal */}
          <button 
            onClick={() => handleNumber('0')}
            className="col-span-2 calc-btn bg-white/5 hover:bg-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold text-xl border border-white/5 active:scale-95 transition-all text-left pl-7"
          >
            0
          </button>
          <button 
            onClick={() => handleNumber('.')}
            className="calc-btn bg-white/5 hover:bg-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold text-xl border border-white/5 active:scale-95 transition-all"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};
