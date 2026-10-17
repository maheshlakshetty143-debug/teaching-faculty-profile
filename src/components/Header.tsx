import { Printer, Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onPrint: () => void;
  onOpenExport: () => void;
}

export function Header({ activeTab, onTabChange, onPrint, onOpenExport }: HeaderProps) {
  const navItems = [
    { id: 'appraisal', label: 'Annual Appraisal (PBAS)' },
    { id: 'workload', label: 'Teaching Workload Plan' },
    { id: 'lesson-plan', label: 'Course Dossier' },
    { id: 'promotion', label: 'CAS Promotion Matrix' },
    { id: 'biodata', label: 'Faculty Bio-Data (CV)' },
    { id: 'norms', label: 'Comparative Norms' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onTabChange('appraisal'); }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
            >
              FacultyFormat Pro
            </a>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">| Academic Formats</span>
          </div>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  activeTab === item.id
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Export JSON profile or copy formatted markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Data Tools</span>
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF Document</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex overflow-x-auto py-2 gap-4 text-xs font-medium text-slate-600 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`whitespace-nowrap shrink-0 py-1 px-1.5 ${
                activeTab === item.id
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
