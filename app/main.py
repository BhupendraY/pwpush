from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.routers.auth import router as auth_router
from app.routers.secret import router as secret_router
app = FastAPI(title="PWPH")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(secret_router, prefix="/api/v1")

@app.get("/")
def root():
    
    return {"message": "API Runningssds"}