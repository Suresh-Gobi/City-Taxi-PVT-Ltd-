import React, { useState, useEffect } from "react";
import { Input, Button, Card, Typography, notification, Spin } from "antd";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SearchRoutes = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/users/search?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.routes.length === 0) {
        setErrorMessage(
          'No routes found for the specified "from" and "to" values.'
        );
      } else {
        setSearchResult(data.routes);
        setUserId(data.userId);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (routeId) => {
    try {
      if (!searchResult || searchResult.length === 0) {
        console.error("No search results available.");
        return;
      }

      setConfirmLoading(true);

      const response = await fetch("http://localhost:5000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          routeId,
          pickupLocation: from,
          destination: to,
        }),
      });

      const bookingData = await response.json();

      console.log("Booking confirmed:", bookingData);
      notification.success({
        message: "Booking Confirmed",
        description: "Your booking has been confirmed successfully!",
      });

      // Simulate a 10-second timeout for the loading spinner
      setTimeout(() => {
        setConfirmLoading(false);
      }, 10000);
    } catch (error) {
      console.error("Error confirming booking:", error);
      notification.error({
        message: "Booking Error",
        description: "An error occurred while confirming the booking.",
      });
    } finally {
      // Clear the loading state after 10 seconds
      setTimeout(() => {
        setConfirmLoading(false);
      }, 10000);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Title level={3}>Search Routes</Title>
      <Input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        style={{ marginBottom: 10 }}
      >
        Search Routes
      </Button>

      {loading && <Spin tip="Searching routes..." />}

      {errorMessage && <Text type="danger">{errorMessage}</Text>}

      {searchResult && (
        <Card title={<Title level={4}>Search Results</Title>}>
          <ul>
            {searchResult.map((route) => (
              <li key={route._id}>
                {route.name} - {route.from} to {route.to} | Distance:{" "}
                {route.distance} | Amount: {route.amount} | Duration:{" "}
                {route.duration} <br />
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => handleConfirmBooking(route._id)}
                  loading={confirmLoading}
                  style={{ marginLeft: 10 }}
                >
                  Confirm Booking
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {confirmLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Spin tip="Booking is pending..." />
        </div>
      )}
    </div>
  );
};

export default SearchRoutes;
