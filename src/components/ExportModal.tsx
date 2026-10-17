import React, { useState } from 'react';
import { FacultyProfile } from '../types/faculty';
import { X, Copy, Check, Download, Upload, FileText, Printer } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FacultyProfile;
  onImport: (profile: FacultyProfile) => void;
  onPrint: () => void;
}

export function ExportModal({ isOpen, onClose, profile, onImport, onPrint }: ExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'markdown'>('export');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(profile, null, 2);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faculty_dossier_${profile.rank}_${profile.employeeId || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.rank || !parsed.fullName) {
        throw new Error('Invalid dossier JSON format. Must contain at least rank and fullName fields.');
      }
      onImport(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Failed to parse JSON.');
    }
  };

  // Generate clean academic summary markdown
  const generateMarkdownSummary = () => {
    return `# OFFICIAL FACULTY DOSSIER SUMMARY
**Faculty Member:** ${profile.academicTitle} ${profile.fullName}
**Designation:** ${profile.rank.replace('_', ' ').toUpperCase()} (${profile.academicLevel})
**Employee ID:** ${profile.employeeId}
**Department:** ${profile.department}
**Institution:** ${profile.institutionName}
**Contact:** ${profile.email} | ${profile.phone}

---

## 1. TEACHING ALLOCATION & WORKLOAD
- Direct Teaching Contact Hours: ${profile.courses.reduce((sum, c) => sum + c.lectureHours + c.tutorialHours + c.practicalHours, 0)} hrs/week
- Total Statutory Commitment: 40 hours/week
- Courses Allocated:
${profile.courses.map(c => `  - [${c.code}] ${c.title} (${c.program}) - ${c.lectureHours + c.tutorialHours + c.practicalHours} hrs/wk (${c.credits} Credits)`).join('\n')}

---

## 2. RESEARCH & SCHOLARSHIP
- Journal Publications: ${profile.publications.length} Papers
${profile.publications.map(p => `  - "${p.title}" - ${p.journal} (${p.year}) [${p.indexing}, IF: ${p.impactFactor}]`).join('\n')}
- Sponsored Projects: ${profile.projects.length} Grants
${profile.projects.map(pr => `  - "${pr.title}" funded by ${pr.fundingAgency} ($${pr.grantAmount.toLocaleString()}) - ${pr.role}`).join('\n')}
- Doctoral Guidance: ${profile.guidance.length} Scholars
${profile.guidance.map(g => `  - ${g.studentName} (${g.degreeType}): "${g.thesisTitle}" - Status: ${g.status}`).join('\n')}
- Patents: ${profile.patents.length}
${profile.patents.map(pat => `  - "${pat.title}" [${pat.patentNumber}] - ${pat.status}`).join('\n')}

---

## 3. APPRAISAL VERDICT
- Classes Held Ratio: ${profile.classesHeld} / ${profile.classesScheduled} (${profile.classesScheduled > 0 ? Math.round((profile.classesHeld / profile.classesScheduled) * 100) : 0}%)
- Student Feedback Rating: ${profile.studentFeedbackRating} / 5.0
- Syllabus Coverage: ${profile.syllabusCoveragePercent}%
- HOD Recommendation: ${profile.hodRecommendation}
`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Faculty Dossier Data Tools</h3>
            <p className="text-xs text-slate-500">Export JSON backups, import saved profiles, or copy formatted summary.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-100 bg-slate-50">
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors ${
              activeTab === 'export'
                ? 'bg-white text-indigo-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Export JSON
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors ${
              activeTab === 'markdown'
                ? 'bg-white text-indigo-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Text / Markdown Dossier
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors ${
              activeTab === 'import'
                ? 'bg-white text-indigo-700 border-t border-x border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Import JSON
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 overflow-y-auto text-xs">
          {activeTab === 'export' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600">Complete faculty data structured as JSON:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(jsonString)}
                    className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 font-medium inline-flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={downloadJson}
                    className="px-2.5 py-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded font-medium inline-flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto max-h-72">
                {jsonString}
              </pre>
            </div>
          )}

          {activeTab === 'markdown' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600">Formatted text dossier report:</span>
                <button
                  onClick={() => copyToClipboard(generateMarkdownSummary())}
                  className="px-2.5 py-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded font-medium inline-flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Markdown' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] whitespace-pre-wrap max-h-72 text-slate-800">
                {generateMarkdownSummary()}
              </pre>
            </div>
          )}

          {activeTab === 'import' && (
            <div>
              <p className="text-slate-600 mb-2">
                Paste valid faculty JSON content below to restore a previously saved faculty dossier:
              </p>
              <textarea
                rows={8}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"rank": "professor", "fullName": "Dr. ...", ...}'
                className="w-full p-2.5 font-mono text-[11px] border border-slate-300 rounded-lg focus:outline-indigo-600"
              />
              {importError && (
                <p className="text-red-600 text-xs mt-2 font-medium">Error: {importError}</p>
              )}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleImport}
                  className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore Dossier Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-3 border-t border-slate-200 bg-slate-50 text-xs">
          <button
            onClick={() => { onClose(); onPrint(); }}
            className="px-3 py-1.5 text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-medium inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Direct Print / PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
