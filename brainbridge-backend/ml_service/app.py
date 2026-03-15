from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random

app = FastAPI(title="BrainBridge ML Service")

class TelemetryFeatures(BaseModel):
    reaction_time_avg: float
    error_rate: float
    math_accuracy: float
    mirror_error_rate: float

class PredictionResult(BaseModel):
    adhd_risk: float
    dyslexia_risk: float
    dyscalculia_risk: float

@app.post("/predict", response_model=PredictionResult)
async def predict(features: TelemetryFeatures):
    """
    Mock ML Prediction for Hackathon purposes.
    Uses simple heuristics overlaid with minor randomization.
    """
    try:
        # ADHD heuristic
        adhd_base = features.error_rate * 0.4 + features.reaction_time_avg * 0.3
        adhd_risk = min(max(adhd_base + random.uniform(-0.1, 0.1), 0.0), 1.0)
        
        # Dyslexia heuristic
        dys_base = features.mirror_error_rate * 0.6 + features.reaction_time_avg * 0.2
        dyslexia_risk = min(max(dys_base + random.uniform(-0.1, 0.1), 0.0), 1.0)
        
        # Dyscalculia heuristic
        disc_base = (1.0 - features.math_accuracy) * 0.7 + features.reaction_time_avg * 0.2
        dyscalculia_risk = min(max(disc_base + random.uniform(-0.1, 0.1), 0.0), 1.0)
        
        return PredictionResult(
            adhd_risk=round(adhd_risk, 2),
            dyslexia_risk=round(dyslexia_risk, 2),
            dyscalculia_risk=round(dyscalculia_risk, 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}
