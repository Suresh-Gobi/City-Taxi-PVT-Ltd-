import React, { useState } from 'react';
import { Input, Button, Space, Card, message } from 'antd';

const SearchRoute = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // Check if from and to are not empty
    if (from.trim() === '' || to.trim() === '') {
      message.error('Please enter valid values for From and To');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/search?from=${from}&to=${to}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.routes);
      } else {
        console.error('Failed to fetch routes:', response.status);
        message.error('Failed to fetch routes. Please try again later.');
      }
    } catch (error) {
      console.error('Error during route search:', error);
      message.error('Internal Server Error. Please try again later.');
    }
  };

  return (
    <div>
      <Space direction="horizontal" style={{ width: '100%', textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
        <Input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {searchResults.length > 0 ? (
          searchResults.map((route) => (
            <Card key={route._id} style={{ width: 300, margin: '10px auto' }}>
              <p>Name: {route.name}</p>
              <p>From: {route.from}</p>
              <p>To: {route.to}</p>
              <p>Distance: {route.distance}</p>
              <p>Amount: {route.amount}</p>
              <p>Duration: {route.duration}</p>
            </Card>
          ))
        ) : (
          <p>No routes found</p>
        )}
      </div>
    </div>
  );
};

export default SearchRoute;
