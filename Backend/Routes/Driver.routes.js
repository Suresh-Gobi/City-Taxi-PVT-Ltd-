const express = require("express");
const {
  getDriverInfo,
  addCarToLoggedInDriver,
  getAllCarsForDriver,
  updateCar,
} = require("../Controllers/driver.controller");

const router = express.Router();

router.get("/info", getDriverInfo);
router.post("/addcar", addCarToLoggedInDriver);
router.get("/getcar", getAllCarsForDriver);
router.put("/updatecar/:carId", updateCar);

module.exports = router;
