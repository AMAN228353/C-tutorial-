# C Tutor AI - Full-Stack C Programming Education Platform

C Tutor AI is an interactive, full-stack educational platform designed to teach the complete C programming language syllabus (C99 to C17 standard) through structured modules, step-by-step memory and loop execution traces, an AI teacher (powered by Google Gemini), practice quizzes with instant feedback, and a safe low-level Code Lab simulator.

---

## Key Features

1. **Structured 14-Module Curriculum**:
   - Complete beginner to advanced syllabus: C history & compilation pipeline, variables, tokens & I/O, operators & precedence, control flow & loop iteration tables, functions & call stack frames, arrays & strings (`\0`), pointers & memory architecture, structs & memory alignment padding, dynamic memory (`malloc`/`calloc`/`realloc`/`free`), file streams, preprocessor & modular C, command line & Undefined Behavior, data structures in C (Linked Lists), and Capstone projects.
   - Line-by-line code breakdowns, loop iteration tables, and step-by-step variable traces.
   - Multi-lingual support: **Hinglish** (Roman Hindi + English tech terms), **English**, and **हिंदी** (Hindi).

2. **AI Teacher (Google Gemini API)**:
   - Patient teacher persona that never repeats the exact same failed explanation; uses fresh real-world analogies (mailboxes, lockers, memory addresses).
   - Trace and diagnose bugs, segmentation faults, and memory leaks.
   - Interactive in-lesson questions flyout: students can ask follow-up questions without losing their reading place.
   - Server-side execution ensuring API keys are never exposed in browser bundles.

3. **Practice Quizzes & Diagnostics**:
   - 1 MCQ at a time with instant verification, status feedback, and comprehensive explanation.
   - Question formats: Output prediction, find-the-bug, fill-in-the-code, and conceptual questions.
   - Test modes: Topic-wise tests, Mixed comprehensive tests, Revision tests, and Advanced tests.
   - Automatic identification of weak topics with direct revision links.

4. **Code Lab**:
   - Syntax-highlighted C code editor with line numbers, copy, reset, and stdout simulation.
   - Pre-configured curriculum code templates for rapid experimentation.
   - Safe sandbox execution notice: deterministic C parser with zero server-side binary vulnerability risk.

5. **User Accounts & Firebase Persistence**:
   - Google Sign-In and Email/Password authentication via Firebase Authentication.
   - Cloud Firestore synchronization for lesson completion, quiz test attempts, bookmarks, and learning preferences.
   - Zero-trust Firestore Security Rules enforcing strict user document isolation.
   - Guest Mode: Full offline and local storage support without requiring immediate login.

---

## Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express, TypeScript (`tsx`)
- **AI Engine**: `@google/genai` TypeScript SDK using `gemini-3.8-flash`
- **Database & Auth**: Firebase Authentication & Cloud Firestore

---

## Environment Variables

Defined in `.env.example`:
- `GEMINI_API_KEY`: API key for Google Gemini model calls (injected automatically in AI Studio or configured in local `.env`).
- `PORT`: Server port (default: 3000).

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000` with Express backend API endpoints (`/api/chat`, `/api/trace`, `/api/health`) and Vite SPA middleware.

3. **Run Type Checks & Linter**:
   ```bash
   npm run lint
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

5. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## Firebase Configuration & Security Rules

Firebase configuration is loaded automatically from `firebase-applet-config.json` with Firestore database `firestoreDatabaseId`.

Security rules (`firestore.rules`):
```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // Default deny
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /{subcollection=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```
Rules are deployed using AI Studio's `DeployRules` integration.
