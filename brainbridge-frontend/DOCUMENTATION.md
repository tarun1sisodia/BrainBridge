# BrainBridge Frontend Documentation

## 1. Overview
**BrainBridge** is a bilingual Responsive Web Application designed to deliver a gamified screening experience for detecting early indicators of learning disabilities in children. The platform focuses on three primary conditions:
- **Dyslexia**
- **Dyscalculia**
- **ADHD**

The frontend is built to be lightweight and accessible, ensuring it runs smoothly on various devices and in low-bandwidth environments.

## 2. Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 3. Directory Structure
```text
brainbridge-frontend/
├── public/             # Static assets (images, audio)
├── src/
│   ├── app/            # Next.js App Router (pages & layouts)
│   ├── components/     # Reusable UI components
│   ├── games/          # Core screening games
│   ├── hooks/          # Custom React hooks
│   ├── localization/   # Translation files (en.json, hi.json)
│   ├── stores/         # Zustand global state stores
│   └── styles/         # Global CSS and themes
```

## 4. Game Modules
BrainBridge features three specialized screening games, each capturing unique behavioral signals:

### 4.1 Letter Mirror (`src/games/letterMirror/`)
- **Main Component**: `LetterMirrorGame.tsx`
- **Logic**: `letterLogic.ts`
- **Assets**: `assets/` (Visual cues and mirrored characters)
- **Objective**: Screens for **Dyslexia** by testing a child's ability to recognize correct letter orientations vs. mirrored or reversed versions.

### 4.2 Number Jump (`src/games/numberJump/`)
- **Main Component**: `NumberJumpGame.tsx`
- **Logic**: `numberLogic.ts`
- **Objective**: Screens for **Dyscalculia** by evaluating numerical order, quantity estimation, and basic arithmetic response times.

### 4.3 Focus Catcher (`src/games/focusCatcher/`)
- **Main Component**: `FocusCatcherGame.tsx`
- **Logic**: `focusLogic.ts`
- **Assets**: `assets/` (Catchable targets and distractions)
- **Objective**: Screens for **ADHD** by measuring attention span, impulsivity (click rate), and the ability to ignore distractions.

## 5. Core Components
- **`Landing.tsx`**: The entry point for users, introducing the mission and starting the screening.
- **`GameShell.tsx`**: A unified container for all games, providing a shared timer, progress indicator, and navigation controls.
- **`InteractiveMascot.tsx`**: Engaging visual elements that guide children through the experience.
- **`LanguageToggle.tsx`**: Allows seamless switching between English and Hindi.
- **`ReportCard.tsx`**: Displays the processed screening results to parents.

## 6. Features and Innovation
- **Non-Invasive Universal Screening**: A gamified "Stealth Assessment" approach that eliminates clinical anxiety in children by masking tests as play.
- **Bilingual Cognitive Accessibility**: Seamless English/Hindi integration ensuring no child is left behind due to language barriers.
- **Edge-Optimized Performance**: A lightweight, responsive web architecture designed for low-connectivity rural school environments.
- **Silent Behavioral Telemetry**: Capture of high-fidelity cognitive signals (reaction time, hesitation, precision) through standard web interactions without manual data entry.

## 7. API Integration
The frontend communicates with the backend via the `/predict` endpoint to receive risk assessments based on the collected telemetry data. It also handles session creation and authentication through the respective API routes.

---
*BrainBridge Frontend: Bridging the gap in learning disability detection.*
