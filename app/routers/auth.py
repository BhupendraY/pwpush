from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.database.database import SessionLocal
from app.models.user import User
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User)
        .filter(or_(User.email == payload.email, User.mobile == payload.mobile))
        .first()
    )

    if existing_user:
        if existing_user.email == payload.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mobile already registered",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        mobile=payload.mobile,
        password=hash_password(payload.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return AuthResponse(access_token=access_token, user=UserOut.model_validate(user))


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    user.last_login = datetime.utcnow()
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return AuthResponse(access_token=access_token, user=UserOut.model_validate(user))
