import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  LoginOutlined,
  CarOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export default function HeaderMenu() {
  return (
    <Header>
      <Row justify="space-between">
        <Col>
          <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
            <CarOutlined /> City Taxi
          </div>
        </Col>
        <Col>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
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
            <Button type="primary" style={{ marginRight: '10px' }}>
              <Link to="/signup" style={{ color: 'white' }}>
                Signup
              </Link>
            </Button>
            <Button type="ghost" style={{ color: 'white' }}>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </Header>
  );
}
