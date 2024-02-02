const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    baseFare: {
      type: Number,
      required: true,
    },
    distanceRate: {
      type: Number,
      required: true,
    },
    durationRate: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.methods.calculateTotalAmount = function () {
  this.totalAmount =
    this.baseFare +
    this.distance * this.distanceRate +
    this.duration * this.durationRate;
};

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
