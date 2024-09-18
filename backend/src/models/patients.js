const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, required: true },
  otp: { type: String }, // Store OTP temporarily
  otpExpires: { type: Date }, // OTP expiration time
});

module.exports = mongoose.model("Patient", healthSchema);
