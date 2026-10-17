import React from 'react';
import { FacultyProfile, LessonPlanEntry } from '../types/faculty';
import { PrintHeader, PrintSignatures } from './PrintHeaderFooter';
import { Plus, Trash2, BookOpen, Layers, CheckCircle2, TrendingUp } from 'lucide-react';

interface LessonPlanFormatProps {
  profile: FacultyProfile;
  onChange: (updated: FacultyProfile) => void;
}

export function LessonPlanFormat({ profile, onChange }: LessonPlanFormatProps) {
  const updateProfile = (partial: Partial<FacultyProfile>) => {
    onChange({ ...profile, ...partial });
  };

  const addLecture = () => {
    const nextNum = profile.lessonPlanEntries.length + 1;
    const newEntry: LessonPlanEntry = {
      id: `lp-${Date.now()}`,
      lectureNumber: nextNum,
      plannedDate: new Date().toISOString().split('T')[0],
      actualDate: new Date().toISOString().split('T')[0],
      topic: 'Topic name and core concepts covered',
      coMapped: 'CO1',
      bloomsLevel: 'Apply',
      pedagogyMethod: 'Interactive Board & Discussion',
      contactHours: 1,
      attendancePercent: 90,
      assessmentTool: 'In-class Check'
    };
    updateProfile({ lessonPlanEntries: [...profile.lessonPlanEntries, newEntry] });
  };

  const removeLecture = (id: string) => {
    const filtered = profile.lessonPlanEntries.filter(e => e.id !== id);
    // re-number
    const renumbered = filtered.map((e, idx) => ({ ...e, lectureNumber: idx + 1 }));
    updateProfile({ lessonPlanEntries: renumbered });
  };

  const updateLecture = (id: string, partial: Partial<LessonPlanEntry>) => {
    const updated = profile.lessonPlanEntries.map(e => e.id === id ? { ...e, ...partial } : e);
    updateProfile({ lessonPlanEntries: updated });
  };

  const addCourseOutcome = () => {
    const nextCode = `CO${profile.courseOutcomes.length + 1}`;
    const newCo = {
      code: nextCode,
      description: 'Define course outcome statement articulating measurable learner competency.',
      bloomsLevel: 'Apply',
      targetAttainmentPercent: 75
    };
    updateProfile({ courseOutcomes: [...profile.courseOutcomes, newCo] });
  };

  const removeCourseOutcome = (code: string) => {
    updateProfile({ courseOutcomes: profile.courseOutcomes.filter(c => c.code !== code) });
  };

  const updateCourseOutcome = (code: string, field: 'description' | 'bloomsLevel' | 'targetAttainmentPercent', val: any) => {
    const updated = profile.courseOutcomes.map(c => c.code === code ? { ...c, [field]: val } : c);
    updateProfile({ courseOutcomes: updated });
  };

  // Metrics
  const totalConducted = profile.lessonPlanEntries.length;
  const avgAttendance = totalConducted > 0 
    ? Math.round(profile.lessonPlanEntries.reduce((sum, e) => sum + (e.attendancePercent || 0), 0) / totalConducted)
    : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      {/* Official Header */}
      <PrintHeader
        profile={profile}
        documentTitle={`COURSE DOSSIER & LESSON DELIVERY PLAN`}
        documentSubtitle={`Outcome-Based Education (OBE) Syllabus Execution & Lecture Log Form`}
      />

      {/* Course Particulars */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            Course Metadata & Curriculum Attributes
          </h3>
          <span className="font-mono text-slate-500">OBE Attainment Dossier</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Course Title</label>
            <input
              type="text"
              value={profile.activeCourseName}
              onChange={(e) => updateProfile({ activeCourseName: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-semibold text-slate-900"
              placeholder="e.g. Design and Analysis of Algorithms"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Course Code</label>
            <input
              type="text"
              value={profile.activeCourseCode}
              onChange={(e) => updateProfile({ activeCourseCode: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono font-bold text-slate-900"
              placeholder="e.g. CS-301"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Semester & Academic Year</label>
            <input
              type="text"
              value={profile.courseSemester}
              onChange={(e) => updateProfile({ courseSemester: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
              placeholder="e.g. Semester V (2025-2026)"
            />
          </div>
        </div>

        {/* Analytics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-200">
          <div>
            <span className="text-slate-500">Lectures Logged:</span>
            <span className="ml-1.5 font-bold font-mono text-slate-900">{totalConducted} Sessions</span>
          </div>
          <div>
            <span className="text-slate-500">Average Attendance:</span>
            <span className="ml-1.5 font-bold font-mono text-indigo-700">{avgAttendance}%</span>
          </div>
          <div>
            <span className="text-slate-500">Active COs:</span>
            <span className="ml-1.5 font-bold font-mono text-slate-900">{profile.courseOutcomes.length} Outcomes</span>
          </div>
          <div>
            <span className="text-slate-500">Execution Status:</span>
            <span className="ml-1.5 font-bold text-emerald-700">On Schedule</span>
          </div>
        </div>
      </div>

      {/* Section 1: Course Outcomes (COs) */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Course Outcomes (COs) & Bloom's Taxonomy Mapping
            </h3>
          </div>
          <button
            onClick={addCourseOutcome}
            className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Outcome
          </button>
        </div>

        <div className="space-y-2">
          {profile.courseOutcomes.map((co) => (
            <div key={co.code} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="font-mono font-bold text-indigo-700 w-12 shrink-0">{co.code}</span>
              <input
                type="text"
                value={co.description}
                onChange={(e) => updateCourseOutcome(co.code, 'description', e.target.value)}
                className="flex-1 px-2 py-1 border border-slate-300 rounded bg-white text-slate-900"
                placeholder="Measurable action statement of learner capability..."
              />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-500">Bloom:</span>
                <select
                  value={co.bloomsLevel}
                  onChange={(e) => updateCourseOutcome(co.code, 'bloomsLevel', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="Remember">Remember (L1)</option>
                  <option value="Understand">Understand (L2)</option>
                  <option value="Apply">Apply (L3)</option>
                  <option value="Analyze">Analyze (L4)</option>
                  <option value="Evaluate">Evaluate (L5)</option>
                  <option value="Create">Create (L6)</option>
                </select>

                <span className="text-slate-500">Target:</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={co.targetAttainmentPercent}
                    onChange={(e) => updateCourseOutcome(co.code, 'targetAttainmentPercent', parseInt(e.target.value) || 0)}
                    className="w-14 px-1 py-1 border border-slate-300 rounded text-center font-mono font-bold"
                  />
                  <span className="ml-1 text-slate-400">%</span>
                </div>

                <button
                  onClick={() => removeCourseOutcome(co.code)}
                  className="text-slate-400 hover:text-red-600 p-1 no-print"
                  title="Remove CO"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Lecture Execution Log Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Lecture-by-Lecture Syllabus Execution Record
            </h3>
          </div>
          <button
            onClick={addLecture}
            className="no-print px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Log Lecture Session
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-2 text-center">Lec #</th>
                <th className="py-2.5 px-2">Planned Date</th>
                <th className="py-2.5 px-2">Actual Date</th>
                <th className="py-2.5 px-3">Topic & Concepts Covered</th>
                <th className="py-2.5 px-2 text-center">CO</th>
                <th className="py-2.5 px-2 text-center">Bloom</th>
                <th className="py-2.5 px-3">Pedagogy / ICT Tool</th>
                <th className="py-2.5 px-2 text-center">Attendance</th>
                <th className="py-2.5 px-2">Assessment</th>
                <th className="py-2.5 px-2 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {profile.lessonPlanEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900">
                    {entry.lectureNumber}
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="date"
                      value={entry.plannedDate}
                      onChange={(e) => updateLecture(entry.id, { plannedDate: e.target.value })}
                      className="px-1 py-0.5 border border-slate-300 rounded font-mono text-[11px]"
                    />
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="date"
                      value={entry.actualDate}
                      onChange={(e) => updateLecture(entry.id, { actualDate: e.target.value })}
                      className="px-1 py-0.5 border border-slate-300 rounded font-mono text-[11px]"
                    />
                  </td>
                  <td className="py-2.5 px-3 min-w-[220px]">
                    <input
                      type="text"
                      value={entry.topic}
                      onChange={(e) => updateLecture(entry.id, { topic: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <select
                      value={entry.coMapped}
                      onChange={(e) => updateLecture(entry.id, { coMapped: e.target.value })}
                      className="px-1 py-0.5 border border-slate-300 rounded bg-white font-mono text-[11px]"
                    >
                      {profile.courseOutcomes.map((co) => (
                        <option key={co.code} value={co.code}>{co.code}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <select
                      value={entry.bloomsLevel}
                      onChange={(e) => updateLecture(entry.id, { bloomsLevel: e.target.value as any })}
                      className="px-1 py-0.5 border border-slate-300 rounded bg-white text-[11px]"
                    >
                      <option value="Remember">Remember</option>
                      <option value="Understand">Understand</option>
                      <option value="Apply">Apply</option>
                      <option value="Analyze">Analyze</option>
                      <option value="Evaluate">Evaluate</option>
                      <option value="Create">Create</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={entry.pedagogyMethod}
                      onChange={(e) => updateLecture(entry.id, { pedagogyMethod: e.target.value })}
                      className="w-full px-1.5 py-1 border border-slate-300 rounded text-slate-700 text-[11px]"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={entry.attendancePercent}
                        onChange={(e) => updateLecture(entry.id, { attendancePercent: parseInt(e.target.value) || 0 })}
                        className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center font-mono font-semibold"
                      />
                      <span className="ml-0.5 text-slate-400">%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <input
                      type="text"
                      value={entry.assessmentTool}
                      onChange={(e) => updateLecture(entry.id, { assessmentTool: e.target.value })}
                      className="w-24 px-1.5 py-0.5 border border-slate-300 rounded text-slate-600 text-[11px]"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center no-print">
                    <button
                      onClick={() => removeLecture(entry.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Remove lecture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {profile.lessonPlanEntries.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-4 text-center text-slate-400 italic">
                    No lectures recorded yet. Click "+ Log Lecture Session" above to add course deliveries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Signatures Block */}
      <PrintSignatures profile={profile} />
    </div>
  );
}
