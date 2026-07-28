const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const multer = require('multer');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// API Endpoint for Registration
app.post('/api/register', upload.single('photo'), async (req, res) => {
  try {
    const { fullName, rollNo, email, currentYear, graduationYear, branch, phone } = req.body;
    
    // Validate required fields
    if (!fullName || !rollNo || !email || !currentYear || !graduationYear || !branch || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newRegistration = new Registration({
      fullName,
      rollNo,
      email,
      currentYear,
      graduationYear,
      branch,
      phone,
      photoPath
    });

    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful!', id: newRegistration._id });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to process registration' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
