import React, { useState } from "react";

const SearchRoutes = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(""); // Assuming you have a way to get user ID from the token

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/search?from=${from}&to=${to}`
      );
      const data = await response.json();

      if (data.routes.length === 0) {
        setErrorMessage(
          'No routes found for the specified "from" and "to" values.'
        );
      } else {
        setSearchResult(data.routes);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again.");
    }
  };

  const handleConfirmBooking = async (routeId) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
  
      // Get the user information from the token
      const userInfo = getUserInfoFromToken(token); // Replace with your actual method to extract user information from the token
  
      if (!userInfo || !userInfo.userId) {
        console.error('Unable to extract user information from the token');
        return;
      }
  
      const { userId, username } = userInfo;
  
      const response = await fetch("http://localhost:5000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          routeId,
          pickupLocation: from, // Assuming 'from' is the pickup location
          destination: to, // Assuming 'to' is the destination
          userId,
          username,
        }),
      });
  
      const bookingData = await response.json();
  
      console.log("Booking confirmed:", bookingData);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };
  
  

  return (
    <div>
      <label>
        From:
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>
      <label>
        To:
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search Routes</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {searchResult && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResult.map((route) => (
              <li key={route._id}>
                {route.name} - {route.from} to {route.to} | Distance:{" "}
                {route.distance} | Amount: {route.amount} | Duration:{" "}
                {route.duration}{" "}
                <button onClick={() => handleConfirmBooking(route._id)}>
                  Confirm Booking
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchRoutes;
