# Task: Define the User database model for SoilCare authentication

from sqlalchemy import Boolean, Column, Integer, String

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    farm_location = Column(String(255), nullable=True)
    language = Column(String(20), default="English")
    voice_output = Column(Boolean, default=True)
    notifications = Column(Boolean, default=True)