import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  Sparkles, 
  BookMarked,
  Check,
  Building,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { NavigationTab, StudentProfile } from '../../types';

interface HeaderProps {
  activeTab: NavigationTab;
  onOpenSidebar: () => void;
  profile: StudentProfile;
  onSelectTab: (tab: NavigationTab) => void;
  onLogout?: () => void;
}

const sectionTitles: Record<NavigationTab, { title: string; subtitle: string; category: string }> = {
  dashboard: {
    title: 'Academic Intelligence',
    subtitle: 'Daily schedule, academic standing & real-time campus briefing',
    category: 'Overview'
  },
  attendance: {
    title: 'Attendance & Compliance',
    subtitle: '75% threshold monitor with predictive skip calculator',
    category: 'Academics'
  },
  cgpa: {
    title: 'Academic Credit & CGPA Planner',
    subtitle: 'Cumulative performance, credit weights & graduation target trajectory',
    category: 'Academics'
  },
  timetable: {
    title: 'Weekly Lecture Schedule',
    subtitle: 'Synchronized class timings across Blocks 32, 34, 36 & Unipolis',
    category: 'Schedule'
  },
  exams: {
    title: 'Examinations & Study Planner',
    subtitle: 'Upcoming paper countdowns, hall tickets & syllabus completion progress',
    category: 'Exams'
  },
  map: {
    title: 'Campus Spatial Directory',
    subtitle: 'Interactive layout of Blocks 32, 34, 36, and Unipolis with live occupancy',
    category: 'Campus Life'
  },
  mess: {
    title: 'Dining Hall & Daily Menu',
    subtitle: 'Weekly chef curation, nutrition profiles & student community ratings',
    category: 'Campus Life'
  },
  lostfound: {
    title: 'Campus Lost & Found Register',
    subtitle: 'Community lost property notices, claiming registry & security posts',
    category: 'Community'
  },
  events: {
    title: 'Collegiate Societies & Events',
    subtitle: 'Academic symposia, hackathons, debates & society registrations',
    category: 'Student Guild'
  }
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenSidebar,
  profile,
  onSelectTab,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifications = [
    {
      id: 1,
      title: 'Hall Ticket Issued',
      desc: 'Mid-term hall ticket verified for Block 34 examinations.',
      time: '15m ago',
      type: 'exam',
      tab: 'exams' as NavigationTab
    },
    {
      id: 2,
      title: 'Today’s Lunch Special',
      desc: 'Shahi Paneer in Cashew Gravy & Vegetable Biryani available.',
      time: '1h ago',
      type: 'mess',
      tab: 'mess' as NavigationTab
    },
    {
      id: 3,
      title: 'Attendance Alert: HS-302',
      desc: 'Attendance is currently at 76.7% (close to 75% threshold).',
      time: '3h ago',
      type: 'attendance',
      tab: 'attendance' as NavigationTab
    }
  ];

  const currentSection = sectionTitles[activeTab];

  return (
    <header className="sticky top-0 z-30 bg-[#F0EBDD]/90 backdrop-blur-md border-b border-[#D8CBB5] px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Editorial Titles */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-lg text-[#172D29] bg-[#E7DDCC] hover:bg-[#D8CBB5] border border-[#B99A6A]/30 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-[#85877F]">
              <span>{currentSection.category}</span>
              <span>/</span>
              <span className="text-[#B99A6A] font-semibold">CampusOne Portal</span>
            </div>
            <h1 className="font-editorial text-xl sm:text-2xl text-[#172D29] font-bold truncate tracking-tight">
              {currentSection.title}
            </h1>
          </div>
        </div>

        {/* Right: Date, Search, Quick Actions & Notifications */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Subtle Date Indicator */}
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-[#172D29]">Thursday, Nov 20</span>
            <span className="text-[11px] text-[#85877F]">Week 11 • Autumn Session</span>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-[#D8CBB5]" />

          {/* Quick Academic Metric Pill */}
          <button
            onClick={() => onSelectTab('cgpa')}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6ED] border border-[#B99A6A]/40 text-xs font-semibold text-[#172D29] hover:bg-[#EAE2D1] transition-colors shadow-sm"
          >
            <GraduationCap size={15} className="text-[#B99A6A]" />
            <span>CGPA:</span>
            <span className="font-bold text-[#172D29]">{profile.currentCGPA.toFixed(2)}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setHasUnread(false);
              }}
              className="relative p-2 rounded-lg bg-[#FAF6ED] hover:bg-[#EAE2D1] border border-[#D8CBB5] text-[#172D29] transition-colors shadow-sm"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B99A6A] ring-2 ring-[#FAF6ED]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#FCFAF4] border border-[#B99A6A]/30 shadow-academic-lg z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB5]/60 mb-3">
                  <div>
                    <h2 className="font-editorial text-base font-bold text-[#172D29]">Notifications</h2>
                    <p className="text-[11px] text-[#85877F]">Real-time campus & academic alerts</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#172D29] text-[#FAF7EE] font-bold uppercase tracking-wider">
                    {notifications.length} New
                  </span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.tab);
                        setShowNotifications(false);
                      }}
                      className="p-3 rounded-lg bg-[#FAF6ED] hover:bg-[#EFE8D8] border border-[#D8CBB5]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#172D29] mb-1">
                        <span>{item.title}</span>
                        <span className="text-[10px] text-[#85877F] font-normal">{item.time}</span>
                      </div>
                      <p className="text-xs text-[#292B28]/80 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#D8CBB5]/60 text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-[#172D29] hover:text-[#B99A6A] transition-colors"
                  >
                    Close Alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sign Out Action Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-[#FAF6ED] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-[#D8CBB5] text-[#85877F] transition-colors shadow-sm"
              title="Sign Out to Login Page"
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
