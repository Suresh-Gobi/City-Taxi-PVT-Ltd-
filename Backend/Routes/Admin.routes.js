const express = require("express");
const { auth } = require("../Middleware/authentication");
const { signupAdmin } = require("../Controllers/admin.auth.controller");

const router = express.Router();

router.post("/signup", signupAdmin);

module.exports = router;