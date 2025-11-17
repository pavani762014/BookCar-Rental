//import express from "express";
//import cors from "cors";

// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const carRoutes = require("./routes/cars");

const app = express();
app.use(
  cors({
    origin: "https://wonderful-dolphin-301786.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 // your Netlify frontend link
    
app.use(express.json());
app.use("/api/bookings", require("./routes/bookings"));


// Connect DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

  app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);


// static files for images (serve public folder)
app.use(express.static("public"));

/*const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));*/

const port = process.env.PORT || 5005;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

