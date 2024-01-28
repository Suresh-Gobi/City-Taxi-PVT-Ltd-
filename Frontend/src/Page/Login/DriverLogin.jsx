import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/driverlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the token to local storage
        localStorage.setItem('token', data.token);

        navigate('/driver/dash');
        openNotification('success', 'Login successful!');
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        openNotification('error', `Login failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      openNotification('error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <Card
      title={<Title level={2}>User Login</Title>}
      style={{ width: 300, margin: 'auto', marginTop: 50, textAlign: 'center' }}
    >
      <Form
        name="userLoginForm"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Don't have an Account? <a href="driver/signup">Signup</a>
      </Text>
    </Card>
  );
};

export default UserLogin;
