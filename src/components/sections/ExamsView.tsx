import React, { useState, useEffect } from 'react';
import { 
  BookOpenCheck, 
  Clock, 
  Calendar, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  MapPin, 
  Award, 
  FileText, 
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ExamItem, StudyTask } from '../../types';

interface ExamsViewProps {
  exams: ExamItem[];
  studyTasks: StudyTask[];
  onUpdateTasks: (tasks: StudyTask[]) => void;
  onUpdateExams: (exams: ExamItem[]) => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({
  exams,
  studyTasks,
  onUpdateTasks,
  onUpdateExams,
}) => {
  // New task form state
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState(exams[0]?.code || 'CS-401');
  const [taskPriority, setTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [taskHours, setTaskHours] = useState(2.0);

  // Live countdown state (calculated against exam dates)
  // Let's create a countdown map
  const [timeRemaining, setTimeRemaining] = useState<Record<string, { days: number; hours: number; mins: number; secs: number }>>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const newMap: Record<string, { days: number; hours: number; mins: number; secs: number }> = {};

      exams.forEach(exam => {
        const target = new Date(`${exam.date}T09:00:00`).getTime();
        const diff = Math.max(0, target - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        newMap[exam.id] = { days, hours, mins, secs };
      });

      setTimeRemaining(newMap);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [exams]);

  // Task handlers
  const handleToggleTask = (taskId: string) => {
    const updated = studyTasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdateTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = studyTasks.filter(t => t.id !== taskId);
    onUpdateTasks(updated);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const subjectObj = exams.find(e => e.code === taskSubject);
    const newTask: StudyTask = {
      id: `task-${Date.now()}`,
      subjectCode: taskSubject,
      subjectName: subjectObj ? subjectObj.name : 'Computer Science',
      title: taskTitle.trim(),
      priority: taskPriority,
      dueDate: '2026-11-26',
      completed: false,
      estimatedHours: taskHours
    };

    onUpdateTasks([newTask, ...studyTasks]);
    setTaskTitle('');
    setShowAddTask(false);
  };

  // Study progress metrics
  const completedCount = studyTasks.filter(t => t.completed).length;
  const totalTasks = studyTasks.length;
  const taskProgressPct = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  const totalStudyHoursRemaining = studyTasks
    .filter(t => !t.completed)
    .reduce((sum, t) => sum + t.estimatedHours, 0);

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B99A6A]">
            <BookOpenCheck size={14} />
            <span>End-Term Assessment Portal</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172D29]">
            Exams & Study Milestone Planner
          </h2>
          <p className="text-xs sm:text-sm text-[#85877F] leading-relaxed">
            Direct countdowns, verified seating allocations in Blocks 32, 34, and 36, and syllabus revision task lists.
          </p>
        </div>

        {/* Study Progress Card */}
        <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#B99A6A]/30 min-w-[260px] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#85877F] uppercase tracking-wider text-[10px]">Study Tasks</span>
            <span className="font-bold text-[#172D29]">{completedCount} of {totalTasks} Done</span>
          </div>
          <div className="w-full bg-[#EAE2D1] h-2 rounded-full overflow-hidden">
            <div className="bg-[#172D29] h-full rounded-full transition-all" style={{ width: `${taskProgressPct}%` }} />
          </div>
          <div className="flex justify-between text-[11px] text-[#85877F]">
            <span>{totalStudyHoursRemaining.toFixed(1)} hrs study remaining</span>
            <span className="font-bold text-[#B99A6A]">{taskProgressPct.toFixed(0)}% ready</span>
          </div>
        </div>
      </div>

      {/* 2. SUBJECT-WISE EXAM COUNTDOWNS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
            Examination Schedule & Seating ({exams.length} Papers)
          </h3>
          <span className="text-xs font-semibold text-[#172D29] bg-[#EAE2D1] px-3 py-1 rounded-full border border-[#D8CBB5]">
            Hall Tickets Verified
          </span>
        </div>

        <div className="space-y-4">
          {exams.map((exam, idx) => {
            const cd = timeRemaining[exam.id] || { days: 8, hours: 14, mins: 22, secs: 10 };
            const isFirst = idx === 0;

            return (
              <div 
                key={exam.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isFirst
                    ? 'bg-gradient-to-r from-[#172D29] to-[#213B33] text-[#F0EBDD] border-[#B99A6A] shadow-academic-lg'
                    : 'bg-[#FCFAF4] text-[#292B28] border-[#D8CBB5] hover:border-[#B99A6A]/60 shadow-sm'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Code, Name, Seating */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center space-x-2 text-xs font-semibold">
                      <span className={`font-mono ${isFirst ? 'text-[#B99A6A]' : 'text-[#85877F]'}`}>
                        {exam.code}
                      </span>
                      <span>•</span>
                      <span className={isFirst ? 'text-[#D8CBB5]' : 'text-[#85877F]'}>
                        {exam.type}
                      </span>
                      <span>•</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isFirst ? 'bg-[#122421] text-[#B99A6A] border border-[#B99A6A]/30' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {exam.hallTicketStatus}
                      </span>
                    </div>

                    <h4 className={`font-editorial text-xl sm:text-2xl font-bold ${
                      isFirst ? 'text-[#FAF7EE]' : 'text-[#172D29]'
                    }`}>
                      {exam.name}
                    </h4>

                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs ${
                      isFirst ? 'text-[#D8CBB5]/80' : 'text-[#85877F]'
                    }`}>
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={13} className={isFirst ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                        <span className="font-semibold">{exam.date} ({exam.time})</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin size={13} className={isFirst ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                        <span>{exam.block} • {exam.room}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Award size={13} className={isFirst ? 'text-[#B99A6A]' : 'text-[#172D29]'} />
                        <span className="font-mono font-bold text-[#FAF7EE]">{exam.seatNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Countdown Counter */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 lg:pl-6 lg:border-l lg:border-[#D8CBB5]/30">
                    <div className="text-center sm:text-right">
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                        isFirst ? 'text-[#87988A]' : 'text-[#85877F]'
                      }`}>
                        Commencing In
                      </span>
                      <div className="flex items-center space-x-2 font-mono">
                        <div className={`px-2.5 py-1.5 rounded-lg text-center ${
                          isFirst ? 'bg-[#122421] text-[#FAF7EE] border border-[#B99A6A]/40' : 'bg-[#EAE2D1] text-[#172D29]'
                        }`}>
                          <span className="font-bold text-lg">{cd.days}</span>
                          <span className="text-[9px] block text-[#87988A]">DAYS</span>
                        </div>
                        <span className="font-bold">:</span>
                        <div className={`px-2.5 py-1.5 rounded-lg text-center ${
                          isFirst ? 'bg-[#122421] text-[#FAF7EE] border border-[#B99A6A]/40' : 'bg-[#EAE2D1] text-[#172D29]'
                        }`}>
                          <span className="font-bold text-lg">{cd.hours}</span>
                          <span className="text-[9px] block text-[#87988A]">HRS</span>
                        </div>
                        <span className="font-bold">:</span>
                        <div className={`px-2.5 py-1.5 rounded-lg text-center ${
                          isFirst ? 'bg-[#122421] text-[#FAF7EE] border border-[#B99A6A]/40' : 'bg-[#EAE2D1] text-[#172D29]'
                        }`}>
                          <span className="font-bold text-lg">{cd.mins}</span>
                          <span className="text-[9px] block text-[#87988A]">MIN</span>
                        </div>
                        <span className="font-bold">:</span>
                        <div className={`px-2.5 py-1.5 rounded-lg text-center ${
                          isFirst ? 'bg-[#122421] text-[#B99A6A] border border-[#B99A6A]/40' : 'bg-[#EAE2D1] text-[#B99A6A]'
                        }`}>
                          <span className="font-bold text-lg">{cd.secs}</span>
                          <span className="text-[9px] block text-[#87988A]">SEC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STUDY PLANNER & TASK PROGRESS MANAGER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FCFAF4] border border-[#D8CBB5] shadow-academic">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#B99A6A] font-bold uppercase tracking-wider mb-1">
              <CheckSquare size={14} />
              <span>Syllabus Milestone Tracking</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#172D29]">
              Study Tasks & Revision Agenda
            </h3>
            <p className="text-xs sm:text-sm text-[#85877F] mt-0.5">
              Break down complex course syllabi into actionable review sprints.
            </p>
          </div>

          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="px-4 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Plus size={15} />
            <span>Add Study Task</span>
          </button>
        </div>

        {/* Add Task Modal / Form Drawer */}
        {showAddTask && (
          <form onSubmit={handleCreateTask} className="p-5 rounded-xl bg-[#FAF6ED] border border-[#B99A6A]/40 mb-6 space-y-4 animate-in fade-in">
            <h4 className="font-editorial text-base font-bold text-[#172D29]">
              Add New Study Milestone
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Topic / Task Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Derive Backpropagation gradient equations..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#FCFAF4] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#172D29] focus:outline-none focus:ring-1 focus:ring-[#B99A6A]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Subject Module
                </label>
                <select
                  value={taskSubject}
                  onChange={(e) => setTaskSubject(e.target.value)}
                  className="w-full bg-[#FCFAF4] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#172D29] focus:outline-none"
                >
                  {exams.map(e => (
                    <option key={e.code} value={e.code}>{e.code}: {e.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Priority
                </label>
                <div className="flex space-x-2">
                  {(['High', 'Medium', 'Low'] as const).map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setTaskPriority(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        taskPriority === p 
                          ? 'bg-[#172D29] text-[#FAF7EE] border-[#172D29]' 
                          : 'bg-[#FCFAF4] text-[#85877F] border-[#D8CBB5]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                  Estimated Study Time (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="10"
                  value={taskHours}
                  onChange={(e) => setTaskHours(parseFloat(e.target.value))}
                  className="w-full bg-[#FCFAF4] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#172D29] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#85877F] hover:bg-[#EAE2D1]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#B99A6A] text-[#172D29] text-xs font-bold hover:bg-[#CEB184]"
              >
                Save Milestone
              </button>
            </div>
          </form>
        )}

        {/* Task List */}
        <div className="space-y-2.5">
          {studyTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                task.completed 
                  ? 'bg-[#FAF6ED]/60 border-[#D8CBB5]/60 opacity-60' 
                  : 'bg-[#FAF6ED] border-[#D8CBB5] hover:border-[#B99A6A]/60'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className="p-1 text-[#172D29] hover:text-[#B99A6A] transition-colors"
                >
                  {task.completed ? (
                    <CheckSquare size={18} className="text-emerald-700" />
                  ) : (
                    <Square size={18} className="text-[#85877F]" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-[#B99A6A]">{task.subjectCode}</span>
                    <span>•</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      task.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                      task.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span>•</span>
                    <span className="text-[#85877F]">{task.estimatedHours} hrs</span>
                  </div>

                  <p className={`text-xs font-semibold mt-0.5 truncate ${
                    task.completed ? 'line-through text-[#85877F]' : 'text-[#292B28]'
                  }`}>
                    {task.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-1.5 rounded text-[#85877F] hover:text-rose-700 hover:bg-rose-50 transition-colors"
                title="Delete task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
