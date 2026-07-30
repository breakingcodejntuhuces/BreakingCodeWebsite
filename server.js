const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const multer = require('multer');
const ImageKit = require('imagekit');
const QRCode = require('qrcode');
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

    // Auto-increment memId
    let currentId = 1001;
    const highestUser = await Registration.findOne({ memId: { $exists: true } }).sort({ memId: -1 });
    if (highestUser && highestUser.memId) {
      const match = highestUser.memId.match(/BC26UCES(\d+)/);
      if (match) {
        currentId = parseInt(match[1]) + 1;
      }
    }
    const memId = `BC26UCES${currentId}`;

    const verificationUrl = `https://breakingcode-jntuhuces.vercel.app/verify.html?id=${memId}`;
    const qrCodeBase64 = await QRCode.toDataURL(verificationUrl, { 
      errorCorrectionLevel: 'H',
      color: { dark: '#000000', light: '#ffffff' }
    });

    const newRegistration = new Registration({
      fullName,
      rollNo,
      email,
      currentYear,
      graduationYear,
      branch,
      phone,
      photoPath,
      memId,
      qrCodeBase64
    });

    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful!', memId: newRegistration.memId });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to process registration' });
  }
});

// API Endpoint for Verification
app.get('/api/verify/:memId', async (req, res) => {
  try {
    const member = await Registration.findOne({ memId: req.params.memId });
    if (!member) {
      return res.status(404).json({ error: 'Member not found or invalid ID' });
    }
    
    // If somehow a member doesn't have a QR stored in DB, generate one as fallback
    let qrCode = member.qrCodeBase64;
    if (!qrCode) {
      const verificationUrl = `https://breakingcode-jntuhuces.vercel.app/verify.html?id=${member.memId}`;
      qrCode = await QRCode.toDataURL(verificationUrl, { errorCorrectionLevel: 'H' });
    }
    
    res.status(200).json({
      member: {
        fullName: member.fullName,
        rollNo: member.rollNo,
        branch: member.branch,
        memId: member.memId,
        expiryDate: member.expiryDate,
        photoPath: member.photoPath
      },
      qrCode: qrCode
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Failed to verify member' });
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
