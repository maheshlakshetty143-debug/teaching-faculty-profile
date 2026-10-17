import React, { useState } from 'react';
import { FacultyProfile, JournalPaper, SponsoredProject, ResearchGuidance, Patent } from '../types/faculty';
import { calculateApiScores } from '../utils/apiScoring';
import { RANK_NORMS } from '../data/rankNorms';
import { PrintHeader, PrintSignatures } from './PrintHeaderFooter';
import { Plus, Trash2, Award, BookCheck, Briefcase, GraduationCap, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface AppraisalFormatProps {
  profile: FacultyProfile;
  onChange: (updated: FacultyProfile) => void;
}

export function AppraisalFormat({ profile, onChange }: AppraisalFormatProps) {
  const norm = RANK_NORMS[profile.rank];
  const scores = calculateApiScores(profile);

  // Field updater helpers
  const updateField = <K extends keyof FacultyProfile>(field: K, value: FacultyProfile[K]) => {
    onChange({ ...profile, [field]: value });
  };

  // Publications helper
  const addPublication = () => {
    const newPaper: JournalPaper = {
      id: `p-${Date.now()}`,
      title: 'New Research Paper Title',
      journal: 'International Journal of Advanced Technology',
      indexing: 'Scopus',
      impactFactor: 3.5,
      year: new Date().getFullYear(),
      isFirstOrCorresponding: true,
      score: 25
    };
    updateField('publications', [newPaper, ...profile.publications]);
  };

  const removePublication = (id: string) => {
    updateField('publications', profile.publications.filter(p => p.id !== id));
  };

  // Projects helper
  const addProject = () => {
    const newProj: SponsoredProject = {
      id: `pr-${Date.now()}`,
      title: 'New Sponsored R&D Initiative',
      fundingAgency: 'National Research Foundation',
      grantAmount: 25000,
      currency: 'USD',
      durationMonths: 24,
      role: 'Principal Investigator (PI)',
      status: 'Ongoing',
      score: 15
    };
    updateField('projects', [newProj, ...profile.projects]);
  };

  const removeProject = (id: string) => {
    updateField('projects', profile.projects.filter(p => p.id !== id));
  };

  // Guidance helper
  const addGuidance = () => {
    const newGuide: ResearchGuidance = {
      id: `g-${Date.now()}`,
      studentName: 'Candidate Name',
      degreeType: profile.rank === 'assistant_professor' ? 'Master of Technology / M.S.' : 'Ph.D.',
      thesisTitle: 'Doctoral Investigation on Next-Gen Systems',
      status: 'In Progress',
      year: new Date().getFullYear(),
      role: profile.rank === 'professor' ? 'Sole Supervisor' : 'Principal Guide',
      score: profile.rank === 'assistant_professor' ? 5 : 10
    };
    updateField('guidance', [newGuide, ...profile.guidance]);
  };

  const removeGuidance = (id: string) => {
    updateField('guidance', profile.guidance.filter(g => g.id !== id));
  };

  // Patents helper
  const addPatent = () => {
    const newPatent: Patent = {
      id: `pat-${Date.now()}`,
      title: 'Novel Apparatus and Method for Industrial Automation',
      patentNumber: 'App No. 2026/XXXX',
      jurisdiction: 'National',
      status: 'Published',
      year: new Date().getFullYear(),
      score: 10
    };
    updateField('patents', [newPatent, ...profile.patents]);
  };

  const removePatent = (id: string) => {
    updateField('patents', profile.patents.filter(p => p.id !== id));
  };

  // Institutional Roles helper
  const addInstitutionalRole = () => {
    const newRole = {
      id: `r-${Date.now()}`,
      roleName: 'Departmental Committee Member',
      level: 'Department' as const,
      description: 'Active committee contribution, meetings, and reports.',
      score: 5
    };
    updateField('institutionalRoles', [...profile.institutionalRoles, newRole]);
  };

  const removeInstitutionalRole = (id: string) => {
    updateField('institutionalRoles', profile.institutionalRoles.filter(r => r.id !== id));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      {/* Official Header for Print / Display */}
      <PrintHeader
        profile={profile}
        documentTitle={`ANNUAL FACULTY PERFORMANCE APPRAISAL (PBAS / API)`}
        documentSubtitle={`Self-Assessment Report for Cadre: ${norm.title} (${norm.academicLevel})`}
      />

      {/* Part A: General Information */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Part A: General Information & Academic Profile
          </h3>
          <span className="text-xs text-slate-500 font-mono">Format Ref: PBAS-GEN-2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Full Name with Title</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 font-medium"
              placeholder="e.g. Dr. Jane Smith"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Employee / Faculty ID</label>
            <input
              type="text"
              value={profile.employeeId}
              onChange={(e) => updateField('employeeId', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 font-mono"
              placeholder="e.g. FAC-2081"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Department</label>
            <input
              type="text"
              value={profile.department}
              onChange={(e) => updateField('department', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600"
              placeholder="e.g. Computer Science & Engineering"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">School / Faculty</label>
            <input
              type="text"
              value={profile.schoolOrFaculty}
              onChange={(e) => updateField('schoolOrFaculty', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600"
              placeholder="e.g. School of Engineering"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Academic Cadre Level</label>
            <input
              type="text"
              value={profile.academicLevel}
              onChange={(e) => updateField('academicLevel', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Highest Degree Qualification</label>
            <input
              type="text"
              value={profile.highestDegree}
              onChange={(e) => updateField('highestDegree', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600"
              placeholder="e.g. Ph.D. in Computer Science"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Field of Specialization</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => updateField('specialization', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600"
              placeholder="e.g. Cloud Computing & Distributed Systems"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Teaching Experience (Years)</label>
            <input
              type="number"
              step="0.5"
              value={profile.experienceYearsTeaching}
              onChange={(e) => updateField('experienceYearsTeaching', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Official Institutional Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 font-mono"
              placeholder="faculty@university.edu"
            />
          </div>
        </div>
      </div>

      {/* Part B: Category I - Teaching, Learning and Evaluation */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Category I: Teaching, Learning & Evaluation Activities
            </h3>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            Subtotal: <span className="font-mono text-indigo-700 text-sm">{scores.category1Score}</span> / 80 pts
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 text-xs text-slate-600">
          Statutory benchmark for <strong className="text-slate-900">{norm.title}</strong>: Direct teaching contact norm is <strong className="font-mono text-indigo-800">{norm.statutoryDirectTeachingHours} hours/week</strong>. A minimum 80% class delivery ratio is required for full teaching points.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Classes Scheduled</label>
            <input
              type="number"
              value={profile.classesScheduled}
              onChange={(e) => updateField('classesScheduled', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
            />
            <span className="block text-[10px] text-slate-400 mt-1">Total assigned</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Classes Held</label>
            <input
              type="number"
              value={profile.classesHeld}
              onChange={(e) => updateField('classesHeld', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
            />
            <span className="block text-[10px] text-emerald-600 mt-1 font-mono font-medium">
              Ratio: {profile.classesScheduled > 0 ? Math.round((profile.classesHeld / profile.classesScheduled) * 100) : 0}%
            </span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Student Feedback</label>
            <input
              type="number"
              step="0.05"
              max="5.0"
              min="0"
              value={profile.studentFeedbackRating}
              onChange={(e) => updateField('studentFeedbackRating', parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
            />
            <span className="block text-[10px] text-slate-400 mt-1">Out of 5.0 scale</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Syllabus Covered</label>
            <div className="flex items-center">
              <input
                type="number"
                max="100"
                min="0"
                value={profile.syllabusCoveragePercent}
                onChange={(e) => updateField('syllabusCoveragePercent', parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
              />
              <span className="ml-1 text-slate-500">%</span>
            </div>
            <span className="block text-[10px] text-slate-400 mt-1">Institutional target: 100%</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Average Pass %</label>
            <div className="flex items-center">
              <input
                type="number"
                step="0.1"
                max="100"
                min="0"
                value={profile.averagePassPercent}
                onChange={(e) => updateField('averagePassPercent', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
              />
              <span className="ml-1 text-slate-500">%</span>
            </div>
            <span className="block text-[10px] text-slate-400 mt-1">End-semester results</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-medium mb-1">Exam Duties</label>
            <input
              type="number"
              value={profile.examDutiesCount}
              onChange={(e) => updateField('examDutiesCount', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-center font-mono font-semibold text-slate-900"
            />
            <span className="block text-[10px] text-slate-400 mt-1">Invigilation / Eval sessions</span>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>Teaching Score Breakdown:</span>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Lecture Adherence: <strong className="text-slate-900">{scores.category1Details.lectureAttendanceScore}/40</strong></span>
            <span>Feedback: <strong className="text-slate-900">{scores.category1Details.feedbackScore}/20</strong></span>
            <span>Syllabus: <strong className="text-slate-900">{scores.category1Details.syllabusScore}/10</strong></span>
            <span>Exams: <strong className="text-slate-900">{scores.category1Details.examScore}/10</strong></span>
          </div>
        </div>
      </div>

      {/* Part C: Category II - Institutional Governance & Student Development */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Category II: Institutional, Co-Curricular & Student Development
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-700">
              Subtotal: <span className="font-mono text-indigo-700 text-sm">{scores.category2Score}</span> pts
            </div>
            <button
              onClick={addInstitutionalRole}
              className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Responsibility
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg mb-3">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Administrative / Co-Curricular Role</th>
                <th className="py-2.5 px-3">Jurisdiction Level</th>
                <th className="py-2.5 px-3">Key Responsibilities / Impact</th>
                <th className="py-2.5 px-3 text-right">API Score</th>
                <th className="py-2.5 px-2 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {profile.institutionalRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={role.roleName}
                      onChange={(e) => {
                        const updated = profile.institutionalRoles.map(r => r.id === role.id ? { ...r, roleName: e.target.value } : r);
                        updateField('institutionalRoles', updated);
                      }}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={role.level}
                      onChange={(e) => {
                        const updated = profile.institutionalRoles.map(r => r.id === role.id ? { ...r, level: e.target.value as any } : r);
                        updateField('institutionalRoles', updated);
                      }}
                      className="px-2 py-1 border border-slate-300 rounded bg-white"
                    >
                      <option value="Department">Department</option>
                      <option value="Institutional / College">Institutional / College</option>
                      <option value="University / State">University / State</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={role.description}
                      onChange={(e) => {
                        const updated = profile.institutionalRoles.map(r => r.id === role.id ? { ...r, description: e.target.value } : r);
                        updateField('institutionalRoles', updated);
                      }}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-slate-600"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={role.score}
                      onChange={(e) => {
                        const updated = profile.institutionalRoles.map(r => r.id === role.id ? { ...r, score: parseInt(e.target.value) || 0 } : r);
                        updateField('institutionalRoles', updated);
                      }}
                      className="w-16 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold text-slate-900"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center no-print">
                    <button
                      onClick={() => removeInstitutionalRole(role.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {profile.institutionalRoles.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-400 italic">
                    No administrative or institutional governance roles added yet. Click "+ Add Responsibility" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-medium">Student Mentorship & Proctoring:</span>
            <input
              type="number"
              value={profile.mentoringStudentsCount}
              onChange={(e) => updateField('mentoringStudentsCount', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-slate-300 rounded font-mono font-semibold text-center"
            />
            <span className="text-slate-500">assigned mentees across academic batches</span>
          </div>
          <span className="text-slate-600">
            Mentorship API Credit: <strong className="font-mono text-slate-900">{Math.min(10, Math.ceil(profile.mentoringStudentsCount / 3))} pts</strong>
          </span>
        </div>
      </div>

      {/* Part D: Category III - Research, Publications & Academic Contributions */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Category III: Research, Publications & Academic Contributions
            </h3>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            Subtotal: <span className="font-mono text-indigo-700 text-sm">{scores.category3Score}</span> pts
          </div>
        </div>

        {/* III.A Research Publications */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              III.A Research Papers in Peer-Reviewed / Indexed Journals
            </h4>
            <button
              onClick={addPublication}
              className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Journal Paper
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Title of Research Paper</th>
                  <th className="py-2.5 px-3">Journal Name</th>
                  <th className="py-2.5 px-3">Indexing</th>
                  <th className="py-2.5 px-3 text-center">Impact Factor</th>
                  <th className="py-2.5 px-3 text-center">Year</th>
                  <th className="py-2.5 px-3 text-center">First / Corr. Author</th>
                  <th className="py-2.5 px-3 text-right">API Points</th>
                  <th className="py-2.5 px-2 text-center no-print">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {profile.publications.map((paper) => (
                  <tr key={paper.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 min-w-[240px]">
                      <input
                        type="text"
                        value={paper.title}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, title: e.target.value } : p);
                          updateField('publications', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={paper.journal}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, journal: e.target.value } : p);
                          updateField('publications', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-slate-700"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={paper.indexing}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, indexing: e.target.value as any } : p);
                          updateField('publications', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white text-xs"
                      >
                        <option value="Scopus">Scopus</option>
                        <option value="Web of Science">Web of Science</option>
                        <option value="UGC-CARE">UGC-CARE</option>
                        <option value="Peer-Reviewed">Peer-Reviewed</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        value={paper.impactFactor}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, impactFactor: parseFloat(e.target.value) || 0 } : p);
                          updateField('publications', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <input
                        type="number"
                        value={paper.year}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, year: parseInt(e.target.value) || 0 } : p);
                          updateField('publications', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={paper.isFirstOrCorresponding}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, isFirstOrCorresponding: e.target.checked } : p);
                          updateField('publications', updated);
                        }}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={paper.score}
                        onChange={(e) => {
                          const updated = profile.publications.map(p => p.id === paper.id ? { ...p, score: parseInt(e.target.value) || 0 } : p);
                          updateField('publications', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center no-print">
                      <button
                        onClick={() => removePublication(paper.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove paper"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {profile.publications.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-4 text-center text-slate-400 italic">
                      No journal publications recorded. Click "+ Add Journal Paper" above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* III.B Sponsored Projects & Grants */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              III.B Sponsored Research Projects & Industrial Consultancy
            </h4>
            <button
              onClick={addProject}
              className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Project Grant
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Project Title</th>
                  <th className="py-2.5 px-3">Sponsoring Agency</th>
                  <th className="py-2.5 px-3 text-right">Sanctioned Amount</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">API Points</th>
                  <th className="py-2.5 px-2 text-center no-print">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {profile.projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = profile.projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p);
                          updateField('projects', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={proj.fundingAgency}
                        onChange={(e) => {
                          const updated = profile.projects.map(p => p.id === proj.id ? { ...p, fundingAgency: e.target.value } : p);
                          updateField('projects', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-slate-700"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-slate-400 font-mono text-[11px]">{proj.currency}</span>
                        <input
                          type="number"
                          value={proj.grantAmount}
                          onChange={(e) => {
                            const updated = profile.projects.map(p => p.id === proj.id ? { ...p, grantAmount: parseFloat(e.target.value) || 0 } : p);
                            updateField('projects', updated);
                          }}
                          className="w-24 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={proj.role}
                        onChange={(e) => {
                          const updated = profile.projects.map(p => p.id === proj.id ? { ...p, role: e.target.value as any } : p);
                          updateField('projects', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white"
                      >
                        <option value="Principal Investigator (PI)">PI</option>
                        <option value="Co-Principal Investigator (Co-PI)">Co-PI</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-700">{proj.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={proj.score}
                        onChange={(e) => {
                          const updated = profile.projects.map(p => p.id === proj.id ? { ...p, score: parseInt(e.target.value) || 0 } : p);
                          updateField('projects', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center no-print">
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {profile.projects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-slate-400 italic">
                      No sponsored projects recorded. Click "+ Add Project Grant" above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* III.C Doctoral & Post-Graduate Research Guidance */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              III.C Research Guidance (Ph.D. & Master's Dissertations)
            </h4>
            <button
              onClick={addGuidance}
              className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Research Scholar
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Student / Scholar Name</th>
                  <th className="py-2.5 px-3">Degree Program</th>
                  <th className="py-2.5 px-3">Thesis / Dissertation Title</th>
                  <th className="py-2.5 px-3">Supervision Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">API Points</th>
                  <th className="py-2.5 px-2 text-center no-print">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {profile.guidance.map((guide) => (
                  <tr key={guide.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={guide.studentName}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, studentName: e.target.value } : g);
                          updateField('guidance', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={guide.degreeType}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, degreeType: e.target.value as any } : g);
                          updateField('guidance', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white"
                      >
                        <option value="Ph.D.">Ph.D.</option>
                        <option value="Master of Technology / M.S.">Master of Technology / M.S.</option>
                        <option value="Undergraduate Honors">Undergraduate Honors</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={guide.thesisTitle}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, thesisTitle: e.target.value } : g);
                          updateField('guidance', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-slate-700"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={guide.role}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, role: e.target.value as any } : g);
                          updateField('guidance', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white"
                      >
                        <option value="Sole Supervisor">Sole Supervisor</option>
                        <option value="Principal Guide">Principal Guide</option>
                        <option value="Co-Guide">Co-Guide</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={guide.status}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, status: e.target.value as any } : g);
                          updateField('guidance', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white font-medium"
                      >
                        <option value="Degree Awarded">Degree Awarded</option>
                        <option value="Thesis Submitted">Thesis Submitted</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={guide.score}
                        onChange={(e) => {
                          const updated = profile.guidance.map(g => g.id === guide.id ? { ...g, score: parseInt(e.target.value) || 0 } : g);
                          updateField('guidance', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center no-print">
                      <button
                        onClick={() => removeGuidance(guide.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {profile.guidance.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-slate-400 italic">
                      No research guidance scholars recorded. Click "+ Add Research Scholar" above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* III.D Patents & Intellectual Property */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              III.D Patents, Technology Transfer & Intellectual Property
            </h4>
            <button
              onClick={addPatent}
              className="no-print px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Patent Entry
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Patent Title</th>
                  <th className="py-2.5 px-3">Patent / Application No.</th>
                  <th className="py-2.5 px-3">Jurisdiction</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-center">Year</th>
                  <th className="py-2.5 px-3 text-right">API Points</th>
                  <th className="py-2.5 px-2 text-center no-print">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {profile.patents.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={pat.title}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, title: e.target.value } : p);
                          updateField('patents', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={pat.patentNumber}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, patentNumber: e.target.value } : p);
                          updateField('patents', updated);
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-slate-700"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={pat.jurisdiction}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, jurisdiction: e.target.value as any } : p);
                          updateField('patents', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white"
                      >
                        <option value="National">National</option>
                        <option value="International (USPTO/PCT/EPO)">International (USPTO/PCT/EPO)</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={pat.status}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, status: e.target.value as any } : p);
                          updateField('patents', updated);
                        }}
                        className="px-2 py-1 border border-slate-300 rounded bg-white font-medium"
                      >
                        <option value="Granted">Granted</option>
                        <option value="Published">Published</option>
                        <option value="Filed">Filed</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <input
                        type="number"
                        value={pat.year}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, year: parseInt(e.target.value) || 0 } : p);
                          updateField('patents', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={pat.score}
                        onChange={(e) => {
                          const updated = profile.patents.map(p => p.id === pat.id ? { ...p, score: parseInt(e.target.value) || 0 } : p);
                          updateField('patents', updated);
                        }}
                        className="w-16 px-1.5 py-1 border border-slate-300 rounded text-right font-mono font-semibold text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center no-print">
                      <button
                        onClick={() => removePatent(pat.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {profile.patents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-slate-400 italic">
                      No patents registered. Click "+ Add Patent Entry" above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Part E: Cumulative API Score Tally & Audit Verification */}
      <div className="mb-8 border border-slate-300 rounded-xl p-5 bg-slate-50 page-break-inside-avoid">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Part E: Final API / PBAS Score Tally & Statutory Verification
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative score computed conforming to UGC / Institutional Career Advancement Statutes.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">Statutory Cadre Benchmark:</span>
            <span className="block text-sm font-bold font-mono text-slate-900">{norm.minApiScoreBenchmark} pts minimum</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-5">
          <div className="bg-white p-3.5 border border-slate-200 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Category I: Teaching</span>
            <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">{scores.category1Score}</div>
            <span className="text-[11px] text-slate-400">Target: ~80 pts</span>
          </div>

          <div className="bg-white p-3.5 border border-slate-200 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Category II: Governance</span>
            <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">{scores.category2Score}</div>
            <span className="text-[11px] text-slate-400">Institutional / Mentor</span>
          </div>

          <div className="bg-white p-3.5 border border-slate-200 rounded-lg shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Category III: Research</span>
            <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">{scores.category3Score}</div>
            <span className="text-[11px] text-slate-400">Pubs, Grants, PhD</span>
          </div>

          <div className={`p-3.5 border rounded-lg shadow-xs ${
            scores.isEligible ? 'bg-emerald-50/70 border-emerald-300' : 'bg-amber-50/70 border-amber-300'
          }`}>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">Total API Score</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{scores.totalScore}</div>
            <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold">
              {scores.isEligible ? (
                <span className="text-emerald-700 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Met ({scores.scorePercentageOfBenchmark}%)
                </span>
              ) : (
                <span className="text-amber-700 inline-flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Gap: {norm.minApiScoreBenchmark - scores.totalScore} pts
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Evaluator Remarks & Assessment */}
        <div className="space-y-4 text-xs pt-4 border-t border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-800">Departmental Evaluation Cell / HOD Remarks</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Cadre Recommendation:</span>
                <select
                  value={profile.hodRecommendation}
                  onChange={(e) => updateField('hodRecommendation', e.target.value as any)}
                  className="px-2 py-1 border border-slate-300 rounded bg-white font-medium text-slate-900"
                >
                  <option value="Recommended for Increment / Promotion">Recommended for Increment / Promotion</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
            </div>
            <textarea
              rows={2}
              value={profile.hodRemarks}
              onChange={(e) => updateField('hodRemarks', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 text-slate-800 leading-relaxed"
              placeholder="Enter comprehensive appraisal review by Head of Department..."
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Dean of Academic Affairs / Institutional Screening Endorsement</label>
            <input
              type="text"
              value={profile.deanRemarks}
              onChange={(e) => updateField('deanRemarks', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-indigo-600 text-slate-800"
              placeholder="e.g. Scrutinized and verified against official CAS criteria. Forwarded for Executive Council approval."
            />
          </div>
        </div>
      </div>

      {/* Official Signatures Block */}
      <PrintSignatures profile={profile} />
    </div>
  );
}
