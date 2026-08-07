from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db    
from app.dependencies import get_current_user
from app.core.security import create_access_token, hash_password, verify_password

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def profile(
    current_user=Depends(get_current_user)
):

    return {

        "success": True,

        "data": {

            "id": current_user.id,

            "name": current_user.name,

            "email": current_user.email,

            "mobile": current_user.mobile,

            "role": current_user.role,

            "is_active": current_user.is_active,

            "last_login": current_user.last_login,

            "created_at": current_user.created_at

        }

    }
    
from pydantic import BaseModel, EmailStr

class ProfileUpdate(BaseModel):

    name: str

    email: EmailStr

    mobile: str    


@router.put("/")
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    current_user.name = data.name

    current_user.email = data.email

    current_user.mobile = data.mobile

    db.commit()

    db.refresh(current_user)

    return {

        "success": True,

        "message": "Profile updated successfully"

    }    
    
@router.put("/")
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    current_user.name = data.name

    current_user.email = data.email

    current_user.mobile = data.mobile

    db.commit()

    db.refresh(current_user)

    return {

        "success": True,

        "message": "Profile updated successfully"

    }
    
class ChangePassword(BaseModel):

    old_password: str

    new_password: str
    
@router.post("/change-password")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if not verify_password(
        data.old_password,
        current_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Old password is incorrect"
        )

    current_user.password = hash_password(
        data.new_password
    )

    db.commit()

    return {

        "success": True,

        "message": "Password changed successfully"

    } 