import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies import get_current_user
from app.models.text_share import TextShare
from app.services.crypto_service import decrypt_secret, encrypt_secret

router = APIRouter(prefix="/text-shares", tags=["Text Shares"])


class TextShareCreate(BaseModel):
    content: str = Field(min_length=1, max_length=50000)


class TextShareReceive(BaseModel):
    code: str = Field(pattern=r"^\d{4}$")


def generate_code() -> str:
    return f"{secrets.randbelow(10000):04d}"


@router.post("/", status_code=status.HTTP_201_CREATED)
def share_text(
    payload: TextShareCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # A code is unique while it is active; receiver consumes it after one use.
    for _ in range(20):
        code = generate_code()
        share = TextShare(
            user_id=current_user.id,
            code=code,
            encrypted_content=encrypt_secret(payload.content),
        )
        db.add(share)
        try:
            db.commit()
            return {"success": True, "code": code, "message": "Code generated successfully"}
        except IntegrityError:
            db.rollback()

    raise HTTPException(status_code=503, detail="Unable to generate a code. Please try again.")


@router.post("/receive")
def receive_text(
    payload: TextShareReceive,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    share = db.query(TextShare).filter(TextShare.code == payload.code).first()
    if not share:
        raise HTTPException(status_code=404, detail="Code is invalid or has already been used")

    try:
        content = decrypt_secret(share.encrypted_content)
    except Exception:
        raise HTTPException(status_code=500, detail="Unable to read shared text")

    db.delete(share)
    db.commit()
    return {"success": True, "content": content, "message": "Text received successfully"}
