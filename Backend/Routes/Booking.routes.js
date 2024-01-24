const express = require("express");
const { auth } = require("../Middleware/authentication");
const { createBooking } = require("../Controllers/booking.controller");

const router = express.Router();

router.post("/create", createBooking);

module.exports = router;