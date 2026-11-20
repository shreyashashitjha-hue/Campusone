import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  GraduationCap, 
  CalendarDays, 
  BookOpenCheck, 
  MapPin, 
  UtensilsCrossed, 
  Compass, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  X,
  LucideIcon,
  LogOut
} from 'lucide-react';
import { NavigationTab, StudentProfile } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: LucideIcon;
  badge?: string;
  count?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'attendance', label: 'Attendance', icon: CheckCircle2, badge: '84.6%' },
  { id: 'cgpa', label: 'CGPA & Planning', icon: GraduationCap, badge: '8.84' },
  { id: 'timetable', label: 'Timetable', icon: CalendarDays },
  { id: 'exams', label: 'Exams & Study', icon: BookOpenCheck, count: 5 },
  { id: 'map', label: 'Campus Map', icon: MapPin },
  { id: 'mess', label: 'Mess Menu', icon: UtensilsCrossed, badge: 'Special' },
  { id: 'lostfound', label: 'Lost & Found', icon: Compass, count: 6 },
  { id: 'events', label: 'Events & Societies', icon: Sparkles },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  isOpen,
  onClose,
  onLogout,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-[#0E1D1A]/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#172D29] text-[#F0EBDD] flex flex-col border-r border-[#B99A6A]/20 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-academic-dark`}
      >
        {/* Brand Wordmark & Collegiate Seal */}
        <div className="p-6 pb-4 border-b border-[#B99A6A]/15 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#213B33] to-[#122421] border border-[#B99A6A]/40 flex items-center justify-center shadow-inner group">
              <span className="font-editorial text-xl text-[#B99A6A] font-bold tracking-tight">C</span>
              <span className="font-editorial text-xl text-[#F0EBDD] font-bold -ml-0.5">1</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-editorial text-xl tracking-tight text-[#FAF7EE] font-bold">CampusOne</span>
                <span className="text-[10px] tracking-widest font-sans uppercase font-bold px-1.5 py-0.5 rounded bg-[#B99A6A]/20 text-[#B99A6A] border border-[#B99A6A]/30">v2.4</span>
              </div>
              <p className="text-[11px] font-sans text-[#87988A] tracking-wider uppercase font-medium">Academic Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-[#87988A] hover:text-[#F0EBDD] hover:bg-[#213B33]"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Academic Session Notice */}
        <div className="px-6 py-3 bg-[#132522] border-b border-[#B99A6A]/10 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-[#87988A]">
            <span className="w-2 h-2 rounded-full bg-[#B99A6A] animate-pulse" />
            <span className="font-medium text-[11px] text-[#D8CBB5]">Fall Term 2026</span>
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#87988A] bg-[#172D29] px-2 py-0.5 rounded border border-[#B99A6A]/15">
            Sem 7
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#87988A]/80 font-sans">
            Core Academic Services
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#213B33] text-[#FAF7EE] shadow-sm border border-[#B99A6A]/30 font-semibold'
                    : 'text-[#D8CBB5]/85 hover:text-[#FAF7EE] hover:bg-[#213B33]/50'
                }`}
              >
                {/* Active Indicator Accent Tab */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#B99A6A] shadow-gold-glow" />
                )}

                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-md transition-colors ${
                    isActive ? 'text-[#B99A6A]' : 'text-[#87988A] group-hover:text-[#D8CBB5]'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className="tracking-tight">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                      isActive 
                        ? 'bg-[#B99A6A]/20 text-[#B99A6A] border-[#B99A6A]/40' 
                        : 'bg-[#172D29] text-[#87988A] border-[#87988A]/30 group-hover:text-[#D8CBB5]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-[#213B33] text-[#D8CBB5] border border-[#B99A6A]/20">
                      {item.count}
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-[#B99A6A]" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Academic Honor Banner */}
        <div className="mx-3 my-2 p-3 rounded-lg bg-gradient-to-r from-[#213B33] to-[#172D29] border border-[#B99A6A]/25 text-xs">
          <div className="flex items-center space-x-2 text-[#B99A6A] font-semibold mb-1">
            <ShieldCheck size={14} />
            <span className="text-[11px] uppercase tracking-wider font-bold">Dean's Honor Roll</span>
          </div>
          <p className="text-[11px] text-[#D8CBB5]/80 leading-relaxed">
            CGPA 8.84 qualifies for Magna Cum Laude honors track.
          </p>
        </div>

        {/* Student Profile Card Footer */}
        <div className="p-3 mx-3 mb-4 rounded-xl bg-[#132522] border border-[#B99A6A]/20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-10 h-10 rounded-lg object-cover border border-[#B99A6A]/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#132522]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#FAF7EE] truncate">{profile.name}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-[#B99A6A] font-bold">Sem {profile.semester}</span>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="p-1 rounded text-[#87988A] hover:text-rose-300 transition-colors ml-1"
                      title="Sign Out"
                    >
                      <LogOut size={12} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-[#87988A] truncate font-mono">{profile.registrationNo}</p>
              <p className="text-[10px] text-[#D8CBB5]/70 truncate mt-0.5">{profile.specialization}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
