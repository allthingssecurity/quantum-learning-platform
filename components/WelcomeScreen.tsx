
import React from 'react';
import { BookOpenIcon, BeakerIcon } from './icons/Icons';

interface WelcomeScreenProps {
    onStartIntro: () => void;
    onStartLessons: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartIntro, onStartLessons }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans text-slate-200 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-800/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text mb-4">
                    Quantum Learning Platform
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mt-4 mb-12">
                    Your interactive journey into the fascinating world of quantum computing.
                    Learn the fundamentals, run real quantum circuits in a simulated environment, and explore the future of computation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={onStartIntro}
                        className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-sky-500 transition-all duration-300 shadow-lg"
                    >
                        <BookOpenIcon />
                        <div className="text-left">
                            <p className="font-bold text-slate-100">Start Full Introduction</p>
                            <p className="text-sm text-slate-400 group-hover:text-sky-300 transition-colors">A deep dive into quantum concepts</p>
                        </div>
                    </button>
                    <button
                        onClick={onStartLessons}
                        className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-teal-500 transition-all duration-300 shadow-lg"
                    >
                        <BeakerIcon />
                         <div className="text-left">
                            <p className="font-bold text-slate-100">Go Directly to Lessons</p>
                            <p className="text-sm text-slate-400 group-hover:text-teal-300 transition-colors">Jump into the code playground</p>
                        </div>
                    </button>
                </div>
            </div>
             <footer className="absolute bottom-4 text-xs text-slate-600 z-10">
                &copy; 2024 Quantum Learning Inc. | Simulated Qiskit Environment
            </footer>
        </div>
    );
};
