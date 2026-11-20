import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
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
} from './types';
import {
  initialStudentProfile,
  initialAttendanceSubjects,
  initialSemestersSGPA,
  weeklyTimetable,
  upcomingExams,
  initialStudyTasks,
  campusBlocks,
  weeklyMessMenu,
  initialLostFoundItems,
  campusEvents,
  campusClubs
} from './data/mockData';

// Layout components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Section components
import { DashboardView } from './components/sections/DashboardView';
import { AttendanceView } from './components/sections/AttendanceView';
import { CGPACalculatorView } from './components/sections/CGPACalculatorView';
import { TimetableView } from './components/sections/TimetableView';
import { ExamsView } from './components/sections/ExamsView';
import { CampusMapView } from './components/sections/CampusMapView';
import { MessMenuView } from './components/sections/MessMenuView';
import { LostFoundView } from './components/sections/LostFoundView';
import { EventsClubsView } from './components/sections/EventsClubsView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LocalStorage-backed state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('campusone_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [attendanceSubjects, setAttendanceSubjects] = useState<AttendanceSubject[]>(() => {
    const saved = localStorage.getItem('campusone_attendance');
    return saved ? JSON.parse(saved) : initialAttendanceSubjects;
  });

  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('campusone_tasks');
    return saved ? JSON.parse(saved) : initialStudyTasks;
  });

  const [exams, setExams] = useState<ExamItem[]>(() => {
    const saved = localStorage.getItem('campusone_exams');
    return saved ? JSON.parse(saved) : upcomingExams;
  });

  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(() => {
    const saved = localStorage.getItem('campusone_lostfound');
    return saved ? JSON.parse(saved) : initialLostFoundItems;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('campusone_events');
    return saved ? JSON.parse(saved) : campusEvents;
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('campusone_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('campusone_attendance', JSON.stringify(attendanceSubjects));
  }, [attendanceSubjects]);

  useEffect(() => {
    localStorage.setItem('campusone_tasks', JSON.stringify(studyTasks));
  }, [studyTasks]);

  useEffect(() => {
    localStorage.setItem('campusone_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('campusone_lostfound', JSON.stringify(lostFoundItems));
  }, [lostFoundItems]);

  useEffect(() => {
    localStorage.setItem('campusone_events', JSON.stringify(events));
  }, [events]);

  // Handlers
  const handleUpdateSubjects = (updated: AttendanceSubject[]) => {
    setAttendanceSubjects(updated);
  };

  const handleUpdateTasks = (tasks: StudyTask[]) => {
    setStudyTasks(tasks);
  };

  const handleUpdateExams = (updatedExams: ExamItem[]) => {
    setExams(updatedExams);
  };

  const handleAddLostFoundItem = (item: LostFoundItem) => {
    setLostFoundItems([item, ...lostFoundItems]);
  };

  const handleClaimLostFoundItem = (itemId: string) => {
    setLostFoundItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'claimed' } : item
    ));
  };

  const handleToggleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const nextState = !ev.isRsvp;
        return {
          ...ev,
          isRsvp: nextState,
          rsvpCount: nextState ? ev.rsvpCount + 1 : Math.max(0, ev.rsvpCount - 1),
          passId: nextState ? `CMP-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined
        };
      }
      return ev;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F0EBDD] text-[#292B28] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={profile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0 transition-all">
        {/* Sticky Header */}
        <Header
          activeTab={activeTab}
          onOpenSidebar={() => setSidebarOpen(true)}
          profile={profile}
          onSelectTab={setActiveTab}
        />

        {/* Section View Container */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              attendanceSubjects={attendanceSubjects}
              timetable={weeklyTimetable}
              exams={exams}
              events={events}
              onSelectTab={setActiveTab}
              onRSVPEvent={handleToggleRSVP}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView
              subjects={attendanceSubjects}
              onUpdateSubject={handleUpdateSubjects}
            />
          )}

          {activeTab === 'cgpa' && (
            <CGPACalculatorView
              profile={profile}
              semesters={initialSemestersSGPA}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableView
              timetable={weeklyTimetable}
            />
          )}

          {activeTab === 'exams' && (
            <ExamsView
              exams={exams}
              studyTasks={studyTasks}
              onUpdateTasks={handleUpdateTasks}
              onUpdateExams={handleUpdateExams}
            />
          )}

          {activeTab === 'map' && (
            <CampusMapView
              blocks={campusBlocks}
            />
          )}

          {activeTab === 'mess' && (
            <MessMenuView
              weeklyMenu={weeklyMessMenu}
            />
          )}

          {activeTab === 'lostfound' && (
            <LostFoundView
              items={lostFoundItems}
              onAddItem={handleAddLostFoundItem}
              onClaimItem={handleClaimLostFoundItem}
            />
          )}

          {activeTab === 'events' && (
            <EventsClubsView
              events={events}
              clubs={campusClubs}
              onToggleRSVP={handleToggleRSVP}
            />
          )}
        </main>

        {/* Collegiate Academic Footer */}
        <footer className="border-t border-[#D8CBB5] bg-[#EAE2D1]/60 px-4 sm:px-8 py-6 text-xs text-[#85877F]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-editorial text-base font-bold text-[#172D29]">CampusOne</span>
              <span>—</span>
              <span className="font-serif italic text-[#172D29]">Veritas, Scientia, et Excelsius</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>Main Server Node: Block 32 DGX Cluster</span>
              <span>•</span>
              <span>Encrypted Session: TLS 1.3</span>
              <span>•</span>
              <span className="font-semibold text-[#172D29]">© 2026 CampusOne Academic Systems</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
