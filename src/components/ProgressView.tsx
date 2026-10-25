import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Trophy,
  Flame,
  Clock,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { NavigationTab } from '../types';

interface ProgressViewProps {
  onNavigateToLesson: (lessonId: string) => void;
  onNavigateToQuiz: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  onNavigateToLesson,
  onNavigateToQuiz,
}) => {
  const { completedLessons, quizAttempts, isGuest, preferredLanguage } = useAuth();

  const totalLessons = CURRICULUM_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const totalQuizzes = quizAttempts.length;
  const avgAccuracy =
    totalQuizzes > 0
      ? Math.round(
          quizAttempts.reduce((acc, a) => acc + a.accuracy, 0) / totalQuizzes
        )
      : 0;

  // Aggregate all weak topics from attempts
  const allWeakTopics = Array.from(
    new Set(quizAttempts.flatMap((a) => a.weakTopics || []))
  );

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Curriculum Mastery</span>
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400">
              ({completedCount} of {totalLessons} topics)
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
            <span>Average Quiz Accuracy</span>
            <Trophy className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              {totalQuizzes > 0 ? `${avgAccuracy}%` : '—'}
            </span>
            <span className="text-xs text-slate-400">
              {totalQuizzes} test attempt{totalQuizzes === 1 ? '' : 's'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {totalQuizzes === 0
              ? 'Complete quizzes in Practice to calculate accuracy'
              : 'Computed across all topic & mixed tests'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Topics Needing Revision</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              {allWeakTopics.length}
            </span>
            <span className="text-xs text-slate-400">concepts</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Identified automatically from incorrect quiz answers
          </p>
        </div>
      </div>

      {/* Recommended Revision List */}
      {allWeakTopics.length > 0 && (
        <section className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Recommended Concepts for Immediate Revision</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {allWeakTopics.map((topic, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950 text-xs"
              >
                <span className="font-medium text-slate-200">{topic}</span>
                <button
                  onClick={onNavigateToQuiz}
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold"
                >
                  Retest
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Module-by-Module Progress Breakdown */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-white">Module Breakdown</h2>
        <div className="space-y-3">
          {CURRICULUM_MODULES.map((module) => {
            const completedInModule = module.lessons.filter((l) =>
              completedLessons.has(l.id)
            ).length;
            const modPercent =
              module.lessons.length > 0
                ? Math.round((completedInModule / module.lessons.length) * 100)
                : 0;

            return (
              <div
                key={module.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                      <span>Module {module.number}</span>
                      <span>·</span>
                      <span className="text-slate-400 font-sans">{module.badge}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mt-0.5">
                      {module.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-300 tabular-nums font-semibold">
                      {completedInModule} / {module.lessons.length} done ({modPercent}%)
                    </span>
                    <button
                      onClick={() => onNavigateToLesson(module.lessons[0]?.id)}
                      className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:text-white transition-colors"
                    >
                      <span>Study</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${modPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Quiz Attempts Log */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-white">Recent Quiz Attempts</h2>

        {quizAttempts.length === 0 ? (
          <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/40 text-center text-xs text-slate-400">
            No quiz attempts recorded yet. Head over to Practice to test your C knowledge!
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-300 font-semibold">
                    <th className="p-3">Test Mode / Topic</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Accuracy</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {quizAttempts.slice(0, 10).map((attempt, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="p-3 text-white font-sans font-medium">
                        {attempt.topicTitle || `${attempt.mode.toUpperCase()} Test`}
                      </td>
                      <td className="p-3 text-cyan-400">
                        {attempt.score} / {attempt.totalQuestions}
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            attempt.accuracy >= 70
                              ? 'text-emerald-400'
                              : attempt.accuracy >= 50
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {attempt.accuracy}%
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 font-sans text-[11px]">
                        {new Date(attempt.attemptedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
