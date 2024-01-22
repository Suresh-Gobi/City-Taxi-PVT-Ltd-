const express = require("express");
const { auth } = require("../Middleware/authentication");
const { signupAdmin, adminLogin } = require("../Controllers/admin.auth.controller");

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", adminLogin);

module.exports = router;