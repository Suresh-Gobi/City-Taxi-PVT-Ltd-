import React, { useState } from 'react';
import { Form, Input, Button, Card, notification, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;

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
      const response = await fetch('http://localhost:5000/api/auth/login', {
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

        navigate('/user/dash');
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
      title="Login"
      style={{
        width: 300,
        margin: 'auto',
        marginTop: 50,
        backgroundImage: 'url("")',
        backgroundSize: 'cover',
        padding: '20px',
      }}
    >
      <Form
        name="loginForm"
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
        Already Have an Account?,{' '}
        <Link to="user/login">Login</Link>
      </Text>
    </Card>
  );
};

export default UserLogin;
