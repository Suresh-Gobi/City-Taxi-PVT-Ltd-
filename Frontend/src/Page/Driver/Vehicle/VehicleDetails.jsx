import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const VehicleDetails = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields(); // Reset form fields when the modal is closed
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Assuming you have an API endpoint for adding car details
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/driver/addcar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: values.model,
          no: parseInt(values.number, 10),
          status: values.status,
        }),
      });

      if (response.ok) {
        // Car added successfully
        console.log('Car added successfully');
        setVisible(false); // Close the modal
        form.resetFields(); // Reset form fields after successful submission
        // Optionally, you can redirect the user to another page or update the state
      } else {
        // Handle errors from the server
        const data = await response.json();
        // setError(data.message || 'Failed to add car details'); // You may handle errors differently
      }
    } catch (error) {
      console.error('Error during handleFormSubmit:', error);
      // setError('Internal Server Error'); // You may handle errors differently
    }
  };

  return (
    <div>
      <h2>Vehicle Details</h2>
      <Button type="primary" onClick={showModal}>
        Add Your Vehicle
      </Button>
      <Modal
        title="Add Vehicle Details"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleFormSubmit}
        confirmLoading={false}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please enter the model' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: 'Please enter the number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please enter the status' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleDetails;
