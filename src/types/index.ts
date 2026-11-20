export type NavigationTab = 
  | 'dashboard'
  | 'attendance'
  | 'cgpa'
  | 'timetable'
  | 'exams'
  | 'map'
  | 'mess'
  | 'lostfound'
  | 'events';

export interface StudentProfile {
  name: string;
  registrationNo: string;
  program: string;
  specialization: string;
  semester: number;
  academicYear: string;
  currentCGPA: number;
  targetCGPA: number;
  completedCredits: number;
  totalCredits: number;
  overallAttendance: number;
  avatarUrl: string;
  advisor: string;
  hall: string;
  roomNo: string;
}

export interface AttendanceSubject {
  id: string;
  code: string;
  name: string;
  attended: number;
  total: number;
  professor: string;
  credits: number;
  type: 'Theory' | 'Practical' | 'Tutorial';
  room: string;
  lastUpdated: string;
  history?: Array<{ date: string; status: 'present' | 'absent' | 'duty' }>;
}

export interface SemesterSGPA {
  semester: number;
  sgpa: number;
  credits: number;
  status: 'completed' | 'in-progress' | 'projected';
  courses: Array<{
    code: string;
    name: string;
    credits: number;
    grade: string;
    gradePoint: number;
  }>;
}

export interface TimetableEntry {
  id: string;
  code: string;
  name: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // '09:00'
  endTime: string;   // '10:30'
  block: 'Block 32' | 'Block 34' | 'Block 36' | 'Unipolis';
  room: string;
  professor: string;
  isCurrent?: boolean;
  isNext?: boolean;
}

export interface ExamItem {
  id: string;
  code: string;
  name: string;
  type: 'Mid-Term Exam' | 'End-Term Exam' | 'Practical Viva';
  date: string; // ISO date '2026-11-28'
  time: string; // '10:00 AM - 01:00 PM'
  duration: string; // '3 Hours'
  block: 'Block 32' | 'Block 34' | 'Block 36' | 'Unipolis';
  room: string;
  seatNumber: string;
  hallTicketStatus: 'Approved' | 'Pending Verification';
  syllabusProgress: number; // Percentage
  totalUnits: number;
  completedUnits: number;
}

export interface StudyTask {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
  estimatedHours: number;
}

export interface CampusBlock {
  id: string;
  number: string; // 'Block 32'
  name: string;
  subtitle: string;
  category: 'Academics & Labs' | 'Lecture Complex' | 'Research & Seminar' | 'Auditorium & Events';
  departments: string[];
  floors: number;
  coordinates: { x: number; y: number }; // Percentage on SVG map
  crowdLevel: 'Low' | 'Moderate' | 'Busy';
  capacityPct: number;
  openHours: string;
  facilities: string[];
  description: string;
  keyRooms: Array<{ number: string; name: string; floor: string }>;
}

export interface MessMeal {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  timeSlot: string;
  specialBadge?: string;
  items: string[];
  calories: number;
  proteinGrams: number;
  dietaryTags: ('Veg' | 'Vegan' | 'Jain Friendly' | 'Chef Special')[];
  rating: number;
  reviewsCount: number;
}

export interface DailyMessMenu {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  date: string;
  meals: Record<'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner', MessMeal>;
}

export interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  category: 'Electronics' | 'IDs & Wallets' | 'Bags & Keys' | 'Books & Stationery' | 'Accessories';
  location: string;
  dateReported: string;
  description: string;
  status: 'unclaimed' | 'claimed';
  contactPerson: string;
  contactEmail: string;
  phone?: string;
  rewardOffered?: string;
  finderDepartment?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Technical' | 'Cultural' | 'Literary' | 'Sports' | 'Leadership';
  date: string;
  time: string;
  venue: string;
  block: string;
  club: string;
  clubAvatar: string;
  description: string;
  rsvpCount: number;
  maxCapacity: number;
  isRsvp: boolean;
  registrationOpen: boolean;
  passId?: string;
  badge?: string;
}

export interface CampusClub {
  id: string;
  name: string;
  category: string;
  lead: string;
  leadEmail: string;
  membersCount: number;
  meetingSchedule: string;
  venue: string;
  description: string;
  accentColor: string;
  isMember?: boolean;
}
