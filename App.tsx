
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { Introduction } from './components/Introduction';
import { WelcomeScreen } from './components/WelcomeScreen';
import type { Lesson } from './types';
import { LESSONS } from './constants';
import { MenuIcon, XIcon } from './components/icons/Icons';

type View = 'welcome' | 'intro' | 'lesson';

const App: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [view, setView] = useState<View>('welcome');

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const startLessons = () => {
    setView('lesson');
  };

  if (view === 'welcome') {
    return <WelcomeScreen onStartIntro={() => setView('intro')} onStartLessons={startLessons} />;
  }
  
  if (view === 'intro') {
    return <Introduction onStartCourse={startLessons} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 md:w-72 lg:w-80 border-r border-slate-700 bg-slate-800/50 backdrop-blur-sm`}>
        <Sidebar 
          lessonsData={LESSONS} 
          onSelectLesson={handleSelectLesson} 
          selectedLessonId={selectedLesson.id}
          closeSidebar={() => setIsSidebarOpen(false)}
          onShowIntro={() => setView('intro')}
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 md:hidden p-2 border-b border-slate-700 bg-slate-900 flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-slate-400 hover:bg-slate-700 transition"
            >
              {isSidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <h2 className="ml-4 font-semibold text-lg text-sky-400">{selectedLesson.title}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           <LessonViewer key={selectedLesson.id} lesson={selectedLesson} />
        </div>
      </main>

       {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;
