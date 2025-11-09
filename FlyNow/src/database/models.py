
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from src.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    gender = Column(String(10), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)


class Flights(Base):
    __tablename__ = 'flights'

    flight_num = Column(String(10), primary_key=True)
    airline = Column(String(50), nullable=False)
    destination = Column(String(50), nullable=False)
    origin = Column(String(50), nullable=False)

class FlightSchedules(Base):
    __tablename__ = 'flight_schedules'

    schedule_id = Column(Integer, primary_key=True, autoincrement=True)
    flight_num = Column(String(10), ForeignKey("flights.flight_num"), nullable=False)
    depart_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    status = Column(String(20), nullable=False)