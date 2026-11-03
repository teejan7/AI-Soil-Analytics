# Task: Define request schemas for SoilCare authentication

from pydantic import BaseModel, EmailStr


# Task: Define the user registration request schema
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


# Task: Define the user login request schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str