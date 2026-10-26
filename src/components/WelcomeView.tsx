import React from 'react';
import { Calculator, Compass, GraduationCap, ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, History } from 'lucide-react';

interface WelcomeViewProps {
  onStartCalculator: () => void;
  onGoToSignIn: () => void;
  onGoToSignUp: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStartCalculator,
  onGoToSignIn,
  onGoToSignUp
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-16 px-4 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Modern Calculation & Academic Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-tight mb-6">
          Precision Mathematics, <br />
          <span className="text-gradient">Engineered for Web.</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          IgniteCalc brings together everyday arithmetic, high-level scientific computation, and university GPA tracking in one responsive web application.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartCalculator}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToSignIn}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 font-bold text-sm sm:text-base transition-all hover:border-white/20"
          >
            Sign In
          </button>

          <button
            onClick={onGoToSignUp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 hover:text-white border border-indigo-500/30 font-bold text-sm sm:text-base transition-all"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Card 1: Standard Calculator */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-outfit text-white mb-2">Standard Calculator</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Fast, keyboard-supported arithmetic with percent calculations, full memory register, and clean instant feedback.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full keyboard listener support</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Decimal precision & backspace</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Scientific Calculator */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-outfit text-white mb-2">Scientific Engine</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Engineered for STEM coursework: trigonometry, inverse functions, logarithms, exponents, powers, and roots.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Degrees (DEG) & Radians (RAD)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>sin, cos, tan, log, ln, π, e, n!</span>
            </li>
          </ul>
        </div>

        {/* Card 3: CGPA Calculator */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-outfit text-white mb-2">CGPA & Academic Grader</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Designed for college and university grading. Dynamically add semester courses, assign credit units, and calculate GPA instantly.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>5.0 Scale & Letter Grade Weights (A–F)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time Class of Degree honors</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Security & Verification Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-indigo-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Protected by Cloudflare Turnstile</h4>
            <p className="text-slate-400 text-xs">
              Human-first authentication with Google, Apple, and Email sign-in options.
            </p>
          </div>
        </div>

        <button
          onClick={onStartCalculator}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span>Quick Launch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
