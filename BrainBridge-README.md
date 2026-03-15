# BrainBridge Project - Hackathon Delivery

This repository contains the full source code for the BrainBridge bilingual learning disability screening platform.

It features:
1. **Frontend**: Next.js 14 App with Tailwind CSS, Zustand, Framer Motion, and PWA capabilities.
2. **Backend**: Node.js Express API.
3. **ML Service**: FastAPI python layer for predictions.

## Prerequisites
- Node.js (v18+)
- Python (3.9+)
- MongoDB (Running on `localhost:27017`)
- Redis (Running on `localhost:6379`)

## How to Run Locally

### 1. ML Service (FastAPI)
```bash
cd brainbridge-backend/ml_service
python -m venv venv
# Activate venv: `venv\Scripts\activate` on Windows, or `source venv/bin/activate` on Mac/Linux
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 2. Backend API (Node.js)
```bash
cd brainbridge-backend
npm install
npm run dev
```

### 3. Frontend App (Next.js)
```bash
cd brainbridge-frontend
npm install
npm run dev
```

The application will be running at `http://localhost:3000`.
