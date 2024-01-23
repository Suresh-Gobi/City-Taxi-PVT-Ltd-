import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CenteredButtons = () => {
  const navigate = useNavigate();

  const handleButtonClick = (rideNumber) => {
    // Redirect to "/user/search" with the ride number as a query parameter
    navigate(`/user/search`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
      <Title level={2}>Choose a Ride</Title>
      <Button type="primary" style={{ margin: '10px' }} onClick={() => handleButtonClick('01')}>
        Ride 01
      </Button>
      <Button type="primary" style={{ margin: '10px' }} onClick={() => handleButtonClick('02')}>
        Ride 02
      </Button>
      <Button type="primary" style={{ margin: '10px' }} onClick={() => handleButtonClick('03')}>
        Ride 03
      </Button>
      <Button type="primary" style={{ margin: '10px' }} onClick={() => handleButtonClick('04')}>
        Ride 04
      </Button>
    </div>
  );
};

export default CenteredButtons;
