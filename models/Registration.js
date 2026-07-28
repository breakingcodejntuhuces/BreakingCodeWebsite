const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true },
  currentYear: { type: String, required: true },
  graduationYear: { type: String, required: true },
  branch: { type: String, required: true },
  phone: { type: String, required: true },
  photoPath: { type: String, required: false },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
