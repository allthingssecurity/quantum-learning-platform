import React, { useState, useEffect, useMemo } from 'react';
import { INTRO_SLIDES } from '../constants';
import { 
    ArrowLeftIcon, ArrowRightIcon, RocketLaunchIcon, AtomIcon, BeakerIcon, BrainIcon, CodeIcon,
    HistoryIcon, QuantumChipIcon, SuperpositionIcon, EntanglementIcon, InterferenceIcon,
    ShieldCheckIcon, DnaIcon, RoadmapIcon, SparklesIcon, CircuitIcon, NoiseIcon
} from './icons/Icons';
import type { Slide } from '../types';

interface IntroductionProps {
  onStartCourse: () => void;
}

// --- Animation Components ---

const BlochSphere: React.FC = () => (
    <div className="w-48 h-48 md:w-56 md:h-56 mx-auto perspective-1000">
        <div className="relative w-full h-full sphere-animate">
            {/* Sphere Body */}
            <div className="absolute w-full h-full rounded-full border-2 border-sky-500/30" style={{ transformStyle: 'preserve-3d' }}>
                 <div className="absolute inset-0 rounded-full bg-gradient-radial from-sky-400/10 to-sky-900/0"></div>
            </div>
            {/* Equator Ring */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 border-t border-b border-sky-500/40" style={{ transform: 'translateY(-50%) rotateX(90deg)' }}></div>
            {/* Vertical Ring */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full border-l border-r border-sky-500/40" style={{ transform: 'translateX(-50%)' }}></div>
            {/* Y-axis */}
            <div className="absolute top-[-20px] left-1/2 w-px h-[calc(100%+40px)] bg-sky-400/70" style={{ transform: 'translateX(-50%)' }}>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-sky-300 font-bold">|0⟩</span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sky-300 font-bold">|1⟩</span>
            </div>
            {/* State Vector */}
            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 vector-pulse" style={{ transformOrigin: 'left center', transform: 'rotateZ(-45deg) rotateX(20deg) translateY(-50%)' }}>
                 <div className="w-full h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                 <div className="absolute right-[-2px] top-1/2 w-2 h-2 border-t-2 border-r-2 border-cyan-300" style={{ transform: 'translateY(-50%) rotate(45deg)' }}></div>
            </div>
        </div>
    </div>
);

const SuperpositionAnimation: React.FC = () => (
    <div className="w-48 h-48 md:w-56 md:h-56 mx-auto relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-sky-500/30 animate-pulse"></div>
        <div className="absolute w-32 h-32 rounded-full bg-indigo-500/30 animate-pulse [animation-delay:0.5s]"></div>
        <span className="text-4xl font-bold text-slate-300 z-10">(|0⟩+|1⟩)/√2</span>
    </div>
);

const EntanglementAnimation: React.FC = () => (
     <div className="w-56 h-56 mx-auto relative flex items-center justify-center space-x-12">
        <div className="relative">
            <div className="w-16 h-16 rounded-full bg-fuchsia-500/50 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-fuchsia-200">A</span>
        </div>
         <div className="relative">
            <div className="w-16 h-16 rounded-full bg-fuchsia-500/50 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-fuchsia-200">B</span>
        </div>
        <div className="absolute w-16 h-1 bg-gradient-to-r from-fuchsia-400 to-pink-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] animate-pulse [animation-duration:1.5s]"></div>
    </div>
);

const InterferenceAnimation: React.FC = () => (
     <div className="w-64 h-56 mx-auto relative overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 50">
            <path d="M 0 25 C 12.5 10, 12.5 40, 25 25 C 37.5 10, 37.5 40, 50 25 C 62.5 10, 62.5 40, 75 25 C 87.5 10, 87.5 40, 100 25" stroke="#38bdf8" fill="none" strokeWidth="1">
                <animate attributeName="d" values="M 0 25 C 12.5 10, 12.5 40, 25 25 C 37.5 10, 37.5 40, 50 25 C 62.5 10, 62.5 40, 75 25 C 87.5 10, 87.5 40, 100 25;M 0 25 C 12.5 40, 12.5 10, 25 25 C 37.5 40, 37.5 10, 50 25 C 62.5 40, 62.5 10, 75 25 C 87.5 40, 87.5 10, 100 25;M 0 25 C 12.5 10, 12.5 40, 25 25 C 37.5 10, 37.5 40, 50 25 C 62.5 10, 62.5 40, 75 25 C 87.5 10, 87.5 40, 100 25" dur="4s" repeatCount="indefinite" />
            </path>
             <path d="M 0 25 C 12.5 40, 12.5 10, 25 25 C 37.5 40, 37.5 10, 50 25 C 62.5 40, 62.5 10, 75 25 C 87.5 40, 87.5 10, 100 25" stroke="#34d399" fill="none" strokeWidth="1">
                <animate attributeName="d" values="M 0 25 C 12.5 40, 12.5 10, 25 25 C 37.5 40, 37.5 10, 50 25 C 62.5 40, 62.5 10, 75 25 C 87.5 40, 87.5 10, 100 25;M 0 25 C 12.5 10, 12.5 40, 25 25 C 37.5 10, 37.5 40, 50 25 C 62.5 10, 62.5 40, 75 25 C 87.5 10, 87.5 40, 100 25;M 0 25 C 12.5 40, 12.5 10, 25 25 C 37.5 40, 37.5 10, 50 25 C 62.5 40, 62.5 10, 75 25 C 87.5 40, 87.5 10, 100 25" dur="4s" repeatCount="indefinite" />
            </path>
        </svg>
    </div>
);

const QuantumCircuitAnimation: React.FC = () => (
    <div className="w-64 h-40 md:w-80 md:h-48 mx-auto relative flex flex-col justify-around font-mono text-teal-300">
        {[0, 1].map(q => (
            <div key={q} className="flex items-center">
                <span className="mr-2">|0⟩</span>
                <div className="w-full h-0.5 bg-slate-500 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-8 h-8 bg-sky-500 flex items-center justify-center text-white font-bold animate-content-zoom-in [animation-delay:0.3s]">H</div>
                    {q === 0 && <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-8 h-8 bg-fuchsia-500 flex items-center justify-center text-white font-bold animate-content-zoom-in [animation-delay:0.5s]">●</div>}
                    {q === 1 && <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-8 h-8 border-2 border-fuchsia-500 rounded-full flex items-center justify-center text-fuchsia-400 font-bold animate-content-zoom-in [animation-delay:0.5s]">+</div>}
                    {q === 0 && <div className="absolute top-[-24px] left-[47.5%] w-px h-16 bg-fuchsia-500 animate-content-zoom-in [animation-delay:0.5s]"></div>}
                    <div className="absolute top-1/2 right-[10%] -translate-y-1/2 animate-content-zoom-in [animation-delay:0.7s]">
                        <BeakerIcon />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const NISQAnimation: React.FC = () => (
  <div className="w-48 h-48 mx-auto grid grid-cols-4 gap-4">
    {[...Array(16)].map((_, i) => {
      const isNoisy = [2, 5, 9, 13].includes(i);
      return (
        <div key={i} className="relative w-8 h-8">
          <div className={`w-full h-full rounded-full ${isNoisy ? 'bg-amber-500/50' : 'bg-teal-500/80'}`}></div>
          {isNoisy && <div className="absolute inset-[-4px] rounded-full border border-amber-400/50 animate-pulse"></div>}
        </div>
      );
    })}
  </div>
);

const slideIcons: { [key: string]: React.ReactElement } = {
    AtomIcon: <AtomIcon />, BeakerIcon: <BeakerIcon />, BrainIcon: <BrainIcon />, CodeIcon: <CodeIcon />, HistoryIcon: <HistoryIcon />, QuantumChipIcon: <QuantumChipIcon />, SuperpositionIcon: <SuperpositionIcon />, EntanglementIcon: <EntanglementIcon />, InterferenceIcon: <InterferenceIcon />, ShieldCheckIcon: <ShieldCheckIcon />, DnaIcon: <DnaIcon />, RoadmapIcon: <RoadmapIcon />, RocketLaunchIcon: <RocketLaunchIcon />, SparklesIcon: <SparklesIcon />, CircuitIcon: <CircuitIcon />, NoiseIcon: <NoiseIcon />,
};

const slideAnimations: { [key: string]: React.ReactElement } = {
    bloch: <BlochSphere />,
    superposition: <SuperpositionAnimation />,
    entanglement: <EntanglementAnimation />,
    interference: <InterferenceAnimation />,
    circuit: <QuantumCircuitAnimation />,
    nisq: <NISQAnimation />,
};


export const Introduction: React.FC<IntroductionProps> = ({ onStartCourse }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideData = INTRO_SLIDES[currentSlide];

  const groupedSlides = useMemo(() => {
    // FIX: By casting the initial value of `reduce`, TypeScript can correctly infer the type
    // of the accumulator (`acc`) and the final returned object (`groupedSlides`),
    // which resolves the error where `slides.map` was called on an `unknown` type.
    return INTRO_SLIDES.reduce((acc, slide, index) => {
        if (!acc[slide.section]) {
            acc[slide.section] = [];
        }
        acc[slide.section].push({ ...slide, originalIndex: index });
        return acc;
    }, {} as Record<string, (Slide & { originalIndex: number })[]>);
  }, []);

  const handleNext = () => {
    if (currentSlide < INTRO_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'ArrowRight') handleNext();
        else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const AnimationComponent = slideData.animation ? slideAnimations[slideData.animation] : null;
  const IconComponent = slideData.icon && !AnimationComponent ? slideIcons[slideData.icon] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 font-sans text-slate-200 overflow-hidden relative">
      <div className="particles"></div>
      <button 
          onClick={onStartCourse}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-sky-300 transition-colors"
      >
          <span className="md:hidden"><RocketLaunchIcon/></span>
          <span className="hidden md:inline">Skip to Playground</span>
      </button>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
        {/* Progress Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 pr-8 md:pr-12 flex-shrink-0">
          <div className="space-y-6">
            {Object.entries(groupedSlides).map(([section, slides]) => (
              <div key={section} className={`transition-opacity duration-500 ${slideData.section === section ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-sky-400/80 mb-3">{section.split(': ')[0]}</h2>
                <div className="flex flex-wrap gap-2">
                   {slides.map(s => (
                     <button
                        key={s.originalIndex}
                        onClick={() => setCurrentSlide(s.originalIndex)}
                        className={`w-4 h-2 rounded-full transition-all duration-300 ${currentSlide === s.originalIndex ? 'bg-fuchsia-500 w-8' : 'bg-slate-600 hover:bg-slate-500'}`}
                        aria-label={`Go to slide ${s.originalIndex + 1}`}
                     ></button>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 lg:w-4/5 mt-8 md:mt-0">
          <div className="bg-slate-900/50 backdrop-blur-md relative border border-slate-700 rounded-xl shadow-2xl shadow-fuchsia-900/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500 to-cyan-400/0 opacity-50"></div>
            
            <div key={currentSlide} className="min-h-[520px] p-8 md:p-12 flex flex-col justify-between text-center animate-content-zoom-in">
              <header className="animate-text-slide-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-sm font-semibold text-sky-400/70 mb-2">{slideData.section}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-400 mb-4">{slideData.title}</h1>
              </header>

              <div className="flex-grow flex items-center justify-center my-6 animate-text-slide-up" style={{ animationDelay: '0.2s' }}>
                {AnimationComponent || (IconComponent && React.cloneElement(IconComponent, { className: "w-28 h-28 text-slate-500" }))}
              </div>

              <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-4 max-w-3xl mx-auto animate-text-slide-up" style={{ animationDelay: '0.3s' }}>
                  {slideData.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>

       {/* Navigation */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 flex items-center justify-between">
           <div className="text-sm font-medium text-slate-400">
              Slide {currentSlide + 1} / {INTRO_SLIDES.length}
          </div>

          <div className="flex items-center space-x-4">
              <button
                  onClick={handlePrev} disabled={currentSlide === 0}
                  className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Previous Slide"
              > <ArrowLeftIcon /> </button>
              <button
                  onClick={handleNext} disabled={currentSlide === INTRO_SLIDES.length - 1}
                  className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Next Slide"
              > <ArrowRightIcon /> </button>
              
              {currentSlide === INTRO_SLIDES.length - 1 ? (
                   <button
                      onClick={onStartCourse}
                      className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-fuchsia-900/50 fade-in"
                  >
                      <RocketLaunchIcon />
                      <span className="ml-2">Start Learning</span>
                  </button>
              ) : ( <div className="hidden md:block w-[178px]"></div> )}
          </div>
      </div>
      <footer className="absolute bottom-2 text-xs text-slate-600 z-10">
        Use Left/Right arrow keys for navigation
      </footer>
    </div>
  );
};