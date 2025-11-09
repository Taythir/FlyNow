
from src.config import Config

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

config = Config()

db_ip = config.get_db_ip()
db_port = config.get_db_port()
db_id = config.get_db_id()
db_password = config.get_db_password()
db_name = config.get_db_name()

DATABASE_URL = f"postgresql+psycopg2://{db_id}:{db_password}@{db_ip}:{db_port}/{db_name}"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
