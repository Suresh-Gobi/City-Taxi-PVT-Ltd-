const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Add other fields specific to passengers
});

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;