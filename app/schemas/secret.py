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