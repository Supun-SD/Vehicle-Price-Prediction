from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import VehicleInput
from predict import predict_price

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Vehicle Price Prediction API"}

@app.post("/predict")
def predict(vehicle: VehicleInput):
    prediction = predict_price(vehicle.dict())
    return {"predicted_price": round(prediction, 2)}
