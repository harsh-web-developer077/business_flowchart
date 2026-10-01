from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import os
from pathlib import Path

app = FastAPI(title="BizCalc API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "BizCalc API",
        "version": "2.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/")
def root():
    return {"message": "BizCalc API is running"}

frontend_path = Path(__file__).parent / "frontend"
if frontend_path.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_path)), name="static")

print("🚀 App loaded successfully")
