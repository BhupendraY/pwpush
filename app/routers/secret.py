from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.secret import Secret
from app.schemas.secret import SecretCreate
from app.utils.token import generate_token
from app.services.crypto_service import encrypt_secret
from app.dependencies import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from app.services.crypto_service import encrypt_secret, decrypt_secret

router = APIRouter(
    prefix="/secrets",
    tags=["Secrets"]
)


@router.post("/")
def create_secret(
    data: SecretCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    token = generate_token()

    encrypted = encrypt_secret(data.secret)

    expires = datetime.utcnow() + timedelta(
        hours=data.expire_hours
    )

    secret = Secret(
        user_id=current_user.id,
        token=token,
        encrypted_secret=encrypted,
        views_remaining=data.views,
        expires_at=expires
    )

    db.add(secret)
    db.commit()
    db.refresh(secret)

    return {
        "success": True,
        "message": "Secret Created",
        "token": token,
        "url": f"/s/{token}"
    }

@router.get("/s/{token}")
def view_secret(
    token: str,
    db: Session = Depends(get_db)
):
    secret = db.query(Secret).filter(
        Secret.token == token,
        Secret.is_deleted == False
    ).first()

    if not secret:
        raise HTTPException(
            status_code=404,
            detail="Secret not found"
        )

    return {
        "success": True,
        "secret": decrypt_secret(secret.encrypted_secret)
    }

