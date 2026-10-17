import React from 'react';
import { FacultyProfile } from '../types/faculty';
import { RANK_NORMS } from '../data/rankNorms';
import { PrintHeader, PrintSignatures } from './PrintHeaderFooter';
import { calculateApiScores } from '../utils/apiScoring';
import { Mail, Phone, MapPin, Award, BookOpen, GraduationCap, Briefcase, FileText } from 'lucide-react';

interface BioDataFormatProps {
  profile: FacultyProfile;
  onChange: (updated: FacultyProfile) => void;
}

export function BioDataFormat({ profile, onChange }: BioDataFormatProps) {
  const norm = RANK_NORMS[profile.rank];
  const scores = calculateApiScores(profile);

  const updateProfile = (partial: Partial<FacultyProfile>) => {
    onChange({ ...profile, ...partial });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      {/* Official Header */}
      <PrintHeader
        profile={profile}
        documentTitle={`OFFICIAL FACULTY BIO-DATA & ACADEMIC DOSSIER`}
        documentSubtitle={`Accreditation & Institutional Faculty Profile (NBA / NAAC / ABET Format)`}
      />

      {/* Header Profile Summary Block */}
      <div className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {profile.academicTitle} {profile.fullName || 'Faculty Full Name'}
              </h2>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-mono">
                {norm.title}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-1">
              {profile.department || 'Department'} · {profile.schoolOrFaculty || 'School / Faculty'}
            </p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Cadre: {profile.academicLevel || norm.academicLevel} · Employee Code: {profile.employeeId || 'N/A'}
            </p>

            {/* Contact Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200">
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {profile.email || 'faculty@institution.edu'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {profile.phone || '+1 (555) 000-0000'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {profile.officeLocation || 'Office Room'}
              </span>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs shrink-0">
            <div className="p-2 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Teaching Exp</span>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{profile.experienceYearsTeaching} yrs</div>
            </div>
            <div className="p-2 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Publications</span>
              <div className="font-mono font-bold text-indigo-700 text-sm mt-0.5">{profile.publications.length} Papers</div>
            </div>
            <div className="p-2 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Ph.D. Scholars</span>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{profile.guidance.length} Guided</div>
            </div>
            <div className="p-2 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">API Score</span>
              <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">{scores.totalScore} pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Academic Qualifications & Specialization */}
      <div className="mb-6">
        <div className="border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. Academic Qualifications & Areas of Specialization
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-semibold mb-1">Highest Degree Conferred</label>
            <input
              type="text"
              value={profile.highestDegree}
              onChange={(e) => updateProfile({ highestDegree: e.target.value })}
              className="w-full px-2 py-1 border border-slate-300 rounded bg-white font-medium text-slate-900"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <label className="block text-slate-500 font-semibold mb-1">Primary Area of Specialization</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => updateProfile({ specialization: e.target.value })}
              className="w-full px-2 py-1 border border-slate-300 rounded bg-white font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Experience breakdown */}
        <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
          <div className="p-2.5 border border-slate-200 rounded-lg">
            <span className="text-slate-500">Teaching Experience: </span>
            <strong className="font-mono text-slate-900">{profile.experienceYearsTeaching} years</strong>
          </div>
          <div className="p-2.5 border border-slate-200 rounded-lg">
            <span className="text-slate-500">Research Experience: </span>
            <strong className="font-mono text-slate-900">{profile.experienceYearsResearch} years</strong>
          </div>
          <div className="p-2.5 border border-slate-200 rounded-lg">
            <span className="text-slate-500">Industry / Post-Doc: </span>
            <strong className="font-mono text-slate-900">{profile.experienceYearsIndustry} years</strong>
          </div>
        </div>
      </div>

      {/* 2. Core Teaching & Course Engagement */}
      <div className="mb-6">
        <div className="border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. Current Instructional Allocation & Courses Taught
          </h3>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">Course Code & Title</th>
                <th className="py-2 px-3">Program Level</th>
                <th className="py-2 px-3 text-center">Structure (L-T-P)</th>
                <th className="py-2 px-3 text-center">Credits</th>
                <th className="py-2 px-3">Enrolled Class</th>
                <th className="py-2 px-3 text-right">Weekly Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {profile.courses.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 px-3 font-semibold text-slate-900">
                    <span className="font-mono text-indigo-700">{c.code}</span> - {c.title}
                  </td>
                  <td className="py-2 px-3">{c.program} Level</td>
                  <td className="py-2 px-3 text-center font-mono">{c.lectureHours}-{c.tutorialHours}-{c.practicalHours}</td>
                  <td className="py-2 px-3 text-center font-mono">{c.credits}</td>
                  <td className="py-2 px-3 text-slate-600">{c.classBatch} ({c.studentsEnrolled} students)</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                    {c.lectureHours + c.tutorialHours + c.practicalHours} hrs/wk
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Research Publications & Scholarly Works */}
      <div className="mb-6">
        <div className="border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            3. Selected Indexed Peer-Reviewed Publications ({profile.publications.length})
          </h3>
        </div>

        <ol className="space-y-2 text-xs list-decimal list-inside text-slate-800">
          {profile.publications.map((p) => (
            <li key={p.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900">{p.title}. </span>
              <span className="italic text-slate-700">{p.journal}</span>
              <span className="text-slate-500 font-mono"> ({p.year})</span>.
              <span className="ml-2 font-mono text-[11px] text-slate-600">
                [Indexing: {p.indexing} · IF: {p.impactFactor} · {p.isFirstOrCorresponding ? 'Lead / Corresponding Author' : 'Co-Author'}]
              </span>
            </li>
          ))}
          {profile.publications.length === 0 && (
            <p className="text-slate-400 italic">No publications recorded in profile.</p>
          )}
        </ol>
      </div>

      {/* 4. Sponsored Grants & Patents */}
      <div className="mb-6">
        <div className="border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            4. Sponsored Research Grants, Consultancy & Intellectual Property
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Projects */}
          <div className="p-3 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-800 mb-2 uppercase text-[11px]">Funded Research Grants ({profile.projects.length})</h4>
            <div className="space-y-2">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-900">{proj.title}</div>
                  <div className="text-slate-600 mt-0.5">
                    Agency: {proj.fundingAgency} · Amount: <strong className="font-mono text-slate-900">${proj.grantAmount.toLocaleString()}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    Role: {proj.role} · Status: {proj.status}
                  </div>
                </div>
              ))}
              {profile.projects.length === 0 && (
                <p className="text-slate-400 italic">No funded projects registered.</p>
              )}
            </div>
          </div>

          {/* Patents */}
          <div className="p-3 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-800 mb-2 uppercase text-[11px]">Patents & IP Rights ({profile.patents.length})</h4>
            <div className="space-y-2">
              {profile.patents.map((pat) => (
                <div key={pat.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-900">{pat.title}</div>
                  <div className="text-slate-600 mt-0.5 font-mono">
                    Reg: {pat.patentNumber} ({pat.jurisdiction})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Status: <strong className="text-slate-800">{pat.status} ({pat.year})</strong>
                  </div>
                </div>
              ))}
              {profile.patents.length === 0 && (
                <p className="text-slate-400 italic">No patents recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Institutional Governance */}
      <div className="mb-6">
        <div className="border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            5. Institutional Leadership & Academic Governance
          </h3>
        </div>

        <ul className="space-y-1.5 text-xs">
          {profile.institutionalRoles.map((role) => (
            <li key={role.id} className="p-2 bg-slate-50 border border-slate-200 rounded flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-900">{role.roleName}</span>
                <span className="text-slate-400 font-mono text-[11px] ml-2">({role.level})</span>
                <p className="text-slate-600 mt-0.5 text-[11px]">{role.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Official Signatures Block */}
      <PrintSignatures profile={profile} />
    </div>
  );
}
