import React from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Trophy,
  Flame,
  Code2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { NavigationTab } from '../types';

interface HomeDashboardProps {
  onNavigate: (tab: NavigationTab, lessonId?: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate }) => {
  const { preferredLanguage, completedLessons, quizAttempts, bookmarks } = useAuth();

  // Find total lessons
  const totalLessons = CURRICULUM_MODULES.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );
  const completedCount = completedLessons.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find next lesson to study
  let nextLesson = CURRICULUM_MODULES[0]?.lessons[0];
  for (const mod of CURRICULUM_MODULES) {
    for (const les of mod.lessons) {
      if (!completedLessons.has(les.id)) {
        nextLesson = les;
        break;
      }
    }
    if (nextLesson && !completedLessons.has(nextLesson.id)) break;
  }

  // Calculate average quiz score
  const avgQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((acc, q) => acc + q.accuracy, 0) / quizAttempts.length
        )
      : null;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Visual Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Hero Content */}
          <div className="flex flex-col justify-center p-6 md:p-10 lg:col-span-7 z-10">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Standard ANSI / ISO C Curriculum (C99 - C17)</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Master C Programming with Line-by-Line AI Guidance
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
              {preferredLanguage === 'hinglish'
                ? 'Pointers, Dynamic Memory, Structs aur low-level memory architecture ko simple Hinglish mein samjhein. Real-time step traces, variable iteration tables aur patient AI teacher ke saath.'
                : preferredLanguage === 'hi'
                ? 'पॉइंटर्स, डायनेमिक मेमोरी और सिस्टम आर्किटेक्चर को सरल हिंदी में समझें। वेरिएबल ट्रेसेस और इंटरैक्टिव एआई शिक्षक के साथ।'
                : 'Learn pointers, memory allocation, structs, and low-level architecture with line-by-line code breakdowns, step-by-step variable traces, and a patient AI mentor.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('learn', nextLesson?.id)}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
              >
                <BookOpen className="h-4 w-4" />
                <span>Resume Learning</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => onNavigate('ai-teacher')}
                className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Ask AI Teacher</span>
              </button>

              <button
                onClick={() => onNavigate('code-lab')}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Terminal className="h-4 w-4 text-slate-300" />
                <span>Open Code Lab</span>
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative min-h-[220px] lg:min-h-full lg:col-span-5 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            <img
              src="/src/assets/images/hero_c_programming_1792947569692.jpg"
              alt="C Architecture and Memory Layout Illustration"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Metrics & Progress Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Syllabus Progress</span>
            <BookOpen className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400">
              ({completedCount}/{totalLessons} lessons)
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Quiz Accuracy</span>
            <Trophy className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {avgQuizScore !== null ? `${avgQuizScore}%` : '—'}
            </span>
            <span className="text-xs text-slate-400">
              {quizAttempts.length} test{quizAttempts.length === 1 ? '' : 's'} taken
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {quizAttempts.length === 0 ? 'Take your first quiz in Practice tab' : 'Mastery calculated across tests'}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Bookmarks</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {bookmarks.length}
            </span>
            <span className="text-xs text-slate-400">saved lessons</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Quickly revise key pointer & struct patterns
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Curriculum Depth</span>
            <Flame className="h-4 w-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              14
            </span>
            <span className="text-xs text-slate-400">Modules (Basics to DSA)</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            ANSI C99/C11/C17 standard compliant
          </div>
        </div>
      </section>

      {/* Up Next Learning Card */}
      {nextLesson && (
        <section className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                Up Next in Your Journey
              </div>
              <h2 className="text-base font-semibold text-white">
                {nextLesson.moduleNumber}. {nextLesson.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {nextLesson.summary[preferredLanguage]}
              </p>
            </div>
            <button
              onClick={() => onNavigate('learn', nextLesson.id)}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors shrink-0"
            >
              <span>Start Lesson</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Structured Curriculum Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">C Curriculum Roadmap</h2>
            <p className="text-xs text-slate-400">From zero syntax to real-world memory allocators and data structures</p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            <span>View All Lessons</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_MODULES.slice(0, 6).map((module) => {
            const completedInMod = module.lessons.filter((l) => completedLessons.has(l.id)).length;
            const isFullyCompleted = completedInMod === module.lessons.length && module.lessons.length > 0;

            return (
              <div
                key={module.id}
                onClick={() => onNavigate('learn', module.lessons[0]?.id)}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-cyan-400">Module {module.number}</span>
                  <span className="text-slate-400 text-[11px]">{module.badge}</span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {module.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                  {module.description[preferredLanguage]}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{module.lessons.length} topics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {isFullyCompleted ? (
                      <span className="text-emerald-400 font-medium">Completed</span>
                    ) : (
                      <span>{completedInMod}/{module.lessons.length} done</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Visual Architecture Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('code-lab')}
          className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/70 p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-1">Interactive Sandbox</div>
            <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
              Low-Level Code Lab & Compiler Visualizer
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Edit runnable C snippets, simulate output, compare variables, and inspect compiler warnings safely without installing GCC.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-800 h-36">
            <img
              src="/src/assets/images/codelab_compiler_pipeline_1792947569947.jpg"
              alt="C Compiler Pipeline Visualizer"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>

        <div
          onClick={() => onNavigate('learn', 'lesson-07-01')}
          className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/70 p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-1">Deep Dive Diagram</div>
            <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
              Virtual Memory, Stack & Heap Layout
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Step inside physical RAM: learn where Stack frames grow downwards, Heap grows upwards, and pointers store addresses.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-800 h-36">
            <img
              src="/src/assets/images/memory_stack_heap_diagram_1792947571450.jpg"
              alt="Memory Architecture Diagram"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
