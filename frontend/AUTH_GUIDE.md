# BizCalc Authentication System Guide

## Overview
The application now has complete authentication lockdown. Users cannot access ANY page without signing in first. All pages require authentication to be viewed.

## How It Works

### 1. Entry Point (index.html)
- When a user visits the site, they land on `index.html`
- A script at the top checks if `sessionStorage.isLoggedIn` is set to 'true'
- **If not logged in:** User is immediately redirected to `signin.html`
- **If logged in:** User sees the home page

### 2. Authentication Check Utility (auth-check.js)
This file is included on ALL protected pages and handles:
- Checking if user is logged in: `sessionStorage.getItem('isLoggedIn')`
- Redirecting to signin if not authenticated
- Providing helper functions:
  - `checkAuthentication()` - Returns true/false based on login status
  - `getUserInfo()` - Returns object with userId, userName, userEmail
  - `logout()` - Clears all session data and redirects to signin

### 3. Protected Pages (All Have auth-check.js)
The following pages now require authentication:
- ✅ calculator.html
- ✅ loan-calculator.html
- ✅ dashboard.html
- ✅ admin-users.html
- ✅ features.html
- ✅ about.html
- ✅ contact.html
- ✅ privacy-policy.html
- ✅ index.html

**Public Pages** (No authentication needed):
- signin.html (Sign in page)
- signup.html (Sign up page)
- auth-gate.html (Auth gate page)

### 4. Sign In Flow
1. User opens site → redirected to signin.html
2. User enters email and password
3. Form submits to `/api/auth/signin` endpoint
4. Backend validates credentials and returns user info
5. Upon success, JavaScript stores in sessionStorage:
   ```javascript
   sessionStorage.setItem('isLoggedIn', 'true');
   sessionStorage.setItem('userId', result.user_id);
   sessionStorage.setItem('userName', result.user_name);
   sessionStorage.setItem('userEmail', result.email);
   ```
6. User is redirected to dashboard.html
7. All pages now recognize the user is logged in

### 5. Sign Up Flow
1. User visits signup.html (no auth needed)
2. User enters details and submits form
3. Form submits to `/api/auth/signup` endpoint
4. Backend creates new user and returns success
5. User is shown all registered users on the page
6. User should then sign in to access the application

### 6. Sign Out Flow
Use the logout() function (called from navbar buttons):
```javascript
logout(); // Clears sessionStorage and redirects to signin.html
```

### 7. Session Storage Data
When user is logged in, sessionStorage contains:
```
isLoggedIn: "true"
userId: "user_123"
userName: "John Doe"
userEmail: "john@example.com"
```

**Note:** SessionStorage is session-specific. It clears when the user:
- Closes the browser
- Closes all tabs of the site
- Manually clears browser data
- Logs out

## Backend Endpoints

### Sign Up
- **URL:** POST `/api/auth/signup`
- **Body:** `{ full_name, email, whatsapp, business_type, password, password_confirm }`
- **Response:** `{ success: true, message: "...", user_id: "...", user_name: "..." }`

### Sign In
- **URL:** POST `/api/auth/signin`
- **Body:** `{ email, password }`
- **Response:** `{ success: true, user_id: "...", user_name: "...", email: "..." }`

### Get All Users (Admin)
- **URL:** GET `/api/admin/users`
- **Response:** Array of all registered users

### Get User Calculations
- **URL:** GET `/api/calculations/:user_id`
- **Response:** Array of calculations for that user

### Save Calculation
- **URL:** POST `/api/calculations/save`
- **Body:** `{ user_id, calculation_data }`
- **Response:** `{ success: true, calculation_id: "..." }`

## Features Implemented

✅ Complete authentication lockdown - No guest mode
✅ All pages protected - Redirect to signin if not authenticated
✅ "Forgot Password" link removed from signin
✅ Guest mode completely removed
✅ SessionStorage for auth state (not localStorage)
✅ Form submit → Backend save → Display flow
✅ User data sent directly via form submission
✅ Admin panel to view all users

## Testing the Flow

### Test 1: Try accessing a protected page
1. Clear browser data/cookies
2. Go to `http://localhost:8000/calculator.html`
3. You should be redirected to signin.html

### Test 2: Sign up and sign in
1. Go to signup.html
2. Fill in details and submit
3. You'll see all registered users displayed
4. Go to signin.html
5. Sign in with the account you just created
6. You should be redirected to dashboard.html
7. Now you can access all protected pages

### Test 3: Access protected pages
1. After signing in, you can access:
   - calculator.html
   - dashboard.html
   - admin-users.html
   - All other protected pages

### Test 4: Test logout
1. Look for logout button in navbar
2. Click it to clear session and redirect to signin.html

## File Structure

```
frontend/
├── auth-check.js           (NEW - Authentication utility)
├── AUTH_GUIDE.md          (NEW - This file)
├── index.html             (Updated - Added redirect script)
├── signin.html            (Updated - Uses backend API)
├── signup.html            (Updated - Uses backend API)
├── calculator.html        (Updated - Added auth-check.js)
├── loan-calculator.html   (Updated - Added auth-check.js)
├── dashboard.html         (Updated - Added auth-check.js)
├── admin-users.html       (Updated - Added auth-check.js)
├── features.html          (Updated - Added auth-check.js)
├── about.html             (Updated - Added auth-check.js)
├── contact.html           (Updated - Added auth-check.js)
├── privacy-policy.html    (Updated - Added auth-check.js)
├── robots.txt             (SEO - Block crawlers from protected pages)
├── sitemap.xml            (SEO - List all public pages)
└── ... other files
```

## Important Notes

1. **SessionStorage vs LocalStorage:** SessionStorage is used because it expires when the user closes the browser, which is more secure for shared devices.

2. **No Email Notifications:** User details are NOT sent to email. Data is saved to backend only.

3. **All Pages Protected:** Even informational pages like about.html, features.html, contact.html require signin.

4. **SEO Consideration:** Protected pages (calculator, dashboard, etc.) won't be indexed by search engines since they require authentication.

5. **Admin Panel:** admin-users.html is also protected. Only authenticated users can view the user list.

## Troubleshooting

### Issue: Getting stuck on signin page after signup
**Solution:** Make sure the backend endpoints (/api/auth/signup, /api/auth/signin) are working correctly.

### Issue: Can't stay logged in
**Solution:** Check that sessionStorage is not being cleared. Disable any browser extensions that clear data on close.

### Issue: Redirect loops
**Solution:** Make sure signin.html and signup.html do NOT include the auth-check.js script (they shouldn't).

### Issue: Admin can't view users
**Solution:** Make sure the /api/admin/users endpoint is returning data correctly from the backend.
