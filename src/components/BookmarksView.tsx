import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BookmarksViewProps {
  onNavigateToLesson: (lessonId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onNavigateToLesson }) => {
  const { bookmarks, toggleBookmark } = useAuth();
  const [filterModule, setFilterModule] = useState<string>('all');

  const filteredBookmarks =
    filterModule === 'all'
      ? bookmarks
      : bookmarks.filter((b) => b.moduleNumber === parseInt(filterModule, 10));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">Saved Lesson Bookmarks</h1>
          <p className="text-xs text-slate-400">
            Quickly revise complex C topics, pointer diagrams, and memory rules
          </p>
        </div>

        {bookmarks.length > 0 && (
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Modules ({bookmarks.length})</option>
            {Array.from(new Set(bookmarks.map((b) => b.moduleNumber)))
              .sort((a, b) => a - b)
              .map((modNum) => (
                <option key={modNum} value={modNum.toString()}>
                  Module {modNum}
                </option>
              ))}
          </select>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-slate-800 text-slate-400">
            <BookmarkIcon className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">No Bookmarks Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            While studying in the "Learn C" tab, click the Bookmark button on any lesson to save it here for fast revision.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.map((bm) => (
            <div
              key={bm.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono text-cyan-400">Module {bm.moduleNumber}</span>
                  <span className="text-[11px]">
                    {new Date(bm.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white line-clamp-1">{bm.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{bm.topicTitle}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => toggleBookmark(bm.lessonId, bm.title, bm.topicTitle, bm.moduleNumber)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigateToLesson(bm.lessonId)}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <span>Open Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
