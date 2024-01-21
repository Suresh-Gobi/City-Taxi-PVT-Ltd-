const express = require("express");
const { getDriverInfo, addCarToLoggedInDriver, getAllCarsForDriver } = require("../Controllers/driver.controller");

const router = express.Router();

router.get("/info", getDriverInfo);
router.post("/addcar", addCarToLoggedInDriver);
router.get("/getcar", getAllCarsForDriver);

module.exports = router;
