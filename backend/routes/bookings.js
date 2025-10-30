// backend/routes/bookings.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/verifyToken");

// create booking; token optional (handler accepts userId or uses req.user.id)
router.post("/book", verifyToken, bookingController.bookCar);
router.get("/", verifyToken, bookingController.getBookingsByUser);

// fetch bookings for a user by param (public) or current user
router.get("/user/:userId", bookingController.getBookingsByUser);

// fetch current user's bookings (token required)
router.get("/", verifyToken, bookingController.getBookingsByUser);

module.exports = router;
