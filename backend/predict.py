import pandas as pd
import joblib

from datetime import datetime

model = joblib.load("../models/catboost_model.pkl")

def predict_price(data):
    current_year = datetime.now().year
    data["car_age"] = current_year - data["year"]

    input_df = pd.DataFrame([data])
    prediction = model.predict(input_df)
    return float(prediction[0])

