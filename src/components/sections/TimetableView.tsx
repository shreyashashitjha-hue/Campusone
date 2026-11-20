import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Building
} from 'lucide-react';
import { TimetableEntry } from '../../types';

interface TimetableViewProps {
  timetable: TimetableEntry[];
  onNavigateToBlock?: (blockName: string) => void;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const TimetableView: React.FC<TimetableViewProps> = ({
  timetable,
  onNavigateToBlock,
}) => {
  const [selectedDay, setSelectedDay] = useState<typeof daysOfWeek[number]>('Thursday');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [blockFilter, setBlockFilter] = useState<string>('All');

  // Filtered timetable for selected day
  const daySchedule = timetable.filter(item => {
    const matchesDay = item.day === selectedDay;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesBlock = blockFilter === 'All' || item.block === blockFilter;
    return matchesDay && matchesType && matchesBlock;
  });

  // Current or next class on Thursday (today)
  const activeClass = timetable.find(t => t.day === 'Thursday' && (t.isCurrent || t.isNext));

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner & Live Status */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <CalendarDays size={14} />
            <span>Collegiate Master Timetable • Fall 2026</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Synchronized Lecture Schedule
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            All classes are mapped across Blocks 32, 34, 36 and the Unipolis Convention Hall with synchronized passing intervals.
          </p>
        </div>

        {/* Current Active Class Card */}
        {activeClass && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#172D29] to-[#213B33] text-[#F0EBDD] border border-[#B99A6A]/30 shadow-md min-w-[280px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#B99A6A] uppercase tracking-wider text-[10px]">Today's Highlight</span>
              <span className="font-mono text-[11px] font-bold text-[#FAF7EE] bg-[#122421] px-2 py-0.5 rounded border border-[#B99A6A]/30">
                {activeClass.startTime} – {activeClass.endTime}
              </span>
            </div>
            <h4 className="font-editorial text-base font-bold text-[#FAF7EE] truncate mt-1">
              {activeClass.name}
            </h4>
            <div className="flex items-center justify-between text-xs text-[#D8CBB5]/80 mt-2 pt-2 border-t border-[#B99A6A]/20">
              <span className="flex items-center space-x-1">
                <MapPin size={12} className="text-[#B99A6A]" />
                <span>{activeClass.block} • {activeClass.room}</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-[#FAF7EE] bg-[#B99A6A]/30 px-2 py-0.5 rounded">
                Up Next
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. DAY SWITCHER & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        {/* Days of Week Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto p-1.5 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = day === 'Thursday';
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#172D29] text-[#FAF7EE] shadow-sm'
                    : 'text-[#292B28] hover:text-[#172D29] hover:bg-[#EAE2D1]'
                }`}
              >
                <span>{day}</span>
                {isToday && (
                  <span className={`ml-1.5 text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                    isSelected ? 'bg-[#B99A6A] text-[#172D29]' : 'bg-[#172D29] text-[#FAF7EE]'
                  }`}>
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2.5">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#FAF6ED] border border-[#D8CBB5] text-[#172D29] text-xs font-bold rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Formats</option>
            <option value="Lecture">Lectures</option>
            <option value="Lab">Labs</option>
            <option value="Tutorial">Tutorials</option>
            <option value="Seminar">Seminars</option>
          </select>

          <select
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
            className="bg-[#FAF6ED] border border-[#D8CBB5] text-[#172D29] text-xs font-bold rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Campus Blocks</option>
            <option value="Block 32">Block 32 (Labs)</option>
            <option value="Block 34">Block 34 (Lecture Complex)</option>
            <option value="Block 36">Block 36 (Research)</option>
            <option value="Unipolis">Unipolis (Arena)</option>
          </select>
        </div>
      </div>

      {/* 3. TIMETABLE SCHEDULE CARDS */}
      <div className="space-y-4">
        {daySchedule.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] text-[#85877F]">
            <Clock size={36} className="mx-auto mb-2 text-[#B99A6A]" />
            <h4 className="font-editorial text-lg font-bold text-[#172D29]">No Sessions Scheduled</h4>
            <p className="text-xs mt-1">No lectures or lab sessions match your active filters for {selectedDay}.</p>
          </div>
        ) : (
          daySchedule.map((entry, index) => {
            const isHighlight = entry.isNext || entry.isCurrent;

            return (
              <div
                key={entry.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  isHighlight
                    ? 'bg-gradient-to-r from-[#172D29] to-[#213B33] text-[#F0EBDD] border-[#B99A6A] shadow-academic-lg'
                    : 'bg-[#FCFAF4] text-[#292B28] border-[#D8CBB5] hover:border-[#B99A6A]/60 shadow-sm'
                }`}
              >
                {/* Time & Session Status Column */}
                <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center min-w-[170px] pr-4 md:border-r md:border-[#D8CBB5]/60">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={isHighlight ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                    <span className="font-mono text-base font-bold tracking-tight">
                      {entry.startTime} – {entry.endTime}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isHighlight
                        ? 'bg-[#B99A6A] text-[#172D29]'
                        : 'bg-[#EAE2D1] text-[#172D29]'
                    }`}>
                      {entry.type}
                    </span>
                    {isHighlight && (
                      <span className="text-[10px] uppercase font-bold text-[#B99A6A] animate-pulse">
                        • In Focus
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Title & Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-semibold">
                    <span className={`font-mono ${isHighlight ? 'text-[#B99A6A]' : 'text-[#85877F]'}`}>
                      {entry.code}
                    </span>
                    <span>•</span>
                    <span className={isHighlight ? 'text-[#D8CBB5]' : 'text-[#85877F]'}>
                      Autumn Session
                    </span>
                  </div>
                  <h3 className={`font-editorial text-xl sm:text-2xl font-bold ${
                    isHighlight ? 'text-[#FAF7EE]' : 'text-[#172D29]'
                  }`}>
                    {entry.name}
                  </h3>
                  <div className={`flex flex-wrap items-center gap-4 text-xs pt-1 ${
                    isHighlight ? 'text-[#D8CBB5]/80' : 'text-[#85877F]'
                  }`}>
                    <span className="flex items-center space-x-1">
                      <User size={13} className={isHighlight ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                      <span className={isHighlight ? 'text-[#FAF7EE]' : 'text-[#292B28]'}>
                        {entry.professor}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={13} className={isHighlight ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                      <span className={isHighlight ? 'text-[#FAF7EE]' : 'text-[#292B28]'}>
                        {entry.block} • {entry.room}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Block / Room Navigation CTA */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                    isHighlight ? 'text-[#87988A]' : 'text-[#85877F]'
                  }`}>
                    Venue
                  </span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center space-x-1 ${
                    isHighlight 
                      ? 'bg-[#122421] text-[#FAF7EE] border-[#B99A6A]/30' 
                      : 'bg-[#FAF6ED] text-[#172D29] border-[#D8CBB5]'
                  }`}>
                    <Building size={13} className="text-[#B99A6A]" />
                    <span>{entry.block}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
