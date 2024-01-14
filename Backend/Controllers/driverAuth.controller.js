const Driver = require("../Models/Driver.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { 
  sendVerificationEmail,
} = require("../Utils/driverVerificationEmail.js");

const driverSignup = async (req, res, next) => {
  try {
    const { username, email, fname, lname, address, phone, password } =
      req.body;

    const existingUser = await Driver.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const otp = crypto.randomBytes(3).toString("hex").toUpperCase();

    await sendVerificationEmail(email, otp);

    const hashPassword = bcrypt.hashSync(password, 10);

    const newDriver = new Driver({
      username,
      email,
      fname,
      lname,
      address,
      phone,
      password: hashPassword,
      otp,
    });

    await newDriver.save();

    res.status(201).json({ message: "Verification link sent to your email." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const verifyDriverEmail = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const driver = await Driver.findOne({ otp });

    if (!driver) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    driver.verified = true;
    await driver.save();

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const driverlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Driver.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If email and password are valid, generate a JWT
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "6h", // You can customize the expiration time
    });

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

module.exports = {
  driverSignup,
  verifyDriverEmail,
  driverlogin,
};
