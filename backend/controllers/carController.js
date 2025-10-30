// backend/controllers/carController.js
const Car = require("../models/Car");

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
