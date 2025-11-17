// backend/routes/bookings.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE booking (requires login)
router.post("/book", verifyToken, bookingController.bookCar);

// GET current user's bookings (token required)
router.get("/", verifyToken, bookingController.getBookingsByUser);

// GET bookings by user ID (public or admin)
router.get("/user/:userId", bookingController.getBookingsByUser);

module.exports = router;
