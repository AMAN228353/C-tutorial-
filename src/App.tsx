import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeDashboard } from './components/HomeDashboard';
import { LearnC } from './components/LearnC';
import { AITeacher } from './components/AITeacher';
import { PracticeQuiz } from './components/PracticeQuiz';
import { CodeLab } from './components/CodeLab';
import { ProgressView } from './components/ProgressView';
import { BookmarksView } from './components/BookmarksView';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { NavigationTab } from './types';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);
  const [codeLabCode, setCodeLabCode] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const handleNavigate = (tab: NavigationTab, lessonId?: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCodeLabWithCode = (code: string) => {
    setCodeLabCode(code);
    setCurrentTab('code-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => handleNavigate(tab)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={(tab) => handleNavigate(tab)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
          {currentTab === 'home' && (
            <HomeDashboard onNavigate={(tab, lessonId) => handleNavigate(tab, lessonId)} />
          )}

          {currentTab === 'learn' && (
            <LearnC
              initialLessonId={selectedLessonId}
              onOpenCodeLabWithCode={handleOpenCodeLabWithCode}
            />
          )}

          {currentTab === 'ai-teacher' && <AITeacher />}

          {currentTab === 'practice' && (
            <PracticeQuiz
              onNavigateToTopic={(topic) => {
                // Topic search or switch to learn tab
                handleNavigate('learn');
              }}
            />
          )}

          {currentTab === 'code-lab' && <CodeLab initialCode={codeLabCode} />}

          {currentTab === 'progress' && (
            <ProgressView
              onNavigateToLesson={(lessonId) => handleNavigate('learn', lessonId)}
              onNavigateToQuiz={() => handleNavigate('practice')}
            />
          )}

          {currentTab === 'bookmarks' && (
            <BookmarksView
              onNavigateToLesson={(lessonId) => handleNavigate('learn', lessonId)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView onOpenAuthModal={() => setAuthModalOpen(true)} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">C Tutor AI</span>
            <span>·</span>
            <span>Standard ANSI / ISO C (C99 - C17)</span>
          </div>
          <div className="text-slate-400">
            Line-by-line breakdowns · Dynamic memory diagrams · Low-level systems education
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
