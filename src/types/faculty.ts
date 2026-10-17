export type AcademicRank = 'assistant_professor' | 'associate_professor' | 'professor';

export interface CourseAllocation {
  id: string;
  code: string;
  title: string;
  program: 'UG' | 'PG' | 'Ph.D.';
  semester: string;
  lectureHours: number; // L
  tutorialHours: number; // T
  practicalHours: number; // P
  credits: number;
  classBatch: string;
  studentsEnrolled: number;
  roomVenue: string;
}

export interface WorkloadDistribution {
  directTeachingHours: number; // calculated from courses
  studentMentoringHours: number;
  researchAndScholarshipHours: number;
  administrativeGovernanceHours: number;
  prepAndEvaluationHours: number;
}

export interface JournalPaper {
  id: string;
  title: string;
  journal: string;
  indexing: 'Scopus' | 'Web of Science' | 'UGC-CARE' | 'Peer-Reviewed';
  impactFactor: number;
  year: number;
  isFirstOrCorresponding: boolean;
  score: number;
}

export interface SponsoredProject {
  id: string;
  title: string;
  fundingAgency: string;
  grantAmount: number; // in USD or INR
  currency: string;
  durationMonths: number;
  role: 'Principal Investigator (PI)' | 'Co-Principal Investigator (Co-PI)';
  status: 'Sanctioned' | 'Ongoing' | 'Completed';
  score: number;
}

export interface ResearchGuidance {
  id: string;
  studentName: string;
  degreeType: 'Ph.D.' | 'Master of Technology / M.S.' | 'Undergraduate Honors';
  thesisTitle: string;
  status: 'Degree Awarded' | 'Thesis Submitted' | 'In Progress';
  year: number;
  role: 'Sole Supervisor' | 'Principal Guide' | 'Co-Guide';
  score: number;
}

export interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  jurisdiction: 'National' | 'International (USPTO/PCT/EPO)';
  status: 'Filed' | 'Published' | 'Granted';
  year: number;
  score: number;
}

export interface LessonPlanEntry {
  id: string;
  lectureNumber: number;
  plannedDate: string;
  actualDate: string;
  topic: string;
  coMapped: string; // e.g. CO1, CO2
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  pedagogyMethod: string; // e.g., Interactive Lecture, Flipped Classroom, Smart Board, Problem Solving, Case Analysis
  contactHours: number;
  attendancePercent: number;
  assessmentTool: string; // Quiz, Mid-term, Assignment, Lab viva
}

export interface FacultyProfile {
  id: string;
  rank: AcademicRank;
  fullName: string;
  academicTitle: string; // Dr. / Prof.
  employeeId: string;
  department: string;
  schoolOrFaculty: string;
  institutionName: string;
  email: string;
  phone: string;
  officeLocation: string;
  dateOfJoining: string;
  dateOfCurrentRank: string;
  highestDegree: string;
  specialization: string;
  academicLevel: string; // e.g. "Level 10" or "Level 13A" or "Level 14"
  experienceYearsTeaching: number;
  experienceYearsResearch: number;
  experienceYearsIndustry: number;
  
  // Workload allocation
  courses: CourseAllocation[];
  workloadDistribution: WorkloadDistribution;

  // Appraisal Category I: Teaching & Learning
  classesScheduled: number;
  classesHeld: number;
  studentFeedbackRating: number; // out of 5.0
  syllabusCoveragePercent: number;
  averagePassPercent: number;
  examDutiesCount: number;

  // Appraisal Category II: Institutional Governance & Student Development
  institutionalRoles: Array<{
    id: string;
    roleName: string;
    level: 'Department' | 'Institutional / College' | 'University / State';
    description: string;
    score: number;
  }>;
  mentoringStudentsCount: number;

  // Appraisal Category III: Research & Academic Contributions
  publications: JournalPaper[];
  projects: SponsoredProject[];
  guidance: ResearchGuidance[];
  patents: Patent[];
  fdpAttendedOrOrganized: Array<{
    id: string;
    programName: string;
    organizingBody: string;
    durationDays: number;
    year: number;
    score: number;
  }>;
  invitedKeynotes: Array<{
    id: string;
    eventTitle: string;
    invitingInstitute: string;
    level: 'International' | 'National' | 'State/University';
    year: number;
    score: number;
  }>;

  // Course Dossier
  activeCourseName: string;
  activeCourseCode: string;
  courseSemester: string;
  courseOutcomes: Array<{
    code: string; // CO1, CO2
    description: string;
    bloomsLevel: string;
    targetAttainmentPercent: number;
  }>;
  lessonPlanEntries: LessonPlanEntry[];

  // Appraiser Comments
  hodRemarks: string;
  hodRecommendation: 'Recommended for Increment / Promotion' | 'Satisfactory' | 'Needs Improvement';
  deanRemarks: string;
}

export interface RankNorm {
  rank: AcademicRank;
  title: string;
  academicLevel: string;
  statutoryDirectTeachingHours: number; // per week
  totalWeeklyHours: number; // 40 hours
  minEducation: string;
  minExperience: string;
  phdSupervisionExpectation: string;
  researchGrantExpectation: string;
  publicationBenchmark: string;
  governanceRole: string;
  minApiScoreBenchmark: number; // Minimum API points per year
  description: string;
}
