import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  GraduationCap, 
  CalendarDays, 
  BookOpenCheck, 
  Sparkles, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';
import { 
  NavigationTab, 
  StudentProfile, 
  AttendanceSubject, 
  TimetableEntry, 
  ExamItem, 
  CampusEvent 
} from '../../types';
import { CircularProgress } from '../common/CircularProgress';

interface DashboardViewProps {
  profile: StudentProfile;
  attendanceSubjects: AttendanceSubject[];
  timetable: TimetableEntry[];
  exams: ExamItem[];
  events: CampusEvent[];
  onSelectTab: (tab: NavigationTab) => void;
  onRSVPEvent: (eventId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  attendanceSubjects,
  timetable,
  exams,
  events,
  onSelectTab,
  onRSVPEvent,
}) => {
  // Live Countdown Timer for Next Class (minutes and seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(24 * 60 + 38);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Next class details
  const nextClass = timetable.find(t => t.isNext) || timetable[1];

  // Overall Attendance Calculation
  const totalAttended = attendanceSubjects.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClasses = attendanceSubjects.reduce((acc, curr) => acc + curr.total, 0);
  const calculatedAttendancePct = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 84.6;

  // Safe miss calculation: how many classes can be missed before falling below 75%
  // Formula: totalAttended / (totalClasses + x) >= 0.75 => x <= (totalAttended - 0.75 * totalClasses) / 0.75
  const safeMisses = Math.max(0, Math.floor((totalAttended - 0.75 * totalClasses) / 0.75));

  // Next upcoming exam
  const nearestExam = exams[0];

  // Today's classes (Thursday)
  const todayClasses = timetable.filter(t => t.day === 'Thursday');

  return (
    <div className="space-y-7 pb-12">
      {/* 1. VISUALLY STRIKING HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#172D29] via-[#1E3B35] to-[#122421] text-[#F0EBDD] p-6 sm:p-8 lg:p-10 border border-[#B99A6A]/35 shadow-academic-dark">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-radial from-[#B99A6A]/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#213B33]/80 border border-[#B99A6A]/30 text-xs text-[#D8CBB5]">
              <span className="w-2 h-2 rounded-full bg-[#B99A6A] animate-ping" />
              <span className="font-semibold tracking-wide">Autumn Academic Session • Semester 7</span>
              <span className="text-[#87988A]">•</span>
              <span className="text-[#FAF7EE] font-medium">Week 11</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7EE] leading-tight">
              Good morning, {profile.name.split(' ')[0]}.
            </h1>

            <p className="text-sm sm:text-base text-[#D8CBB5]/90 leading-relaxed font-sans max-w-xl">
              You have <strong className="text-[#FAF7EE] font-semibold">{todayClasses.length} lectures</strong> scheduled today across Blocks 32, 34, and Unipolis. Your academic compliance stands robust at <strong className="text-[#B99A6A] font-semibold">{calculatedAttendancePct.toFixed(1)}%</strong>, with <strong className="text-[#FAF7EE] font-semibold">{safeMisses} safe absences</strong> remaining.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('timetable')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-[#B99A6A] text-[#172D29] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#CEB184] transition-all shadow-md active:scale-95"
              >
                <span>View Full Timetable</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onSelectTab('map')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-[#213B33]/90 hover:bg-[#2C4C42] border border-[#B99A6A]/30 text-xs sm:text-sm font-semibold text-[#F0EBDD] transition-colors"
              >
                <MapPin size={15} className="text-[#B99A6A]" />
                <span>Navigate Campus Map</span>
              </button>
            </div>
          </div>

          {/* Quick Hero Academic Crest Badge */}
          <div className="hidden lg:flex flex-col items-center justify-center p-5 rounded-xl bg-[#122421]/90 border border-[#B99A6A]/30 backdrop-blur-md shadow-inner text-center min-w-[200px]">
            <div className="w-14 h-14 rounded-full bg-[#213B33] border-2 border-[#B99A6A] flex items-center justify-center mb-3 shadow-gold-glow">
              <ShieldCheck size={28} className="text-[#B99A6A]" />
            </div>
            <span className="font-editorial text-lg text-[#FAF7EE] font-bold">Magna Cum Laude</span>
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#B99A6A] mt-0.5">Honor Roll Track</span>
            <div className="mt-3 pt-3 border-t border-[#B99A6A]/20 w-full flex justify-between text-xs text-[#87988A]">
              <span>Credits:</span>
              <span className="text-[#FAF7EE] font-bold">{profile.completedCredits} / {profile.totalCredits}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIVERSE CARDS GRID: VARIED SIZES, LAYOUTS & BACKGROUND TONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* CARD A: LARGE DEEP FOREST GREEN NEXT-CLASS FEATURE CARD (Span 7 cols on LG) */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#1A342F] via-[#172D29] to-[#122421] text-[#F0EBDD] p-6 sm:p-7 border border-[#B99A6A]/30 shadow-academic-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#B99A6A] pointer-events-none group-hover:opacity-10 transition-opacity">
            <Clock size={160} />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B99A6A]/20 border border-[#B99A6A]/40 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
                <Clock size={13} className="animate-spin text-[#B99A6A]" style={{ animationDuration: '6s' }} />
                <span>Next Class Starting Soon</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-[#FAF7EE] px-2.5 py-1 rounded bg-[#213B33] border border-[#B99A6A]/30">
                in {formatCountdown(secondsRemaining)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#87988A] uppercase tracking-wider">
                <span>{nextClass.code}</span>
                <span>•</span>
                <span>{nextClass.type}</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#FAF7EE] leading-tight group-hover:text-[#B99A6A] transition-colors">
                {nextClass.name}
              </h2>
            </div>

            {/* Class Details Pill Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#B99A6A]/20">
              <div className="p-3 rounded-xl bg-[#213B33]/60 border border-[#B99A6A]/20">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#87988A] block">Location</span>
                <span className="text-xs font-bold text-[#FAF7EE] mt-0.5 flex items-center space-x-1">
                  <MapPin size={12} className="text-[#B99A6A]" />
                  <span>{nextClass.block} • {nextClass.room}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#213B33]/60 border border-[#B99A6A]/20">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#87988A] block">Time Slot</span>
                <span className="text-xs font-bold text-[#FAF7EE] mt-0.5 block font-mono">
                  {nextClass.startTime} – {nextClass.endTime}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#213B33]/60 border border-[#B99A6A]/20">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#87988A] block">Instructor</span>
                <span className="text-xs font-bold text-[#FAF7EE] mt-0.5 block truncate">
                  {nextClass.professor}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#B99A6A]/20 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#D8CBB5]/80 flex items-center space-x-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Attendance status: <strong className="text-[#FAF7EE]">86.4% Compliant</strong></span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSelectTab('map')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#213B33] hover:bg-[#2C4C42] border border-[#B99A6A]/30 text-xs font-semibold text-[#FAF7EE] transition-colors"
              >
                <span>Navigate to {nextClass.block}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* CARD B: COMPACT ATTENDANCE PROGRESS CARD (Span 5 cols on LG) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#FAF6ED] p-6 border border-[#D8CBB5] shadow-academic flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Compliance Monitor</span>
              <h2 className="font-editorial text-xl font-bold text-[#172D29]">Overall Attendance</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
              Above 75% Rule
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center justify-around gap-4">
            <CircularProgress
              percentage={calculatedAttendancePct}
              size={135}
              strokeWidth={10}
              color="#172D29"
              trackColor="#D8CBB5"
              sublabel="Cumulative"
            />

            <div className="space-y-2.5 text-center sm:text-left">
              <div className="p-2.5 rounded-lg bg-[#EFE8D8] border border-[#D8CBB5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block">Buffer Capacity</span>
                <span className="text-sm font-bold text-[#172D29]">
                  {safeMisses} Lectures can be skipped
                </span>
                <p className="text-[11px] text-[#85877F]">without breaching 75% criteria</p>
              </div>

              <div className="text-xs text-[#292B28] space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-[#85877F]">Lectures Attended:</span>
                  <span className="font-bold text-[#172D29]">{totalAttended} of {totalClasses}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#85877F]">Subjects Tracked:</span>
                  <span className="font-bold text-[#172D29]">{attendanceSubjects.length} courses</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('attendance')}
            className="w-full mt-2 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold tracking-wide transition-colors flex items-center justify-center space-x-2"
          >
            <span>Open Attendance Skip Calculator</span>
            <ArrowRight size={14} className="text-[#B99A6A]" />
          </button>
        </div>

        {/* CARD C: SOPHISTICATED CGPA STATISTICS CARD (Span 4 cols on LG) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#FCFAF4] p-6 border border-[#B99A6A]/30 shadow-academic flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Academic Standing</span>
                <h2 className="font-editorial text-xl font-bold text-[#172D29]">Current CGPA</h2>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF6ED] border border-[#B99A6A]/30 text-[#B99A6A]">
                <GraduationCap size={20} />
              </div>
            </div>

            <div className="flex items-baseline space-x-2 mt-2">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#172D29]">
                {profile.currentCGPA.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-[#85877F]">/ 10.00</span>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-[#F0EBDD] border border-[#D8CBB5] text-xs space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-[#85877F]">Graduation Target:</span>
                <span className="font-bold text-[#B99A6A]">{profile.targetCGPA.toFixed(2)} CGPA</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-[#85877F]">Required Next Sem SGPA:</span>
                <span className="font-bold text-[#172D29]">9.32 SGPA</span>
              </div>
              <div className="w-full bg-[#D8CBB5] h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-[#B99A6A] h-full rounded-full" style={{ width: '88.4%' }} />
              </div>
            </div>

            {/* Mini Sparkline / Semester Bar Visual */}
            <div className="mt-4 pt-3 border-t border-[#D8CBB5]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block mb-2">
                SGPA Progression (Sem 1 – 6)
              </span>
              <div className="flex items-end justify-between h-14 gap-1.5 px-1">
                {[8.42, 8.65, 8.90, 8.78, 9.15, 9.08].map((sgpa, idx) => {
                  const heightPct = ((sgpa - 7.5) / 2.5) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative">
                      <div className="w-full bg-[#213B33] rounded-t hover:bg-[#B99A6A] transition-colors" style={{ height: `${heightPct}%` }} />
                      <span className="text-[9px] font-mono font-bold text-[#85877F] mt-1">S{idx + 1}</span>
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-[#172D29] text-[#FAF7EE] text-[10px] font-mono px-1.5 py-0.5 rounded transition-opacity pointer-events-none whitespace-nowrap z-20">
                        {sgpa}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('cgpa')}
            className="w-full mt-4 py-2 rounded-lg bg-[#EFE8D8] hover:bg-[#E5DAC6] border border-[#D8CBB5] text-xs font-bold text-[#172D29] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Simulate Grades & Target</span>
            <ArrowUpRight size={14} className="text-[#B99A6A]" />
          </button>
        </div>

        {/* CARD D: HORIZONTAL UPCOMING EXAMS SECTION (Span 8 cols on LG) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#FAF6ED] p-6 border border-[#D8CBB5] shadow-academic flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Assessments</span>
              <h2 className="font-editorial text-xl font-bold text-[#172D29]">Upcoming Examination Schedule</h2>
            </div>
            <button
              onClick={() => onSelectTab('exams')}
              className="text-xs font-bold text-[#B99A6A] hover:text-[#9A7D4E] flex items-center space-x-1"
            >
              <span>View All ({exams.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Highlighted Next Exam Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#213B33] to-[#172D29] text-[#F0EBDD] border border-[#B99A6A]/30 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider">
                <BookOpenCheck size={14} />
                <span>Next Paper in 8 Days</span>
                <span>•</span>
                <span>Nov 28, 2026</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#FAF7EE]">
                {nearestExam.code}: {nearestExam.name}
              </h3>
              <p className="text-xs text-[#D8CBB5]/80">
                Location: <strong className="text-[#FAF7EE]">{nearestExam.block} • {nearestExam.room}</strong> (Seat: {nearestExam.seatNumber})
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-[#B99A6A]/20 pt-3 sm:pt-0 sm:pl-4">
              <span className="text-xs font-semibold text-[#87988A]">Syllabus Revision</span>
              <span className="font-editorial text-2xl font-bold text-[#B99A6A]">{nearestExam.syllabusProgress}%</span>
              <span className="text-[10px] text-[#FAF7EE] font-medium bg-[#172D29] px-2 py-0.5 rounded border border-[#B99A6A]/30 mt-1">
                Hall Ticket Approved
              </span>
            </div>
          </div>

          {/* Secondary Exam Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exams.slice(1, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A]/60 transition-colors">
                <div className="flex justify-between items-start text-xs mb-1">
                  <span className="font-bold text-[#172D29]">{item.code}</span>
                  <span className="font-mono text-[11px] font-bold text-[#85877F]">{item.date}</span>
                </div>
                <p className="text-xs font-semibold text-[#292B28] truncate mb-2">{item.name}</p>
                <div className="flex justify-between text-[11px] text-[#85877F]">
                  <span>{item.block}</span>
                  <span className="font-semibold text-[#B99A6A]">{item.syllabusProgress}% revised</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD E: TODAY'S TIMETABLE PANEL (Span 6 cols on LG) */}
        <div className="lg:col-span-6 rounded-2xl bg-[#FAF6ED] p-6 border border-[#D8CBB5] shadow-academic flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Schedule</span>
              <h2 className="font-editorial text-xl font-bold text-[#172D29]">Today's Lectures (Thursday)</h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#172D29] bg-[#EAE2D1] px-2.5 py-1 rounded-full border border-[#D8CBB5]">
              {todayClasses.length} Sessions
            </span>
          </div>

          <div className="space-y-3">
            {todayClasses.map((item, idx) => {
              const isNext = item.isNext;
              return (
                <div 
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isNext 
                      ? 'bg-[#172D29] text-[#F0EBDD] border-[#B99A6A] shadow-md' 
                      : 'bg-[#FCFAF4] text-[#292B28] border-[#D8CBB5]/80 hover:bg-[#F4EFE3]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-mono font-bold ${isNext ? 'text-[#B99A6A]' : 'text-[#172D29]'}`}>
                        {item.startTime} – {item.endTime}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        isNext ? 'bg-[#213B33] text-[#FAF7EE]' : 'bg-[#EAE2D1] text-[#85877F]'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {isNext && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#172D29] bg-[#B99A6A] px-2 py-0.5 rounded-full">
                        Up Next
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between mt-1">
                    <h3 className={`font-bold text-sm truncate ${isNext ? 'text-[#FAF7EE]' : 'text-[#172D29]'}`}>
                      {item.code}: {item.name}
                    </h3>
                  </div>

                  <div className={`flex items-center justify-between text-xs mt-2 pt-2 border-t ${
                    isNext ? 'border-[#B99A6A]/25 text-[#D8CBB5]' : 'border-[#D8CBB5]/60 text-[#85877F]'
                  }`}>
                    <span className="flex items-center space-x-1">
                      <MapPin size={12} className={isNext ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                      <span>{item.block} • {item.room}</span>
                    </span>
                    <span className="truncate max-w-[140px] text-right">{item.professor}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onSelectTab('timetable')}
            className="w-full mt-4 py-2.5 rounded-xl bg-[#EAE2D1] hover:bg-[#D8CBB5] text-xs font-bold text-[#172D29] transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Open Complete Weekly Schedule</span>
            <ArrowRight size={14} className="text-[#B99A6A]" />
          </button>
        </div>

        {/* CARD F: UPCOMING CAMPUS EVENTS (Span 6 cols on LG) */}
        <div className="lg:col-span-6 rounded-2xl bg-[#FAF6ED] p-6 border border-[#D8CBB5] shadow-academic flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Student Societies</span>
              <h2 className="font-editorial text-xl font-bold text-[#172D29]">Campus Conclaves & Events</h2>
            </div>
            <button
              onClick={() => onSelectTab('events')}
              className="text-xs font-bold text-[#B99A6A] hover:text-[#9A7D4E] flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {events.slice(0, 2).map((ev) => (
              <div 
                key={ev.id}
                className="p-4 rounded-xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#172D29] text-[#FAF7EE] text-[10px] font-bold uppercase tracking-wider">
                      {ev.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#172D29] flex items-center space-x-1">
                      <CalendarDays size={13} className="text-[#B99A6A]" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#172D29] group-hover:text-[#B99A6A] transition-colors leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#85877F] mt-1 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#D8CBB5]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-[#85877F]">
                    <MapPin size={12} className="text-[#B99A6A]" />
                    <span className="font-medium text-[#172D29]">{ev.block} • {ev.venue}</span>
                  </div>

                  <button
                    onClick={() => onRSVPEvent(ev.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      ev.isRsvp 
                        ? 'bg-[#172D29] text-[#FAF7EE] border border-[#B99A6A]/40'
                        : 'bg-[#B99A6A] hover:bg-[#CEB184] text-[#172D29]'
                    }`}
                  >
                    {ev.isRsvp ? 'Pass Issued' : 'RSVP Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#D8CBB5] flex items-center justify-between text-xs text-[#85877F]">
            <span>Looking for campus clubs & student chapters?</span>
            <button
              onClick={() => onSelectTab('events')}
              className="font-bold text-[#172D29] hover:text-[#B99A6A] underline decoration-[#B99A6A]"
            >
              Society Directory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
