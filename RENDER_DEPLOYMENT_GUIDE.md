# 🚀 Render Web Service Deployment Guide
## BizCalc - Premium Business Investment Calculator

**Deployment Type**: Web Service (Full Stack)  
**Technology**: FastAPI + Static Frontend  
**Status**: Production Ready

---

## 📋 Pre-Deployment Checklist

- [x] Frontend files ready (HTML, CSS, JS)
- [x] Backend server (server.py) created
- [x] Dependencies (requirements.txt) configured
- [x] Procfile for Render created
- [x] Environment template (.env.example) ready
- [ ] GitHub repository created
- [ ] All files pushed to GitHub

---

## 🔄 Step 1: Prepare Files for Deployment

### Directory Structure for Deployment:

```
business-estimator-frontend/
├── server.py                     # FastAPI server
├── requirements.txt              # Python dependencies
├── Procfile                      # Render configuration
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── README.md                     # Project documentation
├── frontend/                     # Frontend static files
│   ├── index.html
│   ├── auth-gate.html
│   ├── signup.html
│   ├── signin.html
│   ├── calculator.html
│   ├── dashboard.html
│   ├── features.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy-policy.html
│   ├── chatbot.js
│   ├── sitemap.xml
│   └── robots.txt
└── backend/
    └── (additional backend files when scaling)
```

### Create .gitignore file:

```bash
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/
EOF
```

---

## 🌐 Step 2: Create GitHub Repository

### 2.1 Create Repository on GitHub:
```
1. Go to https://github.com/new
2. Repository name: business-estimator-frontend
3. Description: Premium Business Investment Calculator for Sri Dungargarh
4. Visibility: Public (for Render auto-deploy)
5. Click "Create repository"
```

### 2.2 Push Code to GitHub:

```bash
# Navigate to project directory
cd /path/to/business-estimator-frontend

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: BizCalc full-stack with FastAPI backend and authentication"

# Add remote origin
git remote add origin https://github.com/harsh-web-developer077/business-estimator-frontend.git

# Push to main branch
git branch -M main
git push -u origin main

# Verify
git log --oneline -5
```

### 2.3 Verify on GitHub:
- [ ] All files uploaded
- [ ] README.md displays
- [ ] Procfile present
- [ ] requirements.txt visible

---

## 🚀 Step 3: Deploy to Render Web Service

### 3.1 Connect to Render:

```
1. Go to https://render.com
2. Sign up / Login with GitHub
3. Click "New" button
4. Select "Web Service"
5. Authorize Render to access GitHub
```

### 3.2 Select Repository:

```
1. Search for: business-estimator-frontend
2. Click "Connect"
3. You should see: "harsh-web-developer077/business-estimator-frontend"
```

### 3.3 Configure Web Service:

**Basic Settings:**
```
Name:                 business-flowchart
Environment:          Python 3.11
Build Command:        pip install -r requirements.txt
Start Command:        gunicorn -w 4 -b 0.0.0.0:$PORT server:app
```

**Or Simply:**
- Name: business-flowchart
- Auto-detect settings from Procfile (Render will find it)

### 3.4 Set Environment Variables:

**Click "Advanced" or "Environment":**

```
PORT=8000
ENVIRONMENT=production
FRONTEND_URL=https://business-flowchart.onrender.com

# Optional (add when ready):
# TWILIO_ACCOUNT_SID=xxx
# TWILIO_AUTH_TOKEN=xxx
# SENDGRID_API_KEY=xxx
```

### 3.5 Select Plan:

- **Free Tier**: Adequate for MVP (spins down after 15 min inactivity)
- **Starter/Pro**: Always running (paid, recommended for production)

### 3.6 Deploy:

```
Click "Create Web Service"
Wait 2-5 minutes for build
Check logs for any errors
```

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Render Logs:

Go to your Render dashboard → business-flowchart → Logs

Look for:
```
✅ "Uvicorn running on 0.0.0.0:8000"
✅ "BizCalc API Server Started"
```

### 4.2 Test Live URL:

**Live Site:**
```
https://business-flowchart.onrender.com/
```

**API Health Check:**
```
https://business-flowchart.onrender.com/api/health

Should return:
{
  "status": "ok",
  "service": "BizCalc API",
  "version": "2.0",
  "timestamp": "2026-10-01T..."
}
```

### 4.3 Manual Testing:

**Test 1: Frontend Loading**
```
✅ auth-gate.html loads
✅ Sign In form visible
✅ Sign Up form visible
✅ Guest mode button works
✅ Dark mode toggle works
```

**Test 2: Backend API**
```
POST https://business-flowchart.onrender.com/api/auth/signup
{
  "full_name": "Test User",
  "email": "test@example.com",
  "whatsapp": "+919876543210",
  "business_type": "kirana",
  "password": "TestPass123",
  "password_confirm": "TestPass123",
  "whatsapp_notif": true,
  "email_notif": true
}

Expected Response:
{
  "success": true,
  "message": "User registered successfully",
  "user_id": "user_1",
  "user_name": "Test User",
  "email": "test@example.com"
}
```

**Test 3: Mobile Responsive**
```
✅ Works on 768px width
✅ Touch-friendly buttons
✅ No horizontal scroll
✅ Forms are accessible
```

---

## 📊 Monitoring & Logs

### View Logs in Render:
```
Dashboard → business-flowchart → Logs

Look for:
- API request logs
- Error messages
- Performance metrics
```

### Check Application Status:
```
Dashboard → business-flowchart → Status

Should show:
- Status: Running (green)
- Build: Successful
- Memory/CPU usage
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Build Failed - "python: No such file"
**Solution:**
```
Render → Settings → Environment → Python 3.11
Make sure it's selected as runtime
```

### Issue 2: Port Binding Error
**Solution:**
Procfile should have:
```
web: gunicorn -w 4 -b 0.0.0.0:$PORT server:app
```
Not `localhost:8000` or hardcoded ports.

### Issue 3: Static Files Not Found
**Solution:**
```
1. Ensure frontend/ directory exists
2. Check file permissions
3. Frontend files should be in: /frontend/
4. server.py serves from this directory
```

### Issue 4: CORS Errors in Frontend
**Solution:**
The FastAPI server has CORS enabled:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
This is fine for MVP. Restrict later in production.

### Issue 5: Slow First Load
**Solution:**
Free tier spins down after 15 min. First request takes 30s.
Upgrade to Starter plan for always-on.

---

## 🔐 Security Checklist

- [ ] Environment variables are secrets (not in code)
- [ ] `.env.example` has no real values
- [ ] `.env` is in `.gitignore`
- [ ] Passwords should use bcrypt (upgrade later)
- [ ] JWT tokens for auth (upgrade later)
- [ ] CORS restricted to frontend domain (later)
- [ ] HTTPS enabled (automatic on Render)
- [ ] Database credentials secured (when added)

---

## 🎯 API Endpoints Summary

### Authentication
```
POST /api/auth/signup           - Register new user
POST /api/auth/signin           - Login user
```

### Calculations
```
POST /api/calculations/save     - Save calculation
GET  /api/calculations/{user_id} - Get user's calculations
```

### Preferences
```
PUT  /api/users/preferences     - Update notification preferences
```

### Health
```
GET  /api/health                - Server health check
```

### Frontend
```
GET  /                          - Serve index.html
GET  /static/...                - Serve other HTML files
GET  /{path}                    - SPA routing fallback
```

---

## 📈 Next Steps (Scaling)

### Short Term (Week 1-2):
1. [x] Deploy frontend + backend
2. [ ] Test with real users
3. [ ] Fix any bugs
4. [ ] Gather feedback

### Medium Term (Week 3-4):
1. [ ] Add PostgreSQL database
2. [ ] Implement JWT authentication
3. [ ] Setup Twilio WhatsApp
4. [ ] Setup SendGrid Email
5. [ ] Implement calculation persistence

### Long Term (Month 2+):
1. [ ] Add user dashboard
2. [ ] Analytics integration
3. [ ] Advanced features
4. [ ] Mobile app
5. [ ] Scale infrastructure

---

## 🗄️ Database Setup (When Ready)

### PostgreSQL on Render:
```
1. Render Dashboard → New → PostgreSQL
2. Name: bizcalc-db
3. Note connection string
4. Add to .env:
   DATABASE_URL=postgresql://user:password@host/bizcalc
```

### MongoDB Atlas (Alternative):
```
1. Go to mongodb.com/cloud
2. Create cluster
3. Get connection string
4. Add to .env:
   MONGODB_URI=mongodb+srv://...
```

---

## 📞 Support & Debugging

### Render Support:
- Go to Dashboard → Help
- Check Render status page
- Join Render community Discord

### Local Testing:
```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python -m uvicorn server:app --reload

# Test at: http://localhost:8000
```

### Debug Mode:
In server.py, change:
```python
ENVIRONMENT=development
# and
reload=True  # in uvicorn.run()
```

---

## ✨ Final Checklist Before Production

- [ ] Frontend loads correctly at live URL
- [ ] All pages accessible (with auth redirects)
- [ ] Calculator works accurately
- [ ] Sign up/Sign in forms functional
- [ ] Dark mode toggle works
- [ ] Mobile responsive verified
- [ ] API health check passes
- [ ] No console errors in DevTools
- [ ] Chatbot widget present on all pages
- [ ] Performance acceptable
- [ ] Logs show no errors
- [ ] Team has access to Render dashboard

---

## 🎉 Success!

If you've reached here:
✅ **Frontend + Backend deployed on Render**  
✅ **Available at: https://business-flowchart.onrender.com**  
✅ **API endpoints ready for integration**  
✅ **Foundation for scaling set up**

---

## 📝 Version History

**v2.0** (Current - October 1, 2026)
- FastAPI backend created
- Web Service deployment guide
- Full-stack setup ready
- Render configuration done

---

**Next Document**: Read BACKEND_INTEGRATION_GUIDE.md for database and notification setup

**Questions?** Check logs in Render dashboard or test locally first!

🚀 **Ready to launch!**
