# Task: Load and test the nutrient deficiency XGBoost model with class labels

from pathlib import Path
import json

import numpy as np
import xgboost as xgb


# Task: Define the backend model directory
MODEL_DIR = Path(__file__).resolve().parent / "models"


# Task: Define the trained XGBoost model path
NUTRIENT_MODEL_PATH = (
    MODEL_DIR / "xgboost_nutrient_deficiency_model_tuned.json"
)


# Task: Define the nutrient deficiency class mapping path
CLASS_MAPPING_PATH = (
    MODEL_DIR / "nutrient_deficiency_classes.json"
)


# Task: Create the native XGBoost Booster
nutrient_model = xgb.Booster()


# Task: Load the trained nutrient deficiency model
nutrient_model.load_model(NUTRIENT_MODEL_PATH)


# Task: Load the exact class order
with open(CLASS_MAPPING_PATH, "r") as file:
    nutrient_classes = json.load(file)


# Task: Display model and class mapping confirmation
print("Nutrient deficiency XGBoost model loaded successfully.")
print("Model type:", type(nutrient_model))
print("Class mapping:", nutrient_classes)


# Task: Define the feature names used during model training
feature_names = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
]


# Task: Create a sample using the required feature order
sample = np.array([[
    0.5,
    0.2,
    -0.1,
    0.3,
    0.8,
    0.1,
    0.6
]])


# Task: Convert the sample into an XGBoost DMatrix
sample_matrix = xgb.DMatrix(
    sample,
    feature_names=feature_names
)


# Task: Generate nutrient deficiency prediction probabilities
prediction = nutrient_model.predict(sample_matrix)


# Task: Determine the predicted class index
predicted_class = np.argmax(prediction, axis=1)[0]


# Task: Convert the class index into the deficiency category
predicted_category = nutrient_classes[predicted_class]


# Task: Display prediction results
print("Prediction probabilities:", prediction)
print("Predicted class index:", predicted_class)
print("Predicted deficiency category:", predicted_category)