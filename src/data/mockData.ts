import { 
  StudentProfile, 
  AttendanceSubject, 
  SemesterSGPA, 
  TimetableEntry, 
  ExamItem, 
  StudyTask, 
  CampusBlock, 
  DailyMessMenu, 
  LostFoundItem, 
  CampusEvent, 
  CampusClub 
} from '../types';

export const initialStudentProfile: StudentProfile = {
  name: "Aarav Sharma",
  registrationNo: "2023CSB1048",
  program: "Bachelor of Technology",
  specialization: "Computer Science & Distributed Systems",
  semester: 7,
  academicYear: "2026 – 2027",
  currentCGPA: 8.84,
  targetCGPA: 9.00,
  completedCredits: 124,
  totalCredits: 160,
  overallAttendance: 84.6,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  advisor: "Dr. Evelyn Vance, Department of Computing",
  hall: "Tagore Residence Hall",
  roomNo: "B-304"
};

export const initialAttendanceSubjects: AttendanceSubject[] = [
  {
    id: "sub-1",
    code: "CS-401",
    name: "Distributed Cloud Architecture",
    attended: 38,
    total: 44,
    professor: "Prof. Vikramaditya Rao",
    credits: 4,
    type: "Theory",
    room: "Block 34 • LH 302",
    lastUpdated: "Today, 10:15 AM",
    history: [
      { date: "2026-11-20", status: "present" },
      { date: "2026-11-18", status: "present" },
      { date: "2026-11-16", status: "present" },
      { date: "2026-11-13", status: "absent" }
    ]
  },
  {
    id: "sub-2",
    code: "CS-405",
    name: "Machine Learning & Neural Dynamics",
    attended: 34,
    total: 42,
    professor: "Dr. Samantha Wright",
    credits: 4,
    type: "Theory",
    room: "Block 34 • LH 104",
    lastUpdated: "Yesterday, 02:40 PM",
    history: [
      { date: "2026-11-19", status: "present" },
      { date: "2026-11-17", status: "absent" },
      { date: "2026-11-14", status: "present" }
    ]
  },
  {
    id: "sub-3",
    code: "CS-412",
    name: "GPU Computing & Parallel Kernels",
    attended: 29,
    total: 35,
    professor: "Dr. K. S. Ramanujan",
    credits: 3,
    type: "Practical",
    room: "Block 32 • Systems Lab 204",
    lastUpdated: "Nov 18, 04:00 PM",
    history: [
      { date: "2026-11-18", status: "present" },
      { date: "2026-11-11", status: "present" }
    ]
  },
  {
    id: "sub-4",
    code: "CS-418",
    name: "Applied Cryptography & Consensus",
    attended: 33,
    total: 37,
    professor: "Prof. Arthur Pendelton",
    credits: 3,
    type: "Theory",
    room: "Block 36 • Seminar Hall A",
    lastUpdated: "Nov 17, 11:30 AM",
    history: [
      { date: "2026-11-17", status: "present" },
      { date: "2026-11-15", status: "present" }
    ]
  },
  {
    id: "sub-5",
    code: "HS-302",
    name: "Ethics in Autonomous Systems & Law",
    attended: 23,
    total: 30,
    professor: "Dr. Meera Nambiar",
    credits: 2,
    type: "Tutorial",
    room: "Block 34 • Room 215",
    lastUpdated: "Nov 19, 09:45 AM",
    history: [
      { date: "2026-11-19", status: "absent" },
      { date: "2026-11-12", status: "present" }
    ]
  },
  {
    id: "sub-6",
    code: "CS-420",
    name: "Advanced Capstone Project & Colloquium",
    attended: 22,
    total: 24,
    professor: "Dr. Evelyn Vance",
    credits: 4,
    type: "Practical",
    room: "Block 36 • Research Lab 401",
    lastUpdated: "Nov 16, 05:00 PM",
    history: [
      { date: "2026-11-16", status: "present" },
      { date: "2026-11-09", status: "present" }
    ]
  }
];

export const initialSemestersSGPA: SemesterSGPA[] = [
  {
    semester: 1,
    sgpa: 8.42,
    credits: 20,
    status: 'completed',
    courses: [
      { code: "MA-101", name: "Calculus & Linear Algebra", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "PH-101", name: "Quantum Mechanics & Optics", credits: 4, grade: "A", gradePoint: 8 },
      { code: "CS-101", name: "Algorithmic Problem Solving", credits: 4, grade: "O", gradePoint: 10 },
      { code: "EE-101", name: "Basic Electrical Engineering", credits: 4, grade: "B+", gradePoint: 7 },
      { code: "HS-101", name: "Professional Communication", credits: 4, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 2,
    sgpa: 8.65,
    credits: 21,
    status: 'completed',
    courses: [
      { code: "MA-102", name: "Differential Equations & Transforms", credits: 4, grade: "A", gradePoint: 8 },
      { code: "CS-102", name: "Data Structures & Abstractions", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-104", name: "Digital Logic & Circuit Design", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CH-101", name: "Materials Chemistry", credits: 3, grade: "B+", gradePoint: 7 },
      { code: "CS-108", name: "Object Oriented Design in C++", credits: 3, grade: "O", gradePoint: 10 },
      { code: "HS-102", name: "Environmental Governance", credits: 3, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 3,
    sgpa: 8.90,
    credits: 22,
    status: 'completed',
    courses: [
      { code: "CS-201", name: "Design & Analysis of Algorithms", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-203", name: "Computer Organization & Architecture", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "MA-201", name: "Discrete Mathematical Structures", credits: 4, grade: "A", gradePoint: 8 },
      { code: "CS-205", name: "Operating Systems Principles", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-207", name: "Database Management Systems", credits: 3, grade: "O", gradePoint: 10 },
      { code: "HS-201", name: "Philosophy of Technology", credits: 3, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 4,
    sgpa: 8.78,
    credits: 21,
    status: 'completed',
    courses: [
      { code: "CS-202", name: "Computer Networks & Protocols", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-204", name: "Theory of Computation & Automata", credits: 4, grade: "A", gradePoint: 8 },
      { code: "CS-206", name: "Software Engineering & Architecture", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "MA-202", name: "Probability & Stochastic Processes", credits: 3, grade: "B+", gradePoint: 7 },
      { code: "CS-210", name: "Unix Internals & Shell Systems", credits: 3, grade: "O", gradePoint: 10 },
      { code: "HS-204", name: "Macroeconomics & Innovation", credits: 3, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 5,
    sgpa: 9.15,
    credits: 20,
    status: 'completed',
    courses: [
      { code: "CS-301", name: "Compiler Design & Code Generation", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-303", name: "Artificial Intelligence Foundations", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-305", name: "Information Security & Cryptanalysis", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-307", name: "Web Systems & Microservices", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "OE-301", name: "Behavioral Economics", credits: 4, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 6,
    sgpa: 9.08,
    credits: 20,
    status: 'completed',
    courses: [
      { code: "CS-302", name: "Distributed Systems & Consistency", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-304", name: "Data Warehousing & Large Scale Mining", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-308", name: "Cloud Native Systems & Kubernetes", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-314", name: "Natural Language Processing", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-390", name: "Junior Research Seminar", credits: 4, grade: "A", gradePoint: 8 },
    ]
  },
  {
    semester: 7,
    sgpa: 0,
    credits: 20,
    status: 'in-progress',
    courses: [
      { code: "CS-401", name: "Distributed Cloud Architecture", credits: 4, grade: "O", gradePoint: 10 },
      { code: "CS-405", name: "Machine Learning & Neural Dynamics", credits: 4, grade: "A+", gradePoint: 9 },
      { code: "CS-412", name: "GPU Computing & Parallel Kernels", credits: 3, grade: "A+", gradePoint: 9 },
      { code: "CS-418", name: "Applied Cryptography & Consensus", credits: 3, grade: "O", gradePoint: 10 },
      { code: "HS-302", name: "Ethics in Autonomous Systems & Law", credits: 2, grade: "A", gradePoint: 8 },
      { code: "CS-420", name: "Advanced Capstone Project & Colloquium", credits: 4, grade: "O", gradePoint: 10 },
    ]
  }
];

export const weeklyTimetable: TimetableEntry[] = [
  // Monday
  {
    id: "tt-mon-1",
    code: "CS-401",
    name: "Distributed Cloud Architecture",
    type: "Lecture",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    block: "Block 34",
    room: "Lecture Hall 302",
    professor: "Prof. Vikramaditya Rao"
  },
  {
    id: "tt-mon-2",
    code: "CS-405",
    name: "Machine Learning & Neural Dynamics",
    type: "Lecture",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    block: "Block 34",
    room: "Lecture Hall 104",
    professor: "Dr. Samantha Wright"
  },
  {
    id: "tt-mon-3",
    code: "CS-412",
    name: "GPU Computing Lab",
    type: "Lab",
    day: "Monday",
    startTime: "14:00",
    endTime: "16:00",
    block: "Block 32",
    room: "Systems Lab 204",
    professor: "Dr. K. S. Ramanujan"
  },

  // Tuesday
  {
    id: "tt-tue-1",
    code: "CS-418",
    name: "Applied Cryptography & Consensus",
    type: "Lecture",
    day: "Tuesday",
    startTime: "09:30",
    endTime: "11:00",
    block: "Block 36",
    room: "Seminar Hall A",
    professor: "Prof. Arthur Pendelton"
  },
  {
    id: "tt-tue-2",
    code: "HS-302",
    name: "Ethics in Autonomous Systems & Law",
    type: "Tutorial",
    day: "Tuesday",
    startTime: "11:30",
    endTime: "12:45",
    block: "Block 34",
    room: "Room 215",
    professor: "Dr. Meera Nambiar"
  },
  {
    id: "tt-tue-3",
    code: "CS-420",
    name: "Capstone Research Colloquium",
    type: "Seminar",
    day: "Tuesday",
    startTime: "14:30",
    endTime: "16:30",
    block: "Block 36",
    room: "Research Lab 401",
    professor: "Dr. Evelyn Vance"
  },

  // Wednesday
  {
    id: "tt-wed-1",
    code: "CS-401",
    name: "Distributed Cloud Architecture",
    type: "Lecture",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "10:30",
    block: "Block 34",
    room: "Lecture Hall 302",
    professor: "Prof. Vikramaditya Rao"
  },
  {
    id: "tt-wed-2",
    code: "CS-405",
    name: "Machine Learning & Neural Dynamics",
    type: "Lecture",
    day: "Wednesday",
    startTime: "11:00",
    endTime: "12:30",
    block: "Block 34",
    room: "Lecture Hall 104",
    professor: "Dr. Samantha Wright"
  },
  {
    id: "tt-wed-3",
    code: "CS-412",
    name: "GPU Computing & Parallel Kernels",
    type: "Lecture",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "15:30",
    block: "Block 32",
    room: "Lecture Theater 101",
    professor: "Dr. K. S. Ramanujan"
  },

  // Thursday (Today)
  {
    id: "tt-thu-1",
    code: "CS-418",
    name: "Applied Cryptography & Consensus",
    type: "Lecture",
    day: "Thursday",
    startTime: "09:00",
    endTime: "10:30",
    block: "Block 36",
    room: "Seminar Hall A",
    professor: "Prof. Arthur Pendelton"
  },
  {
    id: "tt-thu-2",
    code: "CS-401",
    name: "Distributed Cloud Architecture",
    type: "Lecture",
    day: "Thursday",
    startTime: "11:00",
    endTime: "12:30",
    block: "Block 34",
    room: "Lecture Hall 302",
    professor: "Prof. Vikramaditya Rao",
    isCurrent: false,
    isNext: true
  },
  {
    id: "tt-thu-3",
    code: "CS-405",
    name: "Machine Learning Lab & Workshop",
    type: "Lab",
    day: "Thursday",
    startTime: "14:00",
    endTime: "16:00",
    block: "Block 32",
    room: "AI Computing Cluster 308",
    professor: "Dr. Samantha Wright"
  },
  {
    id: "tt-thu-4",
    code: "UNI-KEYNOTE",
    name: "Distinguished Dean Lecture Series",
    type: "Seminar",
    day: "Thursday",
    startTime: "16:30",
    endTime: "18:00",
    block: "Unipolis",
    room: "Main Auditorium",
    professor: "Vice Chancellor & Guest Fellow"
  },

  // Friday
  {
    id: "tt-fri-1",
    code: "CS-412",
    name: "GPU Computing & Parallel Kernels",
    type: "Lecture",
    day: "Friday",
    startTime: "09:30",
    endTime: "11:00",
    block: "Block 32",
    room: "Lecture Theater 101",
    professor: "Dr. K. S. Ramanujan"
  },
  {
    id: "tt-fri-2",
    code: "HS-302",
    name: "Ethics in Autonomous Systems & Law",
    type: "Lecture",
    day: "Friday",
    startTime: "11:30",
    endTime: "13:00",
    block: "Block 34",
    room: "Room 215",
    professor: "Dr. Meera Nambiar"
  },
  {
    id: "tt-fri-3",
    code: "CS-420",
    name: "Capstone Sprint Review & Demos",
    type: "Lab",
    day: "Friday",
    startTime: "14:30",
    endTime: "17:00",
    block: "Block 36",
    room: "Research Lab 401",
    professor: "Dr. Evelyn Vance"
  },

  // Saturday
  {
    id: "tt-sat-1",
    code: "CS-HACK",
    name: "Open Source Systems Incubator",
    type: "Seminar",
    day: "Saturday",
    startTime: "10:00",
    endTime: "13:00",
    block: "Block 32",
    room: "Open Collaborative Workspace 1",
    professor: "Student Council Mentors"
  }
];

export const upcomingExams: ExamItem[] = [
  {
    id: "ex-1",
    code: "CS-401",
    name: "Distributed Cloud Architecture",
    type: "End-Term Exam",
    date: "2026-11-28", // In 8 days
    time: "10:00 AM - 01:00 PM",
    duration: "3 Hours",
    block: "Block 34",
    room: "Lecture Hall Complex 302",
    seatNumber: "Desk C-14",
    hallTicketStatus: "Approved",
    syllabusProgress: 88,
    totalUnits: 5,
    completedUnits: 4.4
  },
  {
    id: "ex-2",
    code: "CS-405",
    name: "Machine Learning & Neural Dynamics",
    type: "End-Term Exam",
    date: "2026-12-02",
    time: "02:00 PM - 05:00 PM",
    duration: "3 Hours",
    block: "Block 34",
    room: "Lecture Hall Complex 104",
    seatNumber: "Desk B-08",
    hallTicketStatus: "Approved",
    syllabusProgress: 75,
    totalUnits: 6,
    completedUnits: 4.5
  },
  {
    id: "ex-3",
    code: "CS-418",
    name: "Applied Cryptography & Consensus",
    type: "End-Term Exam",
    date: "2026-12-05",
    time: "10:00 AM - 01:00 PM",
    duration: "3 Hours",
    block: "Block 36",
    room: "Auditorium Annex A",
    seatNumber: "Desk E-22",
    hallTicketStatus: "Approved",
    syllabusProgress: 64,
    totalUnits: 5,
    completedUnits: 3.2
  },
  {
    id: "ex-4",
    code: "CS-412",
    name: "GPU Computing & Parallel Kernels",
    type: "Practical Viva",
    date: "2026-12-08",
    time: "09:00 AM - 12:30 PM",
    duration: "3.5 Hours",
    block: "Block 32",
    room: "Systems Lab 204",
    seatNumber: "Terminal 19",
    hallTicketStatus: "Approved",
    syllabusProgress: 92,
    totalUnits: 4,
    completedUnits: 3.7
  },
  {
    id: "ex-5",
    code: "HS-302",
    name: "Ethics in Autonomous Systems & Law",
    type: "End-Term Exam",
    date: "2026-12-11",
    time: "02:00 PM - 04:30 PM",
    duration: "2.5 Hours",
    block: "Block 34",
    room: "Hall 215",
    seatNumber: "Desk A-03",
    hallTicketStatus: "Pending Verification",
    syllabusProgress: 55,
    totalUnits: 4,
    completedUnits: 2.2
  }
];

export const initialStudyTasks: StudyTask[] = [
  {
    id: "task-1",
    subjectCode: "CS-401",
    subjectName: "Distributed Cloud Architecture",
    title: "Revise Raft vs Paxos leader election & consensus proofs",
    priority: "High",
    dueDate: "2026-11-22",
    completed: true,
    estimatedHours: 3.5
  },
  {
    id: "task-2",
    subjectCode: "CS-401",
    subjectName: "Distributed Cloud Architecture",
    title: "Practice 3-tier microservice partition tolerance problems",
    priority: "High",
    dueDate: "2026-11-24",
    completed: false,
    estimatedHours: 4.0
  },
  {
    id: "task-3",
    subjectCode: "CS-405",
    subjectName: "Machine Learning & Neural Dynamics",
    title: "Derive Backprop gradient flow for Transformer Attention heads",
    priority: "High",
    dueDate: "2026-11-25",
    completed: false,
    estimatedHours: 3.0
  },
  {
    id: "task-4",
    subjectCode: "CS-418",
    subjectName: "Applied Cryptography & Consensus",
    title: "Complete zero-knowledge zk-SNARK mathematical proofs summary",
    priority: "Medium",
    dueDate: "2026-11-27",
    completed: false,
    estimatedHours: 2.5
  },
  {
    id: "task-5",
    subjectCode: "CS-412",
    subjectName: "GPU Computing & Parallel Kernels",
    title: "Benchmark CUDA shared memory matrix tiling code on RTX nodes",
    priority: "Medium",
    dueDate: "2026-11-29",
    completed: true,
    estimatedHours: 2.0
  },
  {
    id: "task-6",
    subjectCode: "HS-302",
    subjectName: "Ethics in Autonomous Systems & Law",
    title: "Draft case study briefing on AI liability in surgical bots",
    priority: "Low",
    dueDate: "2026-12-01",
    completed: false,
    estimatedHours: 1.5
  }
];

export const campusBlocks: CampusBlock[] = [
  {
    id: "block-32",
    number: "Block 32",
    name: "Computing & Experimental Systems Hub",
    subtitle: "High-Performance Computing, Systems Engineering & Robotics",
    category: "Academics & Labs",
    departments: ["Computer Science & Engineering", "Robotics & Automation", "Supercomputing Center"],
    floors: 5,
    coordinates: { x: 26, y: 34 },
    crowdLevel: "Busy",
    capacityPct: 82,
    openHours: "07:30 AM – 11:00 PM",
    facilities: ["NVIDIA DGX Supercomputing Cluster", "Systems Hardware Lab 204", "IoT & Robotics Arena", "Maker Studio", "Student Lounge"],
    description: "The technological nerve-center of the campus. Houses the supercomputing infrastructure, 14 advanced hardware and experimental AI laboratories, and round-the-clock research spaces for senior engineers.",
    keyRooms: [
      { number: "204", name: "GPU & Systems Architecture Lab", floor: "2nd Floor" },
      { number: "308", name: "AI Neural Computing Cluster", floor: "3rd Floor" },
      { number: "101", name: "Experimental Theater", floor: "Ground Floor" },
      { number: "405", name: "Cyber-Physical Systems Lab", floor: "4th Floor" }
    ]
  },
  {
    id: "block-34",
    number: "Block 34",
    name: "Central Academic & Lecture Complex",
    subtitle: "Tiered Amphitheaters, Department Deanery & Examination Halls",
    category: "Lecture Complex",
    departments: ["School of Computer Science", "Department of Mathematics", "Humanities & Social Sciences"],
    floors: 6,
    coordinates: { x: 50, y: 30 },
    crowdLevel: "Moderate",
    capacityPct: 64,
    openHours: "08:00 AM – 09:30 PM",
    facilities: ["Amphitheater LH 302 (Capacity 280)", "Lecture Hall 104", "Dean of Academic Affairs Office", "Quiet Study Pavilions", "Espresso Bar"],
    description: "The primary lecture building featuring acoustically-tuned tiered amphitheaters, faculty consultation suites, and the examination control office. Renowned for its classical collegiate brick architecture.",
    keyRooms: [
      { number: "LH 302", name: "Grand Tiered Amphitheater", floor: "3rd Floor" },
      { number: "LH 104", name: "Audio-Visual Lecture Hall", floor: "1st Floor" },
      { number: "215", name: "Seminar Room & Colloquium", floor: "2nd Floor" },
      { number: "501", name: "Academic Dean & Registry", floor: "5th Floor" }
    ]
  },
  {
    id: "block-36",
    number: "Block 36",
    name: "Advanced Research & Postgraduate Senate",
    subtitle: "Doctoral Chambers, Cryptography Research & Institutional Archives",
    category: "Research & Seminar",
    departments: ["Advanced Research Directorate", "Quantum & Cryptographic Labs", "Faculty of Engineering"],
    floors: 5,
    coordinates: { x: 74, y: 38 },
    crowdLevel: "Low",
    capacityPct: 41,
    openHours: "08:00 AM – 10:00 PM",
    facilities: ["Auditorium Annex A", "Cryptographic Consensus Lab", "Postgraduate Reading Chamber", "Archival Reference Library"],
    description: "Dedicated to cutting-edge doctoral investigation and faculty scholarship. Features high-security cryptographic testing grounds, acoustic seminar pods, and quiet research chambers with vaulted ceilings.",
    keyRooms: [
      { number: "Hall A", name: "Seminar Hall of Scholars", floor: "Ground Floor" },
      { number: "401", name: "Capstone Colloquium Suite", floor: "4th Floor" },
      { number: "302", name: "Applied Cryptography Vault", floor: "3rd Floor" },
      { number: "210", name: "Postdoctoral Fellowship Pods", floor: "2nd Floor" }
    ]
  },
  {
    id: "unipolis",
    number: "Unipolis",
    name: "The Unipolis Arena & Cultural Center",
    subtitle: "3,500-Seat Grand Amphitheater, Student Guild & Convention Center",
    category: "Auditorium & Events",
    departments: ["Student Affairs Council", "Cultural & Arts Directorate", "University Athletic Board"],
    floors: 4,
    coordinates: { x: 50, y: 68 },
    crowdLevel: "Moderate",
    capacityPct: 53,
    openHours: "06:00 AM – 11:30 PM",
    facilities: ["3,500-Seat Main Auditorium", "Exhibition Promenade", "Student Society Headquarters", "Indoor Badminton & Squash Arena", "Food Arcade"],
    description: "The grand cultural monumental centerpiece of the university. Hosts global symposia, hackathon finals, convocation ceremonies, musical concerts, and student society conclaves under its iconic curved glass roof.",
    keyRooms: [
      { number: "Grand Hall", name: "Main Convocation Auditorium", floor: "Ground Floor" },
      { number: "Room 102", name: "Student Council Secretariat", floor: "Mezzanine" },
      { number: "Gallery 3", name: "Exhibition & Hackathon Arcade", floor: "1st Floor" },
      { number: "Arena West", name: "Recreational & Athletic Wing", floor: "Ground Floor" }
    ]
  }
];

export const weeklyMessMenu: DailyMessMenu[] = [
  {
    day: "Monday",
    date: "Nov 17, 2026",
    meals: {
      Breakfast: {
        id: "m-mon-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 09:30 AM",
        items: ["Steamed Idli with Sambar", "Crispy Medu Vada", "Coconut & Tomato Chutney", "Boiled Eggs / Sprouts", "Fresh Papaya", "Filter Coffee & Masala Chai"],
        calories: 520,
        proteinGrams: 18,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.4,
        reviewsCount: 89
      },
      Lunch: {
        id: "m-mon-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        specialBadge: "Chef Signature",
        items: ["Paneer Lababdar", "Dal Tadka (Double Tadka)", "Jeera Basmati Rice", "Tandoori Butter Roti", "Cucumber Mint Raita", "Moong Dal Halwa"],
        calories: 780,
        proteinGrams: 28,
        dietaryTags: ["Veg", "Jain Friendly", "Chef Special"],
        rating: 4.7,
        reviewsCount: 142
      },
      Snacks: {
        id: "m-mon-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Vegetable Cutlet with Mint Dip", "Corn & Cheese Sandwiches", "Adrak Chai & Cold Coffee"],
        calories: 340,
        proteinGrams: 9,
        dietaryTags: ["Veg"],
        rating: 4.1,
        reviewsCount: 76
      },
      Dinner: {
        id: "m-mon-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        items: ["Aloo Gobhi Adraki", "Panchmel Dal", "Phulka with Pure Ghee", "Steamed Sona Masoori Rice", "Fresh Tossed Salad", "Almond Kheer"],
        calories: 680,
        proteinGrams: 22,
        dietaryTags: ["Veg", "Jain Friendly"],
        rating: 4.3,
        reviewsCount: 110
      }
    }
  },
  {
    day: "Tuesday",
    date: "Nov 18, 2026",
    meals: {
      Breakfast: {
        id: "m-tue-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 09:30 AM",
        items: ["Poha with Roasted Peanuts & Sev", "Aloo Paratha with Curd", "Green Chutney & Pickle", "Seasonal Fruit Bowl", "Tea & Coffee"],
        calories: 560,
        proteinGrams: 15,
        dietaryTags: ["Veg"],
        rating: 4.2,
        reviewsCount: 94
      },
      Lunch: {
        id: "m-tue-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        items: ["Rajma Masala (Punjabi Style)", "Subz Korma", "Steamed Basmati Rice", "Chapati", "Boondi Raita", "Gulab Jamun"],
        calories: 740,
        proteinGrams: 26,
        dietaryTags: ["Veg"],
        rating: 4.6,
        reviewsCount: 135
      },
      Snacks: {
        id: "m-tue-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Samosa with Saunth Chutney", "Masala Biscuits", "Kashmiri Kahwa & Lemon Tea"],
        calories: 360,
        proteinGrams: 7,
        dietaryTags: ["Veg"],
        rating: 4.5,
        reviewsCount: 88
      },
      Dinner: {
        id: "m-tue-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        items: ["Dum Aloo Kashmiri", "Yellow Moong Dal Fry", "Tawa Naan & Phulka", "Peas Pulao", "Pickled Beetroot", "Fruit Custard"],
        calories: 710,
        proteinGrams: 20,
        dietaryTags: ["Veg"],
        rating: 4.3,
        reviewsCount: 102
      }
    }
  },
  {
    day: "Wednesday",
    date: "Nov 19, 2026",
    meals: {
      Breakfast: {
        id: "m-wed-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 09:30 AM",
        items: ["Crispy Masala Dosa", "Sambar & Chutney Trio", "Oats Porridge with Dry Fruits", "Boiled Eggs / Tofu Scramble", "Coffee & Tea"],
        calories: 540,
        proteinGrams: 17,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.8,
        reviewsCount: 160
      },
      Lunch: {
        id: "m-wed-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        specialBadge: "South Indian Feast",
        items: ["Avial (Kerala Style)", "Mysore Rasam", "Cabbage Poriyal", "Steamed Brown Rice", "Poori with Chana Masala", "Payasam"],
        calories: 760,
        proteinGrams: 24,
        dietaryTags: ["Veg", "Vegan"],
        rating: 4.5,
        reviewsCount: 120
      },
      Snacks: {
        id: "m-wed-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Pav Bhaji (Amul Butter)", "Spiced Buttermilk", "Ginger Elaichi Tea"],
        calories: 410,
        proteinGrams: 11,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.9,
        reviewsCount: 155
      },
      Dinner: {
        id: "m-wed-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        items: ["Methi Malai Matar", "Dal Makhani (Slow-Cooked 12 hrs)", "Jeera Rice", "Missi Roti & Phulka", "Kachumber Salad", "Rasgulla"],
        calories: 820,
        proteinGrams: 29,
        dietaryTags: ["Veg", "Jain Friendly"],
        rating: 4.7,
        reviewsCount: 140
      }
    }
  },
  {
    day: "Thursday",
    date: "Nov 20, 2026",
    meals: {
      Breakfast: {
        id: "m-thu-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 09:30 AM",
        specialBadge: "Today's Breakfast",
        items: ["Uttapam with Onion & Tomato", "Coconut Chutney & Tomato Chutney", "Upma with Mixed Veggies", "Scrambled Eggs / Sprouts", "Maltova / Filter Coffee"],
        calories: 510,
        proteinGrams: 16,
        dietaryTags: ["Veg"],
        rating: 4.3,
        reviewsCount: 95
      },
      Lunch: {
        id: "m-thu-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        specialBadge: "Today's Lunch • Special",
        items: ["Shahi Paneer in Cashew Gravy", "Dal Palak (Spinach Lentils)", "Vegetable Biryani with Crispy Onions", "Burani Garlic Raita", "Laccha Paratha", "Rasmalai"],
        calories: 810,
        proteinGrams: 27,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.8,
        reviewsCount: 178
      },
      Snacks: {
        id: "m-thu-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        specialBadge: "Today's Evening High-Tea",
        items: ["Crispy Bread Pakora with Green Chutney", "Bhel Puri", "Special Cutting Chai & Filter Coffee"],
        calories: 380,
        proteinGrams: 8,
        dietaryTags: ["Veg"],
        rating: 4.6,
        reviewsCount: 112
      },
      Dinner: {
        id: "m-thu-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        specialBadge: "Tonight's Dinner",
        items: ["Kadhai Mushroom Masala", "Chana Dal with Desi Ghee", "Steamed Basmati Rice", "Soft Phulkas", "Sirka Onion Salad", "Hot Gajar ka Halwa"],
        calories: 740,
        proteinGrams: 24,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.7,
        reviewsCount: 130
      }
    }
  },
  {
    day: "Friday",
    date: "Nov 21, 2026",
    meals: {
      Breakfast: {
        id: "m-fri-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 09:30 AM",
        items: ["Bedmi Puri with Aloo Sabzi", "Moong Sprout Chaat", "Fresh Watermelon Slices", "Tea & Coffee"],
        calories: 610,
        proteinGrams: 14,
        dietaryTags: ["Veg"],
        rating: 4.5,
        reviewsCount: 115
      },
      Lunch: {
        id: "m-fri-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        items: ["Chole Bhature with Pickled Chillies", "Dal Fry", "Jeera Rice", "Pudina Raita", "Gajar Mirch Achar", "Jalebi with Rabri"],
        calories: 880,
        proteinGrams: 25,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.9,
        reviewsCount: 220
      },
      Snacks: {
        id: "m-fri-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Veg Cheese Grilled Sandwiches", "Potato Crisps", "Cold Bournvita & Masala Chai"],
        calories: 360,
        proteinGrams: 10,
        dietaryTags: ["Veg"],
        rating: 4.4,
        reviewsCount: 92
      },
      Dinner: {
        id: "m-fri-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        items: ["Paneer Butter Masala", "Dal Panchratna", "Kashmiri Pulao", "Butter Naan", "Pineapple Raita", "Ice Cream Sundae"],
        calories: 790,
        proteinGrams: 26,
        dietaryTags: ["Veg", "Jain Friendly"],
        rating: 4.8,
        reviewsCount: 165
      }
    }
  },
  {
    day: "Saturday",
    date: "Nov 22, 2026",
    meals: {
      Breakfast: {
        id: "m-sat-bf",
        mealType: "Breakfast",
        timeSlot: "07:30 AM – 10:00 AM",
        items: ["Rava Masala Dosa", "Sambar & Podi Chutney", "Fresh Bananas", "Boiled Eggs / Tofu", "Masala Chai"],
        calories: 510,
        proteinGrams: 16,
        dietaryTags: ["Veg"],
        rating: 4.4,
        reviewsCount: 88
      },
      Lunch: {
        id: "m-sat-lu",
        mealType: "Lunch",
        timeSlot: "12:00 PM – 02:30 PM",
        items: ["Kadhi Pakoda", "Aloo Jeera", "Steamed Basmati Rice", "Roti", "Papad & Chutney", "Sooji Halwa"],
        calories: 710,
        proteinGrams: 20,
        dietaryTags: ["Veg"],
        rating: 4.2,
        reviewsCount: 104
      },
      Snacks: {
        id: "m-sat-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Khaman Dhokla with Green Chutney", "Salted Peanuts", "Tea"],
        calories: 290,
        proteinGrams: 9,
        dietaryTags: ["Veg", "Jain Friendly"],
        rating: 4.3,
        reviewsCount: 75
      },
      Dinner: {
        id: "m-sat-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 10:00 PM",
        specialBadge: "Weekend Continental Feast",
        items: ["Creamy Penne Alfredo with Herb Vegetables", "Crispy Garlic Bread with Mozzarella", "Minestrone Broth", "Caesar Salad", "Warm Walnut Brownie"],
        calories: 840,
        proteinGrams: 23,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.9,
        reviewsCount: 245
      }
    }
  },
  {
    day: "Sunday",
    date: "Nov 23, 2026",
    meals: {
      Breakfast: {
        id: "m-sun-bf",
        mealType: "Breakfast",
        timeSlot: "08:00 AM – 10:30 AM",
        specialBadge: "Sunday Grand Brunch",
        items: ["Fluffy Pancakes with Maple Syrup", "Hash Browns", "Paneer Bhurji / Egg Bhurji", "Fresh Orange Juice", "Espresso & Cappuccino"],
        calories: 640,
        proteinGrams: 22,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.9,
        reviewsCount: 230
      },
      Lunch: {
        id: "m-sun-lu",
        mealType: "Lunch",
        timeSlot: "12:30 PM – 03:00 PM",
        specialBadge: "Hyderabadi Dum Biryani Feast",
        items: ["Nawabi Paneer Dum Biryani", "Mirchi ka Salan", "Dahi ki Chutney", "Veg Shammi Kebab", "Double ka Meetha"],
        calories: 890,
        proteinGrams: 28,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.9,
        reviewsCount: 260
      },
      Snacks: {
        id: "m-sun-sn",
        mealType: "Snacks",
        timeSlot: "05:00 PM – 06:30 PM",
        items: ["Maggi Noodles Bar (Veggie/Cheese)", "Chai & Iced Lemon Tea"],
        calories: 380,
        proteinGrams: 8,
        dietaryTags: ["Veg"],
        rating: 4.7,
        reviewsCount: 140
      },
      Dinner: {
        id: "m-sun-di",
        mealType: "Dinner",
        timeSlot: "07:30 PM – 09:45 PM",
        items: ["Malai Kofta in Velvety Gravy", "Dal Maharani", "Jeera Rice", "Butter Phulka", "Green Salad", "Angoori Gulab Jamun"],
        calories: 780,
        proteinGrams: 24,
        dietaryTags: ["Veg", "Chef Special"],
        rating: 4.8,
        reviewsCount: 175
      }
    }
  }
];

export const initialLostFoundItems: LostFoundItem[] = [
  {
    id: "lf-1",
    type: "lost",
    title: "Graphite Apple Pencil (2nd Gen)",
    category: "Electronics",
    location: "Block 34 • Amphitheater LH 302, Row 4",
    dateReported: "Today, 10:45 AM",
    description: "Has a tiny collegiate crest sticker near the tip. Left behind during the morning Distributed Systems lecture.",
    status: "unclaimed",
    contactPerson: "Aarav Sharma",
    contactEmail: "aarav.sharma@campusone.edu",
    phone: "+91 98765 43210",
    rewardOffered: "Free Coffee & Gratitude"
  },
  {
    id: "lf-2",
    type: "found",
    title: "Texas Instruments TI-84 Plus CE Calculator",
    category: "Electronics",
    location: "Block 32 • Systems Lab 204, Desk 12",
    dateReported: "Yesterday, 04:30 PM",
    description: "Navy blue casing with gold sticker initial 'R.K.' on the back cover. Turned in to Lab Attendant Mr. Mohan.",
    status: "unclaimed",
    contactPerson: "Lab Attendant Mohan",
    contactEmail: "mohan.syslab@campusone.edu",
    finderDepartment: "Computing Systems Division"
  },
  {
    id: "lf-3",
    type: "found",
    title: "RFID Campus Identity Card & Lanyard",
    category: "IDs & Wallets",
    location: "Unipolis • Central Concourse near Main Auditorium",
    dateReported: "Nov 19, 06:15 PM",
    description: "Student ID belonging to Rohan Verma (Reg: 2024ECA1092) with dark forest green lanyard. Kept safely at Security Post 2.",
    status: "unclaimed",
    contactPerson: "Chief Warden Office",
    contactEmail: "security.unipolis@campusone.edu"
  },
  {
    id: "lf-4",
    type: "lost",
    title: "Brown Leather Moleskine Notebook & Parker Pen",
    category: "Books & Stationery",
    location: "Block 36 • Research Seminar Hall A",
    dateReported: "Nov 18, 01:20 PM",
    description: "Contains handwritten research notes on zero-knowledge cryptographic proofs. Great personal and academic value.",
    status: "unclaimed",
    contactPerson: "Dr. Evelyn Vance",
    contactEmail: "evelyn.vance@campusone.edu"
  },
  {
    id: "lf-5",
    type: "found",
    title: "Noise-Cancelling AirPods Pro (White case in Tan Leather sleeve)",
    category: "Electronics",
    location: "Central Library • 3rd Floor Quiet Reading Gallery",
    dateReported: "Nov 17, 03:00 PM",
    description: "Found on study cubicle #48. Currently stored in Library Help Desk safe. Proof of serial number required for claim.",
    status: "claimed",
    contactPerson: "Head Librarian Desk",
    contactEmail: "circulation@campusone.edu"
  },
  {
    id: "lf-6",
    type: "lost",
    title: "Set of Room & Bike Keys with Brass Compass Keychain",
    category: "Bags & Keys",
    location: "Between Block 32 and Tagore Residence Hall path",
    dateReported: "Nov 16, 09:10 PM",
    description: "Three silver keys, one master padlock key, and an antique brass nautical compass keychain.",
    status: "unclaimed",
    contactPerson: "Kabir Mehta",
    contactEmail: "k.mehta@campusone.edu"
  }
];

export const campusEvents: CampusEvent[] = [
  {
    id: "ev-1",
    title: "Turing Conclave 2026: Systems & AI Frontiers",
    category: "Technical",
    date: "Nov 28, 2026",
    time: "09:30 AM – 06:00 PM",
    venue: "Main Auditorium & Exhibition Gallery",
    block: "Unipolis",
    club: "Turing Computing Guild",
    clubAvatar: "TCG",
    description: "The university's flagship annual symposium. Keynotes from industry chief architects on sovereign AI infrastructure, distributed verifiable consensus, and neuromorphic chip architectures.",
    rsvpCount: 384,
    maxCapacity: 500,
    isRsvp: true,
    registrationOpen: true,
    passId: "TCG-2026-VIP-084",
    badge: "Flagship Event"
  },
  {
    id: "ev-2",
    title: "Autumn HackSprint: 36-Hour Open Source Buildathon",
    category: "Technical",
    date: "Dec 05, 2026",
    time: "06:00 PM (Fri) – 10:00 AM (Sun)",
    venue: "Innovation Hub & Collaborative Arena",
    block: "Block 32",
    club: "Google Developer Student Club (GDSC)",
    clubAvatar: "GDSC",
    description: "36 hours of relentless engineering, mentorship sessions, gourmet catering, and hardware testbeds. Build high-impact tools for campus life and open research.",
    rsvpCount: 160,
    maxCapacity: 200,
    isRsvp: false,
    registrationOpen: true
  },
  {
    id: "ev-3",
    title: "Oxford-Style Parliamentary Debate: Ethics of Synthetic Intelligence",
    category: "Literary",
    date: "Nov 24, 2026",
    time: "04:30 PM – 07:00 PM",
    venue: "Seminar Hall of Scholars",
    block: "Block 36",
    club: "University Debating Union",
    clubAvatar: "UDU",
    description: "Motion: 'This House would establish strict cognitive parity legal moratoriums on autonomous synthetic actors.' Adjudicated by senior law faculty and guest scholars.",
    rsvpCount: 92,
    maxCapacity: 120,
    isRsvp: true,
    registrationOpen: true,
    passId: "UDU-DEB-2026-039"
  },
  {
    id: "ev-4",
    title: "Dark Academia Chamber Nocturne: Baroque & Minimalist Strings",
    category: "Cultural",
    date: "Dec 01, 2026",
    time: "07:00 PM – 09:30 PM",
    venue: "Unipolis Grand Amphitheater",
    block: "Unipolis",
    club: "Symphonic Arts & Chamber Society",
    clubAvatar: "SACS",
    description: "An evening of candlelit classical performance featuring works of Vivaldi, Max Richter, and Philip Glass performed by student and faculty cellists and violinists.",
    rsvpCount: 420,
    maxCapacity: 450,
    isRsvp: false,
    registrationOpen: true,
    badge: "Candlelit Gala"
  },
  {
    id: "ev-5",
    title: "Collegiate Autonomous Drone Grand Prix 2026",
    category: "Sports",
    date: "Dec 10, 2026",
    time: "02:00 PM – 06:00 PM",
    venue: "Central Athletics Ground & Arena",
    block: "Unipolis",
    club: "Robotics & Aerial Systems Society",
    clubAvatar: "RASS",
    description: "Autonomous micro-UAVs navigating complex obstacle courses with computer-vision obstacle avoidance and precision aerobatics.",
    rsvpCount: 230,
    maxCapacity: 300,
    isRsvp: false,
    registrationOpen: true
  }
];

export const campusClubs: CampusClub[] = [
  {
    id: "club-1",
    name: "Turing Computing Guild",
    category: "Computer Science & Systems",
    lead: "Ishaan Sen",
    leadEmail: "turing.lead@campusone.edu",
    membersCount: 412,
    meetingSchedule: "Wednesdays, 05:30 PM",
    venue: "Block 32 • Room 204",
    description: "Dedicated to the deep craft of computing: low-level kernels, compilers, distributed consensus algorithms, and high-performance computing.",
    accentColor: "#172D29",
    isMember: true
  },
  {
    id: "club-2",
    name: "Google Developer Student Club (GDSC)",
    category: "Software & Cloud Architecture",
    lead: "Ananya Iyer",
    leadEmail: "gdsc@campusone.edu",
    membersCount: 680,
    meetingSchedule: "Fridays, 05:00 PM",
    venue: "Block 34 • Amphitheater LH 302",
    description: "Connecting developers to build real-world products for community challenges using modern web stacks, Google Cloud, and AI APIs.",
    accentColor: "#213B33",
    isMember: true
  },
  {
    id: "club-3",
    name: "University Debating Union",
    category: "Literary, Law & Rhetoric",
    lead: "Tara Deshmukh",
    leadEmail: "debating.union@campusone.edu",
    membersCount: 230,
    meetingSchedule: "Tuesdays & Thursdays, 05:30 PM",
    venue: "Block 36 • Seminar Hall A",
    description: "Training eloquent orators in British Parliamentary, Asian Parliamentary, and Policy debate formats with weekly mock chambers.",
    accentColor: "#B99A6A",
    isMember: false
  },
  {
    id: "club-4",
    name: "Robotics & Aerial Systems Society",
    category: "Hardware & Mechatronics",
    lead: "Devansh Patel",
    leadEmail: "robotics@campusone.edu",
    membersCount: 310,
    meetingSchedule: "Saturdays, 10:00 AM",
    venue: "Block 32 • Maker Studio",
    description: "Building autonomous rovers, humanoid bipedal models, and racing FPV drones with advanced sensor fusion and edge accelerators.",
    accentColor: "#87988A",
    isMember: false
  },
  {
    id: "club-5",
    name: "The Campus Chronicle Journal",
    category: "Journalism & Editorial Press",
    lead: "Siddharth Rao",
    leadEmail: "chronicle@campusone.edu",
    membersCount: 145,
    meetingSchedule: "Mondays, 06:00 PM",
    venue: "Unipolis • Room 102",
    description: "The university's independent longform investigative journalism publication, producing bi-weekly print essays and digital commentaries.",
    accentColor: "#292B28",
    isMember: false
  }
];
