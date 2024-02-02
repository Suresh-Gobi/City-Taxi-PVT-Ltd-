import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the token to local storage
        localStorage.setItem("token", data.token);

        navigate("/admin/dash");
        console.log(data); // Handle success, e.g., store token in state or redirect to dashboard
      } else {
        const errorData = await response.json();
        console.error(errorData.error); // Handle error, e.g., display error message to the user
        notification.error({
          message: "Login Failed",
          description: errorData.error,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      notification.error({
        message: "Login Failed",
        description: "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <Form
        form={form}
        onFinish={handleLogin}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
