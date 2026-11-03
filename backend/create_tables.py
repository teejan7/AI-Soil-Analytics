"""Create the SoilCare database tables from the SQLAlchemy models."""

import logging

from database import Base, engine
from models import User

Base.metadata.create_all(bind=engine)

logging.getLogger(__name__).info("Database tables created successfully")
