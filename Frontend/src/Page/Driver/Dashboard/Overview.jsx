import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./style.css";

const Overview = () => {
  const [driverUsername, setDriverUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDriverInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/driver/info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDriverUsername(data.username);
        } else {
          console.error("Failed to fetch driver information");
        }
      } catch (error) {
        console.error("Error during fetchDriverInfo:", error);
      }
    };

    if (token) {
      fetchDriverInfo();
    }
  }, []);

  return (
    <div>
      <div className="container">
        <section className="section-card">
          <div className="Overview">
            <h2>Welcome {driverUsername}! To Driver Dashboard</h2>
            <br />
            <hr />
            <br />
            <Card style={{ width: 300 }}>
              <h2>Books</h2>
              <p>Card content</p>
              <a herf="/driver/dash">View</a>
            </Card>{" "}
            <br />
            <Card style={{ width: 300 }}>
              <h2>Revenue</h2>
              <p>Card content</p>
              <a herf="/driver/dash">View</a>
            </Card>{" "}
            <br />
            <Card style={{ width: 300 }}>
              <h2>Your Vehicle Details</h2>
              <p>Card content</p>
              <a herf="/driver/dash">View</a>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Overview;
