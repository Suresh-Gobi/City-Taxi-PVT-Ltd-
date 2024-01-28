import React from "react";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CenteredCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (rideNumber) => {
    // Redirect to "/user/search" with the ride number as a query parameter
    navigate(`/user/search`);
  };

  const cardStyle = {
    width: 200,
    margin: "10px",
    display: "inline-block",
    transition: "background-color 0.3s ease", // Smooth transition effect
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50vh",
        transform: "translateY(-50%)",
      }}
    >
      <Card
        title={<Title level={4}>Pick Your Ride</Title>}
        style={{
          ...cardStyle,
          backgroundImage: "url('https://trackmycar.lk/wp-content/uploads/2017/12/TAXI-DISPATCH-SYSTEM-1.jpg')",
          backgroundSize: "cover",
          color: "white", // Set text color to white for better visibility
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
        }}
        onClick={() => handleCardClick("01")}
      >
        {/* Add any additional content for Ride 01 */}
      </Card>
      <Card
        title={<Title level={4}>Order Your Food</Title>}
        style={{
          ...cardStyle,
          backgroundImage: "url('url_for_ride_02_image')",
          backgroundSize: "cover",
          color: "white", // Set text color to white for better visibility
        }}
        onClick={() => handleCardClick("02")}
      >
        {/* Add any additional content for Ride 02 */}
      </Card>
      <Card
        title={<Title level={4}>Home Delivery</Title>}
        style={{
          ...cardStyle,
          backgroundImage: "url('url_for_ride_03_image')",
          backgroundSize: "cover",
          color: "white", // Set text color to white for better visibility
        }}
        onClick={() => handleCardClick("03")}
      >
        {/* Add any additional content for Ride 03 */}
      </Card>
      <Card
        title={<Title level={4}>Hire Vehicle</Title>}
        style={{
          ...cardStyle,
          backgroundImage: "url('url_for_ride_04_image')",
          backgroundSize: "cover",
          color: "white", // Set text color to white for better visibility
        }}
        onClick={() => handleCardClick("04")}
      >
        {/* Add any additional content for Ride 04 */}
      </Card>
    </div>
  );
};

export default CenteredCards;
