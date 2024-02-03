import React, { useState } from "react";
import { Form, Rate, Button, Input, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RateForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRateSubmit = async (values) => {
    setLoading(true);

    try {
      // Assuming you have the backend API URL correct
      const response = await fetch(
        "http://localhost:5000/api/booking/user/rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: "Rating Submitted",
          description: "Thank you for your rating!",
        });

        form.resetFields();

        navigate("/user/end");
      } else {
        notification.error({
          message: "Rating Submission Failed",
          description:
            data.error || "An error occurred while submitting your rating.",
        });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Title level={3} style={{ marginBottom: 20 }}>
        Rate Your Experience
      </Title>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <Form form={form} onFinish={handleRateSubmit}>
          <Form.Item
            name="rating"
            label="Rate"
            rules={[{ required: true, message: "Please rate!" }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Rating
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RateForm;
