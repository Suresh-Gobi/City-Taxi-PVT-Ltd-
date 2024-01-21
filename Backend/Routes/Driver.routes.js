const express = require("express");
const {
  getDriverInfo,
  addCarToLoggedInDriver,
  getAllCarsForDriver,
  updateCar,
  removeCar,
} = require("../Controllers/driver.controller");

const router = express.Router();

router.get("/info", getDriverInfo);
router.post("/addcar", addCarToLoggedInDriver);
router.get("/getcar", getAllCarsForDriver);
router.put("/updatecar/:carId", updateCar);
router.delete("/removecar/:carId", removeCar);

module.exports = router;