import React from 'react';
import { User, LogOut, CheckCircle2, Home, Calculator } from 'lucide-react';
import { AppView, UserProfile } from '../types';

interface NavigationProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onLogout,
  onOpenSignIn,
  onOpenSignUp
}) => {
  return (
    <nav className="flex items-center justify-between gap-4 mb-6 px-2 w-full max-w-5xl mx-auto py-2">
      {/* Brand Logo & Name */}
      <button
        onClick={() => setCurrentView('welcome')}
        className="flex items-center gap-3 text-left group focus:outline-none"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <span className="font-black text-white text-base font-outfit">IC</span>
        </div>
        <div>
          <span className="font-outfit font-black text-xl tracking-tight text-white block group-hover:text-indigo-300 transition-colors">
            IgniteCalc
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block -mt-1">
            Calculation Suite
          </span>
        </div>
      </button>

      {/* Center Nav Links: Home & Calculator */}
      <div className="flex items-center gap-1 rounded-2xl bg-black/40 p-1 border border-white/5 shadow-inner">
        <button
          onClick={() => setCurrentView('welcome')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentView === 'welcome'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentView('main')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentView === 'main'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Calculator</span>
        </button>
      </div>

      {/* User Auth Section */}
      <div className="flex items-center gap-2">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80'}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[120px] truncate">
                {currentUser.name}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all text-xs flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSignIn}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'signin'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              Sign In
            </button>

            <button
              onClick={onOpenSignUp}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all hidden sm:inline-block ${
                currentView === 'signup'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-white border border-indigo-500/30'
              }`}
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
