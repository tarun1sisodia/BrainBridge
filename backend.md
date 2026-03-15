# BrainBridge Backend Architecture

## 1. Overview

The **BrainBridge Backend** is responsible for managing game telemetry, processing behavioral signals, running machine learning models, and generating screening reports.

The system predicts early indicators of:

* Dyslexia
* Dyscalculia
* ADHD

The backend receives gameplay signals from the frontend, processes them into features, runs ML models, and returns risk indicators.

The backend follows a **microservice architecture** consisting of:

* API Gateway
* Telemetry Processing Layer
* Feature Engineering Layer
* Machine Learning Service
* Database Layer
* Report Generation System

---

# 2. Backend Objectives

The backend must:

* receive gameplay telemetry
* store session data
* convert signals into ML features
* run ML predictions
* generate screening reports
* support offline synchronization
* maintain privacy compliance

---

# 3. Backend Technology Stack

## API Server

**Node.js + Express**

Responsibilities:

* API routing
* session management
* telemetry ingestion
* report APIs
* communication with ML service

---

## Machine Learning Service

**FastAPI (Python)**

Responsibilities:

* load trained models
* process features
* run predictions
* return risk scores

---

## Database

Primary database:

**MongoDB**

Reasons:

* flexible schema
* easy telemetry storage
* scalable document model

MongoDB stores:

* sessions
* telemetry signals
* feature vectors
* prediction results

---

## Cache Layer

**Redis**

Used for:

* request caching
* telemetry buffering
* prediction queue

---

# 4. Backend Architecture

```text
Frontend (Games)
        ↓
Node.js API Gateway
        ↓
Telemetry Processor
        ↓
Feature Engineering
        ↓
ML Service (FastAPI)
        ↓
MongoDB Database
        ↓
Report Generator
```

---

# 5. Core Backend Modules

## 5.1 Session Management

Creates and manages screening sessions.

Each child receives an **anonymous child ID**.

Example session object:

```json
{
  "session_id": "sess_927362",
  "child_id": "child_29372",
  "language": "hi",
  "status": "in_progress",
  "created_at": "2026-03-15"
}
```

---

# 5.2 Telemetry Ingestion

Receives gameplay signals from the frontend.

Example telemetry payload:

```json
{
  "session_id": "sess_927362",
  "game": "focus_catcher",
  "reaction_time": 1.4,
  "errors": 2,
  "completion_time": 60
}
```

Telemetry is stored directly in MongoDB.

---

# 5.3 Feature Engineering Layer

Raw signals are converted into ML features.

Example feature vector:

```json
{
  "reaction_time_avg": 1.2,
  "error_rate": 0.35,
  "attention_score": 0.62,
  "math_accuracy": 0.58,
  "mirror_error_rate": 0.41
}
```

Features may evolve as games improve.

MongoDB's flexible schema allows easy updates.

---

# 6. Machine Learning System

The ML service runs separate models for each disorder.

| Disorder    | Model                              |
| ----------- | ---------------------------------- |
| ADHD        | Random Forest                      |
| Dyscalculia | XGBoost                            |
| Dyslexia    | CNN (Convolutional Neural Network) |

---

# 7. Dyslexia CNN Model

The Dyslexia model processes **letter image datasets**.

Input:

* letter images
* handwriting samples
* reversed character patterns

CNN architecture example:

```text
Image Input
↓
Conv2D
↓
MaxPooling
↓
Conv2D
↓
Flatten
↓
Dense Layer
↓
Softmax Output
```

Output:

Probability of dyslexia indicators.

---

# 8. ADHD Model

Model type:

**Random Forest Classifier**

Input features:

* reaction_time
* impulsive_click_rate
* missed_targets
* attention_duration

Example output:

```json
{
  "adhd_probability": 0.71
}
```

---

# 9. Dyscalculia Model

Model type:

**XGBoost**

Input features:

* number_order_errors
* counting_accuracy
* math_response_latency
* quantity_estimation_time

Example output:

```json
{
  "dyscalculia_probability": 0.43
}
```

---

# 10. Prediction API

### Endpoint

```text
POST /predict
```

### Request

```json
{
  "reaction_time_avg": 1.2,
  "error_rate": 0.35,
  "math_accuracy": 0.58,
  "mirror_error_rate": 0.41
}
```

### Response

```json
{
  "adhd_risk": 0.71,
  "dyslexia_risk": 0.32,
  "dyscalculia_risk": 0.45
}
```

---

# 11. Risk Classification

Scores are converted into risk levels.

| Score     | Risk   |
| --------- | ------ |
| 0.0 – 0.3 | Green  |
| 0.3 – 0.6 | Yellow |
| 0.6 – 1.0 | Red    |

---

# 12. MongoDB Data Collections

## Sessions Collection

```json
{
  "_id": "session_id",
  "child_id": "child_id",
  "language": "hi",
  "status": "completed",
  "created_at": "timestamp"
}
```

---

## Telemetry Collection

```json
{
  "_id": "telemetry_id",
  "session_id": "session_id",
  "game": "number_jump",
  "reaction_time": 1.2,
  "errors": 3,
  "completion_time": 60
}
```

---

## Results Collection

```json
{
  "_id": "result_id",
  "session_id": "session_id",
  "adhd_risk": 0.71,
  "dyslexia_risk": 0.32,
  "dyscalculia_risk": 0.45,
  "created_at": "timestamp"
}
```

---

# 13. Offline Sync Support

Frontend stores telemetry locally when offline.

Sync process:

1. gameplay data stored in IndexedDB
2. internet restored
3. batched telemetry sent to backend
4. backend stores data and processes prediction

---

# 14. Security Measures

Security practices include:

* HTTPS encryption
* request validation
* rate limiting
* input sanitization

Child data is anonymized.

---

# 15. Privacy Compliance

BrainBridge follows **DPDP Act 2023**.

Policies include:

* anonymous child IDs
* minimal data storage
* encrypted communication

---

# 16. Ethical Disclaimer

BrainBridge is **not a medical diagnostic system**.

All reports include:

> This platform provides early screening indicators only and does not replace professional medical evaluation.

---

# 17. Deployment Architecture

```text
Frontend (Next.js)
        ↓
Node.js API Server
        ↓
FastAPI ML Service
        ↓
MongoDB Database
        ↓
Redis Cache
```

---

# 18. Infrastructure Stack

Recommended deployment:

* Docker containers
* Nginx reverse proxy
* AWS / GCP / Azure cloud hosting

---

# 19. Backend Project Structure

```text
brainbridge-backend/

src/

controllers/
sessionController.js
telemetryController.js
predictionController.js

routes/
sessionRoutes.js
telemetryRoutes.js
predictionRoutes.js

services/
telemetryProcessor.js
featureEngineer.js
predictionService.js

models/
sessionModel.js
telemetryModel.js
resultModel.js

config/
mongo.js
redis.js
env.js

middleware/
validationMiddleware.js
rateLimiter.js

utils/
riskCalculator.js
dataValidator.js

ml_service/

app.py
predict.py
feature_processor.py

models/
adhd_model.pkl
dyscalculia_model.pkl
dyslexia_cnn_model.h5
```

---

# 20. Performance Targets

| Metric             | Target  |
| ------------------ | ------- |
| API response time  | <300 ms |
| Prediction latency | <500 ms |
| System uptime      | >99%    |

---

# 21. Future Improvements

Potential backend improvements:

* teacher dashboards
* specialist locator API
* handwriting analysis models
* speech-based screening models

---

# 22. Summary

The BrainBridge backend provides a scalable infrastructure that processes gameplay telemetry, generates ML predictions, and produces screening reports.

The system integrates:

* Node.js API services
* Python ML inference
* MongoDB data storage
* Redis caching

to support the BrainBridge learning disability screening platform.
