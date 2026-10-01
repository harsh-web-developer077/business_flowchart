# BizCalc Backend Integration Guide

## Overview
यह guide explain करता है कि कैसे आपके frontend को backend APIs से connect करना है authentication, notifications, और data persistence के लिए।

---

## 1. Authentication System

### Sign Up API
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "phone": "+91 98765 43210",
  "businessType": "kirana",
  "password": "hashed_password",
  "whatsappNotif": true,
  "emailNotif": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "userId": "user_123",
  "token": "jwt_token_here"
}
```

**Frontend Integration (signup.html में):**
```javascript
// Replace this code in signup.html form submission
const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
const result = await response.json();
if (result.success) {
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('userId', result.userId);
    // Redirect to signin
}
```

---

### Sign In API
**Endpoint:** `POST /api/auth/signin`

**Request Body:**
```json
{
  "email_or_phone": "raj@example.com",
  "password": "user_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "userId": "user_123",
  "user": {
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "phone": "+91 98765 43210",
    "businessType": "kirana",
    "whatsappNotif": true,
    "emailNotif": true
  }
}
```

---

## 2. Notifications System

### WhatsApp Integration (Using Twilio)
**Setup Instructions:**

1. **Twilio Account Setup:**
   - https://www.twilio.com पर account बनाएँ
   - WhatsApp Sandbox enable करें
   - Your WhatsApp number को verify करें

2. **Backend Configuration:**
```python
# Python FastAPI example
from twilio.rest import Client

TWILIO_ACCOUNT_SID = "your_account_sid"
TWILIO_AUTH_TOKEN = "your_auth_token"
TWILIO_WHATSAPP_NUMBER = "whatsapp:+1234567890"

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

async def send_whatsapp_notification(to_number: str, message: str):
    message = client.messages.create(
        from_=TWILIO_WHATSAPP_NUMBER,
        to=f"whatsapp:{to_number}",
        body=message
    )
    return message.sid
```

3. **API Endpoint:**
```
POST /api/notifications/send-whatsapp
{
  "phone": "+91 98765 43210",
  "message": "आपका calculation तैयार है!"
}
```

---

### Email Integration (Using SendGrid)
**Setup Instructions:**

1. **SendGrid Account:**
   - https://sendgrid.com पर account बनाएँ
   - API key generate करें

2. **Backend Configuration:**
```python
import sendgrid
from sendgrid.helpers.mail import Mail

sg = sendgrid.SendGridAPIClient(api_key="your_sendgrid_key")

async def send_email_notification(to_email: str, subject: str, content: str):
    message = Mail(
        from_email='noreply@bizcalc.com',
        to_emails=to_email,
        subject=subject,
        html_content=content
    )
    response = sg.send(message)
    return response.status_code
```

3. **API Endpoint:**
```
POST /api/notifications/send-email
{
  "email": "raj@example.com",
  "subject": "आपका Calculation Ready है",
  "message": "calculation details here"
}
```

---

## 3. Calculator Data Persistence

### Save Calculation API
**Endpoint:** `POST /api/calculations/save`

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "businessType": "kirana",
  "location": "market",
  "area": 500,
  "employees": 2,
  "additionalCapital": 50000,
  "results": {
    "landCost": 5000000,
    "setupCost": 200000,
    "stockCost": 300000,
    "equipmentCost": 150000,
    "salaryCost": 120000,
    "operatingCost": 50000,
    "totalInvestment": 5820000
  },
  "timestamp": "2026-10-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "calculationId": "calc_123",
  "savedAt": "2026-10-01T12:00:00Z"
}
```

---

### Get User Calculations API
**Endpoint:** `GET /api/calculations?limit=10&skip=0`

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "total": 5,
  "calculations": [
    {
      "id": "calc_123",
      "businessType": "kirana",
      "totalInvestment": 5820000,
      "createdAt": "2026-10-01T12:00:00Z"
    }
  ]
}
```

---

## 4. Notification Preferences API

### Update Preferences
**Endpoint:** `PUT /api/users/preferences`

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "whatsappNotifications": true,
  "emailNotifications": true,
  "tipsAndAdvice": true,
  "newFeatures": true
}
```

---

## 5. Frontend Changes Required

### 1. Add Script Tag to All Pages
```html
<!-- Add this before closing </body> tag in all pages -->
<script src="chatbot.js"></script>
```

### 2. Update Navigation Links
Add Sign In/Sign Up/Dashboard links in navbar:
```html
<nav>
    <!-- existing nav -->
    <div class="user-menu">
        <a href="signin.html" class="nav-link">Sign In</a>
        <a href="signup.html" class="nav-link">Sign Up</a>
    </div>
</nav>
```

### 3. Add Auth Token to API Calls
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('/api/calculations/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
});
```

---

## 6. Chatbot Integration

Chatbot automatically initializes when `chatbot.js` is loaded. It provides:
- 10+ predefined Q&A
- WhatsApp और Email notification setup
- Calculation tips

**Predefined Questions Covered:**
1. Calculation accuracy
2. Free/Paid model
3. Saving calculations
4. Bank loan acceptance
5. Business types
6. Notification system
7. Price updates
8. Data security
9. Employee costs
10. Data export

---

## 7. Database Schema (MongoDB/PostgreSQL)

### Users Collection
```json
{
  "_id": "user_123",
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "phone": "+91 98765 43210",
  "passwordHash": "hashed_password",
  "businessType": "kirana",
  "preferences": {
    "whatsappNotifications": true,
    "emailNotifications": true,
    "tipsAndAdvice": true,
    "newFeatures": true
  },
  "createdAt": "2026-10-01T12:00:00Z",
  "updatedAt": "2026-10-01T12:00:00Z"
}
```

### Calculations Collection
```json
{
  "_id": "calc_123",
  "userId": "user_123",
  "businessType": "kirana",
  "location": "market",
  "area": 500,
  "employees": 2,
  "additionalCapital": 50000,
  "results": {
    "landCost": 5000000,
    "setupCost": 200000,
    "stockCost": 300000,
    "equipmentCost": 150000,
    "salaryCost": 120000,
    "operatingCost": 50000,
    "totalInvestment": 5820000
  },
  "createdAt": "2026-10-01T12:00:00Z"
}
```

---

## 8. Environment Variables (.env)

```env
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# SendGrid
SENDGRID_API_KEY=your_sendgrid_key

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Database
MONGODB_URI=your_mongodb_uri
# या
DATABASE_URL=your_postgres_url

# API
API_URL=http://localhost:8000
FRONTEND_URL=https://business-flowchart.onrender.com
```

---

## 9. Backend Stack Recommendation

```
Framework: FastAPI (Python) or Express.js (Node.js)
Database: MongoDB या PostgreSQL
Auth: JWT Tokens
Notifications: Twilio (WhatsApp), SendGrid (Email)
Deployment: Heroku, Railway, या Render
```

---

## 10. Testing Checklist

- [ ] Sign up flow काम करे
- [ ] Sign in/logout काम करे
- [ ] Token refresh काम करे
- [ ] Calculations save हों
- [ ] Dashboard load हो
- [ ] WhatsApp notification भेजें
- [ ] Email notification भेजें
- [ ] Chatbot responsive हो
- [ ] Mobile में काम करे
- [ ] Dark mode में काम करे

---

## Contact & Support

किसी भी backend-related query के लिए contact करें।

**यह guide complete है लेकिन आपके specific backend framework के लिए adjust करना होगा।**
