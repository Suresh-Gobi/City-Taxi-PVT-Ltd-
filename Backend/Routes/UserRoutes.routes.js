const express = require("express");
const {
  searchRoutes,
  addRoute,
  allroute,
} = require("../Controllers/user.controller");

const router = express.Router();

router.get("/search", searchRoutes);
router.post("/addRoute", addRoute);
router.get("/allroute", allroute);

module.exports = router;