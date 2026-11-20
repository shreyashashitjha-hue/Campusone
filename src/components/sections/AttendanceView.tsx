import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Plus, 
  Minus, 
  Sliders, 
  ShieldCheck, 
  RefreshCw,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AttendanceSubject } from '../../types';
import { CircularProgress } from '../common/CircularProgress';

interface AttendanceViewProps {
  subjects: AttendanceSubject[];
  onUpdateSubject: (updatedSubjects: AttendanceSubject[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  subjects,
  onUpdateSubject,
}) => {
  // Calculator state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [skipSliderVal, setSkipSliderVal] = useState<number>(0);
  const [attendSliderVal, setAttendSliderVal] = useState<number>(0);

  // Overall calculations
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalConducted = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPct = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 0;

  // Selected subject for interactive simulation
  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  // Subject simulation calculations
  const simAttended = (activeSubject?.attended || 0) + attendSliderVal;
  const simTotal = (activeSubject?.total || 0) + skipSliderVal + attendSliderVal;
  const simulatedPct = simTotal > 0 ? (simAttended / simTotal) * 100 : 0;

  // Safe miss / recovery logic for active subject
  const currentSubPct = activeSubject?.total ? (activeSubject.attended / activeSubject.total) * 100 : 0;
  
  // Safe misses formula: attended / (total + x) >= 0.75 => x <= (attended - 0.75 * total) / 0.75
  const safeSkips = Math.max(0, Math.floor((activeSubject.attended - 0.75 * activeSubject.total) / 0.75));
  
  // Classes needed to reach 75%: (attended + x) / (total + x) >= 0.75 => x >= (0.75 * total - attended) / 0.25
  const neededToReach75 = currentSubPct < 75 
    ? Math.max(0, Math.ceil((0.75 * activeSubject.total - activeSubject.attended) / 0.25))
    : 0;

  // Quick mark present / absent on actual state
  const handleMark = (subjectId: string, action: 'present' | 'absent') => {
    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        if (action === 'present') {
          return { ...s, attended: s.attended + 1, total: s.total + 1, lastUpdated: 'Just now' };
        } else {
          return { ...s, total: s.total + 1, lastUpdated: 'Just now' };
        }
      }
      return s;
    });
    onUpdateSubject(updated);
  };

  const handleReset = (subjectId: string) => {
    // Reset to initial baseline for this subject
    const original = subjects.map(s => {
      if (s.id === subjectId) {
        return { ...s, attended: Math.round(s.total * 0.82), lastUpdated: 'Reset to baseline' };
      }
      return s;
    });
    onUpdateSubject(original);
  };

  return (
    <div className="space-y-7 pb-12">
      {/* Editorial Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <ShieldCheck size={14} />
            <span>Academic Regulations Clause 14.2</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            75% Mandatory Attendance Compliance
          </h2>
          <p className="text-sm text-[#85877F] leading-relaxed">
            University ordinances require minimum 75.0% physical presence in each registered theory, laboratory, and tutorial module to be eligible for end-term examination hall passes.
          </p>
        </div>

        {/* Global Compliance Summary Pill */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-[#FAF6ED] border border-[#B99A6A]/30">
          <CircularProgress
            percentage={overallPct}
            size={90}
            strokeWidth={8}
            color="#172D29"
            trackColor="#D8CBB5"
          />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F] block">Aggregate</span>
            <span className="text-sm font-bold text-[#172D29] block">
              {totalAttended} / {totalConducted} Sessions
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
              Compliant Standing
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SKIP CALCULATOR & SIMULATOR */}
      <div className="rounded-2xl bg-gradient-to-br from-[#172D29] via-[#1F3C37] to-[#122421] text-[#F0EBDD] p-6 sm:p-8 border border-[#B99A6A]/40 shadow-academic-dark">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#B99A6A]/20">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider mb-1">
              <Sliders size={14} />
              <span>Predictive Decision Engine</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#FAF7EE]">
              Interactive Skip & Attendance Planner
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CBB5]/80 mt-1">
              Simulate the mathematical impact of missed lectures or recovery streaks before skipping classes.
            </p>
          </div>

          {/* Subject Selector Dropdown */}
          <div className="min-w-[240px]">
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#87988A] block mb-1">
              Select Course Module
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSkipSliderVal(0);
                setAttendSliderVal(0);
              }}
              className="w-full bg-[#132522] border border-[#B99A6A]/40 text-[#FAF7EE] text-xs font-semibold rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#B99A6A]"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.name} ({((s.attended / s.total) * 100).toFixed(1)}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Sliders Area (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-[#FAF7EE] flex items-center space-x-1.5">
                  <Minus size={14} className="text-amber-400" />
                  <span>Hypothetical Skipped Lectures:</span>
                </span>
                <span className="font-mono text-sm font-bold text-[#B99A6A] bg-[#213B33] px-3 py-0.5 rounded border border-[#B99A6A]/30">
                  +{skipSliderVal} classes missed
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={skipSliderVal}
                onChange={(e) => {
                  setSkipSliderVal(parseInt(e.target.value));
                  if (parseInt(e.target.value) > 0) setAttendSliderVal(0);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-[#87988A] mt-1 font-mono">
                <span>0 (None)</span>
                <span>2 classes</span>
                <span>4 classes</span>
                <span>6 classes</span>
                <span>8 classes</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-[#FAF7EE] flex items-center space-x-1.5">
                  <Plus size={14} className="text-emerald-400" />
                  <span>Consecutive Future Classes Attended:</span>
                </span>
                <span className="font-mono text-sm font-bold text-emerald-400 bg-[#213B33] px-3 py-0.5 rounded border border-[#B99A6A]/30">
                  +{attendSliderVal} classes attended
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={attendSliderVal}
                onChange={(e) => {
                  setAttendSliderVal(parseInt(e.target.value));
                  if (parseInt(e.target.value) > 0) setSkipSliderVal(0);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-[#87988A] mt-1 font-mono">
                <span>0 (Current)</span>
                <span>3 streak</span>
                <span>6 streak</span>
                <span>9 streak</span>
                <span>12 streak</span>
              </div>
            </div>

            {/* Quick Reset Simulation Button */}
            {(skipSliderVal > 0 || attendSliderVal > 0) && (
              <button
                onClick={() => {
                  setSkipSliderVal(0);
                  setAttendSliderVal(0);
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-[#87988A] hover:text-[#FAF7EE] underline transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset simulation values to current record</span>
              </button>
            )}
          </div>

          {/* Simulation Output Card (Span 5) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-[#132522] border border-[#B99A6A]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-[#87988A] font-semibold uppercase tracking-wider text-[10px]">
                  Projected Outcome
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  simulatedPct >= 75 ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600' : 'bg-rose-900/60 text-rose-300 border border-rose-600'
                }`}>
                  {simulatedPct >= 75 ? 'Safe • Hall Ticket OK' : 'Debarred Warning'}
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#FAF7EE]">
                  {simulatedPct.toFixed(1)}%
                </span>
                <span className="text-xs text-[#D8CBB5]/80">
                  (was {currentSubPct.toFixed(1)}%)
                </span>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[#172D29] border border-[#B99A6A]/20 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#87988A]">Simulated Record:</span>
                  <span className="font-bold text-[#FAF7EE]">{simAttended} attended of {simTotal} conducted</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87988A]">Maximum Safe Skips Left:</span>
                  <span className="font-bold text-[#B99A6A]">{safeSkips} classes</span>
                </div>
                {neededToReach75 > 0 && (
                  <div className="flex justify-between text-rose-300 font-bold">
                    <span>Must Attend Next:</span>
                    <span>{neededToReach75} classes to hit 75%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#B99A6A]/20 text-[11px] text-[#87988A] leading-relaxed">
              <strong className="text-[#D8CBB5]">Faculty Rule:</strong> A minimum of 75.00% is computed without rounding up 74.9%. Keep a minimum 2-class buffer.
            </div>
          </div>
        </div>
      </div>

      {/* ALL REGISTERED SUBJECTS BREAKDOWN */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
              Registered Modules ({subjects.length})
            </h3>
            <p className="text-xs text-[#85877F]">
              Direct tally with live attendance logging & threshold warnings
            </p>
          </div>
          <span className="text-xs font-semibold text-[#172D29] bg-[#EAE2D1] px-3 py-1 rounded-full border border-[#D8CBB5]">
            Autumn Term 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub) => {
            const pct = sub.total > 0 ? (sub.attended / sub.total) * 100 : 0;
            const isSafe = pct >= 80;
            const isNear = pct >= 75 && pct < 80;
            const isCritical = pct < 75;

            // Safe skips for this subject
            const skips = Math.max(0, Math.floor((sub.attended - 0.75 * sub.total) / 0.75));
            const needed = isCritical ? Math.ceil((0.75 * sub.total - sub.attended) / 0.25) : 0;

            return (
              <div 
                key={sub.id}
                className="p-5 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#85877F]">
                        {sub.code} • {sub.type}
                      </span>
                      <h4 className="font-editorial text-lg font-bold text-[#172D29] leading-snug mt-0.5">
                        {sub.name}
                      </h4>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${
                      isSafe ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                      isNear ? 'bg-amber-100 text-amber-900 border-amber-300' :
                      'bg-rose-100 text-rose-900 border-rose-300'
                    }`}>
                      {isSafe ? 'Compliant' : isNear ? 'Buffer Tight' : 'Debarred Warning'}
                    </span>
                  </div>

                  <p className="text-xs text-[#85877F] mb-4">
                    {sub.professor} • <span className="font-medium text-[#172D29]">{sub.room}</span>
                  </p>

                  {/* Percentage Display & Progress Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-xl sm:text-2xl text-[#172D29]">
                        {pct.toFixed(1)}%
                      </span>
                      <span className="font-mono text-xs text-[#85877F]">
                        {sub.attended} / {sub.total} Conducted
                      </span>
                    </div>

                    <div className="w-full bg-[#EAE2D1] h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSafe ? 'bg-[#172D29]' : isNear ? 'bg-[#B99A6A]' : 'bg-rose-600'
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Buffer / Warning Status */}
                  <div className="p-2.5 rounded-lg bg-[#FAF6ED] border border-[#D8CBB5] text-xs text-[#292B28] mb-4">
                    {isCritical ? (
                      <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                        <AlertTriangle size={14} />
                        <span>Must attend next {needed} classes to reach 75%</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[#85877F]">Safe misses remaining:</span>
                        <span className="font-bold text-[#172D29]">{skips} classes</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Interactive Mark Buttons */}
                <div className="pt-3 border-t border-[#D8CBB5] flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleMark(sub.id, 'present')}
                      className="px-2.5 py-1 rounded bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-[11px] font-bold transition-colors flex items-center space-x-1"
                      title="Log class attended (+1)"
                    >
                      <Plus size={12} />
                      <span>Present</span>
                    </button>
                    <button
                      onClick={() => handleMark(sub.id, 'absent')}
                      className="px-2.5 py-1 rounded bg-[#EFE8D8] hover:bg-[#E2DAC8] text-[#172D29] text-[11px] font-bold border border-[#D8CBB5] transition-colors"
                      title="Log class missed (+0 attended, +1 total)"
                    >
                      <span>Absent</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    className="text-[11px] font-bold text-[#B99A6A] hover:text-[#9A7D4E] flex items-center space-x-0.5"
                  >
                    <span>Simulate</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
