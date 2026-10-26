import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { UserProfile, TurnstileStatus } from '../types';
import { CloudflareTurnstile } from './CloudflareTurnstile';
import { apiClient } from '../services/apiClient';

interface AuthViewProps {
  initialMode?: 'signin' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
  onBackToHome: () => void;
  onContinueAsGuest: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'signin',
  onAuthSuccess,
  onBackToHome,
  onContinueAsGuest
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (turnstileStatus !== 'verified') {
      setErrorMessage('Please verify that you are human before proceeding.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      return;
    }

    setIsLoading(true);
    try {
      let user: UserProfile;
      if (mode === 'signup') {
        user = await apiClient.registerWithEmail(name, email, password, turnstileToken);
      } else {
        user = await apiClient.loginWithEmail(email, password, turnstileToken);
      }
      onAuthSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const user = await apiClient.loginWithGoogle();
      onAuthSuccess(user);
    } catch {
      setErrorMessage('Google Sign-In was unable to complete. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const user = await apiClient.loginWithApple();
      onAuthSuccess(user);
    } catch {
      setErrorMessage('Apple Sign-In was unable to complete. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-12 px-4 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Header Tabs: Sign In / Sign Up */}
        <div className="flex rounded-xl bg-black/40 p-1 mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'signin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black font-outfit text-white tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {mode === 'signin'
              ? 'Access your saved calculations and preferences'
              : 'Sign up to start saving calculation histories'}
          </p>
        </div>

        {/* Social Authentication Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-sm active:scale-[0.99]"
          >
            {/* Google SVG Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Apple Sign In */}
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-black hover:bg-slate-950 text-white border border-white/20 text-xs font-bold transition-all shadow-sm active:scale-[0.99]"
          >
            {/* Apple SVG Logo */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.77-11.96-14.21-6.19-9.36-11.04-20.19-14.54-32.51-3.5-12.31-5.25-23.75-5.25-34.3 0-14.43 3.69-26.39 11.07-35.88 7.38-9.49 16.71-14.32 27.99-14.48 4.57 0 9.87 1.25 15.89 3.75 6.02 2.5 9.77 3.75 11.25 3.75 1.74 0 5.76-1.32 12.06-3.95 6.3-2.63 11.75-3.83 16.35-3.6 12.18.99 21.68 5.76 28.51 14.32-10.88 6.64-16.19 15.77-15.93 27.4.26 9.15 3.76 16.82 10.51 23.01 6.75 6.19 14.89 9.68 24.42 10.47-2.29 6.96-4.78 13.84-7.46 20.65zM119.22 31.84c0-7.72 2.76-14.86 8.27-21.43 5.51-6.57 12.38-10.41 20.62-11.51.22 1.09.33 2.08.33 2.97 0 7.61-2.88 14.81-8.65 21.6-5.77 6.79-12.8 10.6-21.08 11.43-.22-1.09-.34-2.11-.34-3.06z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-white/10 w-full"></div>
          <span className="bg-slate-900 px-3 text-[11px] uppercase font-bold tracking-wider text-slate-500 absolute">
            or continue with email
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniel Flamez"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-xs placeholder:text-slate-600 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-xs placeholder:text-slate-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-xs placeholder:text-slate-600 transition-colors"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-xs placeholder:text-slate-600 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Cloudflare Turnstile Human Verification Widget */}
          <CloudflareTurnstile
            onVerify={token => setTurnstileToken(token)}
            status={turnstileStatus}
            setStatus={setTurnstileStatus}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Guest Mode Link */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Continue as Guest (No account needed) &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
