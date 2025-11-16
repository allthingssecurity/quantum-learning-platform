export interface Lesson {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  concept: string;
  theory: string;
  initialCode: string;
}

export interface LessonSection {
  category: string;
  lessons: Lesson[];
}

export interface QiskitResult {
    counts?: { [key: string]: number };
    // FIX: Allow statevector to contain strings to represent complex numbers.
    statevector?: (number | string)[];
    error?: string;
}

export interface ChartData {
    name: string;
    probability: number;
}

export interface Slide {
    section: string;
    title: string;
    icon?: string;
    animation?: 'bloch' | 'superposition' | 'entanglement' | 'interference' | 'circuit' | 'nisq';
    content: string;
}