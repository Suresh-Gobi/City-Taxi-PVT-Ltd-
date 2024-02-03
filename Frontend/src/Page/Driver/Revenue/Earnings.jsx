import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import "./style.css";

export default function Earnings() {
  const [totalAmount, setTotalAmount] = useState('200');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/booking/get/amount', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <Card className="card-amt" title="Total Earnings" style={{ width: 200, margin: 'auto', marginTop: '-30vh', position: 'relative',  }}>
      {loading ? <p>Loading...</p> : <p>{totalAmount}</p>}
    </Card>
  );
}
