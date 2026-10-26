import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 text-slate-400 text-xs mt-12 w-full max-w-5xl mx-auto px-4 border-t border-white/5">
      <div className="flex items-center justify-center">
        <p className="text-[11px] font-semibold tracking-wider text-slate-400">
          © {new Date().getFullYear()} IgniteCalc • Developed by{' '}
          <span className="text-indigo-400 hover:text-purple-400 transition-colors">
            Flamez_Dev02
          </span>
        </p>
      </div>
    </footer>
  );
};
