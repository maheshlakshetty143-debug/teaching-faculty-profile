import { FacultyProfile } from '../types/faculty';
import { RANK_NORMS } from '../data/rankNorms';

export interface ApiScoreBreakdown {
  category1Score: number; // Teaching & Learning
  category2Score: number; // Institutional & Co-curricular
  category3Score: number; // Research & Academic Contributions
  totalScore: number;
  benchmark: number;
  isEligible: boolean;
  scorePercentageOfBenchmark: number;
  category1Details: {
    lectureAttendanceScore: number;
    feedbackScore: number;
    syllabusScore: number;
    examScore: number;
  };
  category3Details: {
    publicationsScore: number;
    projectsScore: number;
    guidanceScore: number;
    patentsScore: number;
    fdpScore: number;
    keynotesScore: number;
  };
}

export function calculateApiScores(profile: FacultyProfile): ApiScoreBreakdown {
  const norm = RANK_NORMS[profile.rank];

  // Category 1: Teaching & Learning (Max ~ 80 points standard)
  const lectureRatio = profile.classesScheduled > 0 
    ? Math.min(1, profile.classesHeld / profile.classesScheduled)
    : 1;
  const lectureAttendanceScore = Math.round(lectureRatio * 40); // 40 max

  const feedbackScore = Math.round((Math.min(5, Math.max(0, profile.studentFeedbackRating)) / 5) * 20); // 20 max
  const syllabusScore = Math.round((Math.min(100, Math.max(0, profile.syllabusCoveragePercent)) / 100) * 10); // 10 max
  const examScore = Math.min(10, profile.examDutiesCount * 1); // 10 max

  const category1Score = lectureAttendanceScore + feedbackScore + syllabusScore + examScore;

  // Category 2: Institutional & Student Development
  const institutionalScore = profile.institutionalRoles.reduce((sum, r) => sum + (r.score || 0), 0);
  const mentoringScore = profile.mentoringStudentsCount > 0 ? Math.min(10, Math.ceil(profile.mentoringStudentsCount / 3)) : 0;
  const category2Score = institutionalScore + mentoringScore;

  // Category 3: Research & Academic Contributions
  const publicationsScore = profile.publications.reduce((sum, p) => sum + (p.score || 0), 0);
  const projectsScore = profile.projects.reduce((sum, pr) => sum + (pr.score || 0), 0);
  const guidanceScore = profile.guidance.reduce((sum, g) => sum + (g.score || 0), 0);
  const patentsScore = profile.patents.reduce((sum, pat) => sum + (pat.score || 0), 0);
  const fdpScore = profile.fdpAttendedOrOrganized.reduce((sum, f) => sum + (f.score || 0), 0);
  const keynotesScore = profile.invitedKeynotes.reduce((sum, k) => sum + (k.score || 0), 0);

  const category3Score = publicationsScore + projectsScore + guidanceScore + patentsScore + fdpScore + keynotesScore;

  const totalScore = category1Score + category2Score + category3Score;
  const benchmark = norm.minApiScoreBenchmark;
  const isEligible = totalScore >= benchmark;
  const scorePercentageOfBenchmark = Math.round((totalScore / benchmark) * 100);

  return {
    category1Score,
    category2Score,
    category3Score,
    totalScore,
    benchmark,
    isEligible,
    scorePercentageOfBenchmark,
    category1Details: {
      lectureAttendanceScore,
      feedbackScore,
      syllabusScore,
      examScore
    },
    category3Details: {
      publicationsScore,
      projectsScore,
      guidanceScore,
      patentsScore,
      fdpScore,
      keynotesScore
    }
  };
}

export function calculateTotalDirectTeachingHours(profile: FacultyProfile): number {
  return profile.courses.reduce((sum, c) => {
    // Contact hours = Lectures + Tutorials + Practicals
    return sum + (c.lectureHours || 0) + (c.tutorialHours || 0) + (c.practicalHours || 0);
  }, 0);
}
