const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Database
let users = {};
let calculations = {};

// ============ HEALTH CHECK ============

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BizCalc API',
    version: '2.0',
    timestamp: new Date().toISOString()
  });
});

// ============ AUTHENTICATION ============

app.post('/api/auth/signup', (req, res) => {
  const { full_name, email, whatsapp, business_type, password, password_confirm } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (password !== password_confirm) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  if (users[email]) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const userId = `user_${Object.keys(users).length + 1}`;
  users[email] = {
    userId,
    full_name,
    email,
    whatsapp,
    business_type,
    password,
    created_at: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'User registered successfully',
    user_id: userId,
    user_name: full_name,
    email
  });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  const user = users[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  res.json({
    success: true,
    message: 'Login successful',
    user_id: user.userId,
    user_name: user.full_name,
    email: user.email
  });
});

// ============ CALCULATIONS ============

app.post('/api/calculations/save', (req, res) => {
  const { user_id, business_type, investment_amount, timeline_months, calculation_data } = req.body;

  if (!user_id || !business_type) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const calcId = `calc_${Object.keys(calculations).length + 1}`;
  calculations[calcId] = {
    calcId,
    user_id,
    business_type,
    investment_amount,
    timeline_months,
    calculation_data,
    created_at: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Calculation saved',
    calc_id: calcId
  });
});

app.get('/api/calculations/:user_id', (req, res) => {
  const { user_id } = req.params;
  const userCalcs = Object.values(calculations).filter(c => c.user_id === user_id);

  res.json({
    success: true,
    user_id,
    calculations: userCalcs
  });
});

app.put('/api/users/preferences', (req, res) => {
  const { user_id, whatsapp_notif, email_notif } = req.body;

  let found = false;
  for (let email in users) {
    if (users[email].userId === user_id) {
      users[email].whatsapp_notif = whatsapp_notif;
      users[email].email_notif = email_notif;
      found = true;
      break;
    }
  }

  if (!found) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, message: 'Preferences updated' });
});

// ============ SERVE FRONTEND ============

const frontendPath = path.join(__dirname, 'frontend');

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // SPA fallback
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'BizCalc API is running', docs: '/api/health' });
  });
}

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`🚀 BizCalc API Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.ENVIRONMENT || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
