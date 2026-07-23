from pydantic import BaseModel, Field


class SecretCreate(BaseModel):
    secret: str = Field(..., min_length=1)

    views: int = Field(
        default=1,
        ge=1,
        le=100
    )

    expire_hours: int = Field(
        default=24,
        ge=1,
        le=720
    )

    password: str | None = None


class SecretViewRequest(BaseModel):
    password: str | None = Field(default=None, min_length=1, max_length=128)


class SecretViewResponse(BaseModel):
    success: bool = True
    secret: str
    views_remaining: int
    is_deleted: bool
    expires_at: str