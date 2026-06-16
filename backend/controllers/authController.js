const User = require("../models/User");
const Otp = require("../models/Otp");

const genOtp = require("../utils/genOtp");
const genToken = require("../utils/genToken");

exports.requestOtp = async (req, res) => {
  const { email } = req.body;

  const otp = genOtp();

  console.log(`OTP for ${email}: ${otp}`);

  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  res.json({
    message: "OTP generated",
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const rec = await Otp.findOne({
    email,
    otp,
  });

  if (!rec) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  let user = await User.findOne({
    email,
  });

  if (!user) {
    user = await User.create({
      email,
    });
  }

  await Otp.deleteMany({ email });

  const token = genToken(user._id);

  res.json({
    token,
    user,
  });
};
