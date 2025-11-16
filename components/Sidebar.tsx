
import React from 'react';
import type { Lesson, LessonSection } from '../types';
import { AtomIcon, BeakerIcon, BrainIcon, XIcon, ArrowLeftIcon } from './icons/Icons';

interface SidebarProps {
  lessonsData: LessonSection[];
  onSelectLesson: (lesson: Lesson) => void;
  selectedLessonId: string;
  closeSidebar: () => void;
  onShowIntro: () => void;
}

const difficultyIcons = {
  Beginner: <AtomIcon />,
  Intermediate: <BeakerIcon />,
  Advanced: <BrainIcon />,
};

export const Sidebar: React.FC<SidebarProps> = ({ lessonsData, onSelectLesson, selectedLessonId, closeSidebar, onShowIntro }) => {
  return (
    <div className="h-full flex flex-col bg-slate-800 text-slate-300">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-sky-400">Quantum Platform</h1>
            <button onClick={closeSidebar} className="md:hidden p-1 rounded-md hover:bg-slate-700">
                <XIcon />
            </button>
        </div>
         <button 
            onClick={onShowIntro}
            className="w-full flex items-center justify-center text-sm px-3 py-2 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors"
         >
            <ArrowLeftIcon />
            <span className="ml-2">Back to Introduction</span>
         </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <h2 className="text-base font-bold text-slate-200 mb-4">Course Outline</h2>
        <div className="space-y-6">
            {lessonsData.map((section) => (
            <div key={section.category}>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">{section.category}</h3>
                <ul className="space-y-1">
                {section.lessons.map((lesson) => (
                    <li key={lesson.id}>
                    <button
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full text-left flex items-center p-2 rounded-md transition-colors duration-200 ${
                        selectedLessonId === lesson.id
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'hover:bg-slate-700/50'
                        }`}
                    >
                        <span className="mr-3 text-sky-400">{difficultyIcons[lesson.difficulty]}</span>
                        <span className="flex-1">{lesson.title}</span>
                    </button>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </nav>
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        <p>&copy; 2024 Quantum Learning Inc.</p>
        <p>Simulated Qiskit Environment</p>
      </div>
    </div>
  );
};