import React, { useState, useEffect } from 'react';

// ... (imports)

const Routes = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingRoutes, setFetchingRoutes] = useState(true); // Separate loading state for initial fetch

  // ... (other functions)

  const fetchAllRoutes = async () => {
    try {
      setFetchingRoutes(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/getAllRoutes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRoutes(data.routes);
      } else {
        const data = await response.json();
        console.error("Failed to fetch route details:", data.message);
      }
    } catch (error) {
      console.error("Error during fetchAllRoutes:", error);
    } finally {
      setFetchingRoutes(false);
    }
  };

  useEffect(() => {
    fetchAllRoutes();
  }, []); // Fetch route details when the component mounts

  return (
    <div>
      {/* ... (other JSX) */}
      <h2>All Routes</h2>
      {fetchingRoutes ? (
        <p>Loading routes...</p>
      ) : (
        routes.map((route) => (
          <Card
            key={route._id}
            title={route.name}
            extra={<Button onClick={() => showModalUpdate(route)}>Edit</Button>}
          >
            <p>From: {route.from}</p>
            <p>To: {route.to}</p>
            <p>Distance: {route.distance}</p>
            <p>Amount: {route.amount}</p>
            <p>Duration: {route.duration}</p>
          </Card>
        ))
      )}
    </div>
  );
};

export default Routes;
