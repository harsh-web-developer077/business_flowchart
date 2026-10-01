from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime
import os
from pathlib import Path

app = FastAPI(title="BizCalc API", version="2.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ MODELS ============

class SignUpRequest(BaseModel):
    full_name: str
    email: str
    whatsapp: str
    business_type: str
    password: str
    password_confirm: str
    whatsapp_notif: bool = True
    email_notif: bool = True


class SignInRequest(BaseModel):
    email: str
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


# ============ MOCK DATA ============

users_db = {}
calculations_db = {}

# ============ ROUTES ============

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "BizCalc API",
        "version": "2.0",
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/auth/signup")
def sign_up(request: SignUpRequest):
    if request.email in users_db:
        return {"success": False, "message": "Email already registered"}

    user_id = f"user_{len(users_db) + 1}"
    users_db[request.email] = {
        "user_id": user_id,
        "full_name": request.full_name,
        "email": request.email,
        "whatsapp": request.whatsapp,
        "business_type": request.business_type,
        "password": request.password,
        "created_at": datetime.now().isoformat()
    }

    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": user_id,
        "user_name": request.full_name
    }


@app.post("/api/auth/signin")
def sign_in(request: SignInRequest):
    user = users_db.get(request.email)

    if not user or user["password"] != request.password:
        return {"success": False, "message": "Invalid credentials"}

    return {
        "success": True,
        "message": "Login successful",
        "user_id": user["user_id"],
        "user_name": user["full_name"]
    }


@app.post("/api/calculations/save")
def save_calculation(request: CalculationSaveRequest):
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
def get_calculations(user_id: str):
    user_calcs = [c for c in calculations_db.values() if c["user_id"] == user_id]
    return {
        "success": True,
        "user_id": user_id,
        "calculations": user_calcs
    }


@app.put("/api/users/preferences")
def update_preferences(request: UserPreferences):
    for email, user in users_db.items():
        if user["user_id"] == request.user_id:
            return {"success": True, "message": "Preferences updated"}

    return {"success": False, "message": "User not found"}


# ============ SERVE FRONTEND ============

frontend_path = Path(__file__).parent / "frontend"

if frontend_path.exists():
    app.mount("/", StaticFiles(directory=str(frontend_path), html=True), name="frontend")
else:
    @app.get("/")
    def root():
        return {"message": "BizCalc API running"}


@app.on_event("startup")
async def startup_event():
    print("🚀 BizCalc API Server Started")


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
