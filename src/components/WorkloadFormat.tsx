import React from 'react';
import { FacultyProfile, CourseAllocation } from '../types/faculty';
import { calculateTotalDirectTeachingHours } from '../utils/apiScoring';
import { RANK_NORMS } from '../data/rankNorms';
import { PrintHeader, PrintSignatures } from './PrintHeaderFooter';
import { Plus, Trash2, Clock, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface WorkloadFormatProps {
  profile: FacultyProfile;
  onChange: (updated: FacultyProfile) => void;
}

export function WorkloadFormat({ profile, onChange }: WorkloadFormatProps) {
  const norm = RANK_NORMS[profile.rank];
  const directHours = calculateTotalDirectTeachingHours(profile);
  const targetDirectHours = norm.statutoryDirectTeachingHours;
  const directDelta = directHours - targetDirectHours;

  const updateProfile = (partial: Partial<FacultyProfile>) => {
    onChange({ ...profile, ...partial });
  };

  const addCourse = () => {
    const newCourse: CourseAllocation = {
      id: `c-${Date.now()}`,
      code: 'NEW-101',
      title: 'Course Title Here',
      program: profile.rank === 'professor' ? 'PG' : 'UG',
      semester: 'Current Semester',
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      credits: 3,
      classBatch: 'Batch 1',
      studentsEnrolled: 45,
      roomVenue: 'Room TBA'
    };
    updateProfile({ courses: [...profile.courses, newCourse] });
  };

  const removeCourse = (id: string) => {
    updateProfile({ courses: profile.courses.filter(c => c.id !== id) });
  };

  const updateCourse = (id: string, partial: Partial<CourseAllocation>) => {
    const updated = profile.courses.map(c => c.id === id ? { ...c, ...partial } : c);
    updateProfile({ courses: updated });
  };

  const updateWorkloadDist = (field: keyof typeof profile.workloadDistribution, val: number) => {
    const updated = {
      ...profile.workloadDistribution,
      [field]: val
    };
    updateProfile({ workloadDistribution: updated });
  };

  // Compute 40-hr distribution total
  const dist = profile.workloadDistribution;
  const computedTotalHours = directHours + dist.studentMentoringHours + dist.researchAndScholarshipHours + dist.administrativeGovernanceHours + dist.prepAndEvaluationHours;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      {/* Official Institutional Header */}
      <PrintHeader
        profile={profile}
        documentTitle={`OFFICIAL TEACHING WORKLOAD & COURSE ALLOTMENT DOSSIER`}
        documentSubtitle={`Weekly Contact Hours Norm Conforming to Higher Education & Accreditation Guidelines`}
      />

      {/* Cadre Statutory Requirement Banner */}
      <div className="mb-6 p-4 rounded-xl border bg-slate-50 border-slate-200 text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{norm.title} Workload Standard</span>
              <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Statutory Contact Norm: {norm.statutoryDirectTeachingHours} Hours/Week
              </span>
            </div>
            <p className="text-slate-600 mt-1">
              Direct classroom/lab teaching contact norm is <strong className="text-slate-900">{norm.statutoryDirectTeachingHours} hours</strong> for {norm.title} cadre, within the mandatory 40-hour institutional commitment.
            </p>
          </div>

          {/* Compliance Status Gauge */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {directDelta === 0 ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Exact Statutory Match: {directHours} hrs</span>
              </div>
            ) : directDelta > 0 ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-800 border border-indigo-300 rounded-lg font-semibold">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
                <span>Over-Allocated (+{directDelta} hrs): {directHours} hrs</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Under-Allocated ({directDelta} hrs): {directHours} / {targetDirectHours} hrs</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Allotment Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Section 1: Course Allotment & Contact Hours Breakdown (L-T-P)
            </h3>
            <p className="text-xs text-slate-500">
              L = Lecture contact hour/week (1 credit); T = Tutorial hour/week (1 credit); P = Practical/Lab contact hours (2 hrs = 1 credit).
            </p>
          </div>
          <button
            onClick={addCourse}
            className="no-print px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Allot Course
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Course Code</th>
                <th className="py-2.5 px-3">Course Title</th>
                <th className="py-2.5 px-3">Level</th>
                <th className="py-2.5 px-2 text-center" title="Lecture Hours / Week">L</th>
                <th className="py-2.5 px-2 text-center" title="Tutorial Hours / Week">T</th>
                <th className="py-2.5 px-2 text-center" title="Practical / Lab Hours / Week">P</th>
                <th className="py-2.5 px-2 text-center">Credits</th>
                <th className="py-2.5 px-3">Class Batch</th>
                <th className="py-2.5 px-2 text-center">Students</th>
                <th className="py-2.5 px-3">Venue</th>
                <th className="py-2.5 px-2 text-right">Contact Hrs</th>
                <th className="py-2.5 px-2 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {profile.courses.map((course) => {
                const totalContact = (course.lectureHours || 0) + (course.tutorialHours || 0) + (course.practicalHours || 0);
                return (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) => updateCourse(course.id, { code: e.target.value })}
                        className="w-20 px-1.5 py-1 border border-slate-300 rounded font-mono font-bold text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3 min-w-[200px]">
                      <input
                        type="text"
                        value={course.title}
                        onChange={(e) => updateCourse(course.id, { title: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-medium text-slate-900"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={course.program}
                        onChange={(e) => updateCourse(course.id, { program: e.target.value as any })}
                        className="px-2 py-1 border border-slate-300 rounded bg-white"
                      >
                        <option value="UG">UG</option>
                        <option value="PG">PG</option>
                        <option value="Ph.D.">Ph.D.</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={course.lectureHours}
                        onChange={(e) => updateCourse(course.id, { lectureHours: parseInt(e.target.value) || 0 })}
                        className="w-12 px-1 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={course.tutorialHours}
                        onChange={(e) => updateCourse(course.id, { tutorialHours: parseInt(e.target.value) || 0 })}
                        className="w-12 px-1 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={course.practicalHours}
                        onChange={(e) => updateCourse(course.id, { practicalHours: parseInt(e.target.value) || 0 })}
                        className="w-12 px-1 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, { credits: parseInt(e.target.value) || 0 })}
                        className="w-12 px-1 py-1 border border-slate-300 rounded text-center font-mono font-semibold"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={course.classBatch}
                        onChange={(e) => updateCourse(course.id, { classBatch: e.target.value })}
                        className="w-32 px-1.5 py-1 border border-slate-300 rounded text-slate-700"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={course.studentsEnrolled}
                        onChange={(e) => updateCourse(course.id, { studentsEnrolled: parseInt(e.target.value) || 0 })}
                        className="w-14 px-1 py-1 border border-slate-300 rounded text-center font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={course.roomVenue}
                        onChange={(e) => updateCourse(course.id, { roomVenue: e.target.value })}
                        className="w-28 px-1.5 py-1 border border-slate-300 rounded text-slate-600 font-mono text-[11px]"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900">
                      {totalContact} hrs
                    </td>
                    <td className="py-2.5 px-2 text-center no-print">
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {profile.courses.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-4 text-center text-slate-400 italic">
                    No courses allocated. Click "+ Allot Course" above to assign courses.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-100 font-semibold text-slate-900 border-t border-slate-200">
              <tr>
                <td colSpan={3} className="py-2.5 px-3 uppercase text-[11px]">
                  Total Allotted Direct Contact Hours:
                </td>
                <td className="py-2.5 px-2 text-center font-mono">
                  {profile.courses.reduce((sum, c) => sum + (c.lectureHours || 0), 0)}
                </td>
                <td className="py-2.5 px-2 text-center font-mono">
                  {profile.courses.reduce((sum, c) => sum + (c.tutorialHours || 0), 0)}
                </td>
                <td className="py-2.5 px-2 text-center font-mono">
                  {profile.courses.reduce((sum, c) => sum + (c.practicalHours || 0), 0)}
                </td>
                <td className="py-2.5 px-2 text-center font-mono">
                  {profile.courses.reduce((sum, c) => sum + (c.credits || 0), 0)}
                </td>
                <td colSpan={3}></td>
                <td className="py-2.5 px-2 text-right font-mono text-sm font-bold text-indigo-700">
                  {directHours} hrs/wk
                </td>
                <td className="no-print"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Section 2: 40-Hour Weekly Workload Distribution */}
      <div className="mb-8 border border-slate-200 rounded-xl p-5 bg-slate-50">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Section 2: 40-Hour Weekly Comprehensive Workload Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Balancing direct teaching with scholarly research, mentoring, continuous assessment, and administration.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">Statutory Commitment: </span>
            <span className={`font-mono text-sm font-bold ${computedTotalHours === 40 ? 'text-emerald-700' : 'text-slate-900'}`}>
              {computedTotalHours} / 40 hrs
            </span>
          </div>
        </div>

        {/* Visual Progress Multi-Bar */}
        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex mb-4 shadow-inner">
          <div
            style={{ width: `${(directHours / 40) * 100}%` }}
            className="bg-indigo-600 h-full"
            title={`Direct Teaching: ${directHours} hrs`}
          />
          <div
            style={{ width: `${(dist.researchAndScholarshipHours / 40) * 100}%` }}
            className="bg-emerald-600 h-full"
            title={`Research: ${dist.researchAndScholarshipHours} hrs`}
          />
          <div
            style={{ width: `${(dist.studentMentoringHours / 40) * 100}%` }}
            className="bg-amber-500 h-full"
            title={`Mentoring: ${dist.studentMentoringHours} hrs`}
          />
          <div
            style={{ width: `${(dist.administrativeGovernanceHours / 40) * 100}%` }}
            className="bg-sky-500 h-full"
            title={`Administration: ${dist.administrativeGovernanceHours} hrs`}
          />
          <div
            style={{ width: `${(dist.prepAndEvaluationHours / 40) * 100}%` }}
            className="bg-purple-500 h-full"
            title={`Prep & Grading: ${dist.prepAndEvaluationHours} hrs`}
          />
        </div>

        {/* Breakdown input cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-indigo-700 font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              <span>Direct Teaching</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">{directHours} hrs</div>
            <span className="text-[11px] text-slate-400">Classroom & Labs</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              <span>Research / Ph.D.</span>
            </div>
            <input
              type="number"
              min="0"
              value={dist.researchAndScholarshipHours}
              onChange={(e) => updateWorkloadDist('researchAndScholarshipHours', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-lg font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Papers, grants & thesis</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-amber-700 font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>Student Mentoring</span>
            </div>
            <input
              type="number"
              min="0"
              value={dist.studentMentoringHours}
              onChange={(e) => updateWorkloadDist('studentMentoringHours', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-lg font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Proctoring & counseling</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-sky-700 font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
              <span>Administration</span>
            </div>
            <input
              type="number"
              min="0"
              value={dist.administrativeGovernanceHours}
              onChange={(e) => updateWorkloadDist('administrativeGovernanceHours', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-lg font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Committees & accreditation</span>
          </div>

          <div className="bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-purple-700 font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
              <span>Prep & Grading</span>
            </div>
            <input
              type="number"
              min="0"
              value={dist.prepAndEvaluationHours}
              onChange={(e) => updateWorkloadDist('prepAndEvaluationHours', parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-lg font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Lesson plans & CIE tests</span>
          </div>
        </div>
      </div>

      {/* Official Signatures Block */}
      <PrintSignatures profile={profile} />
    </div>
  );
}
