import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Bookmark as BookmarkIcon,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
  Table,
  Layers,
  Terminal,
  Clock,
  Search,
  Filter,
} from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { Lesson, Language } from '../types';
import { useAuth } from '../context/AuthContext';

interface LearnCProps {
  initialLessonId?: string;
  onOpenCodeLabWithCode?: (code: string) => void;
  onBackToOverview?: () => void;
}

export const LearnC: React.FC<LearnCProps> = ({
  initialLessonId,
  onOpenCodeLabWithCode,
}) => {
  const {
    preferredLanguage,
    completedLessons,
    toggleLessonComplete,
    bookmarks,
    toggleBookmark,
  } = useAuth();

  const allLessons = CURRICULUM_MODULES.flatMap((m) => m.lessons);

  // View mode state: 'list' for lesson selection screen, 'lesson' for reading a lesson
  const [viewMode, setViewMode] = useState<'list' | 'lesson'>(
    initialLessonId ? 'lesson' : 'list'
  );

  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || allLessons[0]?.id || ''
  );

  // Accordion state for modules on the list view
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CURRICULUM_MODULES.forEach((m, idx) => {
      // Expand first 2 modules by default
      initial[m.id] = idx < 2;
    });
    return initial;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showLineByLine, setShowLineByLine] = useState<boolean>(true);
  const [showIterationTable, setShowIterationTable] = useState<boolean>(true);

  // In-Lesson AI Question Assistant Drawer
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [showPracticeResult, setShowPracticeResult] = useState<boolean>(false);

  // Sync when initialLessonId changes from outside (e.g. navigation from Home/Bookmarks)
  useEffect(() => {
    if (initialLessonId) {
      setActiveLessonId(initialLessonId);
      setViewMode('lesson');
      // Auto expand the parent module
      const parentMod = CURRICULUM_MODULES.find((m) =>
        m.lessons.some((l) => l.id === initialLessonId)
      );
      if (parentMod) {
        setExpandedModules((prev) => ({ ...prev, [parentMod.id]: true }));
      }
    }
  }, [initialLessonId]);

  const currentLesson: Lesson | undefined =
    allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isCompleted = currentLesson ? completedLessons.has(currentLesson.id) : false;
  const isBookmarked = currentLesson ? bookmarks.some((b) => b.lessonId === currentLesson.id) : false;

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAskLessonAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim() || aiLoading) return;

    setAiLoading(true);
    setAiResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: aiQuestion,
          topicTitle: currentLesson?.title || 'C Programming',
          language: preferredLanguage,
          level: currentLesson?.level || 'beginner',
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setAiResponse(data.reply);
      } else {
        setAiResponse(
          data.error || 'Failed to get answer. Please check if GEMINI_API_KEY is configured.'
        );
      }
    } catch (err: any) {
      setAiResponse(err?.message || 'Network error communicating with AI Teacher.');
    } finally {
      setAiLoading(false);
    }
  };

  const resetPractice = () => {
    setSelectedPracticeOption(null);
    setShowPracticeResult(false);
  };

  const handleSelectLesson = (id: string) => {
    setActiveLessonId(id);
    setViewMode('lesson');
    resetPractice();
    setAiResponse('');
    setAiQuestion('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLessonList = () => {
    setViewMode('list');
    setAiResponse('');
    setAiQuestion('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter modules/lessons based on search & difficulty filter
  const filteredModules = CURRICULUM_MODULES.map((mod) => {
    const matchedLessons = mod.lessons.filter((l) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.summary[preferredLanguage].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel =
        selectedDifficulty === 'all' || l.level === selectedDifficulty;
      return matchesSearch && matchesLevel;
    });
    return { ...mod, filteredLessons: matchedLessons };
  }).filter((mod) => mod.filteredLessons.length > 0);

  // ==========================================
  // VIEW 1: LESSON SELECTION SCREEN (DIRECTORY)
  // ==========================================
  if (viewMode === 'list') {
    const totalCount = allLessons.length;
    const completedCount = completedLessons.size;
    const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
      <div className="space-y-6 pb-16 max-w-5xl mx-auto">
        {/* Header Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">
                <BookOpen className="h-4 w-4" />
                <span>Full C Programming Curriculum</span>
              </div>
              <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                Select a Topic to Start Learning
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
                {preferredLanguage === 'hinglish'
                  ? 'Apna topic select karein. Har lesson mein line-by-line explanation, iteration tables, code example aur AI guidance milegi.'
                  : preferredLanguage === 'hi'
                  ? 'अपना विषय चुनें। प्रत्येक पाठ में लाइन-दर-लाइन विश्लेषण और एआई सहायता उपलब्ध है।'
                  : 'Choose a lesson below. Each topic includes line-by-line code breakdowns, loop iteration tables, and instant AI explanations.'}
              </p>
            </div>

            {/* Quick Completion Metric */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shrink-0 min-w-[200px]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Total Progress</span>
                <span className="font-mono text-cyan-400 font-bold tabular-nums">
                  {overallProgress}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 text-right">
                {completedCount} of {totalCount} lessons completed
              </div>
            </div>
          </div>

          {/* Search & Difficulty Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-6 pt-5 border-t border-slate-800/80">
            <div className="relative sm:col-span-8">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. pointers, malloc, arrays, structs, files)..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                aria-label="Filter lessons by difficulty"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="beginner">Beginner Lessons</option>
                <option value="intermediate">Intermediate Lessons</option>
                <option value="advanced">Advanced Lessons</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modules & Lessons List */}
        <div className="space-y-4">
          {filteredModules.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-400 text-xs">
              No lessons found matching your search. Try adjusting the filter or search keywords.
            </div>
          ) : (
            filteredModules.map((module) => {
              const isExpanded = !!expandedModules[module.id];
              const completedInMod = module.lessons.filter((l) =>
                completedLessons.has(l.id)
              ).length;
              const isModAllDone =
                completedInMod === module.lessons.length && module.lessons.length > 0;

              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  {/* Module Header Bar */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="flex w-full items-center justify-between p-4 md:p-5 text-left hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs">
                        M{module.number}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-cyan-400">
                            Module {module.number}
                          </span>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {module.badge}
                          </span>
                        </div>
                        <h2 className="text-sm md:text-base font-semibold text-white truncate">
                          {module.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                        {isModAllDone ? (
                          <span className="text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        ) : (
                          <span className="tabular-nums">
                            {completedInMod}/{module.lessons.length} done
                          </span>
                        )}
                      </div>
                      <div className="rounded-lg p-1 text-slate-400 hover:text-white">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Module Lessons Grid */}
                  {isExpanded && (
                    <div className="p-3 md:p-4 pt-0 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {module.filteredLessons.map((lesson) => {
                        const isDone = completedLessons.has(lesson.id);
                        const isSaved = bookmarks.some((b) => b.lessonId === lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson.id)}
                            className="group cursor-pointer rounded-xl border border-slate-800/90 bg-slate-950/70 p-3.5 hover:border-cyan-500/40 hover:bg-slate-950 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                                <span className="capitalize font-mono text-cyan-300 text-[10px]">
                                  {lesson.level}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>~{lesson.estimatedMinutes}m</span>
                                  </span>
                                  {isSaved && (
                                    <BookmarkIcon className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                  )}
                                </div>
                              </div>

                              <h3 className="text-xs md:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                                {lesson.title}
                              </h3>

                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {lesson.summary[preferredLanguage]}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800/60 text-[11px]">
                              {isDone ? (
                                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Completed
                                </span>
                              ) : (
                                <span className="text-slate-400 group-hover:text-slate-300">
                                  Not started
                                </span>
                              )}

                              <div className="flex items-center gap-1 font-semibold text-cyan-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                                <span>Start Lesson</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE LESSON VIEW (ONLY SELECTED LESSON IS DISPLAYED)
  // ==========================================
  if (!currentLesson) {
    return <div className="p-8 text-center text-slate-400">Loading lesson...</div>;
  }

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Navigation & Action Bar: Back to Lessons, Complete & Bookmark */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 md:p-4 rounded-xl border border-slate-800 bg-slate-900/80 sticky top-18 z-20 backdrop-blur-md shadow-md">
        <button
          onClick={handleBackToLessonList}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Lessons</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() =>
              toggleBookmark(
                currentLesson.id,
                currentLesson.title,
                currentLesson.moduleTitle,
                currentLesson.moduleNumber
              )
            }
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              isBookmarked
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkIcon className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={() => toggleLessonComplete(currentLesson.id)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isCompleted
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Main Lesson Content Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-semibold">
            Module {currentLesson.moduleNumber}: {currentLesson.moduleTitle}
          </span>
          <span>·</span>
          <span className="capitalize">{currentLesson.level} Level</span>
          <span>·</span>
          <span>~{currentLesson.estimatedMinutes} mins read</span>
        </div>

        <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
          {currentLesson.title}
        </h1>

        {/* Quick Summary Pill Callout */}
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-xs md:text-sm text-cyan-200 leading-relaxed">
          <span className="font-semibold text-cyan-300">Key Concept: </span>
          {currentLesson.summary[preferredLanguage]}
        </div>

        {/* In-depth Prose Explanation */}
        <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line pt-2">
          {currentLesson.explanation[preferredLanguage]}
        </div>
      </div>

      {/* Standard C vs Extension Notice */}
      {currentLesson.standardVsExtensionNote && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Standard C vs Compiler Quirks: </span>
            {currentLesson.standardVsExtensionNote}
          </div>
        </div>
      )}

      {/* Syntax Specification Box */}
      {currentLesson.syntax && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Formal Syntax
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            <code>{currentLesson.syntax}</code>
          </pre>
        </div>
      )}

      {/* Code Example with Terminal Output */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-semibold text-white">Runnable C Example</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCodeLabWithCode && (
              <button
                onClick={() => onOpenCodeLabWithCode(currentLesson.codeExample)}
                className="flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <span>Open in Code Lab</span>
              </button>
            )}
            <button
              onClick={() => handleCopy(currentLesson.codeExample)}
              className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
            >
              {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <code>{currentLesson.codeExample}</code>
        </pre>

        {/* Expected Output */}
        <div className="pt-1">
          <div className="text-xs font-medium text-slate-400 mb-1.5">Expected Program Output:</div>
          <pre className="p-3 rounded-xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
            <code>{currentLesson.expectedOutput}</code>
          </pre>
        </div>
      </div>

      {/* Line-by-Line Breakdown Section */}
      {currentLesson.lineByLine && currentLesson.lineByLine.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Line-by-Line Code Breakdown
              </h3>
            </div>
            <button
              onClick={() => setShowLineByLine(!showLineByLine)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              {showLineByLine ? 'Hide breakdown' : 'Show breakdown'}
            </button>
          </div>

          {showLineByLine && (
            <div className="space-y-2.5 pt-1">
              {currentLesson.lineByLine.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-800/90 bg-slate-950/60 text-xs"
                >
                  <div className="font-mono text-cyan-300 mb-1 font-semibold">
                    {item.line}
                  </div>
                  <div className="text-slate-300 leading-normal">
                    {preferredLanguage === 'hinglish'
                      ? item.hinglish
                      : preferredLanguage === 'hi'
                      ? item.hi
                      : item.en}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Iteration Execution Table for Loops */}
      {currentLesson.iterationTable && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Loop Iteration Trace Table
              </h3>
            </div>
            <button
              onClick={() => setShowIterationTable(!showIterationTable)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              {showIterationTable ? 'Collapse table' : 'Expand table'}
            </button>
          </div>

          {showIterationTable && (
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-300 font-semibold">
                    {currentLesson.iterationTable.columns.map((col, idx) => (
                      <th key={idx} className="p-2.5">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {currentLesson.iterationTable.steps.map((st, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="p-2.5 text-cyan-400 font-bold">Step {st.step}</td>
                      <td className="p-2.5 text-slate-300">{st.condition}</td>
                      <td className="p-2.5 text-amber-300">
                        {Object.entries(st.variables)
                          .map(([k, v]) => `${k}=${v}`)
                          .join(', ')}
                      </td>
                      <td className="p-2.5 text-emerald-400">{st.output || '—'}</td>
                      <td className="p-2.5 text-slate-400 font-sans">{st.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Common Pitfalls & Mistakes */}
      {currentLesson.commonMistakes && currentLesson.commonMistakes.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Common Compiler Pitfalls & Logic Bugs</span>
          </div>

          {currentLesson.commonMistakes.map((cm, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/10 space-y-2 text-xs"
            >
              <div className="font-semibold text-rose-300">{cm.mistake}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 rounded bg-black/60 border border-rose-900/40 text-rose-300 overflow-x-auto">
                  <div className="text-[10px] text-rose-400 uppercase font-sans mb-1">
                    Avoid This:
                  </div>
                  <code>{cm.incorrectSnippet}</code>
                </div>
                <div className="p-2 rounded bg-black/60 border border-emerald-900/40 text-emerald-300 overflow-x-auto">
                  <div className="text-[10px] text-emerald-400 uppercase font-sans mb-1">
                    Recommended Fix:
                  </div>
                  <code>{cm.correctSnippet}</code>
                </div>
              </div>

              <div className="text-slate-300 pt-1 leading-normal">
                <span className="font-semibold text-slate-200">Why: </span>
                {cm.why}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Check Practice Question */}
      {currentLesson.practiceQuestion && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Quick Check: Verify Understanding</span>
          </div>

          <p className="text-sm font-medium text-white">
            {currentLesson.practiceQuestion.question}
          </p>

          <div className="space-y-2 pt-1">
            {currentLesson.practiceQuestion.options.map((opt, idx) => {
              const isSelected = selectedPracticeOption === idx;
              const isCorrect = idx === currentLesson.practiceQuestion?.correctAnswerIndex;

              let btnStyle =
                'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';
              if (showPracticeResult) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                }
              } else if (isSelected) {
                btnStyle = 'border-cyan-500 bg-cyan-950/40 text-cyan-200';
              }

              return (
                <button
                  key={idx}
                  disabled={showPracticeResult}
                  onClick={() => {
                    setSelectedPracticeOption(idx);
                    setShowPracticeResult(true);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs text-left transition-colors ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {showPracticeResult && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showPracticeResult && (
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-300">Explanation: </span>
              {currentLesson.practiceQuestion.explanation}
            </div>
          )}
        </div>
      )}

      {/* In-Lesson AI Teacher Assistant Drawer */}
      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/15 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              Have a Question on "{currentLesson.title}"?
            </h3>
          </div>
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            {showAIAssistant ? 'Close Panel' : 'Ask AI Tutor'}
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-3">
          Ask any question about this lesson without losing your place. The AI teacher explains in{' '}
          <span className="font-semibold text-cyan-300 capitalize">{preferredLanguage}</span>.
        </p>

        {showAIAssistant && (
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <form onSubmit={handleAskLessonAI} className="flex gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder={`e.g. "Yeh pointer wala step simpler example se samjhao"`}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiQuestion.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50 transition-colors"
              >
                {aiLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                <span>Ask</span>
              </button>
            </form>

            {aiResponse && (
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 mb-1">
                  <Sparkles className="h-3 w-3" />
                  <span>C Tutor AI Response:</span>
                </div>
                {aiResponse}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Pagination Controls & Back to Directory */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2">
          {prevLesson ? (
            <button
              onClick={() => handleSelectLesson(prevLesson.id)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="truncate max-w-[120px] sm:max-w-xs">{prevLesson.title}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleBackToLessonList}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
            <span>All Lessons</span>
          </button>
        </div>

        {nextLesson && (
          <button
            onClick={() => handleSelectLesson(nextLesson.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            <span className="truncate max-w-[160px] sm:max-w-xs">{nextLesson.title}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
