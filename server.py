from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
import os
from datetime import datetime
from pathlib import Path

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8000")

# Initialize FastAPI
app = FastAPI(
    title="BizCalc API",
    description="Business Investment Calculator API",
    version="2.0"
)

# CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ PYDANTIC MODELS ============

class SignUpRequest(BaseModel):
    full_name: str
    email: EmailStr
    whatsapp: str
    business_type: str
    password: str
    password_confirm: str
    whatsapp_notif: bool = True
    email_notif: bool = True

    @validator('full_name')
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        return v

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

    @validator('password_confirm')
    def validate_password_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


class CalculationSaveRequest(BaseModel):
    user_id: str
    business_type: str
    investment_amount: float
    timeline_months: int
    calculation_data: dict


class UserPreferences(BaseModel):
    user_id: str
    whatsapp_notif: bool = True
    email_notif: bool = True


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str


# ============ MOCK DATABASE ============

users_db = {}
calculations_db = {}

# ============ API ENDPOINTS ============

@app.post("/api/auth/signup")
async def sign_up(request: SignUpRequest):
    """Register a new user"""
    if request.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = f"user_{len(users_db) + 1}"
    users_db[request.email] = {
        "user_id": user_id,
        "full_name": request.full_name,
        "email": request.email,
        "whatsapp": request.whatsapp,
        "business_type": request.business_type,
        "password": request.password,  # TODO: Hash this with bcrypt
        "whatsapp_notif": request.whatsapp_notif,
        "email_notif": request.email_notif,
        "created_at": datetime.now().isoformat()
    }

    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": user_id,
        "user_name": request.full_name,
        "email": request.email
    }


@app.post("/api/auth/signin")
async def sign_in(request: SignInRequest):
    """Login user"""
    user = users_db.get(request.email)

    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "success": True,
        "message": "Login successful",
        "user_id": user["user_id"],
        "user_name": user["full_name"],
        "email": user["email"]
    }


@app.post("/api/calculations/save")
async def save_calculation(request: CalculationSaveRequest):
    """Save a calculation"""
    calc_id = f"calc_{len(calculations_db) + 1}"

    calculations_db[calc_id] = {
        "calc_id": calc_id,
        "user_id": request.user_id,
        "business_type": request.business_type,
        "investment_amount": request.investment_amount,
        "timeline_months": request.timeline_months,
        "calculation_data": request.calculation_data,
        "created_at": datetime.now().isoformat()
    }

    return {
        "success": True,
        "message": "Calculation saved",
        "calc_id": calc_id
    }


@app.get("/api/calculations/{user_id}")
async def get_calculations(user_id: str):
    """Get all calculations for a user"""
    user_calcs = [c for c in calculations_db.values() if c["user_id"] == user_id]

    return {
        "success": True,
        "user_id": user_id,
        "calculations": user_calcs
    }


@app.put("/api/users/preferences")
async def update_preferences(request: UserPreferences):
    """Update user notification preferences"""
    for email, user in users_db.items():
        if user["user_id"] == request.user_id:
            user["whatsapp_notif"] = request.whatsapp_notif
            user["email_notif"] = request.email_notif
            return {
                "success": True,
                "message": "Preferences updated"
            }

    raise HTTPException(status_code=404, detail="User not found")


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="ok",
        service="BizCalc API",
        version="2.0",
        timestamp=datetime.now().isoformat()
    )


# ============ SERVE FRONTEND ============

# Mount frontend folder
frontend_path = Path(__file__).parent / "frontend"

if frontend_path.exists():
    app.mount("/", StaticFiles(directory=str(frontend_path), html=True), name="frontend")
else:
    @app.get("/")
    async def root():
        return {
            "message": "BizCalc API running",
            "docs": "/docs",
            "health": "/api/health"
        }


# ============ STARTUP ============

@app.on_event("startup")
async def startup():
    print("🚀 BizCalc API Server Started")
    print(f"Environment: {ENVIRONMENT}")
    print(f"Frontend URL: {FRONTEND_URL}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=DEBUG
    )
