from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies import get_current_user
from app.models.secret import Secret

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    now = datetime.utcnow()

    total = db.query(Secret).filter(
        Secret.user_id == current_user.id
    ).count()

    active = db.query(Secret).filter(
        Secret.user_id == current_user.id,
        Secret.is_deleted == False,
        Secret.expires_at > now
    ).count()

    expired = db.query(Secret).filter(
        Secret.user_id == current_user.id,
        Secret.expires_at <= now
    ).count()

    deleted = db.query(Secret).filter(
        Secret.user_id == current_user.id,
        Secret.is_deleted == True
    ).count()

    recent = (
        db.query(Secret)
        .filter(Secret.user_id == current_user.id)
        .order_by(Secret.created_at.desc())
        .limit(10)
        .all()
    )

    recent_data = []

    for item in recent:

        if item.is_deleted:
            status = "Deleted"

        elif item.expires_at <= now:
            status = "Expired"

        else:
            status = "Active"

        recent_data.append({

            "id": item.id,

            "token": item.token,

            "views_remaining": item.views_remaining,

            "expires_at": item.expires_at,

            "status": status

        })

    return {

        "success": True,

        "user": {

            "id": current_user.id,

            "name": current_user.name

        },

        "stats": {

            "total": total,

            "active": active,

            "expired": expired,

            "deleted": deleted

        },

        "recent_secrets": recent_data

    }