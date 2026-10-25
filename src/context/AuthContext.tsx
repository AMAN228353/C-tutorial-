import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  signInWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logoutUser,
  testConnection,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import {
  Language,
  LearningLevel,
  UserProfile,
  LessonProgress,
  QuizAttempt,
  Bookmark,
} from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isGuest: boolean;
  loading: boolean;
  preferredLanguage: Language;
  currentLevel: LearningLevel;
  completedLessons: Set<string>;
  bookmarks: Bookmark[];
  quizAttempts: QuizAttempt[];
  loginWithGooglePopup: () => Promise<void>;
  loginWithEmailPassword: (e: string, p: string) => Promise<void>;
  registerWithEmailPassword: (e: string, p: string, n?: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => void;
  setPreferredLanguage: (lang: Language) => Promise<void>;
  setCurrentLevel: (lvl: LearningLevel) => Promise<void>;
  toggleLessonComplete: (lessonId: string) => Promise<void>;
  toggleBookmark: (lessonId: string, title: string, topicTitle: string, moduleNumber: number) => Promise<void>;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'userId' | 'attemptedAt'>) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_STORAGE_KEY = 'c_tutor_guest_data_v1';

interface GuestData {
  language: Language;
  level: LearningLevel;
  completedLessons: string[];
  bookmarks: Bookmark[];
  quizAttempts: QuizAttempt[];
}

function loadGuestData(): GuestData {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading guest data:', e);
  }
  return {
    language: 'hinglish',
    level: 'beginner',
    completedLessons: [],
    bookmarks: [],
    quizAttempts: [],
  };
}

function saveGuestData(data: GuestData) {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving guest data:', e);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // In-memory state for fast UI reactions
  const [preferredLanguage, setLangState] = useState<Language>('hinglish');
  const [currentLevel, setLevelState] = useState<LearningLevel>('beginner');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  // Test Firestore connection on initial boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuest(false);
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setUserProfile(data);
            if (data.preferredLanguage) setLangState(data.preferredLanguage);
            if (data.currentLevel) setLevelState(data.currentLevel);
          } else {
            // Create initial profile in Firestore
            const initialProfile: UserProfile = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'C Learner',
              preferredLanguage: 'hinglish',
              currentLevel: 'beginner',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, initialProfile);
            setUserProfile(initialProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        // If not logged in, initialize guest mode from localStorage
        setUserProfile(null);
        setIsGuest(true);
        const guestData = loadGuestData();
        setLangState(guestData.language);
        setLevelState(guestData.level);
        setCompletedLessons(new Set(guestData.completedLessons));
        setBookmarks(guestData.bookmarks);
        setQuizAttempts(guestData.quizAttempts);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync real-time Firestore collections when user is logged in
  useEffect(() => {
    if (!user) return;

    // 1. Progress Listener
    const progressRef = collection(db, 'users', user.uid, 'progress');
    const unsubProgress = onSnapshot(
      progressRef,
      (snapshot) => {
        const completed = new Set<string>();
        snapshot.docs.forEach((d) => {
          const data = d.data() as LessonProgress;
          if (data.completed) {
            completed.add(data.lessonId);
          }
        });
        setCompletedLessons(completed);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/progress`);
      }
    );

    // 2. Bookmarks Listener
    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const unsubBookmarks = onSnapshot(
      bookmarksRef,
      (snapshot) => {
        const bms: Bookmark[] = [];
        snapshot.docs.forEach((d) => {
          bms.push({ id: d.id, ...d.data() } as Bookmark);
        });
        setBookmarks(bms);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/bookmarks`);
      }
    );

    // 3. Quiz Attempts Listener
    const quizRef = collection(db, 'users', user.uid, 'quizAttempts');
    const unsubQuiz = onSnapshot(
      quizRef,
      (snapshot) => {
        const qas: QuizAttempt[] = [];
        snapshot.docs.forEach((d) => {
          qas.push({ id: d.id, ...d.data() } as QuizAttempt);
        });
        // Sort latest first
        qas.sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime());
        setQuizAttempts(qas);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/quizAttempts`);
      }
    );

    return () => {
      unsubProgress();
      unsubBookmarks();
      unsubQuiz();
    };
  }, [user]);

  // Auth Action Handlers
  const loginWithGooglePopup = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await loginWithEmail(email, pass);
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailPassword = async (email: string, pass: string, name?: string) => {
    setLoading(true);
    try {
      await registerWithEmail(email, pass, name);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsGuest(true);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    const guestData = loadGuestData();
    setLangState(guestData.language);
    setLevelState(guestData.level);
    setCompletedLessons(new Set(guestData.completedLessons));
    setBookmarks(guestData.bookmarks);
    setQuizAttempts(guestData.quizAttempts);
  };

  // Setting handlers
  const setPreferredLanguage = async (lang: Language) => {
    setLangState(lang);
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userDocRef, { preferredLanguage: lang, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    } else {
      const gd = loadGuestData();
      gd.language = lang;
      saveGuestData(gd);
    }
  };

  const setCurrentLevel = async (lvl: LearningLevel) => {
    setLevelState(lvl);
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userDocRef, { currentLevel: lvl, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    } else {
      const gd = loadGuestData();
      gd.level = lvl;
      saveGuestData(gd);
    }
  };

  // Lesson Progress toggle
  const toggleLessonComplete = async (lessonId: string) => {
    const isNowCompleted = !completedLessons.has(lessonId);

    // Optimistic state update
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (isNowCompleted) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });

    if (user) {
      const progressDocRef = doc(db, 'users', user.uid, 'progress', lessonId);
      try {
        await setDoc(progressDocRef, {
          userId: user.uid,
          lessonId,
          completed: isNowCompleted,
          completedAt: isNowCompleted ? new Date().toISOString() : '',
          lastViewedAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/${lessonId}`);
      }
    } else {
      const gd = loadGuestData();
      if (isNowCompleted) {
        if (!gd.completedLessons.includes(lessonId)) gd.completedLessons.push(lessonId);
      } else {
        gd.completedLessons = gd.completedLessons.filter((id) => id !== lessonId);
      }
      saveGuestData(gd);
    }
  };

  // Bookmark toggle
  const toggleBookmark = async (
    lessonId: string,
    title: string,
    topicTitle: string,
    moduleNumber: number
  ) => {
    const existing = bookmarks.find((b) => b.lessonId === lessonId);

    if (existing) {
      // Remove
      setBookmarks((prev) => prev.filter((b) => b.lessonId !== lessonId));
      if (user) {
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', existing.id));
        } catch (err) {
          handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/bookmarks/${existing.id}`);
        }
      } else {
        const gd = loadGuestData();
        gd.bookmarks = gd.bookmarks.filter((b) => b.lessonId !== lessonId);
        saveGuestData(gd);
      }
    } else {
      // Add
      const newBm: Bookmark = {
        id: `bm-${lessonId}`,
        userId: user ? user.uid : 'guest',
        lessonId,
        title,
        topicTitle,
        moduleNumber,
        createdAt: new Date().toISOString(),
      };
      setBookmarks((prev) => [newBm, ...prev]);

      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid, 'bookmarks', newBm.id), newBm);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/bookmarks/${newBm.id}`);
        }
      } else {
        const gd = loadGuestData();
        gd.bookmarks.unshift(newBm);
        saveGuestData(gd);
      }
    }
  };

  // Record Quiz Attempt
  const recordQuizAttempt = async (attempt: Omit<QuizAttempt, 'userId' | 'attemptedAt'>) => {
    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: `attempt-${Date.now()}`,
      userId: user ? user.uid : 'guest',
      attemptedAt: new Date().toISOString(),
    };

    setQuizAttempts((prev) => [fullAttempt, ...prev]);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'quizAttempts', fullAttempt.id!), fullAttempt);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/quizAttempts/${fullAttempt.id}`);
      }
    } else {
      const gd = loadGuestData();
      gd.quizAttempts.unshift(fullAttempt);
      saveGuestData(gd);
    }
  };

  const isLessonCompleted = (lessonId: string) => completedLessons.has(lessonId);
  const isBookmarked = (lessonId: string) => bookmarks.some((b) => b.lessonId === lessonId);

  const value = useMemo(
    () => ({
      user,
      userProfile,
      isGuest,
      loading,
      preferredLanguage,
      currentLevel,
      completedLessons,
      bookmarks,
      quizAttempts,
      loginWithGooglePopup,
      loginWithEmailPassword,
      registerWithEmailPassword,
      logout,
      continueAsGuest,
      setPreferredLanguage,
      setCurrentLevel,
      toggleLessonComplete,
      toggleBookmark,
      recordQuizAttempt,
      isLessonCompleted,
      isBookmarked,
    }),
    [
      user,
      userProfile,
      isGuest,
      loading,
      preferredLanguage,
      currentLevel,
      completedLessons,
      bookmarks,
      quizAttempts,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
