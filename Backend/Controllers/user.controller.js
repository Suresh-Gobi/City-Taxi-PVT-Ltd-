const Route = require("../models/Route.model");

const searchRoutes = async (req, res) => {
  try {
    const { from, to } = req.body;

    // Use Mongoose find to search for routes based on 'from' and 'to'
    const routes = await Route.find({
      $text: { $search: `${from} ${to}` }, // Use $text for text search
    });

    res.json({ routes });
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
