const express = require("express");
const { signup, verifyEmail } = require("../Controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify/:otp", verifyEmail);

module.exports = router;