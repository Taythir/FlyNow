
from pydantic import BaseModel


class UserLogin(BaseModel):
    id: str
    password: str

class UserCreate(BaseModel):
    id: str
    password: str
    name: str
    gender: str
    age: int
    email: str
    phone: str


class FlightSearch(BaseModel):
    origin: str
    destination: str
    departure_time: str
    arrival_time: str