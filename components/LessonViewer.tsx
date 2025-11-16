import React, { useState, useCallback, useEffect } from 'react';
import type { Lesson, QiskitResult } from '../types';
import { runCircuit } from '../services/qiskitService';
import { explainConcept } from '../services/geminiService';
import { CodeEditor } from './CodeEditor';
import { OutputDisplay } from './OutputDisplay';
import { PlayIcon, SparklesIcon, BookOpenIcon, CodeIcon } from './icons/Icons';

interface LessonViewerProps {
  lesson: Lesson;
}

type Tab = 'code' | 'theory';

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson }) => {
  const [code, setCode] = useState<string>(lesson.initialCode);
  const [result, setResult] = useState<QiskitResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab>('code');

  // Reset state when lesson changes
  useEffect(() => {
    setCode(lesson.initialCode);
    setResult(null);
    setAiExplanation('');
    setActiveTab('code');
  }, [lesson]);


  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    const res = await runCircuit(code);
    setResult(res);
    setIsRunning(false);
  }, [code]);
  
  const handleExplainConcept = useCallback(async () => {
      setIsExplaining(true);
      setAiExplanation('');
      const explanation = await explainConcept(lesson.concept, lesson.title);
      setAiExplanation(explanation);
      setIsExplaining(false);
  }, [lesson.concept, lesson.title]);

  const renderCodeTab = () => (
    <>
        <p className="mt-2 text-slate-400 max-w-3xl">{lesson.description}</p>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-200">Code Editor</h2>
                <CodeEditor code={code} setCode={setCode} />
            </div>
            <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">Results</h2>
            <div className="bg-slate-800 rounded-lg p-4 min-h-[352px] border border-slate-700 flex flex-col">
                {isRunning ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                        <p className="ml-3 text-slate-400">Executing quantum circuit...</p>
                    </div>
                ) : result ? (
                    <OutputDisplay result={result} />
                ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500">Run the code to see the results here.</p>
                </div>
                )}
            </div>
            </div>
        </div>
    </>
  );

  const renderTheoryTab = () => (
    <div className="mt-6 space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-headings:text-sky-300">
            <h2 className="text-2xl font-bold text-sky-300 border-b border-slate-600 pb-2 mb-4">Core Concept</h2>
            <p className="whitespace-pre-wrap font-sans">{lesson.theory}</p>
        </div>
        
        <div>
            <h2 className="text-xl font-semibold text-slate-200 mb-2">Deep Dive with AI</h2>
            <button
                onClick={handleExplainConcept}
                disabled={isExplaining}
                className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 disabled:bg-indigo-400 transition-colors"
            >
                <SparklesIcon />
                <span className="ml-2">{isExplaining ? 'Thinking...' : `Explain "${lesson.title}" with Gemini`}</span>
            </button>
            {isExplaining && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                        <div className="animate-pulse rounded-full bg-slate-700 h-10 w-10"></div>
                        <div className="flex-1 ml-4 space-y-3">
                            <div className="h-2 bg-slate-700 rounded animate-pulse"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1 animate-pulse"></div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
            {aiExplanation && !isExplaining && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-4 prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-headings:text-sky-300">
                <p className="whitespace-pre-wrap font-sans">{aiExplanation}</p>
            </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <header className="pb-4 border-b border-slate-700">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
            lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
            lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {lesson.difficulty}
          </span>
          <h1 className="text-3xl font-bold text-slate-50">{lesson.title}</h1>
        </header>

        <div className="mt-4 border-b border-slate-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('code')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                        ${activeTab === 'code' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}
                >
                    <CodeIcon /> <span className="ml-2">Instructions & Code</span>
                </button>
                 <button
                    onClick={() => setActiveTab('theory')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                        ${activeTab === 'theory' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}
                >
                    <BookOpenIcon /> <span className="ml-2">Theory & Explanation</span>
                </button>
            </nav>
        </div>
        
        {activeTab === 'code' ? renderCodeTab() : renderTheoryTab()}

      </div>

      <div className="flex-shrink-0 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
            <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-bold text-lg rounded-lg hover:bg-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors shadow-lg shadow-sky-900/50"
            >
            <PlayIcon />
            <span className="ml-2">{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
        </div>
      </div>
    </div>
  );
};