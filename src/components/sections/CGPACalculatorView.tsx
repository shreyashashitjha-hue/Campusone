import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Award, 
  Target, 
  Plus, 
  Trash2, 
  Calculator, 
  Layers, 
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SemesterSGPA, StudentProfile } from '../../types';

interface CGPACalculatorViewProps {
  profile: StudentProfile;
  semesters: SemesterSGPA[];
}

interface PlannedCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
  gradePoint: number;
}

const gradeMap: Record<string, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0
};

export const CGPACalculatorView: React.FC<CGPACalculatorViewProps> = ({
  profile,
  semesters,
}) => {
  // Target CGPA planning state
  const [targetCGPA, setTargetCGPA] = useState<number>(profile.targetCGPA || 9.00);

  // Completed semesters math
  const completedSemesters = semesters.filter(s => s.status === 'completed');
  const completedCredits = completedSemesters.reduce((sum, s) => sum + s.credits, 0); // 124
  const completedGradePoints = completedSemesters.reduce((sum, s) => sum + (s.sgpa * s.credits), 0); // ~1096.16
  const actualCGPA = completedCredits > 0 ? (completedGradePoints / completedCredits) : profile.currentCGPA;

  // Remaining graduation credits
  const totalGradCredits = profile.totalCredits || 160;
  const remainingCredits = Math.max(0, totalGradCredits - completedCredits); // 36 credits (Sem 7: 20, Sem 8: 16)

  // Target requirement formula:
  // (completedGradePoints + neededPoints) / totalGradCredits = targetCGPA
  // neededPoints = targetCGPA * totalGradCredits - completedGradePoints
  // neededSGPA = neededPoints / remainingCredits
  const neededRemainingPoints = (targetCGPA * totalGradCredits) - completedGradePoints;
  const neededRemainingSGPA = remainingCredits > 0 ? (neededRemainingPoints / remainingCredits) : 0;

  // Current Semester 7 Simulator Courses
  const [activeCourses, setActiveCourses] = useState<PlannedCourse[]>([
    { id: 'c1', code: 'CS-401', name: 'Distributed Cloud Architecture', credits: 4, grade: 'O', gradePoint: 10 },
    { id: 'c2', code: 'CS-405', name: 'Machine Learning & Neural Dynamics', credits: 4, grade: 'A+', gradePoint: 9 },
    { id: 'c3', code: 'CS-412', name: 'GPU Computing & Parallel Kernels', credits: 3, grade: 'A+', gradePoint: 9 },
    { id: 'c4', code: 'CS-418', name: 'Applied Cryptography & Consensus', credits: 3, grade: 'O', gradePoint: 10 },
    { id: 'c5', code: 'HS-302', name: 'Ethics in Autonomous Systems & Law', credits: 2, grade: 'A', gradePoint: 8 },
    { id: 'c6', code: 'CS-420', name: 'Capstone Project & Colloquium', credits: 4, grade: 'O', gradePoint: 10 },
  ]);

  // Simulated Sem 7 calculation
  const sem7Credits = activeCourses.reduce((sum, c) => sum + c.credits, 0);
  const sem7Points = activeCourses.reduce((sum, c) => sum + (c.credits * c.gradePoint), 0);
  const simSem7SGPA = sem7Credits > 0 ? (sem7Points / sem7Credits) : 0;

  // Cumulative CGPA including simulated Sem 7
  const newCumulativeCredits = completedCredits + sem7Credits;
  const newCumulativePoints = completedGradePoints + sem7Points;
  const simNewCGPA = newCumulativeCredits > 0 ? (newCumulativePoints / newCumulativeCredits) : actualCGPA;

  const handleGradeChange = (courseId: string, gradeStr: string) => {
    const point = gradeMap[gradeStr] ?? 8;
    setActiveCourses(prev => prev.map(c => c.id === courseId ? { ...c, grade: gradeStr, gradePoint: point } : c));
  };

  const handleCreditsChange = (courseId: string, creds: number) => {
    setActiveCourses(prev => prev.map(c => c.id === courseId ? { ...c, credits: creds } : c));
  };

  const handleAddCourse = () => {
    const newId = `c-${Date.now()}`;
    setActiveCourses(prev => [
      ...prev,
      { id: newId, code: `EL-${prev.length + 1}`, name: 'Departmental Elective Module', credits: 3, grade: 'A+', gradePoint: 9 }
    ]);
  };

  const handleRemoveCourse = (courseId: string) => {
    setActiveCourses(prev => prev.filter(c => c.id !== courseId));
  };

  return (
    <div className="space-y-7 pb-12">
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic">
          <div className="flex items-center justify-between text-xs text-[#85877F] uppercase tracking-wider font-bold mb-1">
            <span>Cumulative Grade</span>
            <Award size={16} className="text-[#B99A6A]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-editorial text-4xl font-bold text-[#172D29]">{actualCGPA.toFixed(2)}</span>
            <span className="text-xs text-[#85877F]">/ 10.00</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-2">
            Magna Cum Laude
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic">
          <div className="flex items-center justify-between text-xs text-[#85877F] uppercase tracking-wider font-bold mb-1">
            <span>Completed Credits</span>
            <Layers size={16} className="text-[#172D29]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-editorial text-4xl font-bold text-[#172D29]">{completedCredits}</span>
            <span className="text-xs text-[#85877F]">/ {totalGradCredits}</span>
          </div>
          <div className="w-full bg-[#EAE2D1] h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-[#172D29] h-full rounded-full" style={{ width: `${(completedCredits / totalGradCredits) * 100}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic">
          <div className="flex items-center justify-between text-xs text-[#85877F] uppercase tracking-wider font-bold mb-1">
            <span>Remaining Credits</span>
            <Target size={16} className="text-[#B99A6A]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-editorial text-4xl font-bold text-[#172D29]">{remainingCredits}</span>
            <span className="text-xs text-[#85877F]">Credits</span>
          </div>
          <p className="text-[11px] text-[#85877F] mt-2">
            Semester 7 (20) + Semester 8 (16)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#172D29] text-[#F0EBDD] border border-[#B99A6A]/35 shadow-academic-dark">
          <div className="flex items-center justify-between text-xs text-[#87988A] uppercase tracking-wider font-bold mb-1">
            <span>Simulated CGPA</span>
            <Sparkles size={16} className="text-[#B99A6A]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-editorial text-4xl font-bold text-[#FAF7EE]">{simNewCGPA.toFixed(2)}</span>
            <span className="text-xs text-[#B99A6A]">with Sem 7</span>
          </div>
          <p className="text-[11px] text-[#D8CBB5]/80 mt-2">
            SGPA {simSem7SGPA.toFixed(2)} projected
          </p>
        </div>
      </div>

      {/* 2. TARGET CGPA PLANNING VISUALIZATION */}
      <div className="rounded-2xl bg-gradient-to-br from-[#172D29] via-[#1E3B35] to-[#122421] text-[#F0EBDD] p-6 sm:p-8 border border-[#B99A6A]/40 shadow-academic-dark">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#B99A6A]/20">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider mb-1">
              <Target size={14} />
              <span>Target Graduation Trajectory</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#FAF7EE]">
              Graduation Target Planner
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CBB5]/80 mt-1">
              Adjust your desired graduation CGPA to compute the exact mathematical SGPA needed across your remaining {remainingCredits} credits.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#132522] p-3 rounded-xl border border-[#B99A6A]/30">
            <span className="text-xs text-[#87988A] font-bold uppercase">Graduation Goal:</span>
            <span className="font-editorial text-3xl font-bold text-[#B99A6A]">{targetCGPA.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Slider (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="font-bold text-[#FAF7EE]">Target CGPA at Degree Award:</span>
                <span className="font-mono text-sm font-bold text-[#B99A6A] bg-[#213B33] px-3 py-1 rounded border border-[#B99A6A]/30">
                  {targetCGPA.toFixed(2)} CGPA
                </span>
              </div>
              <input
                type="range"
                min="8.50"
                max="9.50"
                step="0.05"
                value={targetCGPA}
                onChange={(e) => setTargetCGPA(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-[#87988A] mt-2 font-mono">
                <span>8.50 (First Class)</span>
                <span>8.84 (Current)</span>
                <span>9.00 (Distinction)</span>
                <span>9.50 (University Gold)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#132522] border border-[#B99A6A]/20 text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#B99A6A] block">
                Degree Classification Guidelines
              </span>
              <ul className="space-y-1.5 text-[#D8CBB5]/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B99A6A]" />
                  <span><strong>9.00 – 10.00:</strong> First Class with Distinction & Dean's Scholar Citation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#87988A]" />
                  <span><strong>8.00 – 8.99:</strong> First Class Honours (Magna Cum Laude)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Target Feasibility Card (Span 5) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-[#132522] border border-[#B99A6A]/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#87988A] block mb-1">
                Required Average SGPA
              </span>
              <div className="flex items-baseline space-x-2">
                <span className={`font-editorial text-4xl sm:text-5xl font-bold ${
                  neededRemainingSGPA > 10.0 ? 'text-rose-400' : 
                  neededRemainingSGPA > 9.2 ? 'text-[#B99A6A]' : 
                  'text-emerald-400'
                }`}>
                  {neededRemainingSGPA > 10.0 ? 'Impossible' : neededRemainingSGPA.toFixed(2)}
                </span>
                {neededRemainingSGPA <= 10.0 && (
                  <span className="text-xs text-[#87988A]">SGPA / Semester</span>
                )}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[#172D29] border border-[#B99A6A]/20 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#87988A]">Remaining Semesters:</span>
                  <span className="font-bold text-[#FAF7EE]">Sem 7 & Sem 8 ({remainingCredits} credits)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87988A]">Needed Grade Points:</span>
                  <span className="font-bold text-[#FAF7EE]">{neededRemainingPoints.toFixed(1)} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87988A]">Feasibility Status:</span>
                  <span className={`font-bold ${
                    neededRemainingSGPA > 10.0 ? 'text-rose-400' :
                    neededRemainingSGPA > 9.3 ? 'text-amber-300' :
                    'text-emerald-400'
                  }`}>
                    {neededRemainingSGPA > 10.0 ? 'Mathematically Out of Reach' :
                     neededRemainingSGPA > 9.3 ? 'Demanding (Requires O/A+)' :
                     'Highly Achievable'}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 pt-3 border-t border-[#B99A6A]/20 text-[11px] text-[#87988A] leading-relaxed">
              To hit <strong className="text-[#FAF7EE]">{targetCGPA.toFixed(2)}</strong>, you must score an average of <strong className="text-[#B99A6A]">{neededRemainingSGPA.toFixed(2)} SGPA</strong> across Semesters 7 & 8.
            </p>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE SEMESTER 7 COURSE GRADE CALCULATOR */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider mb-1">
              <Calculator size={14} />
              <span>Current Term Simulator</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
              Semester 7 Module Grade Tally
            </h3>
            <p className="text-xs sm:text-sm text-[#85877F] mt-0.5">
              Adjust expected grades for each course to test your upcoming SGPA.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 rounded-xl bg-[#FAF6ED] border border-[#B99A6A]/30 text-right">
              <span className="text-[10px] font-bold uppercase text-[#85877F] block">Simulated SGPA</span>
              <span className="font-editorial text-2xl font-bold text-[#172D29]">{simSem7SGPA.toFixed(2)}</span>
            </div>
            <button
              onClick={handleAddCourse}
              className="px-3.5 py-2 rounded-xl bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Plus size={14} />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Courses Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D8CBB5] text-[#85877F] uppercase tracking-wider font-bold">
                <th className="pb-3 pl-2">Course Code & Title</th>
                <th className="pb-3 text-center">Credits</th>
                <th className="pb-3 text-center">Expected Grade</th>
                <th className="pb-3 text-center">Grade Point</th>
                <th className="pb-3 text-right">Credit Points</th>
                <th className="pb-3 pr-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CBB5]/60">
              {activeCourses.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF6ED]/70 transition-colors">
                  <td className="py-3.5 pl-2">
                    <span className="font-mono font-bold text-[#172D29] mr-2">{c.code}</span>
                    <span className="text-[#292B28] font-medium">{c.name}</span>
                  </td>
                  <td className="py-3.5 text-center">
                    <select
                      value={c.credits}
                      onChange={(e) => handleCreditsChange(c.id, parseInt(e.target.value))}
                      className="bg-[#FAF6ED] border border-[#D8CBB5] text-[#172D29] font-bold rounded px-2 py-1 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(cr => (
                        <option key={cr} value={cr}>{cr} Cr</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 text-center">
                    <select
                      value={c.grade}
                      onChange={(e) => handleGradeChange(c.id, e.target.value)}
                      className="bg-[#FAF6ED] border border-[#B99A6A]/50 text-[#172D29] font-bold rounded px-2 py-1 focus:outline-none"
                    >
                      {Object.keys(gradeMap).map(gr => (
                        <option key={gr} value={gr}>{gr} ({gradeMap[gr]} pts)</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 text-center font-mono font-bold text-[#172D29]">
                    {c.gradePoint}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-[#172D29]">
                    {(c.credits * c.gradePoint).toFixed(0)}
                  </td>
                  <td className="py-3.5 pr-2 text-center">
                    <button
                      onClick={() => handleRemoveCourse(c.id)}
                      className="p-1 rounded text-[#85877F] hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Remove course"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#D8CBB5] font-bold text-sm text-[#172D29]">
                <td className="pt-4 pl-2">Semester 7 Totals</td>
                <td className="pt-4 text-center font-mono">{sem7Credits} Credits</td>
                <td className="pt-4 text-center">SGPA: {simSem7SGPA.toFixed(2)}</td>
                <td className="pt-4 text-center">—</td>
                <td className="pt-4 text-right font-mono">{sem7Points} pts</td>
                <td className="pt-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4. PAST SEMESTER HISTORY CARDS */}
      <div>
        <h3 className="font-editorial text-2xl font-bold text-[#172D29] mb-4">
          Academic Transcript History (Semesters 1 – 6)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedSemesters.map((s) => (
            <div key={s.semester} className="p-4 rounded-xl bg-[#FCFAF4] border border-[#D8CBB5] hover:border-[#B99A6A]/60 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-editorial text-lg font-bold text-[#172D29]">
                  Semester {s.semester}
                </span>
                <span className="font-mono text-sm font-bold text-[#FAF7EE] bg-[#172D29] px-2 py-0.5 rounded">
                  {s.sgpa.toFixed(2)} SGPA
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#85877F] mb-3">
                <span>{s.credits} Credits Earned</span>
                <span>{s.courses.length} Modules</span>
              </div>
              <div className="space-y-1 border-t border-[#D8CBB5]/60 pt-2">
                {s.courses.slice(0, 3).map((cr) => (
                  <div key={cr.code} className="flex justify-between text-[11px]">
                    <span className="text-[#292B28] truncate pr-2">{cr.name}</span>
                    <span className="font-mono font-bold text-[#B99A6A]">{cr.grade}</span>
                  </div>
                ))}
                {s.courses.length > 3 && (
                  <span className="text-[10px] text-[#85877F] block text-right pt-0.5">
                    +{s.courses.length - 3} more modules
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
