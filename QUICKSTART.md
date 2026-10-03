# BizCalc - Quick Start Guide

## 🎉 What's New?

Your BizCalc project now has **full email integration** and a **backend API** that sends confirmation emails to users and admin notifications when users sign up or sign in!

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create `.env` File

Create a file named `.env` in your project root folder:

```
PORT=8000
ENVIRONMENT=development
EMAIL_USER=harshjaju07@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**To get the email password:**
1. Go to: https://myaccount.google.com/
2. Click **Security** → **App passwords**
3. Select "Mail" → "Windows Computer"
4. Copy the 16-character password
5. Paste it in `.env` (spaces or no spaces both work)

### Step 3: Start Server
```bash
npm start
```

You should see:
```
🚀 BizCalc API Server running on port 8000
```

### Step 4: Test It!

Open http://localhost:8000 and:
1. Try **Sign Up** with your test email
2. Check your email for confirmation
3. Try **Sign In** 
4. Check email for login notification

---

## 📧 What Happens When Users Sign Up?

1. **User receives email:**
   - Welcome message
   - Their registration details
   - Confirmation their account was created

2. **Admin receives email** (harshjaju07@gmail.com):
   - New user notification
   - User's details
   - User ID for reference

---

## 📧 What Happens When Users Sign In?

1. **User receives email:**
   - Login confirmation
   - Time of login
   - Security alert

---

## 🔧 What Was Updated?

### Backend (server.js):
- ✅ Added Nodemailer for email sending
- ✅ Signup endpoint sends 2 emails (user + admin)
- ✅ Signin endpoint sends login notification
- ✅ Added admin API endpoints

### Frontend (admin-users.html):
- ✅ Now fetches data from backend API
- ✅ Shows real-time user data
- ✅ Export CSV functionality
- ✅ No more localStorage dependency

### Configuration:
- ✅ package.json updated with nodemailer
- ✅ .env.example for easy setup
- ✅ Comprehensive guides added

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `server.js` | Backend API (updated with email) |
| `.env` | Your configuration (NEVER commit this!) |
| `.env.example` | Template for `.env` |
| `SETUP_EMAIL.md` | Detailed email setup |
| `DEPLOYMENT_GUIDE.md` | Full deployment instructions |
| `frontend/admin-users.html` | Admin dashboard (updated) |

---

## ⚠️ Important Notes

1. **Never commit `.env`** - It contains your password!
   - Add to .gitignore: `echo ".env" >> .gitignore`

2. **Use app-specific password**, not your Gmail password
   - It's more secure and required by Gmail

3. **Emails sent from**: harshjaju07@gmail.com
   - Users can reply to this address

4. **Check spam folder** if you don't see emails
   - Gmail sometimes puts automated emails there

---

## 🧪 Test Commands

### Check if server is running:
```bash
curl http://localhost:8000/api/health
```

### Test signup via command line:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name":"Test User",
    "email":"test@gmail.com",
    "whatsapp":"9999999999",
    "business_type":"Kirana Shop",
    "password":"test123",
    "password_confirm":"test123"
  }'
```

### Get all users:
```bash
curl http://localhost:8000/api/admin/users
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module nodemailer" | Run `npm install` |
| "Invalid login" email error | Check .env file, regenerate Gmail app password |
| Port 8000 already in use | Change PORT in .env |
| Emails not arriving | Check spam folder, wait 5-10 minutes |
| Admin dashboard empty | Make sure server is running, refresh page |

---

## 🚀 Next Steps

1. **Test locally** - Sign up and check emails
2. **Show to users** - They'll see email confirmations
3. **Monitor admin dashboard** - Real-time user tracking
4. **Deploy when ready** - Use DEPLOYMENT_GUIDE.md

---

## 📞 Email Endpoints

### For Developers:

**Signup Email Content:**
- Welcome message
- User details (name, email, business type, registration date)
- Call to action to login

**Admin Notification Content:**
- New user alert
- All user details
- Unique user ID

**Signin Email Content:**
- Login confirmation
- Time of login
- Security message

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Gmail app password generated
- [ ] `.env` file created with correct password
- [ ] Server starts without errors (`npm start`)
- [ ] Can access http://localhost:8000
- [ ] Signup email works
- [ ] Admin email notification works
- [ ] Admin dashboard shows users
- [ ] Files committed to Git

---

## 🎓 Learn More

- **Email Setup**: Read `SETUP_EMAIL.md`
- **Deployment**: Read `DEPLOYMENT_GUIDE.md`
- **Full Documentation**: Check all `.md` files in project

---

## 💡 Pro Tips

1. **Test with Gmail accounts** - Works best with Gmail
2. **Watch server console** - Shows email sending status
3. **Check admin dashboard** - See all signups in real-time
4. **Export data** - Admin dashboard can export to CSV

---

**Your BizCalc is now ready for email notifications! 🎉**

Questions? Check the detailed guides or server console for error messages.
