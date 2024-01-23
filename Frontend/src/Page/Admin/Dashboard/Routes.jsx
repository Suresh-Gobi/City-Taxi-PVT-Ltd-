import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Card } from "antd";

const Routes = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setSelectedRoute(null);
    setVisible(true);
  };

  const showModalUpdate = (route) => {
    setSelectedRoute(route);
    setVisible(true);
    form.setFieldsValue({
      name: route.name,
      from: route.from,
      to: route.to,
      distance: route.distance,
      amount: route.amount,
      duration: route.duration,
    });
  };

  const handleCancel = () => {
    setSelectedRoute(null);
    setVisible(false);
    form.resetFields(); // Reset form fields when the modal is closed
  };

  const handleFormSubmitUpdate = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/updateRoute/${selectedRoute._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            from: values.from,
            to: values.to,
            distance: values.distance,
            amount: values.amount,
            duration: values.duration,
          }),
        }
      );

      if (response.ok) {
        console.log("Route updated successfully");
        setVisible(false);
        form.resetFields();
        fetchAllRoutes();
      } else {
        const data = await response.json();
        console.error("Failed to update route details:", data.message);
      }
    } catch (error) {
      console.error("Error during handleFormSubmitUpdate:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");
console.log("JWT Token:", token);


      const response = await fetch("http://localhost:5000/api/admin/addRoute", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          from: values.from,
          to: values.to,
          distance: values.distance,
          amount: values.amount,
          duration: values.duration,
        }),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        console.log("Route added successfully");
        setVisible(false);
        form.resetFields();
        fetchAllRoutes();
      } else {
        const data = await response.json();
        console.error("Failed to add route details:", data.message);
      }

      if (response.ok) {
        console.log("Route added successfully");
        setVisible(false);
        form.resetFields();
        fetchAllRoutes();
      } else {
        const data = await response.json();
        console.error("Failed to add route details:", data.message);
      }
    } catch (error) {
      console.error("Error during handleFormSubmit:", error);
    }
  };

  const fetchAllRoutes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/getAllRoutes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRoutes(data.routes);
      } else {
        const data = await response.json();
        console.error("Failed to fetch route details:", data.message);
      }
    } catch (error) {
      console.error("Error during fetchAllRoutes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoutes();
  }, []); // Fetch route details when the component mounts

  return (
    <div>
      <h2>Route Details</h2>
      <Button type="primary" onClick={showModal}>
        Add Route
      </Button>
      <Modal
        title={selectedRoute ? "Edit Route" : "Add Route"}
        visible={visible}
        onCancel={handleCancel}
        onOk={selectedRoute ? handleFormSubmitUpdate : handleFormSubmit}
        confirmLoading={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={selectedRoute ? handleFormSubmitUpdate : handleFormSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="From"
            name="from"
            rules={[
              { required: true, message: "Please enter the from location" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="To"
            name="to"
            rules={[
              { required: true, message: "Please enter the to location" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Distance"
            name="distance"
            rules={[{ required: true, message: "Please enter the distance" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please enter the duration" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <h2>All Routes</h2>
      {loading && <p>Loading routes...</p>}
      {routes.map((route) => (
        <Card
          key={route._id}
          title={route.name}
          extra={<Button onClick={() => showModalUpdate(route)}>Edit</Button>}
        >
          <p>From: {route.from}</p>
          <p>To: {route.to}</p>
          <p>Distance: {route.distance}</p>
          <p>Amount: {route.amount}</p>
          <p>Duration: {route.duration}</p>
        </Card>
      ))}
    </div>
  );
};

export default Routes;
