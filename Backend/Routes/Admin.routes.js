const express = require("express");
const { auth } = require("../Middleware/authentication");
const {
  signupAdmin,
  adminLogin,
} = require("../Controllers/admin.auth.controller");
const {
  addRoute,
  removeRoute,
  updateRoute,
  getAllRoutes,
} = require("../Controllers/route.controller");

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", adminLogin);

router.post("/addRoute", addRoute);
router.delete("/removeRoute/:routeId", removeRoute);
router.put("/updateRoute/:routeId", updateRoute); 
router.get("/getAllRoutes", getAllRoutes);

module.exports = router;
