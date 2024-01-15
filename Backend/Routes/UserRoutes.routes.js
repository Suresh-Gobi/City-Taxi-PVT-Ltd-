const express = require("express");
const {
  search,
  addRoute,
  allroute,
} = require("../Controllers/user.controller");

const router = express.Router();

router.get("/search", search);
router.post("/addRoute", addRoute);
router.get("/allroute", allroute);

module.exports = router;
