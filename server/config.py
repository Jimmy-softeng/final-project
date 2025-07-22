import os
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret')
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Use environment variable, or fallback to a file in /instance/
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
