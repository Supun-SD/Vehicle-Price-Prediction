# 🚗 Vehicle Price Prediction System (Sri Lanka)

This project presents a complete Machine Learning pipeline for predicting vehicle prices in Sri Lanka.  
It includes data collection, preprocessing, model training, explainability, backend API deployment, frontend integration, and Docker containerization.

---

## 📌 Project Overview

The objective of this project is to:

- Collect a real-world Sri Lankan dataset
- Train a Machine Learning model to predict vehicle prices
- Apply explainability techniques (SHAP, PDP, Feature Importance)
- Deploy the model using FastAPI
- Integrate with a frontend interface
- Containerize the system using Docker

---

## 📊 Dataset

- Source: Web scraped from Sri Lankan vehicle marketplaces
- Total Records: 10000+ listings
- Features:
  - Brand
  - Model
  - Year
  - Condition
  - Transmission
  - Body Type
  - Fuel Type
  - Engine Capacity (cc)
  - Mileage (km)

Target Variable:

- Price (LKR)

---

## 🤖 Machine Learning Model

Algorithm Used:

- **CatBoost Regressor**

Reason for Selection:

- Handles categorical features efficiently
- Strong performance on tabular datasets
- Robust to overfitting

Performance Metrics:

| Metric | Value      |
|--------|------------|
| MAE    | ~1.64M LKR |
| RMSE   | ~3.56M LKR |
| R²     | ~0.95      |

The model explains approximately 95% of the variance in vehicle prices.

---

## 🔎 Explainability

Explainability techniques used:

- SHAP (SHapley Additive Explanations)
- Feature Importance Analysis
- Partial Dependence Plots (PDP)

Key Findings:

- Brand and model strongly influence price.
- Vehicle age negatively impacts price.
- Lower mileage increases predicted value.
- Engine capacity contributes positively to price.

Model behavior aligns with domain knowledge of the Sri Lankan vehicle market.

---

## 🐳 Running with Docker (Recommended)

### Step 1: Install Docker & Docker Compose

Verify installation: docker --version docker-compose --version

### Step 2: Build and Run

From project root: docker-compose up --build

### Step 3: Access Application

Frontend: <http://localhost:3000>

Backend API Docs: <http://localhost:8000/docs>

### Step 4: Stop Containers

docker-compose down

---

## 🖥 Running Without Docker

### Backend

cd backend pip install -r requirements.txt uvicorn main:app --reload

Backend runs at: <http://127.0.0.1:8000>

### Frontend

cd frontend python -m http.server 5500

Open: <http://localhost:5500>

---

## 👨‍💻 Author

Supun IT Undergraduate -- University of Moratuwa
