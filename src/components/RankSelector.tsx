import { AcademicRank } from '../types/faculty';
import { RANK_NORMS } from '../data/rankNorms';
import { RotateCcw, BookOpen, UserCheck, ShieldAlert, FileText } from 'lucide-react';

interface RankSelectorProps {
  currentRank: AcademicRank;
  onRankChange: (rank: AcademicRank) => void;
  onLoadPreset: () => void;
  onResetBlank: () => void;
}

export function RankSelector({
  currentRank,
  onRankChange,
  onLoadPreset,
  onResetBlank
}: RankSelectorProps) {
  const norm = RANK_NORMS[currentRank];

  const ranks: Array<{ id: AcademicRank; label: string; level: string; hours: number; api: number }> = [
    { id: 'assistant_professor', label: 'Assistant Professor', level: 'Academic Level 10 / 11 / 12', hours: 16, api: 75 },
    { id: 'associate_professor', label: 'Associate Professor', level: 'Academic Level 13A', hours: 14, api: 100 },
    { id: 'professor', label: 'Professor', level: 'Academic Level 14 / 15', hours: 12, api: 125 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 shadow-xs no-print">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Select Academic Cadre / Designation</span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">Teaching Faculty Evaluation & Workload Standards</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch cadre to dynamically adapt teaching hours, API appraisal thresholds, research benchmarks, and promotion rubrics.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
          <button
            onClick={onLoadPreset}
            className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            title="Load benchmark verified data for this rank"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Load Benchmark Data</span>
          </button>
          <button
            onClick={onResetBlank}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            title="Clear all fields to enter personal data from scratch"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Blank Template</span>
          </button>
        </div>
      </div>

      {/* Cadre Tabs Segmented Control */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {ranks.map((r) => {
          const isSelected = currentRank === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onRankChange(r.id)}
              className={`text-left p-3.5 rounded-lg border transition-all text-sm relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600 text-slate-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                  {r.label}
                </span>
                {isSelected && (
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                    Active Format
                  </span>
                )}
              </div>
              
              <div className="text-xs text-slate-500 mt-1 font-mono">{r.level}</div>

              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Teaching: <strong className="font-mono text-slate-900">{r.hours} hrs/wk</strong>
                </span>
                <span className="text-slate-600">
                  Target API: <strong className="font-mono text-indigo-700">{r.api} pts</strong>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cadre Statutory Summary Strip */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200/70 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start md:items-center gap-2">
          <span className="font-semibold text-slate-800 whitespace-nowrap">Cadre Norms ({norm.title}):</span>
          <span>{norm.description}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-[11px] text-slate-500">
          <span>Weekly: <strong className="text-slate-700 font-mono">40 hrs</strong></span>
          <span>Direct Teaching: <strong className="text-indigo-700 font-mono">{norm.statutoryDirectTeachingHours} hrs/wk</strong></span>
          <span>Min API Benchmark: <strong className="text-emerald-700 font-mono">{norm.minApiScoreBenchmark} pts</strong></span>
        </div>
      </div>
    </div>
  );
}
