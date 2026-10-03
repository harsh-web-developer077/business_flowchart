const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Database (In-Memory)
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
  const userData = {
    userId,
    full_name,
    email,
    whatsapp,
    business_type,
    password,
    created_at: new Date().toISOString()
  };

  users[email] = userData;

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

// ============ ADMIN ENDPOINTS ============

// Get all users (for admin dashboard)
app.get('/api/admin/users', (req, res) => {
  const allUsers = Object.values(users).map(user => ({
    userId: user.userId,
    full_name: user.full_name,
    email: user.email,
    whatsapp: user.whatsapp,
    business_type: user.business_type,
    created_at: user.created_at,
    registration_date: new Date(user.created_at).toLocaleDateString()
  }));

  res.json({
    success: true,
    total_users: allUsers.length,
    users: allUsers
  });
});

// Get all calculations (for admin dashboard)
app.get('/api/admin/calculations', (req, res) => {
  const allCalcs = Object.values(calculations);

  res.json({
    success: true,
    total_calculations: allCalcs.length,
    calculations: allCalcs
  });
});

// ============ SERVE FRONTEND ============

const frontendPath = path.join(__dirname, 'frontend');

if (fs.existsSync(frontendPath)) {
  // Serve static files (including sitemap.xml and robots.txt)
  app.use(express.static(frontendPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('.xml')) {
        res.setHeader('Content-Type', 'application/xml');
      } else if (path.endsWith('.txt')) {
        res.setHeader('Content-Type', 'text/plain');
      }
    }
  }));

  // Explicit routes for SEO files (before SPA fallback)
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(frontendPath, 'sitemap.xml'));
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(frontendPath, 'robots.txt'));
  });

  // SPA fallback (only for non-API, non-file requests)
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/') && !req.path.includes('.')) {
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
