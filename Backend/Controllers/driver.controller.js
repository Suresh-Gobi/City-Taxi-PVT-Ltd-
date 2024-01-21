const mongoose = require("mongoose");
const Car = require("../Models/Car.model");
const Driver = require("../Models/Driver.model.js");
const jwt = require("jsonwebtoken");

const getAllCars = async () => {
  try {
    const allCars = await Car.find();
    return allCars;
  } catch (error) {
    console.error("Get all cars error:", error);
    throw error;
  }
};

const addCar = async (driverId, model, no, status) => {
  try {
    const newCar = new Car({
      driver: driverId,
      model,
      no,
      status,
    });

    const savedCar = await newCar.save();
    return savedCar;
  } catch (error) {
    console.error("Add car error:", error);
    throw error;
  }
};

const removeCar = async (carId) => {
  try {
    const removedCar = await Car.findByIdAndRemove(carId);
    return removedCar;
  } catch (error) {
    console.error("Remove car error:", error);
    throw error;
  }
};

const updateCar = async (carId, updates) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(carId, updates, {
      new: true,
    });
    return updatedCar;
  } catch (error) {
    console.error("Update car error:", error);
    throw error;
  }
};

const getDriverInfo = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), 'your-secret-key');
    const driverId = decodedToken.userId;

    // Use Mongoose to find the driver by ID
    const driver = await Driver.findById(driverId);

    if (!driver) {
      console.log('Driver not found');
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Send the driver information as a JSON response
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  addCar,
  getAllCars,
  removeCar,
  updateCar,
  getDriverInfo,
};
