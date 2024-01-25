const Booking = require("../Models/Booking.model");
const User = require("../Models/User.model");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const { routeId, pickupLocation, destination } = req.body;

    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token and extract user information
    const decodedToken = jwt.verify(token.slice(7), 'your-secret-key');

    // Assuming your user ID is stored in the token
    const userId = decodedToken.userId;

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
