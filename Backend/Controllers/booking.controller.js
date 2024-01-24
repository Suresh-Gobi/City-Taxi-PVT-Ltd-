const Booking = require("../Models/Booking.model");
const User = require("../Models/User.model");

const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const { routeId, pickupLocation, destination, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const newBooking = new Booking({
      user: userId,
      car: routeId,
      pickupLocation,
      destination,
      status: "Pending",
    });

    const savedBooking = await newBooking.save();

    res.json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};

module.exports = {
  createBooking,
};
