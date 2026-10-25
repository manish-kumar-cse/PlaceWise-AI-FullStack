
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "placement_model.pkl"
FEATURES_PATH = BASE_DIR / "placement_features.pkl"

model = joblib.load(MODEL_PATH)
features = joblib.load(FEATURES_PATH)

app = FastAPI(title="PlaceWise AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudentData(BaseModel):
    CGPA: float = Field(ge=0, le=10)
    Internships: int = Field(ge=0)
    Projects: int = Field(ge=0)
    Workshops_Certifications: int = Field(ge=0)
    AptitudeTestScore: float = Field(ge=0, le=100)
    SoftSkillsRating: float = Field(ge=0, le=5)
    ExtracurricularActivities: int = Field(ge=0, le=1)
    PlacementTraining: int = Field(ge=0, le=1)
    SSC_Marks: float = Field(ge=0, le=100)
    HSC_Marks: float = Field(ge=0, le=100)


@app.get("/")
def home():
    return {"message": "PlaceWise AI API is running!"}


@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": model is not None}


@app.post("/predict")
def predict(student: StudentData):
    values = student.model_dump()

    values["Workshops/Certifications"] = values.pop(
        "Workshops_Certifications"
    )

    input_data = pd.DataFrame(
        [[values[name] for name in features]],
        columns=features,
    )

    prediction = model.predict(input_data)[0]

    result = (
        str(prediction)
        if not hasattr(prediction, "item")
        else str(prediction.item())
    )

    response = {"prediction": result}

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(input_data)[0]
        response["probability"] = round(
            float(max(probabilities)) * 100, 2
        )

    return response
