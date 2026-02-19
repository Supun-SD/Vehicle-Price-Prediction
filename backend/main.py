from fastapi import FastAPI
from schema import VehicleInput
from predict import predict_price

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Vehicle Price Prediction API"}

@app.post("/predict")
def predict(vehicle: VehicleInput):
    prediction = predict_price(vehicle.dict())
    return {"predicted_price": round(prediction, 2)}
