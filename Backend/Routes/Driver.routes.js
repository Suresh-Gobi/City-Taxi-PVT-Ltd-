const express = require("express");
const { getDriverInfo, addCarToLoggedInDriver } = require("../Controllers/driver.controller");

const router = express.Router();

router.get("/info", getDriverInfo);
router.post("/addcar", addCarToLoggedInDriver);

module.exports = router;
