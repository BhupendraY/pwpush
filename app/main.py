from fastapi import FastAPI

app = FastAPI(title="PWPH")

@app.get("/")
def root():
    
    return {"message": "API Runningssds"}