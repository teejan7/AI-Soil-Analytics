"""FastAPI application entry point."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Task: Import the authentication API router
from routes.auth import router as auth_router

# Task: Import the soil analysis API router
from routes.soil_analysis import router as soil_analysis_router


# Task: Create the main FastAPI application
app = FastAPI(
    title="AI Soil Analytics API",
    description="Backend API for the AI-Powered Soil Analytics System",
    version="1.0.0",
)


cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]

# Task: Configure CORS so the Next.js frontend can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Task: Register the authentication routes
app.include_router(auth_router)


# Task: Register the soil analysis routes
app.include_router(soil_analysis_router)


# Task: Create the API home endpoint
@app.get("/")
def home():
    return {
        "message": "AI Soil Analytics API is running"
    }


# Task: Create the API health-check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# Task: Create an endpoint to test Next.js and FastAPI communication
@app.get("/api/test")
def test_api():
    return {
        "success": True,
        "message": "Next.js can communicate with FastAPI"
    }
