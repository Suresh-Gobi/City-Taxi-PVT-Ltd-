const Route = require("../models/Route.model");
const jwt = require('jsonwebtoken');

const searchRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;

    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token and extract user information
    const decodedToken = jwt.verify(token.slice(7), 'your-secret-key');

    // Assuming your user ID is stored in the token
    const _id = decodedToken.userId; // Change userId to _id
    const username = decodedToken.username;

    // Use case-insensitive regex for search
    const routes = await Route.find({
      $or: [
        { from: { $regex: new RegExp(from, 'i') } },
        { to: { $regex: new RegExp(to, 'i') } },
      ],
    });

    res.json({ routes, _id, username }); // Change userId to _id
  } catch (error) {
    console.error('Error during route search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const allroute = async (req, res, next) => {
  try {
    const routes = await Route.find();

    res.json({ routes });
  } catch (error) {
    console.error("Fetch all routes error:", error);
    next(error);
  }
};

const addRoute = async (req, res, next) => {
  try {
    const { name, from, to, distance, amount, duration } = req.body;

    const newRoute = new Route({
      name,
      from,
      to,
      distance,
      amount,
      duration,
    });

    const savedRoute = await newRoute.save();

    res.status(201).json({ route: savedRoute });
  } catch (error) {
    console.error("Add route error:", error);
    next(error);
  }
};

module.exports = {
  searchRoutes,
  allroute,
  addRoute,
};
