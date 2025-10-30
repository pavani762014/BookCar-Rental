// backend/models/Car.js
const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: String,
  brand: String,
  image: String, // path like "/swift.jpg" stored in public/
  pricePerDay: Number,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Car", CarSchema);
