// backend/controllers/bookingController.js
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const mongoose = require("mongoose");

exports.bookCar = async (req, res) => {
  try {
    // prefer user from JWT if available
    const userFromToken = req.user?.id;
    const { userId, carId, startDate, endDate } = req.body;

    // allow carId to be provided as a car name (convenience)
    let resolvedCarId = carId;

    if (!carId) {
      return res.status(400).json({ error: "Missing carId" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({ error: "Car not found by ID" });
    }

    // If carId is not an ObjectId, try find by name
  /*  if (!mongoose.Types.ObjectId.isValid(carId)) {
      const carDoc = await Car.findOne({ name: carId });
      if (!carDoc) return res.status(400).json({ error: "Car not found by name" });
      resolvedCarId = carDoc._id;
    }*/

    const finalUserId = userFromToken || userId;
    if (!finalUserId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = new Booking({
      userId: finalUserId,
      carId: resolvedCarId,
      startDate,
      endDate,
    });

    await booking.save();
    // mark car unavailable
    await Car.findByIdAndUpdate(resolvedCarId, { available: false }).catch(()=>{});
    res.status(201).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("Booking save error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const bookings = await Booking.find({ userId }).populate("carId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
