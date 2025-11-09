

from src.database import SessionLocal, engine, Base
from src.database import User

from src.router import routers

from fastapi import FastAPI


app = FastAPI()

app.include_router(routers.router)