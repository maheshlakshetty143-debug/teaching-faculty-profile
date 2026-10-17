import { RankNorm, AcademicRank } from '../types/faculty';

export const RANK_NORMS: Record<AcademicRank, RankNorm> = {
  assistant_professor: {
    rank: 'assistant_professor',
    title: 'Assistant Professor',
    academicLevel: 'Academic Level 10 / 11 / 12',
    statutoryDirectTeachingHours: 16,
    totalWeeklyHours: 40,
    minEducation: "Master's degree with 55% marks + UGC/CSIR NET or Ph.D.",
    minExperience: '0 to 4 years for entry; 4-5 years for senior stage',
    phdSupervisionExpectation: 'Co-supervisor or Independent guide (up to 4 Ph.D. scholars max)',
    researchGrantExpectation: 'Seed money, minor research projects, early career awards ($5k - $25k)',
    publicationBenchmark: 'Minimum 2-3 peer-reviewed / indexed journal articles per evaluation cycle',
    governanceRole: 'Departmental committees, lab in-charge, student proctoring, NBA/NAAC criteria co-incharge',
    minApiScoreBenchmark: 75,
    description: 'Focuses heavily on direct teaching pedagogy, continuous evaluation, laboratory conduction, curriculum delivery, and establishing independent research.'
  },
  associate_professor: {
    rank: 'associate_professor',
    title: 'Associate Professor',
    academicLevel: 'Academic Level 13A',
    statutoryDirectTeachingHours: 14,
    totalWeeklyHours: 40,
    minEducation: 'Ph.D. degree in concerned/allied discipline is mandatory',
    minExperience: 'Minimum 8 years of teaching and/or research experience in university/college',
    phdSupervisionExpectation: 'Active doctoral guidance required (at least 1-2 awarded, up to 6 scholars registered)',
    researchGrantExpectation: 'Sponsored research projects as Principal Investigator ($25k - $100k+)',
    publicationBenchmark: 'Minimum 7 publications in peer-reviewed / Scopus / Web of Science indexed journals',
    governanceRole: 'Departmental coordinator, Board of Studies member, NAAC/NBA criteria head, Exam Superintendent',
    minApiScoreBenchmark: 100,
    description: 'Bridges undergraduate instruction with graduate thesis supervision, curriculum redesign, external research funding, and key institutional accreditation portfolios.'
  },
  professor: {
    rank: 'professor',
    title: 'Professor',
    academicLevel: 'Academic Level 14 / 15',
    statutoryDirectTeachingHours: 12,
    totalWeeklyHours: 40,
    minEducation: 'Ph.D. degree with eminent academic scholarship and active research record',
    minExperience: 'Minimum 10 years of teaching/research, including at least 3 years as Associate Professor',
    phdSupervisionExpectation: 'Continuous doctoral leadership (minimum 3+ awarded Ph.D.s, up to 8 scholars registered)',
    researchGrantExpectation: 'Major funded projects, inter-institutional collaborations, industrial consultancy ($100k - $500k+)',
    publicationBenchmark: 'Minimum 10 publications in high-impact indexed journals + Books/Monographs',
    governanceRole: 'Dean, Head of Department (HOD), Academic Council / BOS Chairman, Tenure & Selection Committee',
    minApiScoreBenchmark: 125,
    description: 'Leads strategic academic planning, international collaborations, research centers of excellence, high-value sponsored grants, and university governance.'
  }
};
