const mongoose = require("mongoose");
const Car = require("../Models/Car.model");
const Driver = require("../Models/Driver.model.js");
const jwt = require("jsonwebtoken");

const getAllCarsForDriver = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const driverId = decodedToken.userId;

    // Check if the driver exists
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    // Fetch all car details for the driver from the database
    const carsForDriver = await Car.find({ driver: driverId });

    // Send the car details as a JSON response
    res.status(200).json({ success: true, cars: carsForDriver });
  } catch (error) {
    console.error("Error fetching car details for driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addCarToLoggedInDriver = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const driverId = decodedToken.userId;

    // Check if the driver exists
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
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
    console.error("Error adding car:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const removeCar = async (req, res) => {
  try {
    const { carId } = req.params;

    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const driverId = decodedToken.userId;

    // Check if the driver exists
    // This step is optional, and you may skip it depending on your use case
    // If you want to enforce that the driver owns the car being removed
    const driverOwnsCar = await Car.exists({ _id: carId, driver: driverId });

    if (!driverOwnsCar) {
      return res
        .status(403)
        .json({ message: "Unauthorized to remove this car" });
    }

    // Remove the car document by ID
    const removedCar = await Car.findByIdAndDelete(carId);

    if (!removedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Car removed successfully" });
  } catch (error) {
    console.error("Error during removeCar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { model, no, status, location } = req.body;

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(
      req.headers.authorization.slice(7),
      "your-secret-key"
    );
    const driverId = decodedToken.userId;

    const driverOwnsCar = await Car.exists({ _id: carId, driver: driverId });

    if (!driverOwnsCar) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this car" });
    }

    // Update car details, including the 'location' field
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { model, no, status, location },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error during updateCar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDriverInfo = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token and extract the driver ID
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const driverId = decodedToken.userId;

    // Use Mongoose to find the driver by ID
    const driver = await Driver.findById(driverId);

    if (!driver) {
      console.log("Driver not found");
      return res.status(404).json({ message: "Driver not found" });
    }

    // Send the driver information as a JSON response
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addCarToLoggedInDriver,
  getAllCarsForDriver,
  removeCar,
  updateCar,
  getDriverInfo,
};
