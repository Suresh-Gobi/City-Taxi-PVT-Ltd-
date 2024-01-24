const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require("./Routes/UserRoutes.routes.js");
const authRouters = require("./Routes/Auth.routes.js");
const driverRouters = require("./Routes/Driver.routes.js");
const adminRouters = require("./Routes/Admin.routes.js");
const bookingRouters = require("./Routes/Booking.routes.js");

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors({ origin: '*' })); 
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouters);
app.use("/api/driver", driverRouters);
app.use("/api/admin", adminRouters);
app.use("/api/booking", bookingRouters);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});