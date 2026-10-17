import { FacultyProfile, AcademicRank } from '../types/faculty';

export const SAMPLE_FACULTY_PROFILES: Record<AcademicRank, FacultyProfile> = {
  assistant_professor: {
    id: 'asst-prof-01',
    rank: 'assistant_professor',
    fullName: 'Dr. Ananya Sharma',
    academicTitle: 'Dr.',
    employeeId: 'FAC-AP-4082',
    department: 'Computer Science and Engineering',
    schoolOrFaculty: 'School of Technology & Computing',
    institutionName: 'Metropolitan Institute of Technology',
    email: 'ananya.sharma@mit.edu.ac',
    phone: '+1 (555) 349-8201',
    officeLocation: 'Academic Block B, Room 304',
    dateOfJoining: '2023-07-15',
    dateOfCurrentRank: '2023-07-15',
    highestDegree: 'Ph.D. in Computer Science (Distributed Systems)',
    specialization: 'Distributed Cloud Systems & Edge Computing',
    academicLevel: 'Academic Level 10 (Pay Band-3)',
    experienceYearsTeaching: 3.5,
    experienceYearsResearch: 4.0,
    experienceYearsIndustry: 1.0,

    // Workload (assistant professors require 16 direct teaching hours)
    courses: [
      {
        id: 'c1',
        code: 'CS-301',
        title: 'Design and Analysis of Algorithms',
        program: 'UG',
        semester: 'Semester V (Fall 2026)',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 2,
        credits: 4,
        classBatch: 'B.Tech CSE - Section A',
        studentsEnrolled: 64,
        roomVenue: 'Lecture Hall 201 / Lab 4'
      },
      {
        id: 'c2',
        code: 'CS-204',
        title: 'Data Structures and Applications',
        program: 'UG',
        semester: 'Semester III (Fall 2026)',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 4,
        credits: 4,
        classBatch: 'B.Tech CSE - Batch 2',
        studentsEnrolled: 58,
        roomVenue: 'Lecture Hall 108 / Computing Center'
      },
      {
        id: 'c3',
        code: 'CS-415',
        title: 'Cloud Infrastructure & Microservices',
        program: 'UG',
        semester: 'Semester VII (Fall 2026)',
        lectureHours: 2,
        tutorialHours: 0,
        practicalHours: 0,
        credits: 2,
        classBatch: 'B.Tech CSE Elective',
        studentsEnrolled: 42,
        roomVenue: 'Seminar Hall 3'
      }
    ],
    workloadDistribution: {
      directTeachingHours: 16,
      studentMentoringHours: 4,
      researchAndScholarshipHours: 10,
      administrativeGovernanceHours: 4,
      prepAndEvaluationHours: 6
    },

    // Category I: Teaching & Learning
    classesScheduled: 96,
    classesHeld: 94,
    studentFeedbackRating: 4.65,
    syllabusCoveragePercent: 98,
    averagePassPercent: 92.4,
    examDutiesCount: 12,

    // Category II: Institutional Governance & Student Development
    institutionalRoles: [
      {
        id: 'r1',
        roleName: 'Departmental Lab In-Charge (Systems & Cloud Lab)',
        level: 'Department',
        description: 'Overseeing 75 workstation configurations, open-source software stacks, and inventory audits.',
        score: 10
      },
      {
        id: 'r2',
        roleName: 'NBA / NAAC Criteria 3 Co-Coordinator',
        level: 'Department',
        description: 'Compiling curriculum attainment reports and course outcome dossiers for accreditation visits.',
        score: 10
      },
      {
        id: 'r3',
        roleName: 'Faculty Advisor - ACM Student Chapter',
        level: 'Institutional / College',
        description: 'Mentoring 120 undergraduate students in annual hackathons, technical speaker series, and coding sprints.',
        score: 5
      }
    ],
    mentoringStudentsCount: 22,

    // Category III: Research & Academic Contributions
    publications: [
      {
        id: 'p1',
        title: 'Adaptive Resource Allocation in Serverless Edge-Fog Computing Environments',
        journal: 'IEEE Transactions on Services Computing',
        indexing: 'Scopus',
        impactFactor: 8.2,
        year: 2026,
        isFirstOrCorresponding: true,
        score: 25
      },
      {
        id: 'p2',
        title: 'Decentralized Consensus Protocols for Low-Latency Sensor Mesh Networks',
        journal: 'Elsevier Journal of Systems Architecture',
        indexing: 'Web of Science',
        impactFactor: 4.5,
        year: 2025,
        isFirstOrCorresponding: true,
        score: 20
      }
    ],
    projects: [
      {
        id: 'pr1',
        title: 'Intelligent Workload Balancing for Micro-Edge Data Clusters',
        fundingAgency: 'National Science Foundation / University Seed Grant',
        grantAmount: 18500,
        currency: 'USD',
        durationMonths: 24,
        role: 'Principal Investigator (PI)',
        status: 'Ongoing',
        score: 10
      }
    ],
    guidance: [
      {
        id: 'g1',
        studentName: 'Vikram Mehta',
        degreeType: 'Master of Technology / M.S.',
        thesisTitle: 'Fault-tolerant Container Orchestration on Edge Fog Gateways',
        status: 'Degree Awarded',
        year: 2025,
        role: 'Sole Supervisor',
        score: 5
      },
      {
        id: 'g2',
        studentName: 'Priya N. Sundaram',
        degreeType: 'Ph.D.',
        thesisTitle: 'Energy-Harvesting Algorithmic Schedulers for Autonomous Drone Fleets',
        status: 'In Progress',
        year: 2026,
        role: 'Co-Guide',
        score: 3
      }
    ],
    patents: [
      {
        id: 'pat1',
        title: 'Apparatus and Method for Real-Time Memory Compaction in Virtualized Containers',
        patentNumber: 'US 2025/0198421 A1',
        jurisdiction: 'National',
        status: 'Published',
        year: 2025,
        score: 5
      }
    ],
    fdpAttendedOrOrganized: [
      {
        id: 'fdp1',
        programName: 'AICTE-ATAL 2-Week Faculty Development on Cloud Computing & Kubernetes',
        organizingBody: 'National Center for Cloud Research',
        durationDays: 14,
        year: 2025,
        score: 7
      }
    ],
    invitedKeynotes: [
      {
        id: 'ik1',
        eventTitle: 'State Conference on Emerging Trends in Cloud Architectures',
        invitingInstitute: 'Regional Engineering College',
        level: 'State/University',
        year: 2026,
        score: 3
      }
    ],

    // Course Dossier
    activeCourseName: 'Design and Analysis of Algorithms',
    activeCourseCode: 'CS-301',
    courseSemester: 'Semester V (Academic Year 2025-2026)',
    courseOutcomes: [
      { code: 'CO1', description: 'Analyze asymptotic growth rates of algorithms and recurrences', bloomsLevel: 'Analyze', targetAttainmentPercent: 80 },
      { code: 'CO2', description: 'Synthesize greedy and dynamic programming solutions to real-world problems', bloomsLevel: 'Create', targetAttainmentPercent: 75 },
      { code: 'CO3', description: 'Evaluate graph traversal and network flow algorithms under edge constraints', bloomsLevel: 'Evaluate', targetAttainmentPercent: 70 },
      { code: 'CO4', description: 'Differentiate polynomial-time solvable problems from NP-complete class problems', bloomsLevel: 'Understand', targetAttainmentPercent: 85 }
    ],
    lessonPlanEntries: [
      {
        id: 'lp1',
        lectureNumber: 1,
        plannedDate: '2026-08-18',
        actualDate: '2026-08-18',
        topic: 'Introduction to Asymptotic Notations: Big-O, Omega, Theta, and Recurrence Relations',
        coMapped: 'CO1',
        bloomsLevel: 'Understand',
        pedagogyMethod: 'Interactive Smart Board & Mathematical Derivations',
        contactHours: 1,
        attendancePercent: 95,
        assessmentTool: 'In-class Diagnostic Quiz'
      },
      {
        id: 'lp2',
        lectureNumber: 2,
        plannedDate: '2026-08-20',
        actualDate: '2026-08-20',
        topic: 'Master Theorem for Divide-and-Conquer Recurrences with Case Boundary Proofs',
        coMapped: 'CO1',
        bloomsLevel: 'Analyze',
        pedagogyMethod: 'Problem Solving Board Session',
        contactHours: 1,
        attendancePercent: 92,
        assessmentTool: 'Homework Assignment 1'
      },
      {
        id: 'lp3',
        lectureNumber: 3,
        plannedDate: '2026-08-25',
        actualDate: '2026-08-25',
        topic: 'Divide-and-Conquer: Randomized Quicksort, Expected Runtime vs Worst-Case Invariants',
        coMapped: 'CO1',
        bloomsLevel: 'Analyze',
        pedagogyMethod: 'Visual Simulation & Code Walkthrough',
        contactHours: 1,
        attendancePercent: 89,
        assessmentTool: 'Laboratory Programming Task'
      },
      {
        id: 'lp4',
        lectureNumber: 4,
        plannedDate: '2026-08-27',
        actualDate: '2026-08-27',
        topic: 'Dynamic Programming: Principle of Optimality and Memoization in Matrix Chain Multiplication',
        coMapped: 'CO2',
        bloomsLevel: 'Apply',
        pedagogyMethod: 'Flipped Classroom & Group Grid Tracing',
        contactHours: 1,
        attendancePercent: 91,
        assessmentTool: 'Mid-term Quiz #1'
      }
    ],
    hodRemarks: 'Dr. Sharma maintains exceptional instructional rigor, exemplary syllabus coverage (98%), and strong student feedback. Demonstrating commendable initiative in initiating research grant applications.',
    hodRecommendation: 'Recommended for Increment / Promotion',
    deanRemarks: 'Appraisal verified and approved for annual grade increment under CAS guidelines.'
  },

  associate_professor: {
    id: 'assoc-prof-01',
    rank: 'associate_professor',
    fullName: 'Dr. Rajesh K. Varma',
    academicTitle: 'Dr.',
    employeeId: 'FAC-ASC-2109',
    department: 'Electrical and Electronics Engineering',
    schoolOrFaculty: 'Faculty of Engineering & Applied Sciences',
    institutionName: 'Metropolitan Institute of Technology',
    email: 'rajesh.varma@mit.edu.ac',
    phone: '+1 (555) 819-4450',
    officeLocation: 'Power Systems Wing, Room 412',
    dateOfJoining: '2016-08-10',
    dateOfCurrentRank: '2021-09-01',
    highestDegree: 'Ph.D. in Power Electronics & Microgrid Control',
    specialization: 'Renewable Microgrids, Smart Grid Cybersecurity & Wide Bandgap Inverters',
    academicLevel: 'Academic Level 13A (Pay Band-4)',
    experienceYearsTeaching: 11.0,
    experienceYearsResearch: 9.5,
    experienceYearsIndustry: 2.5,

    // Workload (associate professors require 14 direct teaching hours)
    courses: [
      {
        id: 'c1',
        code: 'EE-402',
        title: 'Smart Grid Architecture & Renewable Integration',
        program: 'UG',
        semester: 'Semester VII (Fall 2026)',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 2,
        credits: 4,
        classBatch: 'B.Tech EEE Senior Batch',
        studentsEnrolled: 54,
        roomVenue: 'Smart Grid Lab & Hall 302'
      },
      {
        id: 'c2',
        code: 'EE-518',
        title: 'Advanced Solid-State Power Converters',
        program: 'PG',
        semester: 'M.Tech Semester I (Fall 2026)',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 2,
        credits: 4,
        classBatch: 'M.Tech Power Systems',
        studentsEnrolled: 24,
        roomVenue: 'PG Seminar Room B'
      },
      {
        id: 'c3',
        code: 'EE-601',
        title: 'Research Methodology & Technical Writing in Energy Systems',
        program: 'Ph.D.',
        semester: 'Ph.D. Core Coursework',
        lectureHours: 2,
        tutorialHours: 0,
        practicalHours: 0,
        credits: 2,
        classBatch: 'Doctoral Cohort 2026',
        studentsEnrolled: 12,
        roomVenue: 'Department Conference Hall'
      }
    ],
    workloadDistribution: {
      directTeachingHours: 14,
      studentMentoringHours: 4,
      researchAndScholarshipHours: 12,
      administrativeGovernanceHours: 6,
      prepAndEvaluationHours: 4
    },

    // Category I: Teaching & Learning
    classesScheduled: 84,
    classesHeld: 82,
    studentFeedbackRating: 4.82,
    syllabusCoveragePercent: 100,
    averagePassPercent: 96.0,
    examDutiesCount: 16,

    // Category II: Institutional Governance & Student Development
    institutionalRoles: [
      {
        id: 'r1',
        roleName: 'Departmental NBA / NAAC Steering Committee Lead',
        level: 'Institutional / College',
        description: 'Headed departmental documentation, program educational outcomes (PEOs), and self-assessment report (SAR).',
        score: 15
      },
      {
        id: 'r2',
        roleName: 'Board of Studies (BOS) Member - Curriculum Revision',
        level: 'University / State',
        description: 'Authored revised syllabus for 2026 Outcome-Based Education (OBE) curriculum for Power Electronics.',
        score: 10
      },
      {
        id: 'r3',
        roleName: 'Faculty In-Charge: University IEEE Student Branch',
        level: 'Institutional / College',
        description: 'Organized 3 national technical symposia and facilitated 8 industry expert webinars.',
        score: 10
      }
    ],
    mentoringStudentsCount: 30,

    // Category III: Research & Academic Contributions
    publications: [
      {
        id: 'p1',
        title: 'Coordinated Secondary Voltage Control in Islanded Microgrids with Silicon Carbide Inverters',
        journal: 'IEEE Transactions on Smart Grid',
        indexing: 'Scopus',
        impactFactor: 9.6,
        year: 2026,
        isFirstOrCorresponding: true,
        score: 25
      },
      {
        id: 'p2',
        title: 'Cyber-Physical Resilience Against False Data Injection in Distributed Battery Energy Storage',
        journal: 'Applied Energy (Elsevier)',
        indexing: 'Web of Science',
        impactFactor: 11.2,
        year: 2025,
        isFirstOrCorresponding: true,
        score: 25
      },
      {
        id: 'p3',
        title: 'Decentralized Droop Strategies for Multi-Source Hybrid Renewable Microgrids',
        journal: 'IET Renewable Power Generation',
        indexing: 'Scopus',
        impactFactor: 3.9,
        year: 2025,
        isFirstOrCorresponding: false,
        score: 15
      }
    ],
    projects: [
      {
        id: 'pr1',
        title: 'Resilient Microgrid Architecture for Extreme Weather Disaster Recovery',
        fundingAgency: 'Department of Science and Technology (DST) / Ministry of Power',
        grantAmount: 78000,
        currency: 'USD',
        durationMonths: 36,
        role: 'Principal Investigator (PI)',
        status: 'Ongoing',
        score: 20
      },
      {
        id: 'pr2',
        title: 'High-Efficiency SiC Dual Active Bridge Converter for Electric Vehicle Fast Chargers',
        fundingAgency: 'National Automotive Board Industry-Academia Grant',
        grantAmount: 32000,
        currency: 'USD',
        durationMonths: 24,
        role: 'Co-Principal Investigator (Co-PI)',
        status: 'Sanctioned',
        score: 10
      }
    ],
    guidance: [
      {
        id: 'g1',
        studentName: 'Dr. Harish K. Gowda',
        degreeType: 'Ph.D.',
        thesisTitle: 'Optimal Energy Management of Urban EV Fleets Integrating Solar Carports',
        status: 'Degree Awarded',
        year: 2025,
        role: 'Principal Guide',
        score: 10
      },
      {
        id: 'g2',
        studentName: 'Rohan Deshmukh',
        degreeType: 'Ph.D.',
        thesisTitle: 'Observer-Based Cyber Attack Detection in Power Distribution SCADA',
        status: 'In Progress',
        year: 2026,
        role: 'Sole Supervisor',
        score: 5
      },
      {
        id: 'g3',
        studentName: 'Tanvi Agarwal',
        degreeType: 'Master of Technology / M.S.',
        thesisTitle: 'FPGA Control of Active Power Filter for Industrial Arc Furnaces',
        status: 'Degree Awarded',
        year: 2025,
        role: 'Sole Supervisor',
        score: 5
      }
    ],
    patents: [
      {
        id: 'pat1',
        title: 'Multilevel Bidirectional Resonant Inverter with Zero-Voltage Soft Switching for Micro-Wind Turbines',
        patentNumber: 'IN 202441029188 B',
        jurisdiction: 'National',
        status: 'Granted',
        year: 2025,
        score: 15
      }
    ],
    fdpAttendedOrOrganized: [
      {
        id: 'fdp1',
        programName: '1-Week International Workshop on Cyber-Physical Power Systems (Course Coordinator)',
        organizingBody: 'MIT in collaboration with IEEE PES',
        durationDays: 7,
        year: 2026,
        score: 10
      }
    ],
    invitedKeynotes: [
      {
        id: 'ik1',
        eventTitle: 'Keynote Speaker: IEEE International Conference on Renewable Energy Innovations',
        invitingInstitute: 'National Technical University',
        level: 'International',
        year: 2026,
        score: 7
      }
    ],

    // Course Dossier
    activeCourseName: 'Smart Grid Architecture & Renewable Integration',
    activeCourseCode: 'EE-402',
    courseSemester: 'Semester VII (Academic Year 2025-2026)',
    courseOutcomes: [
      { code: 'CO1', description: 'Analyze structural components of smart grid and phasor measurement unit (PMU) telemetry', bloomsLevel: 'Analyze', targetAttainmentPercent: 85 },
      { code: 'CO2', description: 'Formulate decentralized microgrid frequency regulation using synthetic inertia', bloomsLevel: 'Evaluate', targetAttainmentPercent: 80 },
      { code: 'CO3', description: 'Design communication architectures conforming to IEC 61850 substation standards', bloomsLevel: 'Create', targetAttainmentPercent: 75 },
      { code: 'CO4', description: 'Assess cyber vulnerabilities and mitigation strategies in grid automation protocols', bloomsLevel: 'Evaluate', targetAttainmentPercent: 80 }
    ],
    lessonPlanEntries: [
      {
        id: 'lp1',
        lectureNumber: 1,
        plannedDate: '2026-08-17',
        actualDate: '2026-08-17',
        topic: 'Evolution of Traditional Grids to Smart Grids: Bidirectional Power and Information Flow',
        coMapped: 'CO1',
        bloomsLevel: 'Understand',
        pedagogyMethod: 'Case Study of 2003 Blackout vs Modern Microgrid Resilience',
        contactHours: 1,
        attendancePercent: 96,
        assessmentTool: 'Discussion Quiz'
      },
      {
        id: 'lp2',
        lectureNumber: 2,
        plannedDate: '2026-08-19',
        actualDate: '2026-08-19',
        topic: 'Phasor Measurement Units (PMU), Wide Area Monitoring Systems (WAMS), and Synchrophasors',
        coMapped: 'CO1',
        bloomsLevel: 'Analyze',
        pedagogyMethod: 'Live Hardware Telemetry Demonstration from Campus Solar Plant',
        contactHours: 1,
        attendancePercent: 94,
        assessmentTool: 'Lab Observation Sheet'
      },
      {
        id: 'lp3',
        lectureNumber: 3,
        plannedDate: '2026-08-24',
        actualDate: '2026-08-24',
        topic: 'Inverter-Based Resources (IBR) and Synthetic Inertia Control for Grid-Forming vs Grid-Following',
        coMapped: 'CO2',
        bloomsLevel: 'Evaluate',
        pedagogyMethod: 'MATLAB/Simulink Real-Time Simulation Walkthrough',
        contactHours: 1,
        attendancePercent: 92,
        assessmentTool: 'Simulation Assignment 1'
      }
    ],
    hodRemarks: 'Dr. Varma demonstrates exceptional research leadership, secures substantial external grants ($110,000 cumulative), guides doctoral candidates effectively, and successfully led NBA accreditation preparation.',
    hodRecommendation: 'Recommended for Increment / Promotion',
    deanRemarks: 'Commendable performance across all 3 PBAS categories. Exceeds API benchmarks required for Professor promotion eligibility.'
  },

  professor: {
    id: 'prof-01',
    rank: 'professor',
    fullName: 'Prof. Dr. David Sterling',
    academicTitle: 'Prof. Dr.',
    employeeId: 'FAC-PRF-1004',
    department: 'Mechanical and Aerospace Engineering',
    schoolOrFaculty: 'College of Engineering & Architecture',
    institutionName: 'Metropolitan Institute of Technology',
    email: 'david.sterling@mit.edu.ac',
    phone: '+1 (555) 774-9021',
    officeLocation: 'Deanery Wing / Engineering Hall 501',
    dateOfJoining: '2008-09-01',
    dateOfCurrentRank: '2017-06-15',
    highestDegree: 'Ph.D. in Aerodynamics & High-Temperature Composite Materials (MIT/Caltech)',
    specialization: 'Hypersonic Aerodynamics, Thermal Protection Systems & Additive Metal Manufacturing',
    academicLevel: 'Academic Level 14 / Senior Professor Band',
    experienceYearsTeaching: 19.5,
    experienceYearsResearch: 18.0,
    experienceYearsIndustry: 4.0,

    // Workload (professors require 12 direct teaching hours)
    courses: [
      {
        id: 'c1',
        code: 'ME-530',
        title: 'Hypersonic Flow Theory & Boundary Layer Transitions',
        program: 'PG',
        semester: 'Graduate Fall Semester 2026',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 0,
        credits: 4,
        classBatch: 'M.S. / Ph.D. Aerospace Core',
        studentsEnrolled: 18,
        roomVenue: 'Aerospace Advanced Lecture Room'
      },
      {
        id: 'c2',
        code: 'ME-410',
        title: 'Computational Fluid Dynamics for Compressible Flows',
        program: 'UG',
        semester: 'Semester VII (Fall 2026)',
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 2,
        credits: 4,
        classBatch: 'B.Tech Mechanical Honors',
        studentsEnrolled: 40,
        roomVenue: 'High Performance Computing Lab'
      },
      {
        id: 'c3',
        code: 'ME-690',
        title: 'Doctoral Seminar in Advanced Propulsion Systems',
        program: 'Ph.D.',
        semester: 'Doctoral Colloquium',
        lectureHours: 2,
        tutorialHours: 0,
        practicalHours: 0,
        credits: 2,
        classBatch: 'Doctoral Fellows',
        studentsEnrolled: 14,
        roomVenue: 'Executive Boardroom'
      }
    ],
    workloadDistribution: {
      directTeachingHours: 12,
      studentMentoringHours: 4,
      researchAndScholarshipHours: 14,
      administrativeGovernanceHours: 8,
      prepAndEvaluationHours: 2
    },

    // Category I: Teaching & Learning
    classesScheduled: 72,
    classesHeld: 70,
    studentFeedbackRating: 4.91,
    syllabusCoveragePercent: 100,
    averagePassPercent: 97.5,
    examDutiesCount: 14,

    // Category II: Institutional Governance & Student Development
    institutionalRoles: [
      {
        id: 'r1',
        roleName: 'Dean of Research & Innovation / Chairperson, University Research Council',
        level: 'University / State',
        description: 'Governing $14M institutional sponsored research portfolio, IP commercialization, and doctoral tenure standards.',
        score: 20
      },
      {
        id: 'r2',
        roleName: 'Chairman, Board of Studies (BOS) in Mechanical & Aerospace Engineering',
        level: 'University / State',
        description: 'Chaired quadrennial undergraduate and graduate curriculum overhaul conforming to ABET/Washington Accord.',
        score: 15
      },
      {
        id: 'r3',
        roleName: 'Member, University Executive Council & Faculty Selection Committee',
        level: 'University / State',
        description: 'External subject expert for faculty recruitment, tenure review, and academic integrity inquiries.',
        score: 15
      }
    ],
    mentoringStudentsCount: 35,

    // Category III: Research & Academic Contributions
    publications: [
      {
        id: 'p1',
        title: 'Shock-Wave Boundary-Layer Interactions over Scramjet Inlets at Mach 7: Experimental and LES Investigation',
        journal: 'AIAA Journal (American Institute of Aeronautics and Astronautics)',
        indexing: 'Scopus',
        impactFactor: 8.8,
        year: 2026,
        isFirstOrCorresponding: true,
        score: 25
      },
      {
        id: 'p2',
        title: 'Laser Powder Bed Fusion of Ultra-High-Temperature Ceramics for Aerodynamic Leading Edges',
        journal: 'Nature Communications Materials',
        indexing: 'Web of Science',
        impactFactor: 16.6,
        year: 2025,
        isFirstOrCorresponding: true,
        score: 30
      },
      {
        id: 'p3',
        title: 'Thermo-Mechanical Modeling of Carbon-Carbon Composites in Re-Entry Regimes',
        journal: 'Carbon (Elsevier)',
        indexing: 'Scopus',
        impactFactor: 10.9,
        year: 2025,
        isFirstOrCorresponding: false,
        score: 18
      }
    ],
    projects: [
      {
        id: 'pr1',
        title: 'Aerothermal Analysis and Thermal Protection Architecture for Reusable Hypersonic Glide Vehicles',
        fundingAgency: 'National Aerospace Agency / Defense Advanced Research Agency',
        grantAmount: 245000,
        currency: 'USD',
        durationMonths: 48,
        role: 'Principal Investigator (PI)',
        status: 'Ongoing',
        score: 25
      },
      {
        id: 'pr2',
        title: 'Additive Manufacturing Consortium for High-Temperature Inconel Turbine Blades',
        fundingAgency: 'Global Aerospace Industries Corp (Industrial Consultancy)',
        grantAmount: 85000,
        currency: 'USD',
        durationMonths: 24,
        role: 'Principal Investigator (PI)',
        status: 'Completed',
        score: 15
      }
    ],
    guidance: [
      {
        id: 'g1',
        studentName: 'Dr. Michael Chen',
        degreeType: 'Ph.D.',
        thesisTitle: 'Aero-Optic Distortion in Turbulent Hypersonic Boundary Layers',
        status: 'Degree Awarded',
        year: 2024,
        role: 'Sole Supervisor',
        score: 10
      },
      {
        id: 'g2',
        studentName: 'Dr. Sarah Al-Mansoor',
        degreeType: 'Ph.D.',
        thesisTitle: 'Novel Ceramic Matrix Composite Coatings for Leading Edges',
        status: 'Degree Awarded',
        year: 2025,
        role: 'Sole Supervisor',
        score: 10
      },
      {
        id: 'g3',
        studentName: 'Elena Rostova',
        degreeType: 'Ph.D.',
        thesisTitle: 'Plasma Actuator Control of Shock Waves in Supersonic Air Intakes',
        status: 'In Progress',
        year: 2026,
        role: 'Principal Guide',
        score: 5
      }
    ],
    patents: [
      {
        id: 'pat1',
        title: 'Actively Cooled Double-Walled Thermal Tile Architecture for Atmospheric Entry Vehicles',
        patentNumber: 'US 11,845,920 B2',
        jurisdiction: 'International (USPTO/PCT/EPO)',
        status: 'Granted',
        year: 2025,
        score: 20
      },
      {
        id: 'pat2',
        title: 'Direct Energy Deposition Toolhead for Continuous Fiber High-Temperature Composites',
        patentNumber: 'EP 3 928 114 B1',
        jurisdiction: 'International (USPTO/PCT/EPO)',
        status: 'Granted',
        year: 2024,
        score: 20
      }
    ],
    fdpAttendedOrOrganized: [
      {
        id: 'fdp1',
        programName: 'International Summer School on Hypersonics & High-Enthalpy Gas Dynamics (Program Director)',
        organizingBody: 'MIT & International Astronautical Federation',
        durationDays: 14,
        year: 2026,
        score: 15
      }
    ],
    invitedKeynotes: [
      {
        id: 'ik1',
        eventTitle: 'Plenary Keynote: 34th Congress of the International Council of the Aeronautical Sciences (ICAS)',
        invitingInstitute: 'ICAS Global Assembly, Florence, Italy',
        level: 'International',
        year: 2026,
        score: 10
      },
      {
        id: 'ik2',
        eventTitle: 'Distinguished University Lecture on Future Aerospace Propulsion',
        invitingInstitute: 'National Aerospace University',
        level: 'National',
        year: 2025,
        score: 5
      }
    ],

    // Course Dossier
    activeCourseName: 'Hypersonic Flow Theory & Boundary Layer Transitions',
    activeCourseCode: 'ME-530',
    courseSemester: 'Fall 2026 (Doctoral & Graduate Level)',
    courseOutcomes: [
      { code: 'CO1', description: 'Derive non-equilibrium real-gas thermodynamic state equations behind strong bow shocks', bloomsLevel: 'Analyze', targetAttainmentPercent: 90 },
      { code: 'CO2', description: 'Model high-temperature vibrational excitation and chemical dissociation phenomena', bloomsLevel: 'Evaluate', targetAttainmentPercent: 85 },
      { code: 'CO3', description: 'Design hypersonic sharp and blunted re-entry vehicle wave-riders optimizing L/D ratios', bloomsLevel: 'Create', targetAttainmentPercent: 80 }
    ],
    lessonPlanEntries: [
      {
        id: 'lp1',
        lectureNumber: 1,
        plannedDate: '2026-08-16',
        actualDate: '2026-08-16',
        topic: 'Hypersonic Flow Regime Fundamentals: High Mach Numbers, Thin Shock Layers, Viscous Interaction',
        coMapped: 'CO1',
        bloomsLevel: 'Understand',
        pedagogyMethod: 'Seminar Lecture & High-Speed Shadowgraphy Video Case Studies',
        contactHours: 1,
        attendancePercent: 98,
        assessmentTool: 'Analytical Problem Set 1'
      },
      {
        id: 'lp2',
        lectureNumber: 2,
        plannedDate: '2026-08-23',
        actualDate: '2026-08-23',
        topic: 'Hypersonic Shock-Expansion Theory, Newtonian Flow Model, and Centrifugal Pressure Corrections',
        coMapped: 'CO1',
        bloomsLevel: 'Analyze',
        pedagogyMethod: 'Mathematical Derivation on Whiteboard & Surface Pressure Distribution Modeling',
        contactHours: 1,
        attendancePercent: 95,
        assessmentTool: 'Mid-term Take-Home Project'
      }
    ],
    hodRemarks: 'Distinguished academic leadership. Prof. Sterling anchors the institute’s premier funded research centers ($330,000+), produces peer-reviewed Nature and AIAA publications, mentors multiple doctoral fellows, and executes executive institutional governance flawlessly.',
    hodRecommendation: 'Recommended for Increment / Promotion',
    deanRemarks: 'Highest rating awarded. Endorsed for Outstanding Senior Professorship honors.'
  }
};

export const createBlankProfile = (rank: AcademicRank): FacultyProfile => {
  return {
    id: `custom-${Date.now()}`,
    rank,
    fullName: '',
    academicTitle: rank === 'professor' ? 'Prof. Dr.' : 'Dr.',
    employeeId: '',
    department: '',
    schoolOrFaculty: '',
    institutionName: '',
    email: '',
    phone: '',
    officeLocation: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    dateOfCurrentRank: new Date().toISOString().split('T')[0],
    highestDegree: '',
    specialization: '',
    academicLevel: rank === 'professor' ? 'Level 14' : rank === 'associate_professor' ? 'Level 13A' : 'Level 10',
    experienceYearsTeaching: 0,
    experienceYearsResearch: 0,
    experienceYearsIndustry: 0,
    courses: [],
    workloadDistribution: {
      directTeachingHours: rank === 'assistant_professor' ? 16 : rank === 'associate_professor' ? 14 : 12,
      studentMentoringHours: 4,
      researchAndScholarshipHours: rank === 'assistant_professor' ? 10 : rank === 'associate_professor' ? 12 : 14,
      administrativeGovernanceHours: rank === 'assistant_professor' ? 4 : rank === 'associate_professor' ? 6 : 8,
      prepAndEvaluationHours: 4
    },
    classesScheduled: 60,
    classesHeld: 60,
    studentFeedbackRating: 4.5,
    syllabusCoveragePercent: 100,
    averagePassPercent: 90,
    examDutiesCount: 10,
    institutionalRoles: [],
    mentoringStudentsCount: 20,
    publications: [],
    projects: [],
    guidance: [],
    patents: [],
    fdpAttendedOrOrganized: [],
    invitedKeynotes: [],
    activeCourseName: '',
    activeCourseCode: '',
    courseSemester: '',
    courseOutcomes: [
      { code: 'CO1', description: '', bloomsLevel: 'Understand', targetAttainmentPercent: 75 },
      { code: 'CO2', description: '', bloomsLevel: 'Apply', targetAttainmentPercent: 75 }
    ],
    lessonPlanEntries: [],
    hodRemarks: '',
    hodRecommendation: 'Satisfactory',
    deanRemarks: ''
  };
};
