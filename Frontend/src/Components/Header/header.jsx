import React from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  CarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HeaderMenu = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the token from local storage
    localStorage.removeItem("token");
    // Add any additional logout logic you may need

    // Reload the page or redirect to the home page
    window.location.reload();
  };

  return (
    <Header>
      <Row justify="space-between">
        <Col>
          <div className="logo" style={{ color: "white", fontSize: "20px" }}>
            <CarOutlined /> City Taxi
          </div>
        </Col>
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about" icon={<InfoCircleOutlined />}>
              <Link to="/about">About Us</Link>
            </Menu.Item>
            <Menu.Item key="services" icon={<AppstoreOutlined />}>
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="support" icon={<QuestionCircleOutlined />}>
              <Link to="/support">Support</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <div>
            {token ? (
              <Button
                type="danger"
                style={{ marginRight: "10px", color: "white" }}
                onClick={handleLogout}
                icon={<LogoutOutlined />}
              >
                <Link to="/p">Logout</Link>
              </Button>
            ) : (
              <>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  <Link to="user/signup" style={{ color: "white" }}>
                    Signup
                  </Link>
                </Button>
                <Button type="ghost" style={{ color: "white" }}>
                  <Link to="user/login">Login</Link>
                </Button>
                <Button type="ghost" style={{ color: "yellow" }}>
                  <Link to="driver/login">Driver Access</Link>
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderMenu;
