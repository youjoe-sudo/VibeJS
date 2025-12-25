// server.js - VibeJS Express Server
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Routes
// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

// Contact form endpoint (simulated)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'جميع الحقول مطلوبة / All fields are required' 
    });
  }
  
  // Log the message (in production, you'd send an email or save to database)
  console.log('📧 Contact message received:');
  console.log('  Name:', name);
  console.log('  Email:', email);
  console.log('  Message:', message);
  console.log('  Time:', new Date().toISOString());
  
  // Simulate processing delay
  setTimeout(() => {
    res.json({ 
      status: 'success', 
      message: 'تم استلام رسالتك بنجاح! سنتواصل معك قريبًا. / Your message has been received successfully! We will contact you soon.' 
    });
  }, 500);
});

// Code execution endpoint (for playground - returns sanitized result)
app.post('/api/execute', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'No code provided' 
    });
  }
  
  // Note: This is a mock endpoint. Real code execution should be done client-side
  // in an iframe for security. This endpoint is here for demonstration.
  res.json({ 
    status: 'success', 
    message: 'Code should be executed client-side in iframe for security' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'pages', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    status: 'error', 
    message: 'حدث خطأ في الخادم / Server error occurred' 
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 VibeJS Server is running!');
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
  console.log('✨ Press Ctrl+C to stop');
});