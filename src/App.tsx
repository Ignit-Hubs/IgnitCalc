. by import React, { useState, useEffect } from 'react';
import { Calculator, Compass, GraduationCap, History, User } from 'lucide-react';
import { AppView, CalculatorMode, CalculationHistoryItem, UserProfile } from './types';
import { apiClient } from './services/apiClient';
import { Navigation } from './components/Navigation';
import { WelcomeView } from './components/WelcomeView';
import { AuthView } from './components/AuthView';
import { StandardCalculator } from './components/StandardCalculator';
import { ScientificCalculator } from './components/ScientificCalculator';
import { CGPACalculator } from './components/CGPACalculator';
import { HistoryView } from './components/HistoryView';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [activeTab, setActiveTab] = useState<CalculatorMode>('standard');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  // Load existing session data on mount
  useEffect(() => {
    async function loadData() {
      const user = await apiClient.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
      const storedHistory = await apiClient.fetchHistory();
      setHistory(storedHistory);
    }
    loadData();
  }, []);

  // Save history helper
  const handleSaveCalculation = async (
    type: 'STANDARD' | 'SCIENTIFIC' | 'CGPA',
    operation: string,
    result: string,
    remark?: string
  ) => {
    const updated = await apiClient.saveHistoryItem({
      type,
      operation,
      result,
      remark
    });
    setHistory(updated);
  };

  const handleClearHistory = async () => {
    await apiClient.clearHistory();
    setHistory([]);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('main');
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-4 px-3 sm:px-6 relative overflow-x-hidden">

      {/* Top Application Navigation */}
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenSignIn={() => setCurrentView('signin')}
        onOpenSignUp={() => setCurrentView('signup')}
      />

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        {/* VIEW 1: WELCOME PAGE */}
        {currentView === 'welcome' && (
          <WelcomeView
            onStartCalculator={() => setCurrentView('main')}
            onGoToSignIn={() => setCurrentView('signin')}
            onGoToSignUp={() => setCurrentView('signup')}
          />
        )}

        {/* VIEW 2: SIGN IN PAGE */}
        {currentView === 'signin' && (
          <AuthView
            initialMode="signin"
            onAuthSuccess={handleAuthSuccess}
            onBackToHome={() => setCurrentView('welcome')}
            onContinueAsGuest={() => setCurrentView('main')}
          />
        )}

        {/* VIEW 3: SIGN UP PAGE */}
        {currentView === 'signup' && (
          <AuthView
            initialMode="signup"
            onAuthSuccess={handleAuthSuccess}
            onBackToHome={() => setCurrentView('welcome')}
            onContinueAsGuest={() => setCurrentView('main')}
          />
        )}

        {/* VIEW 4: MAIN CALCULATOR SUITE */}
        {currentView === 'main' && (
          <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 animate-fadeIn">
            {/* Header */}
            <header className="text-center mb-6">
              <h1 className="text-4xl sm:text-5xl font-black font-outfit text-white tracking-tight mb-2">
                IgniteCalc
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400">
                Standard Arithmetic • Scientific Functions • Academic CGPA
              </p>

              {/* Quick Tab Selector */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 max-w-fit mx-auto p-1.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
                <button
                  onClick={() => setActiveTab('standard')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'standard'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Standard</span>
                </button>

                <button
                  onClick={() => setActiveTab('scientific')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'scientific'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Scientific</span>
                </button>

                <button
                  onClick={() => setActiveTab('cgpa')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'cgpa'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>CGPA</span>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'history'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Logs ({history.length})</span>
                </button>
              </div>
            </header>

            {/* Calculator Card Container */}
            <main className="w-full flex justify-center items-start">
              <div className="w-full max-w-2xl">
                {activeTab === 'standard' && (
                  <StandardCalculator
                    onSaveHistory={(op, res) => handleSaveCalculation('STANDARD', op, res)}
                  />
                )}

                {activeTab === 'scientific' && (
                  <ScientificCalculator
                    onSaveHistory={(op, res) => handleSaveCalculation('SCIENTIFIC', op, res)}
                  />
                )}

                {activeTab === 'cgpa' && (
                  <CGPACalculator
                    onSaveHistory={(op, res, remark) => handleSaveCalculation('CGPA', op, res, remark)}
                  />
                )}

                {activeTab === 'history' && (
                  <HistoryView
                    history={history}
                    onClearHistory={handleClearHistory}
                    onSelectRecord={(rec) => {
                      if (rec.type === 'STANDARD') setActiveTab('standard');
                      if (rec.type === 'SCIENTIFIC') setActiveTab('scientific');
                      if (rec.type === 'CGPA') setActiveTab('cgpa');
                    }}
                  />
                )}
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Footer */}
// Footer view ( make correction soon 
      <Footer />
    </div>
  );
};

export default App;
