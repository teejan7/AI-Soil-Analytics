# Task: Create the SoilCare registration and login authentication APIs

from fastapi import APIRouter, Depends, HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserRegister, UserLogin


# Task: Create the authentication API router
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# Task: Configure bcrypt password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


# Task: Register a new SoilCare user
@router.post("/register")
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    # Task: Check whether the email is already registered
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email is already registered.",
        )

    # Task: Hash the user's password before storing it
    password_hash = pwd_context.hash(user_data.password)

    # Task: Create the new user database record
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash,
    )

    # Task: Save the new user to PostgreSQL
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Task: Return successful registration response
    return {
        "success": True,
        "message": "Account created successfully.",
        "user_id": new_user.id,
    }


# Task: Create the SoilCare user login API
@router.post("/login")
def login_user(
    user_data: UserLogin,
    db: Session = Depends(get_db),
):
    # Task: Find the registered user by email
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    # Task: Check whether the email exists
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # Task: Verify the entered password against the stored bcrypt hash
    password_valid = pwd_context.verify(
        user_data.password,
        user.password_hash,
    )

    # Task: Reject an incorrect password
    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # Task: Return successful login information
    return {
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }