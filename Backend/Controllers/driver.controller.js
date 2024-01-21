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

const addCarToLoggedInDriver = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), 'your-secret-key');
    const driverId = decodedToken.userId;

    // Check if the driver exists
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    // Create a new car document
    const newCar = new Car({
      driver: driverId,
      model: req.body.model,
      no: req.body.no,
      status: req.body.status,
    });

    // Save the new car document
    const savedCar = await newCar.save();

    return res.status(201).json({ success: true, car: savedCar });
  } catch (error) {
    console.error('Error adding car:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
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
  addCarToLoggedInDriver,
  getAllCars,
  removeCar,
  updateCar,
  getDriverInfo,
};
