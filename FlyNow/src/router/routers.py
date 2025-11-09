from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, timedelta


from src.database import get_db
from src.database import User, Flights, FlightSchedules
from src.database import UserCreate, UserLogin, FlightSearch

router = APIRouter()


@router.get("/")
def home():

    return {"meesage": "test123"}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user.id).first()
    if not db_user or db_user.password != user.password:
        return {"code": 0, "message": "Login Fail", "user_id": db_user.id}

    return {"code": 1, "message": "Login successful", "user_id": db_user.id}

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@router.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.id == user.id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2️⃣ 새 유저 객체 생성
    new_user = User(
        id = user.id,
        password=user.password,
        name=user.name,
        gender=user.gender,
        age=user.age,
        email=user.email,
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 4️⃣ 결과 반환
    return {"message": "User created successfully", "user_id": new_user.id}


@router.get("/flight_schedule")
def search_flights(  origin: str = Query(...),
    destination: str = Query(...),
    depart_date: str = Query(...),
    arrival_date: str = Query(...),
    db: Session = Depends(get_db)):
    try:
        # ✅ "MM-DD-YYYY" 포맷으로 파싱
        date_only = datetime.strptime(depart_date, "%m-%d-%Y")
        start_of_day = date_only
        end_of_day = date_only + timedelta(days=1)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use MM-DD-YYYY, e.g. 12-25-2025")

        # ✅ 날짜 범위 필터링
    out_results = (
        db.query(Flights.flight_num,
                 Flights.airline,
                 Flights.origin,
                 Flights.destination,
                 FlightSchedules.depart_time,
                 FlightSchedules.arrival_time,
                 FlightSchedules.status)
        .join(FlightSchedules, Flights.flight_num == FlightSchedules.flight_num)
        .filter(
            and_(
                Flights.origin == origin,
                Flights.destination == destination,
                FlightSchedules.depart_time >= start_of_day,
                FlightSchedules.depart_time < end_of_day
            )
        )
        .all()
    )

    return_result = (
        db.query(Flights.flight_num,
                 Flights.airline,
                 Flights.origin,
                 Flights.destination,
                 FlightSchedules.depart_time,
                 FlightSchedules.arrival_time,
                 FlightSchedules.status)
        .join(FlightSchedules, Flights.flight_num == FlightSchedules.flight_num)
        .filter(
            and_(
                Flights.origin == destination,
                Flights.destination == origin,
                FlightSchedules.depart_time >= start_of_day,
                FlightSchedules.depart_time < end_of_day
            )
        )
        .all()
    )



    # ✅ datetime → ISO string 변환
    return {
        "outbound":[
            {
                "flight_num": r.flight_num,
                "airline": r.airline,
                "origin": r.origin,
                "destination": r.destination,
                "depart_time": r.depart_time.isoformat(),
                "arrival_time": r.arrival_time.isoformat(),
                "status": r.status
            }
            for r in out_results
        ]
        ,
        "return": [
            {
                "flight_num": r.flight_num,
                "airline": r.airline,
                "origin": r.origin,
                "destination": r.destination,
                "depart_time": r.depart_time.isoformat(),
                "arrival_time": r.arrival_time.isoformat(),
                "status": r.status
            }
            for r in return_result
        ]

    }