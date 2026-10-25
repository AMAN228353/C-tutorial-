import React, { useState } from 'react';
import {
  Globe,
  Gauge,
  User as UserIcon,
  ShieldCheck,
  LogOut,
  LogIn,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language, LearningLevel } from '../types';

interface SettingsViewProps {
  onOpenAuthModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenAuthModal }) => {
  const {
    user,
    isGuest,
    preferredLanguage,
    setPreferredLanguage,
    currentLevel,
    setCurrentLevel,
    logout,
  } = useAuth();

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleLanguageSelect = async (lang: Language) => {
    await setPreferredLanguage(lang);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLevelSelect = async (lvl: LearningLevel) => {
    await setCurrentLevel(lvl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Platform Settings</h1>
          <p className="text-xs text-slate-400">
            Configure learning language, difficulty level, and user synchronization
          </p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <Check className="h-4 w-4" />
            <span>Saved!</span>
          </div>
        )}
      </div>

      {/* Language Preference */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
          <Globe className="h-4 w-4 text-cyan-400" />
          <span>Teaching Language</span>
        </div>

        <p className="text-xs text-slate-400">
          Choose your preferred language for lesson explanations and AI Teacher conversations. Programming terms (pointers, memory, arrays) always remain in English.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => handleLanguageSelect('hinglish')}
            className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
              preferredLanguage === 'hinglish'
                ? 'border-cyan-500 bg-cyan-950/20 text-white'
                : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-semibold text-sm text-cyan-300">Hinglish</span>
            <span className="text-[11px] text-slate-400 mt-1">
              Conversational Hindi in Roman script + English C terminology
            </span>
          </button>

          <button
            onClick={() => handleLanguageSelect('en')}
            className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
              preferredLanguage === 'en'
                ? 'border-cyan-500 bg-cyan-950/20 text-white'
                : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-semibold text-sm text-cyan-300">English</span>
            <span className="text-[11px] text-slate-400 mt-1">
              Precise, standard computer science prose and technical references
            </span>
          </button>

          <button
            onClick={() => handleLanguageSelect('hi')}
            className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
              preferredLanguage === 'hi'
                ? 'border-cyan-500 bg-cyan-950/20 text-white'
                : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-semibold text-sm text-cyan-300">हिंदी (Hindi)</span>
            <span className="text-[11px] text-slate-400 mt-1">
              देवनागरी लिपि में सरल स्पष्टीकरण और तकनीकी अवधारणाएं
            </span>
          </button>
        </div>
      </section>

      {/* Learning Level Setting */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
          <Gauge className="h-4 w-4 text-cyan-400" />
          <span>Starting Experience Level</span>
        </div>

        <p className="text-xs text-slate-400">
          The AI Teacher tailors analogies and code depth based on your selected level.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {(['beginner', 'intermediate', 'advanced'] as LearningLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelSelect(lvl)}
              className={`p-4 rounded-xl border text-left transition-all capitalize ${
                currentLevel === lvl
                  ? 'border-cyan-500 bg-cyan-950/20 text-white font-semibold'
                  : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-sm font-semibold text-cyan-300">{lvl}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                {lvl === 'beginner'
                  ? 'First time learning C, focus on syntax and analogies'
                  : lvl === 'intermediate'
                  ? 'Familiar with loops, focusing on pointers & dynamic memory'
                  : 'Advanced systems programming, memory leaks, and DSA'}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Cloud & User Account */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
          <UserIcon className="h-4 w-4 text-cyan-400" />
          <span>Account & Sync Status</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-slate-800 bg-slate-950">
          <div>
            <div className="text-sm font-semibold text-white">
              {user ? user.displayName || user.email : 'Guest Student'}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {user
                ? `Signed in via ${user.providerData[0]?.providerId || 'Firebase'}`
                : 'Progress is currently saved locally in your browser storage'}
            </div>
          </div>

          <div>
            {user ? (
              <button
                onClick={() => logout()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300 hover:text-rose-400 hover:border-rose-900/40 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In to Sync</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>
            {user
              ? 'Firestore Cloud Security Rules active: User data is completely isolated.'
              : 'Sign in anytime to automatically sync your local progress to Cloud Firestore.'}
          </span>
        </div>
      </section>
    </div>
  );
};
