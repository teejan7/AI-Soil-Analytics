# Task: Load the trained EfficientNetB0 soil classification model

from pathlib import Path
import tensorflow as tf


# Task: Define the path to the trained EfficientNetB0 model
MODEL_PATH = (
    Path(__file__).resolve().parent
    / "models"
    / "efficientnetb0_soil_classifier.keras"
)


# Task: Load the trained soil classification model
soil_classifier_model = tf.keras.models.load_model(
    MODEL_PATH
)


# Task: Confirm that the model was loaded successfully
print("EfficientNetB0 soil classifier loaded successfully.")
print("Model input shape:", soil_classifier_model.input_shape)
print("Model output shape:", soil_classifier_model.output_shape)