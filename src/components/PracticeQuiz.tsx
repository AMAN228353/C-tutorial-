import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Filter,
  Sparkles,
  BookOpen,
  Code2,
  Terminal,
} from 'lucide-react';
import { SEED_QUIZ_QUESTIONS } from '../data/questions';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { QuizMode, QuizQuestion, Language } from '../types';
import { useAuth } from '../context/AuthContext';

interface PracticeQuizProps {
  onNavigateToTopic?: (topicTitle: string) => void;
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ onNavigateToTopic }) => {
  const { preferredLanguage, recordQuizAttempt } = useAuth();

  const [selectedMode, setSelectedMode] = useState<QuizMode>('mixed');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');

  // Filter questions based on mode and module
  const filteredQuestions = React.useMemo(() => {
    let pool = [...SEED_QUIZ_QUESTIONS];

    if (selectedMode === 'advanced') {
      pool = pool.filter((q) => q.difficulty === 'advanced' || q.difficulty === 'intermediate');
    } else if (selectedMode === 'revision') {
      // Questions on memory, pointers, bugs, UB
      pool = pool.filter((q) => q.type === 'bug' || q.type === 'output' || q.difficulty === 'advanced');
    } else if (selectedMode === 'topic' && selectedModuleFilter !== 'all') {
      pool = pool.filter((q) => q.moduleId === selectedModuleFilter);
    }

    return pool.length > 0 ? pool : SEED_QUIZ_QUESTIONS;
  }, [selectedMode, selectedModuleFilter]);

  // Quiz running state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ?.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else if (currentQ?.recommendationTopic) {
      setWeakTopics((prev) =>
        prev.includes(currentQ.recommendationTopic!)
          ? prev
          : [...prev, currentQ.recommendationTopic!]
      );
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished quiz
      setQuizFinished(true);
      const total = filteredQuestions.length;
      const finalAccuracy = Math.round((score / total) * 100);

      recordQuizAttempt({
        topicId: selectedMode === 'topic' ? selectedModuleFilter : selectedMode,
        topicTitle:
          selectedMode === 'topic'
            ? CURRICULUM_MODULES.find((m) => m.id === selectedModuleFilter)?.title || 'Topic Quiz'
            : `${selectedMode.toUpperCase()} C Test`,
        score,
        totalQuestions: total,
        accuracy: finalAccuracy,
        mode: selectedMode,
        weakTopics,
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setWeakTopics([]);
    setQuizFinished(false);
  };

  // If quiz is finished, show scorecard
  if (quizFinished) {
    const total = filteredQuestions.length;
    const finalAccuracy = Math.round((score / total) * 100);

    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 text-center space-y-6 shadow-xl">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          <Trophy className="h-8 w-8" />
        </div>

        <div>
          <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-1">
            Test Completed
          </div>
          <h2 className="text-2xl font-bold text-white">Your C Assessment Score</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono">
          <div>
            <div className="text-xs text-slate-400 font-sans">Correct</div>
            <div className="text-xl font-bold text-emerald-400">{score}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-sans">Total</div>
            <div className="text-xl font-bold text-slate-200">{total}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-sans">Accuracy</div>
            <div className="text-xl font-bold text-cyan-400">{finalAccuracy}%</div>
          </div>
        </div>

        {weakTopics.length > 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-left">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
              Recommended Topics for Revision:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {weakTopics.map((topic, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>• {topic}</span>
                  {onNavigateToTopic && (
                    <button
                      onClick={() => onNavigateToTopic(topic)}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] underline"
                    >
                      Revise Now
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Test</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="text-center p-8 text-slate-400">
        No questions found for this filter. Please choose another test mode.
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Quiz Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          {(['mixed', 'revision', 'advanced', 'topic'] as QuizMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setSelectedMode(mode);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
                selectedMode === mode
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode} Test
            </button>
          ))}
        </div>

        {selectedMode === 'topic' && (
          <select
            value={selectedModuleFilter}
            onChange={(e) => {
              setSelectedModuleFilter(e.target.value);
              handleRestart();
            }}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Modules</option>
            {CURRICULUM_MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                Module {m.number}: {m.title}
              </option>
            ))}
          </select>
        )}

        <div className="text-xs text-slate-400 font-mono">
          Question <span className="text-cyan-400 font-bold">{currentIndex + 1}</span> / {filteredQuestions.length}
        </div>
      </div>

      {/* Single MCQ Card Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-5 shadow-xl">
        {/* Question Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400">{currentQ.topicTitle}</span>
            <span>·</span>
            <span className="capitalize">{currentQ.difficulty}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
            {currentQ.type}
          </span>
        </div>

        {/* Question Prompt */}
        <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Optional Code Snippet */}
        {currentQ.codeSnippet && (
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* 4 Options Grid */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQ.correctIndex;

            let buttonClass =
              'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-950';

            if (isAnswerSubmitted) {
              if (isThisCorrect) {
                buttonClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
              } else if (isThisSelected) {
                buttonClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
              } else {
                buttonClass = 'border-slate-800/50 bg-slate-950/20 text-slate-500';
              }
            } else if (isThisSelected) {
              buttonClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-200';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-xs md:text-sm text-left transition-colors ${buttonClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-900 border border-slate-800 font-mono text-xs font-semibold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswerSubmitted && isThisCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isThisSelected && !isThisCorrect && (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Box */}
        {isAnswerSubmitted && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 pt-3">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">Correct Answer!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-bold text-rose-400">Incorrect</span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.explanation[preferredLanguage]}
            </p>

            {!isCorrect && currentQ.recommendationTopic && (
              <div className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-950/20 text-[11px] text-amber-200">
                <span className="font-semibold text-amber-300">Recommended Topic: </span>
                {currentQ.recommendationTopic}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                <span>{currentIndex + 1 < filteredQuestions.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
