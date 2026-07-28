const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const multer = require('multer');
const ImageKit = require('imagekit');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// ImageKit Initialization (requires env vars)
let imagekit;
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });
}

// Multer Memory Storage (Required for Vercel since disk writing is not permitted)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));
} else {
  console.warn('WARNING: MONGO_URI is not defined. Database operations will fail.');
}

// API Endpoint for Registration
app.post('/api/register', upload.single('photo'), async (req, res) => {
  try {
    const { fullName, rollNo, email, currentYear, graduationYear, branch, phone } = req.body;
    
    // Validate required fields
    if (!fullName || !rollNo || !email || !currentYear || !graduationYear || !branch || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let photoPath = null;
    
    // If a photo was uploaded, push it to ImageKit
    if (req.file) {
      if (!imagekit) {
         console.warn('ImageKit credentials missing, skipping photo upload.');
      } else {
        try {
          const uploadResponse = await imagekit.upload({
            file: req.file.buffer.toString('base64'),
            fileName: `member-${rollNo.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}${path.extname(req.file.originalname)}`,
            folder: '/breakingcode_members'
          });
          photoPath = uploadResponse.url; // Save the cloud URL directly
        } catch (uploadErr) {
          console.error('ImageKit upload error:', uploadErr);
          return res.status(500).json({ error: 'Failed to upload photo to the cloud.' });
        }
      }
    }

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

// For local testing (Vercel will ignore this in production if configured correctly, but checking NODE_ENV is safer)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;
