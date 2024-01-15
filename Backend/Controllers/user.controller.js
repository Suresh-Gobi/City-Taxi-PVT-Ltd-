const Route = require("../models/Route.model");

const search = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const routes = await Route.find({
      $text: {
        $search: `${from} ${to}`,
      },
    });

    res.json({ routes });
  } catch (error) {
    console.error("Search error:", error);
    next(error);
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
  search,
  allroute,
  addRoute,
};
