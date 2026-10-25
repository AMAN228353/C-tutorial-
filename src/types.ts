export type Language = 'en' | 'hinglish' | 'hi';
export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';

export type NavigationTab =
  | 'home'
  | 'learn'
  | 'ai-teacher'
  | 'practice'
  | 'code-lab'
  | 'progress'
  | 'bookmarks'
  | 'settings';

export interface LineExplanation {
  line: string;
  en: string;
  hinglish: string;
  hi: string;
}

export interface IterationStep {
  step: number;
  condition: string;
  variables: Record<string, string | number>;
  output?: string;
  explanation: string;
}

export interface VariableTraceStep {
  step: number;
  line: string;
  variables: Record<string, string>;
  notes: string;
}

export interface CommonMistake {
  mistake: string;
  incorrectSnippet: string;
  correctSnippet: string;
  why: string;
}

export interface LessonPracticeQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  moduleNumber: number;
  title: string;
  level: LearningLevel;
  estimatedMinutes: number;
  summary: Record<Language, string>;
  explanation: Record<Language, string>;
  syntax?: string;
  codeExample: string;
  expectedOutput: string;
  lineByLine?: LineExplanation[];
  iterationTable?: {
    columns: string[];
    steps: IterationStep[];
  };
  variableTrace?: VariableTraceStep[];
  commonMistakes: CommonMistake[];
  standardVsExtensionNote?: string;
  practiceQuestion?: LessonPracticeQuestion;
}

export interface CurriculumModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: Record<Language, string>;
  badge: string;
  lessons: Lesson[];
}

export type QuizMode = 'topic' | 'mixed' | 'revision' | 'advanced';

export interface QuizQuestion {
  id: string;
  moduleId: string;
  topicTitle: string;
  difficulty: LearningLevel;
  type: 'output' | 'bug' | 'fill' | 'concept';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: Record<Language, string>;
  recommendationTopic?: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  preferredLanguage: Language;
  currentLevel: LearningLevel;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastViewedAt?: string;
}

export interface QuizAttempt {
  id?: string;
  userId: string;
  topicId: string;
  topicTitle?: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  mode: QuizMode;
  attemptedAt: string;
  weakTopics?: string[];
}

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  title: string;
  topicTitle: string;
  moduleNumber: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  topicTitle?: string;
}
