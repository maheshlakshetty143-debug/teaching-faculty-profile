import React from 'react';
import { AcademicRank } from '../types/faculty';
import { RANK_NORMS } from '../data/rankNorms';
import { ArrowRight, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ComparativeNormsProps {
  onSelectRank: (rank: AcademicRank) => void;
  activeRank: AcademicRank;
}

export function ComparativeNorms({ onSelectRank, activeRank }: ComparativeNormsProps) {
  const comparisonData = [
    {
      dimension: 'Academic Cadre & Pay Band',
      asstProf: 'Academic Level 10 / 11 / 12 (Pay Band-3)',
      assocProf: 'Academic Level 13A (Pay Band-4)',
      prof: 'Academic Level 14 / 15 (Senior Professor / HAG Band)'
    },
    {
      dimension: 'Direct Teaching Contact Hours',
      asstProf: '16 Contact Hours / Week (Lectures + Tutorials + Labs)',
      assocProf: '14 Contact Hours / Week (Lectures + Seminars + Labs)',
      prof: '12 Contact Hours / Week (Lectures + Doctoral Seminars)'
    },
    {
      dimension: 'Total Weekly Institutional Commitment',
      asstProf: '40 Hours / Week (Direct Teaching, Prep, Mentoring, Admin)',
      assocProf: '40 Hours / Week (Teaching, Research, Ph.D. Guidance, Admin)',
      prof: '40 Hours / Week (Instruction, Policy, Grants, Governance)'
    },
    {
      dimension: 'Minimum Educational Qualification',
      asstProf: "Master's Degree (55% marks) + UGC/CSIR NET or Ph.D.",
      assocProf: 'Ph.D. Degree is MANDATORY in concerned discipline',
      prof: 'Ph.D. Degree with distinguished academic scholarship'
    },
    {
      dimension: 'Minimum Experience Required',
      asstProf: '0 to 4 years for entry level; 4-5 years for senior scale',
      assocProf: 'Minimum 8 years of teaching and/or research in higher education',
      prof: 'Minimum 10 years experience (including at least 3 years as Associate Professor)'
    },
    {
      dimension: 'Minimum Annual API / PBAS Benchmark',
      asstProf: '75 Points / Evaluation Year',
      assocProf: '100 Points / Evaluation Year',
      prof: '125 Points / Evaluation Year'
    },
    {
      dimension: 'Research Publication Benchmark',
      asstProf: '2 to 3 peer-reviewed journal papers per cycle',
      assocProf: 'Minimum 7 publications in Scopus / Web of Science indexed journals',
      prof: 'Minimum 10 publications in high-impact journals + Books / Monographs'
    },
    {
      dimension: 'Doctoral (Ph.D.) Supervision Role',
      asstProf: 'Co-supervisor or recognized guide for up to 4 scholars',
      assocProf: 'Independent guide with at least 1-2 awarded Ph.D.s (up to 6 scholars)',
      prof: 'Eminent doctoral leadership with 3+ awarded Ph.D.s (up to 8 scholars)'
    },
    {
      dimension: 'Sponsored Research & Consultancy',
      asstProf: 'Seed money, minor research projects, early career grants ($5k–$25k)',
      assocProf: 'Sponsored R&D projects as PI, industry consultancy ($25k–$100k)',
      prof: 'Major national/international research grants, consortiums ($100k–$500k+)'
    },
    {
      dimension: 'Institutional Governance Scope',
      asstProf: 'Departmental lab in-charge, student proctoring, NBA/NAAC criteria co-incharge',
      assocProf: 'Departmental coordinator, Board of Studies member, NAAC/NBA lead, Exam Superintendent',
      prof: 'Dean, Head of Department (HOD), Academic Council / BOS Chairman, Selection Committee'
    },
    {
      dimension: 'Curricular Focus & Pedagogy',
      asstProf: 'Foundational undergraduate lectures, practical labs, continuous internal evaluation',
      assocProf: 'Specialized electives, PG coursework, laboratory modernization, syllabus revision',
      prof: 'Doctoral colloquiums, interdisciplinary programs, university policy formulation'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Comparative Statutory Standard</span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          Faculty Cadre Norms & Regulatory Benchmarks
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Side-by-side comparative analysis of workload allocations, academic qualifications, research standards, and administrative responsibilities across Assistant Professor, Associate Professor, and Professor.
        </p>
      </div>

      {/* Cadre Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 no-print">
        <button
          onClick={() => onSelectRank('assistant_professor')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeRank === 'assistant_professor'
              ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-indigo-700">Cadre 1</span>
            <span className="font-mono text-slate-500">Level 10–12</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Assistant Professor</h3>
          <p className="text-xs text-slate-600 mt-1">
            Direct teaching centric (16 hrs/wk), student mentoring, continuous evaluation, and initial research foundation.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-200 text-xs font-semibold text-indigo-700 inline-flex items-center gap-1">
            <span>View Assistant Prof Formats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => onSelectRank('associate_professor')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeRank === 'associate_professor'
              ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-indigo-700">Cadre 2</span>
            <span className="font-mono text-slate-500">Level 13A</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Associate Professor</h3>
          <p className="text-xs text-slate-600 mt-1">
            Balanced teaching (14 hrs/wk), active Ph.D. guidance, external grants ($25k-$100k), and accreditation leadership.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-200 text-xs font-semibold text-indigo-700 inline-flex items-center gap-1">
            <span>View Associate Prof Formats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => onSelectRank('professor')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeRank === 'professor'
              ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-indigo-700">Cadre 3</span>
            <span className="font-mono text-slate-500">Level 14 / 15</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Professor</h3>
          <p className="text-xs text-slate-600 mt-1">
            Executive leadership (12 hrs/wk), major sponsored grants, continuous Ph.D. supervision, patents, and governance.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-200 text-xs font-semibold text-indigo-700 inline-flex items-center gap-1">
            <span>View Professor Formats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 w-1/4">Regulatory Dimension</th>
              <th className="py-3 px-4 w-1/4 bg-slate-50 font-bold text-slate-900">
                Assistant Professor
              </th>
              <th className="py-3 px-4 w-1/4 bg-indigo-50/50 font-bold text-indigo-950">
                Associate Professor
              </th>
              <th className="py-3 px-4 w-1/4 bg-slate-50 font-bold text-slate-900">
                Professor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                <td className="py-3 px-4 font-semibold text-slate-900 border-r border-slate-200">
                  {row.dimension}
                </td>
                <td className="py-3 px-4 text-slate-700 border-r border-slate-200 leading-relaxed">
                  {row.asstProf}
                </td>
                <td className="py-3 px-4 text-slate-900 border-r border-slate-200 leading-relaxed bg-indigo-50/20 font-medium">
                  {row.assocProf}
                </td>
                <td className="py-3 px-4 text-slate-700 leading-relaxed">
                  {row.prof}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
        <p className="font-semibold text-slate-900 mb-1">Regulatory Authority Guidance Note:</p>
        <p>
          These standards reflect normative provisions under University Grants Commission (UGC) Regulations on Minimum Qualifications for Appointment of Teachers and Other Academic Staff in Universities and Colleges and Measures for the Maintenance of Standards in Higher Education, alongside AICTE, ABET, and National Institutional Ranking Framework (NIRF) accreditation matrices.
        </p>
      </div>
    </div>
  );
}
