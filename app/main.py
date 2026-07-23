from fastapi import FastAPI

from app.database.database import Base, engine
from app.routers.auth import router as auth_router

app = FastAPI(title="PWPH")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/api/v1")

@app.get("/")
def root():
    
    return {"message": "API Runningssds"}