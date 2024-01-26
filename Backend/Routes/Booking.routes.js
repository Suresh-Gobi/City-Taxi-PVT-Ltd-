const express = require("express");
const { auth } = require("../Middleware/authentication");
const { createBooking, getAllBookings, confirmBooking, completeBooking } = require("../Controllers/booking.controller");

const router = express.Router();

router.post("/create", createBooking);
router.get("/books", getAllBookings);
router.put("/confirm/:bookingId", confirmBooking);
router.put("/complete/:bookingId", completeBooking);

module.exports = router;