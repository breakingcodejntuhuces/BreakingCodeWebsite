const mongoose = require('mongoose');
const QRCode = require('qrcode');
require('dotenv').config();
const Registration = require('./models/Registration');

async function migrateQr() {
  try {
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI in .env');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await Registration.find({ memId: { $exists: true } });
    console.log(`Found ${users.length} users. Backfilling QR codes...`);

    for (const user of users) {
      const verificationUrl = `https://breakingcode-jntuhuces.vercel.app/verify.html?id=${user.memId}`;
      const qrCodeBase64 = await QRCode.toDataURL(verificationUrl, { 
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#ffffff' }
      });
      user.qrCodeBase64 = qrCodeBase64;
      await user.save();
      console.log(`Updated QR for ${user.memId}`);
    }

    console.log('QR Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateQr();
