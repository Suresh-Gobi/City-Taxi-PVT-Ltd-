const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
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
});

// Create a text index on the 'name', 'from', and 'to' fields
routeSchema.index({ name: "text", from: "text", to: "text" });

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
