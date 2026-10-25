import React from 'react';
import {
  Menu,
  X,
  Code2,
  Globe,
  User as UserIcon,
  LogIn,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language, NavigationTab } from '../types';

interface NavbarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenAuthModal,
}) => {
  const { user, isGuest, preferredLanguage, setPreferredLanguage, logout } = useAuth();

  const handleLangChange = (lang: Language) => {
    setPreferredLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 md:px-6 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-lg shadow-sm">
            C
          </div>
          <span className="font-semibold text-lg tracking-tight text-white whitespace-nowrap">
            C Tutor <span className="text-cyan-400 font-medium">AI</span>
          </span>
        </button>
      </div>

      {/* Zone 2: Navigation Links for quick access on desktop */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onTabChange('learn')}
          className={`transition-colors whitespace-nowrap hover:text-white ${
            currentTab === 'learn' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Learn C
        </button>
        <button
          onClick={() => onTabChange('ai-teacher')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
            currentTab === 'ai-teacher' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          AI Teacher
        </button>
        <button
          onClick={() => onTabChange('practice')}
          className={`transition-colors whitespace-nowrap hover:text-white ${
            currentTab === 'practice' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Practice Quizzes
        </button>
        <button
          onClick={() => onTabChange('code-lab')}
          className={`transition-colors whitespace-nowrap hover:text-white ${
            currentTab === 'code-lab' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Code Lab
        </button>
      </nav>

      {/* Zone 3: Language Selector & Auth Controls */}
      <div className="flex items-center gap-3">
        {/* Language selector segmented control */}
        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-0.5 text-xs">
          <button
            onClick={() => handleLangChange('hinglish')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              preferredLanguage === 'hinglish'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Hinglish: Easy Roman Hindi + English tech terms"
          >
            Hinglish
          </button>
          <button
            onClick={() => handleLangChange('en')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              preferredLanguage === 'en'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => handleLangChange('hi')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              preferredLanguage === 'hi'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Hindi (Devanagari)"
          >
            हिंदी
          </button>
        </div>

        {/* User Login / Profile Button */}
        {user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTabChange('settings')}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="max-w-[100px] truncate font-medium">
                {user.displayName || user.email?.split('@')[0] || 'Account'}
              </span>
            </button>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In / Sync</span>
          </button>
        )}
      </div>
    </header>
  );
};
