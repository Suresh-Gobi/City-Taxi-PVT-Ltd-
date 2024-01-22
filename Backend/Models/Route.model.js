const mongoose = require("mongoose");

// Check if the model is already defined to avoid OverwriteModelError
const Route = mongoose.models.Route || mongoose.model("Route", new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
}));

// Create a text index on the 'name', 'from', and 'to' fields
Route.schema.index({ name: "text", from: "text", to: "text" });

module.exports = Route;
