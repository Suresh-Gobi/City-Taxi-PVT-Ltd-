import React, { useEffect, useState } from 'react';

const Overview = () => {
  const [driverUsername, setDriverUsername] = useState('');

  useEffect(() => {
    // Fetch the driver's information using the token
    const token = localStorage.getItem('token');

    const fetchDriverInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/driver/info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDriverUsername(data.username);
        } else {
          // Handle error, e.g., redirect to login page
          console.error('Failed to fetch driver information');
        }
      } catch (error) {
        console.error('Error during fetchDriverInfo:', error);
      }
    };

    if (token) {
      fetchDriverInfo();
    }
  }, []);

  return (
    <div>
      <h2>Welcome, {driverUsername}!</h2>
      <p>This is the Overview page.</p>
      {/* Add your additional content here */}
    </div>
  );
};

export default Overview;