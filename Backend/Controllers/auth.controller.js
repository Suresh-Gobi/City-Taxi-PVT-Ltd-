const User = require("../Models/User.model.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../Utils/verificationEmail.js");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const otp = crypto.randomBytes(3).toString("hex").toUpperCase();

    await sendVerificationEmail(email, otp);

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword, otp });

    await newUser.save();

    res.status(201).json({ message: "Verification link sent to your email." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = {
  signup,
  verifyEmail,
};