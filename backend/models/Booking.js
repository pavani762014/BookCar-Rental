// backend/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // saved as the user's id or username depending on your app
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
