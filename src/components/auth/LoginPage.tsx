import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  MapPin,
  Compass
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Demo credential autofill helper
  const handleQuickDemoFill = () => {
    setIdentifier('aarav.sharma@campusone.edu');
    setPassword('campusone2026');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Required-field validation
    if (!identifier.trim()) {
      setErrorMessage('Please enter your university email or student registration ID.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    // Minimum password length check
    if (password.length < 4) {
      setErrorMessage('Security notice: Passwords must be at least 4 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication verification
    setTimeout(() => {
      // Prototype credential check:
      // Accepts demo credential or any valid student format (e.g. email or alphanumeric student ID)
      const isDemo = identifier.toLowerCase().includes('aarav') || 
                     identifier.toUpperCase().includes('2023CSB') ||
                     identifier.includes('@campusone.edu');

      // Reject explicitly wrong test attempts if password is "wrong"
      if (password === 'wrong' || password === 'invalid') {
        setIsLoading(false);
        setErrorMessage('Invalid student credentials. Please verify your student ID and passkey.');
        return;
      }

      // Successful login handling
      if (rememberMe) {
        localStorage.setItem('campusone_remember_id', identifier);
      } else {
        localStorage.removeItem('campusone_remember_id');
      }

      setIsLoading(false);
      onLoginSuccess();
    }, 850);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0EBDD] flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-[#B99A6A] selection:text-[#172D29]">
      {/* Outer Shell Container */}
      <div className="w-full max-w-6xl min-h-screen sm:min-h-[640px] lg:min-h-[720px] bg-[#FAF6ED] rounded-none sm:rounded-3xl border-0 sm:border border-[#D8CBB5] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* ======================================================== */}
        {/* LEFT SECTION (VISUAL BRANDING & COLLEGIATE IDENTITY)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#172D29] via-[#1A342F] to-[#122421] text-[#F0EBDD] p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#B99A6A]/25">
          
          {/* Subtle Decorative Architectural Watermarks & Grids */}
          <div className="absolute inset-0 bg-dark-grid opacity-35 pointer-events-none" />
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-radial from-[#B99A6A]/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-radial from-[#213B33]/60 via-transparent to-transparent pointer-events-none" />

          {/* Top: Brand Wordmark & Seal */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#213B33] to-[#10201D] border border-[#B99A6A]/50 flex items-center justify-center shadow-inner group">
                <span className="font-editorial text-2xl text-[#B99A6A] font-bold tracking-tight">C</span>
                <span className="font-editorial text-2xl text-[#FAF7EE] font-bold -ml-0.5">1</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-editorial text-2xl tracking-tight text-[#FAF7EE] font-bold">CampusOne</span>
                  <span className="text-[10px] tracking-widest font-sans uppercase font-bold px-2 py-0.5 rounded-full bg-[#B99A6A]/20 text-[#B99A6A] border border-[#B99A6A]/30">
                    PORTAL
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[#87988A] tracking-wider uppercase font-semibold">
                  Collegiate Academic Systems
                </p>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#132522] border border-[#B99A6A]/20 text-[11px] text-[#D8CBB5]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fall Term 2026</span>
            </div>
          </div>

          {/* Middle: Architectural Hero Copy & Feature Pillars */}
          <div className="relative z-10 my-10 lg:my-14 space-y-6 max-w-lg">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#213B33]/80 border border-[#B99A6A]/30 text-xs text-[#B99A6A] font-semibold">
              <Sparkles size={13} className="text-[#B99A6A]" />
              <span>Academic Intelligence & Student Portal</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7EE] leading-[1.15]">
              Your campus. <br />
              Your journey. <br />
              <span className="text-[#B99A6A] italic font-normal">One place.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#D8CBB5]/85 leading-relaxed font-sans">
              The unified academic operating system designed for modern collegiate scholars. Effortlessly synchronize lecture timetables, compute predictive attendance compliance, plan graduation credit trajectories, and navigate campus life in one singular, dignified environment.
            </p>

            {/* Subtle Feature Badges Grid */}
            <div className="pt-2 grid grid-cols-2 gap-2.5 text-xs text-[#D8CBB5]">
              <div className="p-3 rounded-xl bg-[#132522]/80 border border-[#B99A6A]/20 flex items-center space-x-2.5">
                <ShieldCheck size={16} className="text-[#B99A6A] shrink-0" />
                <span className="font-semibold text-xs text-[#FAF7EE]">75% Attendance Guard</span>
              </div>
              <div className="p-3 rounded-xl bg-[#132522]/80 border border-[#B99A6A]/20 flex items-center space-x-2.5">
                <GraduationCap size={16} className="text-[#B99A6A] shrink-0" />
                <span className="font-semibold text-xs text-[#FAF7EE]">Target CGPA Planner</span>
              </div>
              <div className="p-3 rounded-xl bg-[#132522]/80 border border-[#B99A6A]/20 flex items-center space-x-2.5">
                <Clock size={16} className="text-[#B99A6A] shrink-0" />
                <span className="font-semibold text-xs text-[#FAF7EE]">Synchronized Timetable</span>
              </div>
              <div className="p-3 rounded-xl bg-[#132522]/80 border border-[#B99A6A]/20 flex items-center space-x-2.5">
                <MapPin size={16} className="text-[#B99A6A] shrink-0" />
                <span className="font-semibold text-xs text-[#FAF7EE]">Blocks 32, 34, 36 & Unipolis</span>
              </div>
            </div>
          </div>

          {/* Bottom: Academic Motto & Citation */}
          <div className="relative z-10 pt-6 border-t border-[#B99A6A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#87988A]">
            <span className="font-editorial italic text-sm text-[#D8CBB5]">
              Veritas, Scientia, et Excelsius
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B99A6A]/90">
              Built for student life.
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SECTION (LOGIN FORM & AUTHENTICATION INTERACTION)  */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 bg-[#FAF6ED] p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative">
          
          {/* Top Corner Quick Demo Fill Pill */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#85877F]">
              Student Portal Access
            </span>
            
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs font-bold text-[#B99A6A] hover:text-[#9A7D4E] bg-[#F0EBDD] hover:bg-[#EAE2D1] border border-[#B99A6A]/35 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1"
              title="Click to autofill sample student credentials"
            >
              <Sparkles size={12} />
              <span>Autofill Demo Login</span>
            </button>
          </div>

          {/* Center Form Container */}
          <div className="my-auto max-w-md w-full mx-auto space-y-6">
            <div className="space-y-1.5">
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#172D29] tracking-tight">
                Welcome back.
              </h2>
              <p className="text-sm text-[#85877F] leading-relaxed">
                Sign in to continue to your CampusOne dashboard and access your academic records.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start space-x-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                <AlertCircle size={16} className="text-rose-700 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Input */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="identifier"
                  className="block text-xs font-bold uppercase tracking-wider text-[#292B28]"
                >
                  University Email or Student ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#85877F]">
                    <User size={16} />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g., 2023CSB1048 or aarav.sharma@campusone.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FCFAF4] border border-[#D8CBB5] rounded-xl text-sm text-[#172D29] placeholder-[#85877F]/70 focus:outline-none focus:ring-2 focus:ring-[#B99A6A]/60 focus:border-[#B99A6A] transition-all shadow-sm"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label 
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-[#292B28]"
                  >
                    Passkey
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-semibold text-[#B99A6A] hover:text-[#9A7D4E] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#85877F]">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Enter your academic passkey"
                    className="w-full pl-10 pr-11 py-2.5 bg-[#FCFAF4] border border-[#D8CBB5] rounded-xl text-sm text-[#172D29] placeholder-[#85877F]/70 focus:outline-none focus:ring-2 focus:ring-[#B99A6A]/60 focus:border-[#B99A6A] transition-all shadow-sm"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#85877F] hover:text-[#172D29] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D8CBB5] text-[#172D29] focus:ring-[#B99A6A] accent-[#172D29]"
                  />
                  <span className="text-xs font-medium text-[#292B28]">
                    Remember this workstation for 30 days
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-5 rounded-xl bg-[#172D29] hover:bg-[#213B33] active:scale-[0.99] text-[#FAF7EE] text-sm font-bold tracking-wide transition-all shadow-academic flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed group border border-[#B99A6A]/30"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#FAF7EE] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to CampusOne</span>
                    <ArrowRight size={16} className="text-[#B99A6A] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Prototype Authentication Notice */}
            <div className="p-3 rounded-xl bg-[#F0EBDD] border border-[#D8CBB5] text-[11px] text-[#85877F] leading-relaxed">
              <span className="font-bold text-[#172D29]">Prototype Authentication:</span> You can sign in using demo credentials or any valid registration ID (e.g. <span className="font-mono text-[#172D29] font-bold">2023CSB1048</span>). To test invalid credential handling, enter password <span className="font-mono text-[#172D29] font-bold">wrong</span>.
            </div>
          </div>

          {/* Bottom Help Desk & Security Footer */}
          <div className="pt-6 border-t border-[#D8CBB5] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#85877F]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck size={14} className="text-[#172D29]" />
              <span>Single Sign-On • 256-Bit TLS</span>
            </div>
            <span>Help Desk: helpdesk@campusone.edu</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FORGOT PASSWORD MODAL                                    */}
      {/* ======================================================== */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-[#0E1D1A]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFAF4] border border-[#B99A6A]/40 rounded-2xl max-w-md w-full p-6 shadow-academic-lg animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB5]">
              <h3 className="font-editorial text-xl font-bold text-[#172D29]">
                Reset Passkey
              </h3>
              <button 
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded text-[#85877F] hover:text-[#172D29]"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600 animate-bounce" />
                <h4 className="font-editorial text-lg font-bold text-[#172D29]">
                  Passkey Reset Dispatched
                </h4>
                <p className="text-xs text-[#85877F]">
                  Instructions and a recovery link have been dispatched to your official student inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 mt-4 text-xs">
                <p className="text-[#85877F] leading-relaxed">
                  Enter your registered university email or student ID. We'll send an authenticated password reset link through the university registrar.
                </p>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#85877F] block mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="student@campusone.edu"
                    className="w-full bg-[#FAF6ED] border border-[#D8CBB5] rounded-lg px-3 py-2 text-[#172D29] focus:outline-none focus:ring-1 focus:ring-[#B99A6A]"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#85877F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#172D29] hover:bg-[#213B33] text-[#FAF7EE] text-xs font-bold"
                  >
                    Send Recovery Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
