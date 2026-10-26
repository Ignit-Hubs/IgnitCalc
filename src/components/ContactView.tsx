import React from 'react';
import { Mail, MessageSquare, Globe, ArrowLeft, ShieldCheck } from 'lucide-react';

interface ContactViewProps {
  onBackToSuite: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBackToSuite }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-slideUp">
      <div className="calc-card glass p-8 sm:p-12 rounded-[3.5rem] shadow-2xl text-center border border-white/10">
        
        {/* Avatar Badge */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 mx-auto mb-6 flex items-center justify-center p-1 shadow-xl shadow-indigo-500/20">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
            <span className="text-3xl font-black font-outfit text-white">FD</span>
          </div>
        </div>

        <h2 className="text-3xl font-black font-outfit text-gradient mb-2 uppercase tracking-tight">
          Support & Engineering Center
        </h2>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.25em] mb-8">
          Engineered by FLAMEZ_DEV02 (Daniel Olutoba)
        </p>

        {/* Contact Links */}
        <div className="space-y-3.5 text-left mb-8">
          <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Official Contact</p>
              <p className="text-slate-200 font-semibold text-sm">flamezdev.tech@gmail.com</p>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Developer Social</p>
              <p className="text-slate-200 font-semibold text-sm">@flamez_dev02</p>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Operations</p>
              <p className="text-slate-200 font-semibold text-sm">Remote & Cloud Infrastructure</p>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cloudflare Security</p>
              <p className="text-slate-200 font-semibold text-sm">Protected by Cloudflare Turnstile Edge</p>
            </div>
          </div>
        </div>

        <button
          onClick={onBackToSuite}
          className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-black tracking-widest text-xs uppercase shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calculation Suite
        </button>
      </div>
    </div>
  );
};
