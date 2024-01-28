import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success, e.g., show a success message or redirect to login
        openNotification("success", "Signup successful! Please login.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error(errorData.error); // Handle error, e.g., display error message to the user
        openNotification("error", `Signup failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      openNotification(
        "error",
        "An error occurred during signup. Please try again."
      );
    }
  };

  return (
    <Card
      title="Signup"
      style={{
        width: 300,
        margin: "auto",
        marginTop: 50,
        backgroundImage: 'url("")',
        backgroundSize: "cover",
        padding: "20px",
      }}
    >
      <Form
        name="signupForm"
        initialValues={{ remember: true }}
        onFinish={handleSignup}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
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
              message: "Please input your password!",
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Text>
        If already have an account, <Link to="user/login">Login here</Link>
      </Text>
    </Card>
  );
};

export default Signup;
