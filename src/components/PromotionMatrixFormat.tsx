import React from 'react';
import { FacultyProfile, AcademicRank } from '../types/faculty';
import { calculateApiScores } from '../utils/apiScoring';
import { RANK_NORMS } from '../data/rankNorms';
import { PrintHeader, PrintSignatures } from './PrintHeaderFooter';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, Award, ShieldCheck, GraduationCap } from 'lucide-react';

interface PromotionMatrixFormatProps {
  profile: FacultyProfile;
}

export function PromotionMatrixFormat({ profile }: PromotionMatrixFormatProps) {
  const norm = RANK_NORMS[profile.rank];
  const scores = calculateApiScores(profile);

  // Determine target next promotion cadre
  let targetRankTitle = 'Associate Professor (Level 13A)';
  let targetRank: AcademicRank = 'associate_professor';
  let minExperienceNeeded = 8;
  let minPubsNeeded = 7;
  let minPhdGuidedNeeded = 1;
  let minApiNeeded = 100;
  let requiresPhd = true;

  if (profile.rank === 'associate_professor') {
    targetRankTitle = 'Professor (Academic Level 14)';
    targetRank = 'professor';
    minExperienceNeeded = 10;
    minPubsNeeded = 10;
    minPhdGuidedNeeded = 2;
    minApiNeeded = 125;
    requiresPhd = true;
  } else if (profile.rank === 'professor') {
    targetRankTitle = 'Senior Professor (Academic Level 15 / Higher Administrative Grade)';
    minExperienceNeeded = 20;
    minPubsNeeded = 15;
    minPhdGuidedNeeded = 4;
    minApiNeeded = 150;
    requiresPhd = true;
  }

  // Audit current profile against criteria
  const hasPhd = profile.highestDegree.toLowerCase().includes('ph.d') || profile.highestDegree.toLowerCase().includes('doctor');
  const teachingExp = profile.experienceYearsTeaching;
  const pubsCount = profile.publications.length;
  const awardedPhdCount = profile.guidance.filter(g => g.degreeType === 'Ph.D.' && g.status === 'Degree Awarded').length;
  const totalPhdGuided = profile.guidance.filter(g => g.degreeType === 'Ph.D.').length;
  const currentApi = scores.totalScore;

  const criteriaList = [
    {
      id: 'phd',
      title: 'Mandatory Ph.D. Qualification',
      requirement: 'Doctoral degree (Ph.D.) in the relevant discipline',
      status: hasPhd,
      currentValue: profile.highestDegree || 'Not specified',
      targetValue: 'Ph.D. Required'
    },
    {
      id: 'experience',
      title: 'Total Academic Experience',
      requirement: `Minimum ${minExperienceNeeded} years of teaching and/or research in higher education`,
      status: teachingExp >= minExperienceNeeded,
      currentValue: `${teachingExp} years`,
      targetValue: `≥ ${minExperienceNeeded} years`
    },
    {
      id: 'publications',
      title: 'Peer-Reviewed Research Publications',
      requirement: `Minimum ${minPubsNeeded} papers published in Scopus/WoS/UGC-CARE indexed journals`,
      status: pubsCount >= minPubsNeeded,
      currentValue: `${pubsCount} papers`,
      targetValue: `≥ ${minPubsNeeded} papers`
    },
    {
      id: 'guidance',
      title: 'Doctoral Research Guidance (Ph.D.)',
      requirement: `Active Ph.D. supervision with at least ${minPhdGuidedNeeded} degree(s) awarded or thesis submitted`,
      status: (awardedPhdCount >= minPhdGuidedNeeded) || (profile.rank === 'assistant_professor' && totalPhdGuided >= 1),
      currentValue: `${awardedPhdCount} awarded (${totalPhdGuided} registered)`,
      targetValue: `≥ ${minPhdGuidedNeeded} awarded/ongoing`
    },
    {
      id: 'api',
      title: 'Cumulative Annual API / PBAS Score',
      requirement: `Minimum cumulative API score of ${minApiNeeded} points across Categories I, II, and III`,
      status: currentApi >= minApiNeeded,
      currentValue: `${currentApi} points`,
      targetValue: `≥ ${minApiNeeded} points`
    }
  ];

  const allMet = criteriaList.every(c => c.status);
  const metCount = criteriaList.filter(c => c.status).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs print-container">
      {/* Official Header */}
      <PrintHeader
        profile={profile}
        documentTitle={`CAREER ADVANCEMENT SCHEME (CAS) PROMOTION CRITERIA AUDIT`}
        documentSubtitle={`Statutory Evaluation Matrix for Advancement from ${norm.title} to ${targetRankTitle}`}
      />

      {/* Audit Verdict Banner */}
      <div className={`mb-6 p-4 rounded-xl border ${
        allMet ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-300'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">CAS Scrutiny Assessment</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium">Evaluation Target: {targetRankTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {allMet 
                ? 'Candidate Meets All Statutory Minimum Eligibility Criteria for Promotion'
                : `Candidate Satisfies ${metCount} of ${criteriaList.length} Statutory Promotion Criteria`}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Audited against official University Statutes, UGC Regulations, and Institutional Selection Committee Rubrics.
            </p>
          </div>

          <div className="shrink-0">
            {allMet ? (
              <span className="px-3 py-1.5 bg-emerald-600 text-white font-semibold text-xs rounded-lg inline-flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4" /> Recommended for Screening
              </span>
            ) : (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs rounded-lg inline-flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" /> Pending Requirements
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Part 1: Item-by-Item Criteria Verification Checklist */}
      <div className="mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Section 1: Statutory Criteria Verification for {targetRankTitle}
          </h3>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            Status: {metCount} / {criteriaList.length} Met
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Criteria Domain</th>
                <th className="py-2.5 px-3">Statutory Regulatory Requirement</th>
                <th className="py-2.5 px-3 text-center">Required Target</th>
                <th className="py-2.5 px-3 text-center">Candidate Metric</th>
                <th className="py-2.5 px-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {criteriaList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {item.title}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {item.requirement}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-medium text-slate-700">
                    {item.targetValue}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                    {item.currentValue}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {item.status ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> Satisfied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                        <XCircle className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 2: Comprehensive Comparative CAS Cadre Progression Ladder */}
      <div className="mb-8">
        <div className="border-b border-slate-200 pb-2 mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Section 2: Higher Education Academic Career Progression Ladder (CAS)
          </h3>
          <p className="text-xs text-slate-500">
            Standard statutory framework governing Career Advancement Scheme from entry-level Assistant Professor to Senior Professor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Assistant Professor Card */}
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Stage 1 → Stage 3</span>
              <span className="font-mono text-slate-500">Level 10–12</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Assistant Professor</h4>
            <p className="text-slate-600 mb-3 text-[11px]">
              Direct teaching & laboratory heavy (16 contact hrs/wk). Establishing independent research and curriculum delivery.
            </p>
            <ul className="space-y-1.5 text-slate-600 border-t border-slate-200 pt-2 text-[11px]">
              <li><strong>Min Service:</strong> 4 yrs with Ph.D., 5 yrs with M.Tech, 6 yrs with Master's.</li>
              <li><strong>Publications:</strong> 2-3 peer-reviewed articles.</li>
              <li><strong>FDP Requirement:</strong> 1 Orientation + 1 Refresher course (min 2 wks).</li>
              <li><strong>Teaching Load:</strong> 16 Direct Contact Hours/Week.</li>
            </ul>
          </div>

          {/* Associate Professor Card */}
          <div className="p-4 border border-indigo-300 rounded-xl bg-indigo-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Stage 3 → Stage 4</span>
              <span className="font-mono text-indigo-800 font-semibold">Level 13A</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Associate Professor</h4>
            <p className="text-slate-600 mb-3 text-[11px]">
              Balanced teaching (14 contact hrs/wk) + active doctoral guidance, funded research grants, and departmental leadership.
            </p>
            <ul className="space-y-1.5 text-slate-700 border-t border-indigo-200/70 pt-2 text-[11px]">
              <li><strong>Mandatory:</strong> Ph.D. degree is compulsory.</li>
              <li><strong>Experience:</strong> Min 8 years teaching/research experience.</li>
              <li><strong>Publications:</strong> Min 7 peer-reviewed / indexed publications.</li>
              <li><strong>Doctoral Guidance:</strong> Active Ph.D. supervision required.</li>
              <li><strong>Teaching Load:</strong> 14 Direct Contact Hours/Week.</li>
            </ul>
          </div>

          {/* Professor Card */}
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Stage 4 → Stage 5</span>
              <span className="font-mono text-slate-500">Level 14 / 15</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Professor</h4>
            <p className="text-slate-600 mb-3 text-[11px]">
              Academic governance, strategic research grants, international collaborations, patents, and institutional leadership (12 contact hrs/wk).
            </p>
            <ul className="space-y-1.5 text-slate-600 border-t border-slate-200 pt-2 text-[11px]">
              <li><strong>Mandatory:</strong> Ph.D. with eminent scholarship.</li>
              <li><strong>Experience:</strong> Min 10 years experience (min 3 yrs as Assoc Prof).</li>
              <li><strong>Publications:</strong> Min 10 publications in high-impact journals.</li>
              <li><strong>Ph.D. Guided:</strong> Min 1-2 successfully awarded Ph.D.s.</li>
              <li><strong>Teaching Load:</strong> 12 Direct Contact Hours/Week.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Official Signatures Block */}
      <PrintSignatures profile={profile} />
    </div>
  );
}
