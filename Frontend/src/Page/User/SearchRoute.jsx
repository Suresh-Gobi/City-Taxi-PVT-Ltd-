import React, { useState } from "react";

const SearchRoutes = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
                {route.duration}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchRoutes;
