import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#001529', color: 'white', position: 'relative', marginTop: '80vh', }}>
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <div>
            <h2>Contact Us</h2>
            <p>Email: contact@example.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <h2>Follow Us</h2>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <h2>Subscribe to Newsletter</h2>
            <p>Stay updated with our latest news and updates.</p>
            {/* Add your subscription form or any other content here */}
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        © 2024 Your Company. All rights reserved.
      </div>
    </Footer>
  );
};

export default AppFooter;
