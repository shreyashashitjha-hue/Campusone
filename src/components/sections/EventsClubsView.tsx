import React, { useState } from 'react';
import { 
  Sparkles, 
  CalendarDays, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Tag, 
  Building,
  ShieldCheck,
  X,
  QrCode,
  Ticket
} from 'lucide-react';
import { CampusEvent, CampusClub } from '../../types';

interface EventsClubsViewProps {
  events: CampusEvent[];
  clubs: CampusClub[];
  onToggleRSVP: (eventId: string) => void;
  onJoinClub?: (clubId: string) => void;
}

export const EventsClubsView: React.FC<EventsClubsViewProps> = ({
  events,
  clubs,
  onToggleRSVP,
  onJoinClub,
}) => {
  const [viewMode, setViewMode] = useState<'events' | 'clubs'>('events');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedPassEvent, setSelectedPassEvent] = useState<CampusEvent | null>(null);
  const [joinedClubIds, setJoinedClubIds] = useState<Record<string, boolean>>({
    'club-1': true,
    'club-2': true,
  });

  const flagshipEvent = events[0];

  const filteredEvents = events.filter(e => {
    if (categoryFilter === 'All') return true;
    return e.category === categoryFilter;
  });

  const handleToggleJoinClub = (clubId: string) => {
    setJoinedClubIds(prev => ({ ...prev, [clubId]: !prev[clubId] }));
    if (onJoinClub) onJoinClub(clubId);
  };

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <Sparkles size={14} />
            <span>Collegiate Student Guild & Societies</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Campus Conclaves & Societies
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            Register for technical symposia in the Unipolis Arena, attend academic debates in Block 36, and explore student guilds.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]">
          <button
            onClick={() => setViewMode('events')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'events' ? 'bg-[#172D29] text-[#FAF7EE] shadow-sm' : 'text-[#85877F] hover:text-[#172D29]'
            }`}
          >
            Symposia & Events ({events.length})
          </button>
          <button
            onClick={() => setViewMode('clubs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'clubs' ? 'bg-[#172D29] text-[#FAF7EE] shadow-sm' : 'text-[#85877F] hover:text-[#172D29]'
            }`}
          >
            Guilds & Societies ({clubs.length})
          </button>
        </div>
      </div>

      {viewMode === 'events' ? (
        <>
          {/* 2. EDITORIAL FLAGSHIP FEATURE EVENT BANNER */}
          {flagshipEvent && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#172D29] via-[#1E3B35] to-[#122421] text-[#F0EBDD] p-6 sm:p-8 lg:p-10 border border-[#B99A6A]/40 shadow-academic-dark">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider">
                    <Award size={14} />
                    <span>{flagshipEvent.badge || 'Annual Flagship Conclave'}</span>
                    <span>•</span>
                    <span className="text-[#FAF7EE]">{flagshipEvent.club}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#FAF7EE] leading-tight">
                    {flagshipEvent.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D8CBB5]/90 leading-relaxed font-sans max-w-xl">
                    {flagshipEvent.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#D8CBB5]/80 pt-2">
                    <span className="flex items-center space-x-1.5 font-semibold text-[#FAF7EE]">
                      <CalendarDays size={14} className="text-[#B99A6A]" />
                      <span>{flagshipEvent.date} ({flagshipEvent.time})</span>
                    </span>
                    <span className="flex items-center space-x-1.5 font-semibold text-[#FAF7EE]">
                      <MapPin size={14} className="text-[#B99A6A]" />
                      <span>{flagshipEvent.block} • {flagshipEvent.venue}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Users size={14} className="text-[#87988A]" />
                      <span>{flagshipEvent.rsvpCount} of {flagshipEvent.maxCapacity} Delegations</span>
                    </span>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onToggleRSVP(flagshipEvent.id)}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center space-x-2 ${
                        flagshipEvent.isRsvp 
                          ? 'bg-[#213B33] text-[#FAF7EE] border border-[#B99A6A]/50'
                          : 'bg-[#B99A6A] hover:bg-[#CEB184] text-[#172D29]'
                      }`}
                    >
                      {flagshipEvent.isRsvp ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-400" />
                          <span>Delegate Pass Confirmed</span>
                        </>
                      ) : (
                        <>
                          <Ticket size={16} />
                          <span>Register RSVP Attendance</span>
                        </>
                      )}
                    </button>

                    {flagshipEvent.isRsvp && (
                      <button
                        onClick={() => setSelectedPassEvent(flagshipEvent)}
                        className="px-4 py-2.5 rounded-xl bg-[#122421] border border-[#B99A6A]/30 text-xs font-semibold text-[#FAF7EE] hover:bg-[#213B33] transition-colors flex items-center space-x-1.5"
                      >
                        <QrCode size={14} className="text-[#B99A6A]" />
                        <span>View Entry Pass</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Date Crest Pill */}
                <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-2xl bg-[#132522] border border-[#B99A6A]/30 text-center min-w-[160px]">
                  <span className="text-xs font-bold text-[#B99A6A] uppercase tracking-widest font-mono">NOV</span>
                  <span className="font-editorial text-5xl font-bold text-[#FAF7EE] my-1">28</span>
                  <span className="text-[11px] text-[#87988A] font-semibold">FRIDAY 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. CATEGORY PILLS TOOLBAR */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(['All', 'Technical', 'Literary', 'Cultural', 'Sports'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                  categoryFilter === cat 
                    ? 'bg-[#172D29] text-[#FAF7EE] border-[#172D29]' 
                    : 'bg-[#FCFAF4] text-[#292B28] border-[#D8CBB5] hover:bg-[#EAE2D1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4. UPCOMING EVENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(1).map((ev) => (
              <div 
                key={ev.id}
                className="p-6 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A]/70 shadow-sm flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#172D29] text-[#FAF7EE]">
                      {ev.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#172D29]">
                      {ev.date}
                    </span>
                  </div>

                  <h4 className="font-editorial text-xl font-bold text-[#172D29] group-hover:text-[#B99A6A] transition-colors leading-snug mt-1">
                    {ev.title}
                  </h4>

                  <span className="inline-block text-[11px] font-semibold text-[#85877F] mt-0.5">
                    Organized by {ev.club}
                  </span>

                  <p className="text-xs text-[#292B28]/80 leading-relaxed mt-2.5 mb-4 line-clamp-3">
                    {ev.description}
                  </p>

                  <div className="space-y-1 text-xs text-[#85877F] pt-3 border-t border-[#D8CBB5]/60">
                    <div className="flex items-center space-x-1.5">
                      <MapPin size={13} className="text-[#172D29]" />
                      <span className="font-medium text-[#172D29] truncate">{ev.block} • {ev.venue}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CalendarDays size={13} className="text-[#172D29]" />
                      <span>{ev.time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D8CBB5] flex items-center justify-between">
                  <span className="text-xs text-[#85877F]">
                    {ev.rsvpCount} Attending
                  </span>

                  <div className="flex items-center space-x-2">
                    {ev.isRsvp && (
                      <button
                        onClick={() => setSelectedPassEvent(ev)}
                        className="p-1.5 rounded-lg bg-[#FAF6ED] text-[#172D29] hover:bg-[#EAE2D1] border border-[#D8CBB5]"
                        title="View Pass"
                      >
                        <QrCode size={14} />
                      </button>
                    )}

                    <button
                      onClick={() => onToggleRSVP(ev.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        ev.isRsvp 
                          ? 'bg-[#172D29] text-[#FAF7EE]'
                          : 'bg-[#B99A6A] hover:bg-[#CEB184] text-[#172D29]'
                      }`}
                    >
                      {ev.isRsvp ? 'Pass Issued' : 'RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* GUILDS & SOCIETIES DIRECTORY TAB */
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
              Recognized Student Societies & Chapters
            </h3>
            <span className="text-xs text-[#85877F]">Chartered under Dean of Student Affairs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {clubs.map((club) => {
              const isJoined = joinedClubIds[club.id];

              return (
                <div 
                  key={club.id}
                  className="p-6 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A6A] block">
                          {club.category}
                        </span>
                        <h4 className="font-editorial text-xl font-bold text-[#172D29] mt-0.5">
                          {club.name}
                        </h4>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isJoined 
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                          : 'bg-[#FAF6ED] text-[#85877F] border-[#D8CBB5]'
                      }`}>
                        {isJoined ? 'Active Member' : 'Recruiting'}
                      </span>
                    </div>

                    <p className="text-xs text-[#292B28]/80 leading-relaxed">
                      {club.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-[#FAF6ED] border border-[#D8CBB5]/60">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#85877F] block">Lead Secretary</span>
                        <span className="font-semibold text-[#172D29]">{club.lead}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#85877F] block">Roster Count</span>
                        <span className="font-semibold text-[#172D29]">{club.membersCount} Scholars</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-[#D8CBB5]/40 text-[#85877F]">
                        Meets: <strong className="text-[#172D29]">{club.meetingSchedule}</strong> ({club.venue})
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D8CBB5] flex items-center justify-between">
                    <span className="text-xs text-[#85877F] font-mono">{club.leadEmail}</span>
                    <button
                      onClick={() => handleToggleJoinClub(club.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isJoined 
                          ? 'bg-[#EFE8D8] text-[#172D29] hover:bg-rose-50 hover:text-rose-700' 
                          : 'bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE]'
                      }`}
                    >
                      {isJoined ? 'Leave Guild' : 'Apply for Fellowship'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EVENT TICKET PASS MODAL */}
      {selectedPassEvent && (
        <div className="fixed inset-0 z-50 bg-[#0E1D1A]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6ED] border-2 border-[#B99A6A]/60 rounded-2xl max-w-md w-full p-6 shadow-academic-lg relative animate-in fade-in">
            <button 
              onClick={() => setSelectedPassEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#85877F] hover:text-[#172D29]"
            >
              <X size={18} />
            </button>

            {/* Ticket Header */}
            <div className="text-center pb-4 border-b border-dashed border-[#B99A6A]/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A6A] font-sans">
                Official University Delegate Pass
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#172D29] mt-1">
                {selectedPassEvent.title}
              </h3>
              <p className="text-xs text-[#85877F] mt-0.5">{selectedPassEvent.club}</p>
            </div>

            {/* Ticket Body */}
            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#FCFAF4] border border-[#D8CBB5]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#85877F] block">Date & Time</span>
                  <span className="font-bold text-[#172D29] block">{selectedPassEvent.date}</span>
                  <span className="text-[11px] text-[#85877F]">{selectedPassEvent.time}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#85877F] block">Venue</span>
                  <span className="font-bold text-[#172D29] block">{selectedPassEvent.block}</span>
                  <span className="text-[11px] text-[#85877F]">{selectedPassEvent.venue}</span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="p-4 rounded-xl bg-white border border-[#D8CBB5] flex flex-col items-center justify-center text-center">
                <QrCode size={100} className="text-[#172D29]" />
                <span className="font-mono text-xs font-bold text-[#172D29] mt-2 tracking-wider">
                  {selectedPassEvent.passId || 'CMP-2026-PASS-904'}
                </span>
                <span className="text-[10px] text-[#85877F]">Scan at Unipolis Entrance Concierge</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-[11px] text-[#85877F]">Delegate: Aarav Sharma (2023CSB1048)</span>
              <button
                onClick={() => {
                  alert('Pass saved to wallet!');
                  setSelectedPassEvent(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#172D29] text-[#FAF7EE] font-bold text-xs"
              >
                Print / Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
