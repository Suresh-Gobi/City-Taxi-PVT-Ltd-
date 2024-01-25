import React, { useState, useEffect } from "react";

const SearchRoutes = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSearch = async () => {
    try {
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

        // Use the userId from the API response
        setUserId(data.userId);

        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again.");
    }
  };

  const handleConfirmBooking = async (routeId) => {
    try {
      if (!searchResult || searchResult.length === 0) {
        console.error('No search results available.');
        return;
      }

      // Use the userId state that you set during the search
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
          <p>User ID: {userId}</p>
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
