const express = require("express");
const { auth } = require("../Middleware/authentication");
const {
  createBooking,
  getAllBookings,
  confirmBooking,
  completeBooking,
  getTotalAmount,
  createRating,
} = require("../Controllers/booking.controller");

const router = express.Router();

router.post("/create", createBooking);
router.get("/books", getAllBookings);
router.put("/confirm/:bookingId", confirmBooking);
router.put("/complete/:bookingId", completeBooking);
router.get("/get/amout", getTotalAmount);
router.post("/user/rate", createRating);

module.exports = router;
