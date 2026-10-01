"""
BizCalc Backend Server - FastAPI
Premium Business Investment Calculator for Sri Dungargarh Entrepreneurs

Features:
- Serve static frontend files
- API endpoints for authentication, calculations, notifications
- Database integration ready
- Environment-based configuration
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import os
from pathlib import Path
import json
from datetime import datetime
import logging

# ========== LOGGING SETUP ==========
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ========== FASTAPI APP SETUP ==========
app = FastAPI(
    title="BizCalc API",
    description="Business Investment Calculator API",
    version="2.0"
)

# ========== CORS CONFIGURATION ==========
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== DATA MODELS ==========
class SignUpRequest(BaseModel):
    full_name: str
    email: EmailStr
    whatsapp: str
    business_type: str
    password: str
    password_confirm: str
    whatsapp_notif: bool = True
    email_notif: bool = True

class SignInRequest(BaseModel):
    email_or_phone: str
    password: str

class SignInResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
    user_name: Optional[str] = None
    email: Optional[str] = None

class CalculationSaveRequest(BaseModel):
    user_id: str
    business_type: str
    setup_cost: float
    stock_cost: float
    equipment_cost: float
    salary_per_person: float
    operating_costs: float
    total_investment: float
    timestamp: str

class NotificationPrefs(BaseModel):
    user_id: str
    whatsapp: bool
    email: bool
    tips: bool
    features: bool

# ========== STATIC FILES SETUP ==========
# Serve static files from the frontend directory
static_dir = Path(__file__).parent / "frontend"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

# ========== MOCK DATABASE (Replace with real DB) ==========
# In production, use MongoDB or PostgreSQL
MOCK_USERS = {}
MOCK_CALCULATIONS = {}

# ========== HELPER FUNCTIONS ==========
def validate_password(password: str) -> bool:
    """Validate password requirements"""
    return len(password) >= 8

def user_exists(email: str) -> bool:
    """Check if user already exists"""
    return email.lower() in MOCK_USERS

def authenticate_user(email_or_phone: str, password: str) -> Optional[dict]:
    """Authenticate user credentials"""
    user = MOCK_USERS.get(email_or_phone.lower())
    if user and user.get("password") == password:  # In production, use bcrypt!
        return user
    return None

# ========== API ENDPOINTS ==========

# Health Check
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "BizCalc API",
        "version": "2.0",
        "timestamp": datetime.now().isoformat()
    }

# ========== AUTHENTICATION ENDPOINTS ==========

@app.post("/api/auth/signup", response_model=SignInResponse)
async def signup(request: SignUpRequest):
    """
    User registration endpoint

    Request:
    {
        "full_name": "John Doe",
        "email": "john@example.com",
        "whatsapp": "+919876543210",
        "business_type": "kirana",
        "password": "SecurePass123",
        "password_confirm": "SecurePass123",
        "whatsapp_notif": true,
        "email_notif": true
    }
    """
    try:
        # Validate input
        if request.password != request.password_confirm:
            return SignInResponse(
                success=False,
                message="Passwords do not match"
            )

        if not validate_password(request.password):
            return SignInResponse(
                success=False,
                message="Password must be at least 8 characters"
            )

        # Check if user exists
        if user_exists(request.email):
            return SignInResponse(
                success=False,
                message="User already exists with this email"
            )

        # Create user (mock database)
        user_id = f"user_{len(MOCK_USERS) + 1}"
        user_data = {
            "user_id": user_id,
            "full_name": request.full_name,
            "email": request.email.lower(),
            "whatsapp": request.whatsapp,
            "business_type": request.business_type,
            "password": request.password,  # ⚠️ In production, use bcrypt!
            "whatsapp_notif": request.whatsapp_notif,
            "email_notif": request.email_notif,
            "created_at": datetime.now().isoformat(),
            "calculations": []
        }

        MOCK_USERS[request.email.lower()] = user_data

        logger.info(f"New user registered: {request.email}")

        return SignInResponse(
            success=True,
            message="User registered successfully",
            user_id=user_id,
            user_name=request.full_name,
            email=request.email
        )

    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return SignInResponse(
            success=False,
            message=f"Registration failed: {str(e)}"
        )

@app.post("/api/auth/signin", response_model=SignInResponse)
async def signin(request: SignInRequest):
    """
    User login endpoint

    Request:
    {
        "email_or_phone": "john@example.com",
        "password": "SecurePass123"
    }
    """
    try:
        # Authenticate user
        user = authenticate_user(request.email_or_phone, request.password)

        if not user:
            return SignInResponse(
                success=False,
                message="Invalid email/phone or password"
            )

        logger.info(f"User logged in: {user['email']}")

        return SignInResponse(
            success=True,
            message="Login successful",
            user_id=user["user_id"],
            user_name=user["full_name"],
            email=user["email"]
        )

    except Exception as e:
        logger.error(f"Signin error: {str(e)}")
        return SignInResponse(
            success=False,
            message=f"Login failed: {str(e)}"
        )

# ========== CALCULATION ENDPOINTS ==========

@app.post("/api/calculations/save")
async def save_calculation(request: CalculationSaveRequest):
    """
    Save user's calculation

    Request:
    {
        "user_id": "user_1",
        "business_type": "kirana",
        "setup_cost": 300000,
        "stock_cost": 400000,
        "equipment_cost": 100000,
        "salary_per_person": 50000,
        "operating_costs": 50000,
        "total_investment": 900000,
        "timestamp": "2026-10-01T12:00:00"
    }
    """
    try:
        if request.user_id not in MOCK_CALCULATIONS:
            MOCK_CALCULATIONS[request.user_id] = []

        calculation = request.dict()
        calculation["saved_at"] = datetime.now().isoformat()

        MOCK_CALCULATIONS[request.user_id].append(calculation)

        logger.info(f"Calculation saved for user: {request.user_id}")

        return {
            "success": True,
            "message": "Calculation saved successfully",
            "calculation_id": len(MOCK_CALCULATIONS[request.user_id])
        }

    except Exception as e:
        logger.error(f"Save calculation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/calculations/{user_id}")
async def get_calculations(user_id: str, limit: int = 10, skip: int = 0):
    """
    Get user's calculations

    Query params:
    - limit: number of results (default: 10)
    - skip: number to skip for pagination (default: 0)
    """
    try:
        calculations = MOCK_CALCULATIONS.get(user_id, [])

        # Pagination
        paginated = calculations[skip:skip+limit]

        return {
            "success": True,
            "total": len(calculations),
            "returned": len(paginated),
            "calculations": paginated
        }

    except Exception as e:
        logger.error(f"Get calculations error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ========== NOTIFICATION ENDPOINTS ==========

@app.put("/api/users/preferences")
async def update_notification_preferences(request: NotificationPrefs):
    """
    Update user notification preferences

    Request:
    {
        "user_id": "user_1",
        "whatsapp": true,
        "email": false,
        "tips": true,
        "features": true
    }
    """
    try:
        # Find user and update preferences (mock)
        for email, user in MOCK_USERS.items():
            if user["user_id"] == request.user_id:
                user["whatsapp_notif"] = request.whatsapp
                user["email_notif"] = request.email
                user["tips_notif"] = request.tips
                user["features_notif"] = request.features

                logger.info(f"Preferences updated for user: {request.user_id}")

                return {
                    "success": True,
                    "message": "Preferences updated successfully",
                    "preferences": {
                        "whatsapp": request.whatsapp,
                        "email": request.email,
                        "tips": request.tips,
                        "features": request.features
                    }
                }

        raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        logger.error(f"Update preferences error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ========== SERVE FRONTEND ==========

@app.get("/")
async def serve_index():
    """Serve index.html for root path"""
    index_path = Path(__file__).parent / "frontend" / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {"message": "Frontend files not found. Please ensure 'frontend' directory exists."}

@app.get("/{path:path}")
async def serve_static(path: str):
    """Serve all other static files and fallback to index.html for SPA routing"""
    file_path = Path(__file__).parent / "frontend" / path

    # If file exists, serve it
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)

    # Otherwise serve index.html for SPA routing
    index_path = Path(__file__).parent / "frontend" / "index.html"
    if index_path.exists():
        return FileResponse(index_path)

    return {"error": "Not found"}

# ========== ERROR HANDLERS ==========

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "success": False,
        "error": exc.detail,
        "status_code": exc.status_code
    }

# ========== STARTUP/SHUTDOWN ==========

@app.on_event("startup")
async def startup():
    logger.info("🚀 BizCalc API Server Started")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")

@app.on_event("shutdown")
async def shutdown():
    logger.info("🛑 BizCalc API Server Shutdown")

# ========== MAIN ==========
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=os.getenv("ENVIRONMENT") == "development"
    )
