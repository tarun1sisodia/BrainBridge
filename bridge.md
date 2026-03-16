
# BrainBridge – Software Architecture Documentation

## 1. System Overview

BrainBridge is an **AI-based early screening platform** designed to detect potential learning difficulties in children through **interactive cognitive games and machine learning analysis**.

The system screens for:

- Attention Deficit Hyperactivity Disorder (ADHD)
- Dyslexia
- Dyscalculia

The platform analyzes **behavioral patterns, handwriting samples, and numerical performance** collected through mini‑games and uses machine learning models to generate **risk indicators**.

> Note: This system is an **early screening tool**, not a medical diagnosis system.

---

# 2. High-Level Architecture

The system follows a **multi-layer architecture** consisting of:

1. Presentation Layer (Frontend)
2. Application Layer (Backend)
3. AI Processing Layer
4. Reporting Layer

System workflow:
User Interaction
↓
Game-based Data Collection
↓
Feature Extraction
↓
AI Model Analysis
↓
Risk Score Generation
↓
Result Dashboard


---

# 3. Presentation Layer (Frontend)

## Purpose

The frontend provides the **interactive interface** where children play cognitive games designed to measure behavioral indicators.

### Responsibilities

- User interaction
- Game mechanics
- Capturing gameplay data
- Displaying results

---

## Implemented Games

### ADHD Screening Game — Focus Catcher

Purpose: Measure **attention span and impulsivity**

Gameplay:

- Targets and distractors appear randomly
- Child must click only the correct target

Metrics collected:

- reaction time
- missed targets
- false clicks
- accuracy
- attention duration

---

### Dyslexia Screening Game — Letter Writing Test

Purpose: Detect **letter reversal patterns**

Gameplay:

- Child writes letters such as **b, d, p, q**
- System captures handwriting image

Metrics collected:

- letter accuracy
- reversed letters
- writing distortions

---

### Dyscalculia Screening Game — Number Jump

Purpose: Measure **numerical cognition**

Gameplay:

- Child solves simple number problems
- Selects the correct number quickly

Metrics collected:

- number accuracy
- response time
- number confusion rate

---

## Technologies

Possible frontend technologies:
React
HTML
JavaScript
Canvas API


or mobile frameworks:
Flutter
React Native


---

# 4. Application Layer (Backend)

## Purpose

The backend processes gameplay data and prepares it for machine learning analysis.

### Responsibilities

- Receive gameplay data
- Extract behavioral features
- Communicate with AI models
- Generate prediction results

---

## Backend Services

### API Layer

Handles communication between frontend and backend.

Example endpoints:
/predict-adhd
/predict-dyslexia
/predict-dyscalculia
/upload-handwriting


---

### Feature Extraction Engine

Converts raw gameplay data into ML features.

Example:

| Raw Data | Feature |
|---------|--------|
reaction timestamps | reaction_time_mean |
wrong clicks | impulsivity_score |
target accuracy | accuracy_rate |
handwriting image | reversal_rate |

---

# 5. AI Processing Layer

This layer contains trained machine learning models.

Each disorder uses a **separate specialized model**.

---

## ADHD Model

Algorithm:
Random Forest Classifier


Input features:
Focus_Score_Video
Difficulty_Organizing_Tasks
Sleep_Hours
Daily_Activity_Hours
Q1_1 – Q1_9 (Hyperactivity indicators)
Q2_1 – Q2_9 (Inattention indicators)


Output:
ADHD risk probability


---

## Dyslexia Model

Algorithm:
CNN (Convolutional Neural Network)


Input:
Handwritten letter images


Classes detected:
Normal
Reversal
Corrected


Output:
Letter classification
Reversal rate
Dyslexia risk score


---

## Dyscalculia Model

Algorithm:
Random Forest
Logistic Regression


Input features:
number_accuracy
calculation_time
estimation_error
sequence_accuracy


Output:
Dyscalculia risk score


---

# 6. Model Training Pipeline

Models are trained offline using datasets.

Training workflow:
Dataset Collection
↓
Data Cleaning
↓
Feature Engineering
↓
Train/Test Split
↓
Model Training
↓
Model Evaluation
↓
Model Export


Saved model formats:
.keras
.pkl
.joblib


---

# 7. Model Evaluation

Models are evaluated using standard metrics:

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix

These metrics ensure reliable predictions.

---

# 8. Reporting Layer

After analysis, the system generates a **screening report**.

Example output:
ADHD Risk: 65%
Dyslexia Risk: 40%
Dyscalculia Risk: 22%


Risk levels:

| Score | Risk Level |
|------|------------|
0–30% | Low Risk |
31–60% | Moderate Risk |
61–100% | High Risk |

Results are displayed to **teachers and parents** through a dashboard.

---

# 9. Complete System Flow
Child opens screening platform
↓
Child plays cognitive games
↓
Gameplay data collected
↓
Feature extraction
↓
AI models analyze data
↓
Risk scores generated
↓
Results displayed on dashboard


---

# 10. Ethical Considerations

Important guidelines:

- Data anonymization
- Privacy protection
- No medical diagnosis claims

The system provides **screening insights only** and must be followed by professional evaluation.

---

# 11. Future Improvements

Possible enhancements:

- Eye‑tracking integration
- Speech analysis for dyslexia
- Mobile application
- Personalized learning recommendations
- Continuous learning models

---

# Summary

BrainBridge combines **interactive cognitive games, behavioral analysis, and machine learning models** to provide an accessible platform for early screening of learning disorders in children.
