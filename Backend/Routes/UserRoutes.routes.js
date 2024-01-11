const express = require("express");
const { test } = require("../Controllers/user.controller"); // Use require here

const router = express.Router();

router.get("/test", test);

module.exports = router; // Use module.exports for CommonJS