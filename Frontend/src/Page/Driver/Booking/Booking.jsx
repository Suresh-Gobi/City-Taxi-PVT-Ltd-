import React, { useState, useEffect } from "react";
import { Card, Spin, Button, message } from "antd";

const { Meta } = Card;

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/api/booking/books")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleConfirm = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/booking/confirm/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update the local state to reflect the change
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Accepted" }
              : booking
          )
        );

        message.success("Booking confirmed successfully!");
      } else {
        message.error("Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/booking/complete/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update the local state to reflect the change
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Completed" }
              : booking
          )
        );

        message.success("Booking marked as Completed!");
      } else {
        message.error("Failed to mark booking as Completed. Please try again.");
      }
    } catch (error) {
      console.error("Error marking booking as Completed:", error);
    }
  };

  return (
    <div>
      <h1>Booking Details</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {bookings.map((booking) => (
            <Card key={booking._id} style={{ width: 300, margin: 16 }}>
              <Meta title="User" description={booking.user} />
              <Meta title="Car" description={booking.car} />
              <Meta
                title="Pickup Location"
                description={booking.pickupLocation}
              />
              <Meta title="Destination" description={booking.destination} />
              <Meta title="Status" description={booking.status} />
              {booking.status === "Pending" && (
                <Button
                  type="primary"
                  onClick={() => handleConfirm(booking._id)}
                >
                  Confirm
                </Button>
              )}
              {booking.status === "Accepted" && (
                <Button
                  type="primary"
                  onClick={() => handleComplete(booking._id)}
                >
                  Completed
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
