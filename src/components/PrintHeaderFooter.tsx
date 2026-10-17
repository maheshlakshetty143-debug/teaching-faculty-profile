import { FacultyProfile } from '../types/faculty';
import { RANK_NORMS } from '../data/rankNorms';

interface PrintHeaderFooterProps {
  profile: FacultyProfile;
  documentTitle: string;
  documentSubtitle?: string;
}

export function PrintHeader({ profile, documentTitle, documentSubtitle }: PrintHeaderFooterProps) {
  const norm = RANK_NORMS[profile.rank];

  return (
    <div className="border-b-2 border-slate-900 pb-5 mb-6 text-center">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="text-left">
          <p className="text-xs font-semibold text-slate-700 tracking-wider">OFFICIAL ACADEMIC DOSSIER</p>
          <p className="text-xs text-slate-500">Ref: {profile.employeeId || 'FAC-REF-2026'}</p>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            {profile.institutionName || 'METROPOLITAN INSTITUTE OF TECHNOLOGY'}
          </h1>
          <p className="text-xs text-slate-600">
            {profile.schoolOrFaculty || 'School of Technology & Sciences'} · {profile.department || 'Academic Department'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-700">ACADEMIC YEAR</p>
          <p className="text-xs text-slate-500 font-mono">2025–2026</p>
        </div>
      </div>

      <div className="bg-slate-100 py-1.5 px-3 rounded mt-3">
        <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
          {documentTitle}
        </h2>
        {documentSubtitle && (
          <p className="text-xs text-slate-600 mt-0.5">{documentSubtitle}</p>
        )}
      </div>

      {/* Faculty Mini Meta Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-left text-xs text-slate-700 mt-3 pt-2 border-t border-slate-200">
        <div>
          <span className="text-slate-500">Faculty: </span>
          <span className="font-semibold">{profile.academicTitle} {profile.fullName || 'Faculty Member'}</span>
        </div>
        <div>
          <span className="text-slate-500">Designation: </span>
          <span className="font-semibold">{norm.title}</span>
        </div>
        <div>
          <span className="text-slate-500">Cadre Level: </span>
          <span className="font-semibold font-mono">{profile.academicLevel || norm.academicLevel}</span>
        </div>
        <div>
          <span className="text-slate-500">Employee ID: </span>
          <span className="font-semibold font-mono">{profile.employeeId || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

export function PrintSignatures({ profile }: { profile: FacultyProfile }) {
  return (
    <div className="mt-10 pt-8 border-t border-slate-300 page-break-inside-avoid">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-xs text-slate-800">
        <div className="flex flex-col items-center">
          <div className="h-14 w-44 border-b border-dashed border-slate-400 mb-2 flex items-end justify-center pb-1 text-slate-400 italic">
            [Signature on file]
          </div>
          <p className="font-semibold text-slate-900">{profile.academicTitle} {profile.fullName || 'Faculty Member'}</p>
          <p className="text-slate-500">{RANK_NORMS[profile.rank].title}</p>
          <p className="text-slate-400 text-[11px] mt-0.5 font-mono">Date: {new Date().toISOString().split('T')[0]}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-14 w-44 border-b border-dashed border-slate-400 mb-2 flex items-end justify-center pb-1 text-slate-400 italic">
            [Official Seal & Signature]
          </div>
          <p className="font-semibold text-slate-900">Head of Department (HOD)</p>
          <p className="text-slate-500">{profile.department || 'Department Evaluation Cell'}</p>
          <p className="text-slate-400 text-[11px] mt-0.5 font-mono">Date: _______________</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-14 w-44 border-b border-dashed border-slate-400 mb-2 flex items-end justify-center pb-1 text-slate-400 italic">
            [Approved for Record]
          </div>
          <p className="font-semibold text-slate-900">Dean of Academic Affairs / Principal</p>
          <p className="text-slate-500">{profile.institutionName || 'Institutional Academic Council'}</p>
          <p className="text-slate-400 text-[11px] mt-0.5 font-mono">Date: _______________</p>
        </div>
      </div>
    </div>
  );
}
