import React, { useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { TurnstileStatus } from '../types';

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  status: TurnstileStatus;
  setStatus: (status: TurnstileStatus) => void;
}

export const CloudflareTurnstile: React.FC<CloudflareTurnstileProps> = ({
  onVerify,
  status,
  setStatus
}) => {
  const [token, setToken] = useState<string>('');

  const handleTriggerVerification = () => {
    if (status === 'verifying' || status === 'verified') return;

    setStatus('verifying');

    // Simulate Cloudflare Edge challenge validation
    setTimeout(() => {
      const generatedToken = 'cf_turnstile_' + Math.random().toString(36).substring(2, 12);
      setToken(generatedToken);
      setStatus('verified');
      onVerify(generatedToken);
    }, 1200);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('idle');
    setToken('');
  };

  return (
    <div className="w-full my-4">
      <div 
        onClick={handleTriggerVerification}
        className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
          status === 'verified'
            ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-950/30'
            : status === 'verifying'
            ? 'bg-slate-900/80 border-indigo-500/40'
            : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-black/60'
        }`}
      >
        <div className="flex items-center gap-3.5">
          {/* Checkbox / Spinner / Checkmark */}
          <div className="relative flex items-center justify-center">
            {status === 'idle' && (
              <div className="w-6 h-6 rounded-lg border-2 border-slate-400/80 bg-slate-800/60 hover:border-indigo-400 transition-colors flex items-center justify-center">
                <span className="w-2 h-2 rounded-sm bg-transparent"></span>
              </div>
            )}

            {status === 'verifying' && (
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            )}

            {status === 'verified' && (
              <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-black shadow-md shadow-emerald-500/40 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-200">
              {status === 'idle' && 'Verify you are human'}
              {status === 'verifying' && 'Checking browser...'}
              {status === 'verified' && 'Verification successful'}
            </span>
            <span className="text-[11px] text-slate-400">
              {status === 'verified' 
                ? 'Security check passed' 
                : 'Click the checkbox to verify'}
            </span>
          </div>
        </div>

        {/* Cloudflare Branding Badge */}
        <div className="flex flex-col items-end gap-0.5 pl-3 border-l border-white/5">
          <div className="flex items-center gap-1.5">
            {/* Cloudflare Flame SVG */}
            <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.8 11.2a5.5 5.5 0 0 0-10.3-2A6 6 0 0 0 3 15a6 6 0 0 0 6 6h9.8a4.2 4.2 0 0 0 0-8.4c0-.5 0-1-.2-1.4z"/>
            </svg>
            <span className="text-[11px] font-bold tracking-tight text-slate-300">
              CLOUDFLARE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-slate-400 font-medium">Turnstile Privacy</span>
            {status === 'verified' && (
              <button 
                onClick={handleReset} 
                title="Refresh Challenge"
                className="text-slate-400 hover:text-slate-200"
              >
                <RefreshCw className="w-2.5 h-2.5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
