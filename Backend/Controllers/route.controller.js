const Route = require("../Models/Route.model");
const jwt = require("jsonwebtoken");

const addRoute = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and extract necessary information (e.g., user ID)
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const userId = decodedToken.userId;

    // Check if the user exists or has the necessary role
    // ...

    // Create a new route document
    const newRoute = new Route({
      name: req.body.name,
      from: req.body.from,
      to: req.body.to,
      distance: req.body.distance,
      amount: req.body.amount,
      duration: req.body.duration,
    });

    // Save the new route document
    const savedRoute = await newRoute.save();

    res.status(201).json({ success: true, route: savedRoute });
  } catch (error) {
    console.error("Error adding route:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};


const removeRoute = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and extract necessary information (e.g., user ID)
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const userId = decodedToken.userId;

    // Check if the user exists or has the necessary role (you can customize this based on your authentication logic)
    // For example, you might have a User model and check if the user is an admin or has the necessary role

    // Assuming you have a User model, you can uncomment and customize the following lines:
    // const user = await User.findById(userId);
    // if (!user || !user.isAdmin) {
    //   return res.status(403).json({ success: false, message: 'Permission denied' });
    // }

    // Get the route ID from the request parameters
    const { routeId } = req.params;

    // Check if the route exists
    const route = await Route.findById(routeId);

    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    // Remove the route
    await Route.findByIdAndRemove(routeId);

    res
      .status(200)
      .json({ success: true, message: "Route removed successfully" });
  } catch (error) {
    console.error("Error removing route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateRoute = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and extract necessary information (e.g., user ID)
    const decodedToken = jwt.verify(token.slice(7), "your-secret-key");
    const userId = decodedToken.userId;

    // Check if the user exists or has the necessary role (you can customize this based on your authentication logic)
    // For example, you might have a User model and check if the user is an admin or has the necessary role

    // Assuming you have a User model, you can uncomment and customize the following lines:
    // const user = await User.findById(userId);
    // if (!user || !user.isAdmin) {
    //   return res.status(403).json({ success: false, message: 'Permission denied' });
    // }

    // Get the route ID from the request parameters
    const { routeId } = req.params;

    // Check if the route exists
    const route = await Route.findById(routeId);

    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    // Update the route details
    const { name, from, to, distance, amount, duration } = req.body;

    route.name = name;
    route.from = from;
    route.to = to;
    route.distance = distance;
    route.amount = amount;
    route.duration = duration;

    // Save the updated route
    await route.save();

    res
      .status(200)
      .json({ success: true, message: "Route updated successfully", route });
  } catch (error) {
    console.error("Error updating route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllRoutes = async (req, res) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
  
      // Verify the token and extract any necessary information
      const decodedToken = jwt.verify(token.slice(7), 'your-secret-key');
      // Optionally, you can check for specific roles, permissions, or other information in the token
  
      // Fetch all route details from the database
      const routes = await Route.find();
  
      // Send the route details as a JSON response
      res.status(200).json({ success: true, routes });
    } catch (error) {
      console.error('Error fetching route details:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = {
  addRoute,
  removeRoute,
  updateRoute,
  getAllRoutes
};
