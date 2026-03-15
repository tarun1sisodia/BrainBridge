# BrainBridge Frontend Architecture

## 1. Overview

The **BrainBridge Frontend** is a bilingual Progressive Web Application (PWA) designed to deliver a gamified screening experience for detecting early indicators of learning disabilities in children.

The platform screens for three conditions:

* Dyslexia
* Dyscalculia
* ADHD

The frontend handles:

* User interface rendering
* Game execution
* Behavioral telemetry capture
* Bilingual interface support
* API communication with the ML backend
* Report visualization

The application is designed **mobile-first** to run smoothly on low-end Android devices commonly used in Indian schools and homes.

---

# 2. Frontend Objectives

The frontend must:

* Provide a **simple child-friendly interface**
* Maintain **60 FPS gameplay performance**
* Support **English and Hindi**
* Work in **low-bandwidth environments**
* Support **offline gameplay**
* Capture **behavioral signals silently**

---

# 3. Technology Stack

## Framework

**React**

Reasons:

* fast routing
* server-side rendering
* SEO compatibility
* PWA friendly

---

## Styling

**TailwindCSS**

Benefits:

* lightweight styling
* responsive layout
* fast development

---

## State Management

---

## Animation System

**Framer Motion**

Used for:

* transitions between screens
* UI micro-interactions
* result animations

---

## Game Engine

Recommended option:

**Phaser.js**

---

## Client Storage

**IndexedDB**

Used for:

* storing telemetry signals
* offline session data
* temporary screening results

---

## PWA Support

The application supports installation using:

* Service Workers
* Web App Manifest
* Offline asset caching

---

# 4. Application Flow

The user journey follows a strict sequential flow.

```
Landing Page
↓
Language Selection
↓
Parent Consent
↓
Child Profile Creation
↓
Game 1 – Letter Mirror (Dyslexia)
↓
Game 2 – Number Jump (Dyscalculia)
↓
Game 3 – Focus Catcher (ADHD)
↓
Signal Processing
↓
Risk Report
↓
Parent Dashboard
```

Total screening time: **5–7 minutes**

---

# 5. Core Frontend Modules

## Landing Module

Purpose:

Introduce BrainBridge and begin the screening.

Components:

* start screening button
* language toggle
* platform introduction

---

## Language Provider

Handles bilingual functionality.

Language files:

```
en.json
hi.json
```

Responsibilities:

* load language text
* update UI dynamically
* persist user preference

---

## Consent Module

Before screening begins, parents must confirm consent.

Consent includes:

* data collection agreement
* privacy policy
* screening disclaimer

---

## Game Shell

All games run inside a shared container.

The shell provides:

* timer
* progress indicator
* exit button
* pause control

Example UI:

```
BrainBridge Screening
Game 1 / 3
Time Remaining: 60s
```

---

# 6. Game Modules

The platform contains **three screening games**, each targeting one disorder.

---

## Letter Mirror Game

Screens for **Dyslexia**.

### Gameplay

Children select the correct letter among mirrored or reversed letters.

### Signals Captured

* mirror_error_rate
* letter_recognition_accuracy
* reaction_time
* correction_attempts

---

## Number Jump Game

Screens for **Dyscalculia**.

### Gameplay

Children jump to the correct number or quantity displayed.

### Signals Captured

* number_order_errors
* counting_accuracy
* quantity_estimation_time
* math_response_latency

---

## Focus Catcher Game

Screens for **ADHD**.

### Gameplay

Children catch target objects while ignoring distractions.

### Signals Captured

* impulsive_click_rate
* missed_targets
* attention_duration
* distraction_response_time

---

# 7. Telemetry System

The telemetry engine records behavioral data during gameplay.

Captured signals include:

| Signal          | Meaning                    |
| --------------- | -------------------------- |
| Reaction Time   | cognitive processing speed |
| Error Count     | frequency of mistakes      |
| Tap Precision   | motor coordination         |
| Hesitation Time | decision delay             |
| Completion Time | persistence level          |

Example telemetry event:

```json
{
  "game": "focus_catcher",
  "reaction_time": 1.2,
  "errors": 3,
  "completion_time": 60
}
```

---

# 8. State Management Structure

Zustand manages global state.

Stores include:

```
languageStore
gameStore
telemetryStore
reportStore
```

Responsibilities:

* manage session progress
* store telemetry data
* manage language settings
* store prediction results

---

# 9. API Communication

The frontend communicates with the backend prediction service.

### Endpoint

```
POST /predict
```

### Example Request

```json
{
  "reaction_time": 1.3,
  "error_rate": 0.4,
  "attention_score": 0.65
}
```

### Example Response

```json
{
  "adhd_risk": 0.71,
  "dyslexia_risk": 0.28,
  "dyscalculia_risk": 0.41
}
```

---

# 10. Result Visualization

Results are shown using a **Traffic Light System**.

| Color  | Meaning       |
| ------ | ------------- |
| Green  | Low Risk      |
| Yellow | Moderate Risk |
| Red    | High Risk     |

Report sections include:

* attention ability
* reading ability
* numerical reasoning
* recommended next steps

---

# 11. Parent Report

Parents receive a simple summary.

Includes:

* disorder risk indicators
* behavioral observations
* guidance recommendations
* screening disclaimer

---

# 12. PDF Report Export

Parents can download the report.

Library used:

```
react-pdf
```

PDF includes:

* screening summary
* risk indicators
* recommended next steps
* disclaimer

---

# 13. Offline Support

Offline functionality allows gameplay without internet access.

Implementation:

Service Workers cache:

* game assets
* audio instructions
* UI resources

Session data stored in:

```
IndexedDB
```

Automatic synchronization occurs when internet is restored.

---

# 14. Performance Requirements

| Metric                  | Target     |
| ----------------------- | ---------- |
| Game FPS                | 60         |
| App Load Time           | <3 seconds |
| Session Completion Rate | >80%       |
| Crash Rate              | <2%        |

---

# 15. Accessibility Design

The UI must be child-friendly.

Design guidelines:

* large buttons
* minimal text
* audio instructions
* bright visuals
* simple navigation

---

# 16. Project Directory Structure

```
brainbridge-frontend/

public/
audio/
images/

src/

app/
layout.tsx
page.tsx

components/
Navbar
LanguageToggle
ConsentScreen
GameShell
ProgressBar
Timer
ReportCard

games/
letterMirror/
LetterMirrorGame.tsx
letterLogic.ts
assets/

numberJump/
NumberJumpGame.tsx
numberLogic.ts
assets/

focusCatcher/
FocusCatcherGame.tsx
focusLogic.ts
assets/

telemetry/
eventTracker
signalProcessor

stores/
languageStore
gameStore
telemetryStore
reportStore

api/
predictAPI

hooks/
useTelemetry
useGameTimer

localization/
en.json
hi.json

styles/
globals.css

utils/
riskCalculator
dataFormatter
```

---

# 17. Development Milestones

## Phase 1

* setup Next.js project
* implement bilingual provider
* build landing page

---

## Phase 2

* implement game shell
* build three playable games

---

## Phase 3

* integrate telemetry capture
* connect prediction API

---

## Phase 4

* develop parent report UI
* implement PDF export

---

## Phase 5

* enable PWA installation
* implement offline sync

---

# 18. Testing Strategy

Testing types:

* component testing
* gameplay testing
* telemetry validation
* performance testing
* cross-device testing

Tools:

* Jest
* React Testing Library
* Lighthouse

---

# 19. Future Improvements

Possible future modules:

* speech-based screening
* handwriting analysis
* adaptive difficulty games
* teacher analytics dashboard

---

# 20. Summary

The BrainBridge frontend is a **mobile-optimized bilingual screening platform** that delivers three gamified cognitive tasks and captures behavioral telemetry to support AI-based early screening of learning disabilities.

The system combines:

* modern web technologies
* interactive game design
* machine learning telemetry collection

to create a scalable screening tool for schools and families.
