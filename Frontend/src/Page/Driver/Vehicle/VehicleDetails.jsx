import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Card, Popconfirm } from "antd";
import './style.css';

const VehicleDetails = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const showModalUpdate = (car) => {
    setSelectedCar(car);
    setVisible(true);
    form.setFieldsValue({
      model: car.model,
      number: car.no,
      status: car.status,
    });
  };

  const handleCancel = () => {
    setVisible(false);
    setConfirmRemove(false); // Close the confirmation modal
    form.resetFields(); // Reset form fields when the modal is closed
  };

  const handleFormSubmitUpdate = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/driver/updatecar/${selectedCar._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: values.model,
            no: parseInt(values.number, 10),
            status: values.status,
            location: values.location || null,
          }),
        }
      );

      if (response.ok) {
        // Car updated successfully
        console.log("Car updated successfully");
        setVisible(false); // Close the modal
        form.resetFields(); // Reset form fields after successful submission

        // Fetch the updated list of cars
        fetchAllCars();
        // Optionally, you can redirect the user to another page or update the state
      } else {
        // Handle errors from the server
        const data = await response.json();
        // setError(data.message || 'Failed to update car details'); // You may handle errors differently
      }
    } catch (error) {
      console.error("Error during handleFormSubmit:", error);
      // setError('Internal Server Error'); // You may handle errors differently
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Assuming you have an API endpoint for adding car details
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/driver/addcar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: values.model,
          no: parseInt(values.number, 10),
          status: values.status,
        }),
      });

      if (response.ok) {
        // Car added successfully
        console.log("Car added successfully");
        setVisible(false); // Close the modal
        form.resetFields(); // Reset form fields after successful submission

        // Fetch the updated list of cars
        fetchAllCars();
        // Optionally, you can redirect the user to another page or update the state
      } else {
        // Handle errors from the server
        const data = await response.json();
        // setError(data.message || 'Failed to add car details'); // You may handle errors differently
      }
    } catch (error) {
      console.error("Error during handleFormSubmit:", error);
      // setError('Internal Server Error'); // You may handle errors differently
    }
  };

  const handleRemoveCar = async (carId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/driver/removecar/${carId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Car removed successfully
        console.log("Car removed successfully");
        setConfirmRemove(false); // Close the confirmation modal
        // Fetch the updated list of cars
        fetchAllCars();
      } else {
        // Handle errors from the server
        const data = await response.json();
        // Handle errors
        console.error("Failed to remove car:", data.message);
      }
    } catch (error) {
      console.error("Error during handleRemoveCar:", error);
    }
  };

  const showRemoveConfirmation = (carId) => {
    setSelectedCar(carId);
    setConfirmRemove(true);
  };

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/driver/getcar", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCars(data.cars);
      } else {
        // Handle errors from the server
        const data = await response.json();
        // Handle errors
        console.error("Failed to fetch car details:", data.message);
      }
    } catch (error) {
      console.error("Error during fetchAllCars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div className="container ">
      <section className="section-vh">
        <h2>Vehicle Details</h2><hr/><br/>
        <Button type="primary" onClick={showModal} className="btn-add-vh">
          Add Your Vehicle
        </Button>
        <Modal
          title={selectedCar ? "Edit Vehicle Details" : "Add Vehicle Details"}
          visible={visible}
          onCancel={handleCancel}
          onOk={selectedCar ? handleFormSubmitUpdate : handleFormSubmit}
          confirmLoading={false}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={selectedCar ? handleFormSubmitUpdate : handleFormSubmit}
          >
            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: "Please enter the model" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Number"
              name="number"
              rules={[{ required: true, message: "Please enter the number" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please enter the status" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <h2>Your Vehicle Details</h2><br/>
        {loading && <p>Loading cars...</p>}
        {cars.map((car) => (
          <Card
            key={car._id}
            title={car.model}
            extra={
              <>
                <Button onClick={() => showModalUpdate(car)}>Edit</Button>
                <Popconfirm
                  title="Are you sure you want to delete this car?"
                  onConfirm={() => handleRemoveCar(car._id)}
                  onCancel={() => setConfirmRemove(false)}
                  okText="Yes"
                  cancelText="No"
                  visible={selectedCar === car._id && confirmRemove}
                >
                  <Button
                    type="danger"
                    onClick={() => showRemoveConfirmation(car._id)}
                  >
                    Remove
                  </Button>
                </Popconfirm>
              </>
            }
          >
            <p>Number: {car.no}</p>
            <p>Status: {car.status}</p>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default VehicleDetails;
