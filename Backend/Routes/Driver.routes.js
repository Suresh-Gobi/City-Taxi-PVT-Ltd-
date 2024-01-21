const express = require("express");
const { getDriverInfo } = require("../Controllers/driver.controller");

const router = express.Router();

router.get("/info", getDriverInfo);

module.exports = router;
