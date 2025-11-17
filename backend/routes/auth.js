// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);


module.exports = router;
