# Task: Load the crop recommendation model without scikit-learn

from pathlib import Path
import json

import numpy as np
import xgboost as xgb


# Task: Define the backend model directory
MODEL_DIR = Path(__file__).resolve().parent / "models"


# Task: Define model and configuration paths
CROP_MODEL_PATH = MODEL_DIR / "xgboost_crop_recommendation_model.json"
SCALER_PATH = MODEL_DIR / "crop_recommendation_scaler.json"
CLASSES_PATH = MODEL_DIR / "crop_recommendation_classes.json"


# Task: Load the native XGBoost crop model
crop_model = xgb.Booster()
crop_model.load_model(CROP_MODEL_PATH)


# Task: Load the scaler parameters from JSON
with open(SCALER_PATH, "r") as file:
    scaler_data = json.load(file)


# Task: Convert scaler parameters to NumPy arrays
scaler_mean = np.array(scaler_data["mean"], dtype=float)
scaler_scale = np.array(scaler_data["scale"], dtype=float)


# Task: Load the exact crop class mapping
with open(CLASSES_PATH, "r") as file:
    crop_classes = json.load(file)


# Task: Define the exact scaled feature names expected by XGBoost
scaled_feature_names = [
    "N_scaled",
    "P_scaled",
    "K_scaled",
    "temperature_scaled",
    "humidity_scaled",
    "ph_scaled",
    "rainfall_scaled",
]


# Task: Create a sample soil and environmental input
sample = np.array([[
    80,
    45,
    40,
    25,
    82,
    6.5,
    220
]], dtype=float)


# Task: Apply the same StandardScaler transformation used during training
scaled_sample = (sample - scaler_mean) / scaler_scale


# Task: Create the XGBoost input matrix
sample_matrix = xgb.DMatrix(
    scaled_sample,
    feature_names=scaled_feature_names
)


# Task: Generate crop prediction probabilities
prediction = crop_model.predict(sample_matrix)


# Task: Find the predicted crop class
predicted_class = int(np.argmax(prediction, axis=1)[0])


# Task: Convert the class index into the crop name
predicted_crop = crop_classes[predicted_class]


# Task: Calculate prediction confidence
confidence = float(prediction[0][predicted_class]) * 100


# Task: Display the final result
print("Crop recommendation model loaded successfully.")
print("Predicted crop:", predicted_crop)
print(f"Confidence: {confidence:.2f}%")
print("Predicted class index:", predicted_class)