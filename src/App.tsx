import React, { useState } from 'react';
import { AcademicRank, FacultyProfile } from './types/faculty';
import { SAMPLE_FACULTY_PROFILES, createBlankProfile } from './data/defaultFacultyData';
import { Header } from './components/Header';
import { RankSelector } from './components/RankSelector';
import { AppraisalFormat } from './components/AppraisalFormat';
import { WorkloadFormat } from './components/WorkloadFormat';
import { LessonPlanFormat } from './components/LessonPlanFormat';
import { PromotionMatrixFormat } from './components/PromotionMatrixFormat';
import { BioDataFormat } from './components/BioDataFormat';
import { ComparativeNorms } from './components/ComparativeNorms';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [currentRank, setCurrentRank] = useState<AcademicRank>('associate_professor');
  const [profiles, setProfiles] = useState<Record<AcademicRank, FacultyProfile>>({
    assistant_professor: { ...SAMPLE_FACULTY_PROFILES.assistant_professor },
    associate_professor: { ...SAMPLE_FACULTY_PROFILES.associate_professor },
    professor: { ...SAMPLE_FACULTY_PROFILES.professor }
  });
  const [activeTab, setActiveTab] = useState<string>('appraisal');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const activeProfile = profiles[currentRank];

  const handleProfileChange = (updated: FacultyProfile) => {
    setProfiles(prev => ({
      ...prev,
      [currentRank]: updated
    }));
  };

  const handleRankChange = (rank: AcademicRank) => {
    setCurrentRank(rank);
  };

  const handleLoadPreset = () => {
    setProfiles(prev => ({
      ...prev,
      [currentRank]: { ...SAMPLE_FACULTY_PROFILES[currentRank] }
    }));
  };

  const handleResetBlank = () => {
    setProfiles(prev => ({
      ...prev,
      [currentRank]: createBlankProfile(currentRank)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (importedProfile: FacultyProfile) => {
    if (importedProfile.rank) {
      setCurrentRank(importedProfile.rank);
      setProfiles(prev => ({
        ...prev,
        [importedProfile.rank]: importedProfile
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPrint={handlePrint}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Cadre Designation Selector & Statutory Workload Guideline */}
        {activeTab !== 'norms' && (
          <RankSelector
            currentRank={currentRank}
            onRankChange={handleRankChange}
            onLoadPreset={handleLoadPreset}
            onResetBlank={handleResetBlank}
          />
        )}

        {/* Dynamic Format Views */}
        <div>
          {activeTab === 'appraisal' && (
            <AppraisalFormat
              profile={activeProfile}
              onChange={handleProfileChange}
            />
          )}

          {activeTab === 'workload' && (
            <WorkloadFormat
              profile={activeProfile}
              onChange={handleProfileChange}
            />
          )}

          {activeTab === 'lesson-plan' && (
            <LessonPlanFormat
              profile={activeProfile}
              onChange={handleProfileChange}
            />
          )}

          {activeTab === 'promotion' && (
            <PromotionMatrixFormat
              profile={activeProfile}
            />
          )}

          {activeTab === 'biodata' && (
            <BioDataFormat
              profile={activeProfile}
              onChange={handleProfileChange}
            />
          )}

          {activeTab === 'norms' && (
            <ComparativeNorms
              activeRank={currentRank}
              onSelectRank={(rank) => {
                setCurrentRank(rank);
                setActiveTab('appraisal');
              }}
            />
          )}
        </div>
      </main>

      {/* Data Export / Import Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={activeProfile}
        onImport={handleImport}
        onPrint={handlePrint}
      />

      {/* Official Academic Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-800">FacultyFormat Pro</span>
            <span className="mx-2">·</span>
            <span>Higher Education Faculty Evaluation & Dossier Management</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>UGC & AICTE Norms Compliant</span>
            <span>·</span>
            <span>NBA & NAAC Accreditation Ready</span>
            <span>·</span>
            <button
              onClick={handlePrint}
              className="hover:text-slate-700 transition-colors underline"
            >
              Print Current Format
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
