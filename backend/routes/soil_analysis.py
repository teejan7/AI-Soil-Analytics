# Task: Connect soil analysis API with ML models and recommendation engine

from fastapi import APIRouter

import numpy as np
import xgboost as xgb

from nutrient_model_loader import (
    nutrient_model,
    feature_names,
    nutrient_classes,
)

from crop_model_loader import (
    crop_model,
    scaler_mean,
    scaler_scale,
    scaled_feature_names,
    crop_classes,
)


# Task: Create the soil analysis API router
router = APIRouter(
    prefix="/soil",
    tags=["Soil Analysis"],
)


# Task: Define fertilizer recommendations for nutrient deficiencies
fertilizer_recommendation_rules = {
    "N_Deficiency": {
        "fertilizer_type": "Nitrogen-based fertilizer",
        "recommendation": "Consider nitrogen-based fertilizer according to soil-test and crop requirements.",
    },
    "P_Deficiency": {
        "fertilizer_type": "Phosphorus-based fertilizer",
        "recommendation": "Consider phosphorus-based fertilizer according to soil-test and crop requirements.",
    },
    "K_Deficiency": {
        "fertilizer_type": "Potassium-based fertilizer",
        "recommendation": "Consider potassium-based fertilizer according to soil-test and crop requirements.",
    },
    "Multiple_Deficiency": {
        "fertilizer_type": "Balanced fertilizer",
        "recommendation": "Consider a balanced fertilizer program based on the identified nutrient deficiencies.",
    },
    "No_Deficiency": {
        "fertilizer_type": "No immediate fertilizer requirement",
        "recommendation": "Maintain the current nutrient management practices and monitor soil nutrients regularly.",
    },
}


# Task: Define fertilizer application guidance
fertilizer_application_guidance = {
    "N_Deficiency": {
        "timing": "Apply according to crop growth stage.",
        "method": "Apply nitrogen fertilizer as recommended for the crop.",
        "precaution": "Avoid excessive nitrogen application.",
    },
    "P_Deficiency": {
        "timing": "Apply during soil preparation or as recommended for the crop.",
        "method": "Apply phosphorus fertilizer near the root zone.",
        "precaution": "Follow the recommended application rate.",
    },
    "K_Deficiency": {
        "timing": "Apply according to crop growth stage.",
        "method": "Apply potassium fertilizer according to soil-test recommendations.",
        "precaution": "Avoid excessive fertilizer application.",
    },
    "Multiple_Deficiency": {
        "timing": "Apply according to crop requirements.",
        "method": "Use a balanced nutrient management approach.",
        "precaution": "Follow soil-test-based fertilizer recommendations.",
    },
    "No_Deficiency": {
        "timing": "No immediate application required.",
        "method": "Continue regular soil monitoring.",
        "precaution": "Avoid unnecessary fertilizer application.",
    },
}


# Task: Define soil management recommendations
def get_management_recommendation(deficiency_category):

    if deficiency_category == "N_Deficiency":
        return [
            "Improve nitrogen availability through appropriate fertilizer application.",
            "Monitor nitrogen levels regularly.",
            "Maintain suitable soil organic matter.",
        ]

    if deficiency_category == "P_Deficiency":
        return [
            "Improve phosphorus availability through appropriate fertilizer application.",
            "Monitor phosphorus levels regularly.",
            "Maintain suitable soil pH.",
        ]

    if deficiency_category == "K_Deficiency":
        return [
            "Improve potassium availability through appropriate fertilizer application.",
            "Monitor potassium levels regularly.",
            "Maintain suitable soil pH.",
        ]

    if deficiency_category == "Multiple_Deficiency":
        return [
            "Follow a balanced nutrient management program.",
            "Monitor soil nutrients regularly.",
            "Improve organic matter when required.",
            "Follow soil-test-based fertilizer recommendations.",
        ]

    return [
        "Maintain suitable soil pH.",
        "Improve organic matter when required.",
        "Monitor soil nutrients regularly.",
        "Avoid unnecessary fertilizer application.",
    ]


# Task: Calculate a project-defined soil health score
def calculate_soil_health_score(
    nitrogen,
    phosphorus,
    potassium,
    ph,
    moisture,
    organic_matter,
    crop_confidence,
    deficiency_category,
):

    # Task: Calculate nutrient score
    nutrient_score = 100

    if deficiency_category == "N_Deficiency":
        nutrient_score = 70
    elif deficiency_category == "P_Deficiency":
        nutrient_score = 70
    elif deficiency_category == "K_Deficiency":
        nutrient_score = 70
    elif deficiency_category == "Multiple_Deficiency":
        nutrient_score = 50

    # Task: Calculate pH score
    if 6.0 <= ph <= 7.5:
        ph_score = 100
    elif 5.5 <= ph < 6.0 or 7.5 < ph <= 8.0:
        ph_score = 80
    else:
        ph_score = 60

    # Task: Calculate moisture score
    if 40 <= moisture <= 80:
        moisture_score = 100
    elif 30 <= moisture < 40 or 80 < moisture <= 90:
        moisture_score = 80
    else:
        moisture_score = 60

    # Task: Calculate organic matter score
    if organic_matter >= 50:
        organic_matter_score = 100
    elif organic_matter >= 30:
        organic_matter_score = 80
    else:
        organic_matter_score = 60

    # Task: Calculate final project-defined score
    health_score = (
        nutrient_score * 0.30
        + ph_score * 0.20
        + organic_matter_score * 0.20
        + moisture_score * 0.15
        + crop_confidence * 0.15
    )

    return round(health_score)


# Task: Convert soil health score into a status
def get_soil_health_status(score):

    if score >= 80:
        return "Good"

    if score >= 60:
        return "Moderate"

    return "Needs Improvement"


# Task: Analyze soil parameters using trained ML models
@router.post("/analyze")
def analyze_soil(soil_data: dict):

    # Task: Read submitted soil parameters
    nitrogen = soil_data.get("nitrogen")
    phosphorus = soil_data.get("phosphorus")
    potassium = soil_data.get("potassium")
    ph = soil_data.get("ph")
    moisture = soil_data.get("moisture")
    organic_matter = soil_data.get("organic_matter")

    # Task: Read optional crop model parameters
    temperature = soil_data.get("temperature", 25)
    rainfall = soil_data.get("rainfall", 200)

    # Task: Prepare input for nutrient deficiency model
    nutrient_input = np.array(
        [[
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            moisture,
            ph,
            rainfall,
        ]],
        dtype=float,
    )

    # Task: Create nutrient prediction matrix
    nutrient_matrix = xgb.DMatrix(
        nutrient_input,
        feature_names=feature_names,
    )

    # Task: Predict nutrient deficiency
    nutrient_prediction = nutrient_model.predict(
        nutrient_matrix
    )

    # Task: Get nutrient deficiency class
    nutrient_class_index = int(
        np.argmax(nutrient_prediction, axis=1)[0]
    )

    # Task: Convert nutrient class to category
    deficiency_category = nutrient_classes[
        nutrient_class_index
    ]

    # Task: Prepare input for crop recommendation model
    crop_input = np.array(
        [[
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            moisture,
            ph,
            rainfall,
        ]],
        dtype=float,
    )

    # Task: Apply exact crop model scaling
    crop_scaled = (
        crop_input - scaler_mean
    ) / scaler_scale

    # Task: Create crop prediction matrix
    crop_matrix = xgb.DMatrix(
        crop_scaled,
        feature_names=scaled_feature_names,
    )

    # Task: Predict recommended crop
    crop_prediction = crop_model.predict(
        crop_matrix
    )

    # Task: Get recommended crop class
    crop_class_index = int(
        np.argmax(crop_prediction, axis=1)[0]
    )

    # Task: Convert class index to crop name
    recommended_crop = crop_classes[
        crop_class_index
    ]

    # Task: Calculate crop confidence
    crop_confidence = (
        float(
            crop_prediction[
                0
            ][crop_class_index]
        ) * 100
    )

    # Task: Generate fertilizer recommendation
    fertilizer = fertilizer_recommendation_rules[
        deficiency_category
    ]

    # Task: Generate fertilizer application guidance
    guidance = fertilizer_application_guidance[
        deficiency_category
    ]

    # Task: Generate soil management recommendations
    management = get_management_recommendation(
        deficiency_category
    )

    # Task: Calculate soil health score
    soil_health_score = calculate_soil_health_score(
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        organic_matter,
        crop_confidence,
        deficiency_category,
    )

    # Task: Get soil health status
    soil_health_status = get_soil_health_status(
        soil_health_score
    )

    # Task: Return complete soil analysis result
    return {
        "success": True,
        "message": "Soil analysis completed successfully.",

        "soil_data": {
            "nitrogen": nitrogen,
            "phosphorus": phosphorus,
            "potassium": potassium,
            "ph": ph,
            "moisture": moisture,
            "organic_matter": organic_matter,
        },

        "nutrient_analysis": {
            "deficiency_category": deficiency_category,
        },

        "crop_recommendation": {
            "crop": recommended_crop,
            "confidence": round(
                crop_confidence,
                2,
            ),
        },

        "soil_health": {
            "score": soil_health_score,
            "status": soil_health_status,
        },

        "fertilizer_recommendation": {
            "fertilizer_type": fertilizer[
                "fertilizer_type"
            ],
            "recommendation": fertilizer[
                "recommendation"
            ],
            "timing": guidance[
                "timing"
            ],
            "method": guidance[
                "method"
            ],
            "precaution": guidance[
                "precaution"
            ],
        },

        "soil_management": management,
    }