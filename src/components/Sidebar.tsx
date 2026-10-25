import React from 'react';
import {
  Home,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Terminal,
  BarChart3,
  Bookmark as BookmarkIcon,
  Settings,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { NavigationTab } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
}) => {
  const { completedLessons, bookmarks, isGuest } = useAuth();

  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn C', icon: BookOpen, count: completedLessons.size },
    { id: 'ai-teacher', label: 'AI Teacher', icon: Sparkles },
    { id: 'practice', label: 'Practice', icon: CheckCircle2 },
    { id: 'code-lab', label: 'Code Lab', icon: Terminal },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon, count: bookmarks.length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (tab: NavigationTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Title in sidebar */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-base">
            C
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-white">C Tutor AI</div>
            <div className="text-[11px] text-slate-400">Interactive C Academy</div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold shadow-xs'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="text-[10px] tabular-nums text-slate-400">
                      {item.count}
                    </span>
                  )}
                  {active && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Cloud sync status indicator */}
        <div className="border-t border-slate-800/80 p-3.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isGuest ? 'Guest Mode (Local)' : 'Firestore Synced'}</span>
            </div>
            <span className="text-[10px] text-slate-400">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
