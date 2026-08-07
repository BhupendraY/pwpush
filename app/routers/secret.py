from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.secret import Secret
from app.schemas.secret import SecretCreate, SecretViewRequest, SecretViewResponse
from app.utils.token import generate_token
from app.services.crypto_service import encrypt_secret, decrypt_secret
from app.dependencies import get_current_user
from app.core.security import hash_password, verify_password

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
    password_hash = hash_password(data.password) if data.password else None

    expires = datetime.utcnow() + timedelta(
        hours=data.expire_hours
    )

    secret = Secret(
        user_id=current_user.id,
        token=token,
        encrypted_secret=encrypted,
        password_hash=password_hash,
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
        "url": f"/api/v1/secrets/s/{token}"
    }


@router.post("/s/{token}", response_model=SecretViewResponse)
def view_secret(
    token: str,
    payload: SecretViewRequest,
    db: Session = Depends(get_db)
):
    secret = db.query(Secret).filter(
        Secret.token == token,
        Secret.is_deleted == False
    ).first()

    if not secret:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Secret not found"
        )

    if secret.expires_at <= datetime.utcnow():
        secret.is_deleted = True
        db.add(secret)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail="Secret expired"
        )

    if secret.views_remaining <= 0:
        secret.is_deleted = True
        db.add(secret)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail="Secret no longer available"
        )

    if secret.password_hash:
        if not payload.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password is required for this secret"
            )

        if not verify_password(payload.password, secret.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid secret password"
            )

    try:
        decrypted_secret = decrypt_secret(secret.encrypted_secret)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to decrypt secret"
        )

    secret.views_remaining -= 1
    if secret.views_remaining <= 0:
        secret.views_remaining = 0
        secret.is_deleted = True

    db.add(secret)
    db.commit()

    return {
        "success": True,
        "secret": decrypted_secret,
        "views_remaining": secret.views_remaining,
        "is_deleted": secret.is_deleted,
        "expires_at": secret.expires_at.isoformat()
    }
    
    from datetime import datetime

@router.get("/")
def my_secrets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    now = datetime.utcnow()

    secrets = (
        db.query(Secret)
        .filter(
            Secret.user_id == current_user.id
        )
        .order_by(Secret.created_at.desc())
        .all()
    )

    data = []

    for item in secrets:

        if item.is_deleted:
            status = "Deleted"

        elif item.expires_at <= now:
            status = "Expired"

        else:
            status = "Active"

        data.append({

            "id": item.id,

            "token": item.token,

            "views_remaining": item.views_remaining,

            "expires_at": item.expires_at,

            "created_at": item.created_at,

            "status": status,

            "share_url": f"http://localhost:5173/s/{item.token}"

        })

    return {

        "success": True,

        "total": len(data),

        "data": data

    }

