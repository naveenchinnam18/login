const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Correctly require the package
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow multiple origins using a function
const allowedOrigins = [
  'https://insta-2-um9z.onrender.com',
  'https://ins-33w0.onrender.com',
  'https://gram-sl87.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Explicitly allow GET for the health check
  credentials: false
}));

// ✅ Middleware to parse JSON request bodies
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// ✅ Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running ✅' });
});

// ✅ Login route with improved validation and security logic
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);

  // 1. Basic Input Validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    // 2. Find user by username first (better practice)
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`Login failed: User '${username}' not found.`);
      // Send a generic error message to prevent username enumeration
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Compare the password
    //
    // CRITICAL SECURITY NOTE: You should NEVER store plain text passwords.
    // In a real app, you would hash the password during registration and compare the hash here.
    // Example using a library like 'bcrypt':
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) { ... }
    //
    if (user.password !== password) {
      console.log(`Login failed: Incorrect password for user '${username}'.`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Success
    console.log(`✅ Login successful for user: ${username}`);
    res.status(200).json({ success: true, message: 'Login successful' });

  } catch (err) {
    // 5. Catch any server errors
    console.error('❌ Server error during login process:', err);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
