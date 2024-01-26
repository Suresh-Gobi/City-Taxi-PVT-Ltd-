const Booking = require("../Models/Booking.model");
const Car = require("../Models/Car.model");
const User = require("../Models/User.model");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const createBooking = async (req, res) => {
  try {
    const { routeId, pickupLocation, destination } = req.body;

    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token and extract user information
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");

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

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error getting all bookings:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update the booking status to 'Accepted'
    booking.status = 'Accepted';
    await booking.save();

    res.json({ success: true, message: 'Booking confirmed successfully' });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const completeBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Completed" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking status to Completed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  confirmBooking,
  completeBooking,
};
