const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,

  otp: String,

  expiresAt: {
    type: Date,
    expires: 0,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
