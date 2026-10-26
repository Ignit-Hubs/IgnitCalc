import React, { useState } from 'react';
import { Trash2, Download, Search, History as HistoryIcon, Clock } from 'lucide-react';
import { CalculationHistoryItem } from '../types';

interface HistoryViewProps {
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onClearHistory }) => {
  const [filter, setFilter] = useState<'ALL' | 'STANDARD' | 'SCIENTIFIC' | 'CGPA'>('ALL');
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'ALL' || item.type === filter;
    const matchesSearch = 
      item.operation.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportHistoryJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ignitecalc_history_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slideUp">
      <div className="calc-card glass p-6 sm:p-10 rounded-[3rem] shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-outfit text-white tracking-tight">
                Calculation Logs
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {history.length} calculations recorded in this session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={exportHistoryJSON}
              disabled={history.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold transition-all disabled:opacity-40"
              title="Download records"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={onClearHistory}
              disabled={history.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold transition-all disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" /> Wipe Logs
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search equations or answers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex rounded-2xl bg-black/40 p-1 border border-white/5">
            {(['ALL', 'STANDARD', 'SCIENTIFIC', 'CGPA'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                  filter === tab
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
          {filteredHistory.length === 0 ? (
            <div className="py-20 text-center opacity-40">
              <HistoryIcon className="w-12 h-12 mx-auto mb-3 text-slate-500 stroke-1" />
              <p className="font-outfit text-lg font-bold uppercase tracking-widest text-slate-300">
                No Calculations Found
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Perform any calculation in Standard, Scientific, or CGPA mode to see it here.
              </p>
            </div>
          ) : (
            filteredHistory.map(item => (
              <div
                key={item.id}
                className="history-item glass bg-black/30 p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      item.type === 'STANDARD'
                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                        : item.type === 'SCIENTIFIC'
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs sm:text-sm font-mono mb-1 truncate">
                    {item.operation}
                  </span>
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-outfit text-white tracking-tight">
                      = {item.result}
                    </span>
                    {item.remark && (
                      <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20">
                        {item.remark}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
