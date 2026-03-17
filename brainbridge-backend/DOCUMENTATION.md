# BrainBridge Backend Documentation

## 1. Overview
The **BrainBridge Backend** is a scalable infrastructure responsible for processing gameplay telemetry, managing screening sessions, and executing advanced Machine Learning models to predict early indicators of learning disabilities.

The system follows a robust architecture integrating Node.js for API services and Python for Machine Learning inference.

## 2. Technology Stack
- **API Server**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Machine Learning Service**: [Python](https://www.python.org/) with [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Primary document store for sessions and telemetry)
- **Cache Layer**: [Redis](https://redis.io/) (Used for request buffering and performance)
- **Environment Management**: [Dotenv](https://www.npmjs.com/package/dotenv)

## 3. Directory Structure
```text
brainbridge-backend/
├── src/
│   ├── config/         # Configuration files (DB, Environment)
│   ├── controllers/    # Business logic for API endpoints
│   ├── middleware/     # Auth, error handling, rate limiting
│   ├── models/         # MongoDB schemas (Mongoose)
│   ├── routes/         # Express API route definitions
│   ├── services/       # Feature engineering & ML integration logic
│   ├── utils/          # Logger, custom errors, helper functions
│   └── index.js        # Entry point
├── ml_service/         # Python-based ML inference service
│   ├── models/         # Trained .pkl and .h5 model files
│   ├── app.py          # FastAPI application
│   └── predict.py      # Inference logic
```

## 4. Machine Learning Integration
BrainBridge leverages a specialized **AI Triad** to evaluate three distinct learning disabilities:

- **CNN (Convolutional Neural Network)**: Employed for **Dyslexia** screening, analyzing pattern recognition and image interaction data from the Letter Mirror game.
- **Random Forest Classifier**: Utilized for **ADHD** screening, classifying behavioral signals such as impulsivity and distraction levels.
- **XGBoost**: Integrated for **Dyscalculia** screening, processing numerical reasoning signals and accuracy metrics.

## 5. Features and Innovation
- **Specialized AI Triad**: Orchestrated deployment of three distinct models ensuring high-accuracy multi-disorder screening.
- **Privacy-by-Design Framework**: Anonymous child mapping compliant with the **DPDP Act 2023**, ensuring data sovereignty and privacy.
- **Automated Feature Engineering Pipeline**: Real-time transformation of raw gameplay telemetry into actionable neuro-developmental feature vectors.

## 6. Social Impact & National Alignment
- **DIKSHA Promotion (Future Roadmap v3)**: Strategically architected to promote and eventually integrate with the **Digital Infrastructure for Knowledge Sharing (DIKSHA)** government scheme, aiming to align screening results with national student profiles.
- **NGO Collaboration**: Actively aiming to partner with **NGOs** to scale the platform's reach to disadvantaged communities and provide follow-up support.
- **Democratizing Early Intervention**: Bridging the gap in rural educational infrastructure by providing a free, scalable, and easy-to-use screening tool for government schools.

## 7. API Endpoints
- `POST /api/v1/auth`: Handle user authentication.
- `POST /api/v1/sessions`: Initialize a new screening session.
- `POST /api/v1/telemetry`: Stream behavioral signals from games.
- `POST /api/v1/predict`: Get AI-powered risk assessment scores.

---
*BrainBridge Backend: Powering the future of inclusive education.*
