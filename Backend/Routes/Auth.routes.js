const express = require("express");
const {auth} = require("../Middleware/authentication");
const { signup, login, verifyEmail } = require("../Controllers/auth.controller");
const { driverSignup, driverlogin, verifyDriverEmail } = require("../Controllers/driverAuth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("user/verify/:otp", verifyEmail);

router.post("/driversignup", driverSignup);
router.post("/driverlogin", driverlogin);
router.post("driver/verify/:otp", verifyDriverEmail);

module.exports = router;