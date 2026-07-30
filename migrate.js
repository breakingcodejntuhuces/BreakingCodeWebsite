const mongoose = require('mongoose');
require('dotenv').config();
const Registration = require('./models/Registration');

async function migrate() {
  try {
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI in .env');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await Registration.find({ memId: { $exists: false } }).sort({ registeredAt: 1 });
    console.log(`Found ${users.length} users to migrate.`);

    let currentId = 1001;
    
    // Find highest existing memId just in case
    const highestUser = await Registration.findOne({ memId: { $exists: true } }).sort({ memId: -1 });
    if (highestUser && highestUser.memId) {
      const match = highestUser.memId.match(/BC26UCES(\d+)/);
      if (match) {
        currentId = parseInt(match[1]) + 1;
      }
    }

    for (const user of users) {
      user.memId = `BC26UCES${currentId}`;
      await user.save();
      console.log(`Updated ${user.fullName} with ${user.memId}`);
      currentId++;
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
