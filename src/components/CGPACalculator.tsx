import React, { useState } from 'react';
import { Plus, Trash2, Award, GraduationCap, Calculator } from 'lucide-react';
import { CourseItem } from '../types';

interface CGPACalculatorProps {
  onSaveHistory: (operation: string, result: string, remark?: string) => void;
}

export const CGPACalculator: React.FC<CGPACalculatorProps> = ({ onSaveHistory }) => {
  const [courses, setCourses] = useState<CourseItem[]>([
    { id: 1, title: 'Calculus & Analytical Geometry', unit: '3', grade: '5' },
    { id: 2, title: 'Engineering Physics', unit: '3', grade: '4' },
    { id: 3, title: 'Data Structures & Algorithms', unit: '4', grade: '5' }
  ]);
  const [cgpaResult, setCgpaResult] = useState<string>('0.00');
  const [remarkText, setRemarkText] = useState<string>('');
  const [totalUnits, setTotalUnits] = useState<number>(0);

  const addCourseRow = () => {
    setCourses(prev => [
      ...prev,
      { id: Date.now(), title: '', unit: '', grade: '5' }
    ]);
  };

  const removeCourseRow = (id: number) => {
    if (courses.length > 1) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof CourseItem, value: string) => {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculateCGPA = () => {
    let points = 0;
    let units = 0;

    courses.forEach(c => {
      const u = parseFloat(c.unit);
      const g = parseFloat(c.grade);
      if (!isNaN(u) && !isNaN(g) && u > 0) {
        points += u * g;
        units += u;
      }
    });

    const calculatedGpa = units > 0 ? (points / units).toFixed(2) : '0.00';
    const numGpa = parseFloat(calculatedGpa);

    let remark = 'Academic Journey in Progress';
    if (numGpa >= 4.5) remark = 'First Class Honors — Outstanding Academic Excellence!';
    else if (numGpa >= 3.5) remark = 'Second Class Upper Division — Commendable Achievement!';
    else if (numGpa >= 2.4) remark = 'Second Class Lower Division — Good Standing.';
    else if (numGpa >= 1.5) remark = 'Third Class Division — Keep Pushing Forward.';
    else remark = 'Academic Probation Alert — Additional Advising Advised.';

    setCgpaResult(calculatedGpa);
    setRemarkText(remark);
    setTotalUnits(units);

    onSaveHistory(
      `${units} Units Enrolled | ${courses.length} Courses`,
      `${calculatedGpa} GPA`,
      remark
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slideUp">
      <div className="calc-card glass p-6 sm:p-10 rounded-[3rem] shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-outfit text-white tracking-tight">
                CGPA Academic Analyst
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Standard 5.0 Grade Point Average System
              </p>
            </div>
          </div>

          <button
            onClick={addCourseRow}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </div>

        {/* Table Headings */}
        <div className="hidden sm:grid grid-cols-[2.5fr_1fr_1.2fr_48px] gap-3 px-4 mb-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <span>Course Title</span>
          <span>Units</span>
          <span>Letter Grade</span>
          <span></span>
        </div>

        {/* Course Rows */}
        <div className="space-y-3 mb-8 max-h-[420px] overflow-y-auto pr-1">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="grid grid-cols-1 sm:grid-cols-[2.5fr_1fr_1.2fr_48px] gap-3 p-3.5 bg-black/40 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all items-center"
            >
              <input
                type="text"
                placeholder={`Course ${index + 1} Name`}
                value={course.title}
                onChange={e => updateCourse(course.id, 'title', e.target.value)}
                className="bg-transparent border border-white/5 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:bg-white/5 transition-all font-medium"
              />

              <input
                type="number"
                min="1"
                max="12"
                placeholder="Units (e.g. 3)"
                value={course.unit}
                onChange={e => updateCourse(course.id, 'unit', e.target.value)}
                className="bg-transparent border border-white/5 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:bg-white/5 transition-all font-medium"
              />

              <select
                value={course.grade}
                onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-indigo-300 font-bold outline-none focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="5">A (5.0 Points)</option>
                <option value="4">B (4.0 Points)</option>
                <option value="3">C (3.0 Points)</option>
                <option value="2">D (2.0 Points)</option>
                <option value="1">E (1.0 Point)</option>
                <option value="0">F (0.0 Points)</option>
              </select>

              <button
                onClick={() => removeCourseRow(course.id)}
                disabled={courses.length <= 1}
                title="Remove course"
                className="h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Calculate Action */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={addCourseRow}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold transition-all"
          >
            + Add Another Course
          </button>
          <button
            onClick={calculateCGPA}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Calculator className="w-4 h-4" />
            Calculate Academic GPA
          </button>
        </div>

        {/* GPA Result Display Banner */}
        <div className="bg-black/60 rounded-3xl p-8 border border-white/5 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
          
          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4 text-indigo-400" />
            Cumulative Rating ({totalUnits} Total Credit Units)
          </div>

          <div className="text-6xl sm:text-8xl font-black font-outfit text-white tracking-tighter my-2 drop-shadow-[0_0_35px_rgba(99,102,241,0.25)]">
            {cgpaResult}
          </div>

          {remarkText && (
            <p className="text-sm sm:text-base font-bold text-indigo-300 max-w-md mx-auto animate-fadeIn mt-2">
              {remarkText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
