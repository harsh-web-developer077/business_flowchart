# Email Integration Setup Guide

## Overview
Your BizCalc backend now sends automated emails when users sign up and sign in. This guide explains how to set it up.

---

## 📋 What Gets Emailed?

### On User Signup:
1. **Email to User**: Welcome message with their registration details
2. **Email to Admin** (harshjaju07@gmail.com): New user notification

### On User Signin:
1. **Email to User**: Login notification for security

---

## 🔧 Setup Steps

### Step 1: Install Nodemailer Dependency
Run this command in your project directory:

```bash
npm install
```

This will install nodemailer (already added to package.json).

### Step 2: Set Up Gmail App-Specific Password

**Why?** Gmail blocks direct password usage. You need to create an app-specific password.

1. Go to your Gmail account: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Go back to Security settings
5. Find "App passwords" (appears after 2-Step Verification is on)
6. Select "Mail" and "Windows Computer" (or your device)
7. Gmail will generate a 16-character password - **copy this**

### Step 3: Create .env File

Create a `.env` file in your project root (same folder as server.js):

```
PORT=8000
ENVIRONMENT=development
EMAIL_USER=harshjaju07@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Replace `xxxx xxxx xxxx xxxx` with your 16-character app-specific password** (keep the spaces or remove them - both work).

### Step 4: Verify Setup

Test by running:

```bash
npm start
```

You should see:
```
🚀 BizCalc API Server running on port 8000
Environment: development
Health check: http://localhost:8000/api/health
```

### Step 5: Test Email Functionality

**Option A: Use Postman or cURL**

Sign up with a test email:

```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "whatsapp": "9876543210",
    "business_type": "Kirana Shop",
    "password": "test123",
    "password_confirm": "test123"
  }'
```

Check if emails were sent to:
- `test@example.com` (user confirmation)
- `harshjaju07@gmail.com` (admin notification)

**Option B: Use the Frontend**

1. Open your website
2. Go to Sign Up page
3. Fill in the form and submit
4. Check both email inboxes

---

## 📧 Email Content Format

### Signup Email to User:
```
Hello [Name],

Welcome to BizCalc - Business Investment Calculator!

Your account has been created successfully. Here are your registration details:

Name: [Full Name]
Email: [Email]
WhatsApp: [WhatsApp Number]
Business Type: [Type]
Registration Date: [Date]

You can now log in to BizCalc and start calculating your business investments.

Best regards,
BizCalc Team
Sri Dungargarh Entrepreneurs
```

### Admin Notification Email:
```
New User Signup Alert!

A new user has registered on BizCalc:

Name: [Full Name]
Email: [Email]
WhatsApp: [WhatsApp Number]
Business Type: [Type]
User ID: [ID]
Registration Time: [DateTime]

Action: You can review this user in the Admin Dashboard.

BizCalc Admin System
```

### Login Notification Email:
```
Hello [Name],

Your BizCalc account was just accessed.

Login Details:
Email: [Email]
Time: [DateTime]
Status: Successful Login

If this wasn't you, please change your password immediately.

Best regards,
BizCalc Security Team
```

---

## ⚙️ Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `8000` |
| `ENVIRONMENT` | Dev/Production flag | `development` |
| `EMAIL_USER` | Gmail address for sending | `harshjaju07@gmail.com` |
| `EMAIL_PASSWORD` | App-specific password | `xxxx xxxx xxxx xxxx` |

---

## 🐛 Troubleshooting

### Issue: "Error: Invalid login"
**Solution**: Check if your app-specific password is correct. Copy it again from Gmail settings.

### Issue: "Error: ENOTFOUND smtp.gmail.com"
**Solution**: Check your internet connection. Gmail SMTP should resolve correctly.

### Issue: "Emails not arriving"
**Solution**: 
- Check spam folder
- Verify email address is correct
- Make sure 2-Step Verification is enabled on Gmail
- Wait 5-10 minutes for email delivery

### Issue: "Port 8000 already in use"
**Solution**: 
```bash
# Change port in .env
PORT=3000
```

---

## 📱 Deployment Notes

### For Production (Hosting Services):

1. **Add .env to .gitignore** (never commit passwords!):
   ```
   echo ".env" >> .gitignore
   ```

2. **On your hosting service**, set environment variables:
   - Heroku: Use "Config Vars" in Settings
   - AWS: Use "Environment Variables"
   - Vercel/Netlify: Use project settings

3. **Don't commit .env file** - use .env.example as template

---

## 📞 Admin Dashboard Integration

The admin page (`admin-users.html`) can now fetch live data from:

```javascript
// Fetch all registered users
fetch('/api/admin/users')
  .then(res => res.json())
  .then(data => console.log(data.users))

// Fetch all calculations
fetch('/api/admin/calculations')
  .then(res => res.json())
  .then(data => console.log(data.calculations))
```

---

## ✅ Quick Checklist

- [ ] Nodemailer installed (`npm install`)
- [ ] Gmail 2-Step Verification enabled
- [ ] Gmail App Password generated
- [ ] `.env` file created with correct passwords
- [ ] Server starts without errors (`npm start`)
- [ ] Test signup email received
- [ ] Admin email received notification
- [ ] Login email notification working

---

## 🎉 You're All Set!

Your BizCalc backend now has full email integration. Users will receive confirmations, and you'll get admin notifications for every signup!

Questions? Check the error logs in the console when the server is running.
