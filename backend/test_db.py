# Task: Test the FastAPI connection to the PostgreSQL database

from sqlalchemy import text

from database import engine


try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    print("PostgreSQL connection successful!")

except Exception as error:
    print("PostgreSQL connection failed.")
    print(error)