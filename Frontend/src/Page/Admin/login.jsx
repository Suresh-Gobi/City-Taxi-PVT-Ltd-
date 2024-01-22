import React, { useState } from 'react';
import { Form, Input, Button, Typography, Spin } from 'antd';

const { Title, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // You can save the token to local storage or state for future authenticated requests
        console.log('Login successful. Token:', token);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to log in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Title level={2}>Login</Title>
      <Spin spinning={loading}>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Spin>

      {error && (
        <Paragraph type="danger" style={{ marginTop: '20px' }}>
          {error}
        </Paragraph>
      )}
    </div>
  );
};

export default Login;
