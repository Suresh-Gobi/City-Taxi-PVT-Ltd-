const mongoose = require("mongoose");
const Car = require("../Models/Car.model");

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

module.exports = {
  addCar,
  getAllCars,
  removeCar,
  updateCar,
};
