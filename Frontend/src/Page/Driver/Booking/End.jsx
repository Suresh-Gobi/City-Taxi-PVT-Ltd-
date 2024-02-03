import React from 'react';
import { Result, Button, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const End = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Result
        icon={<SmileOutlined />}
        title={<Title level={2}>Thank You!</Title>}
        subTitle={<Paragraph>We appreciate your business. Come again soon!</Paragraph>}
        extra={
          <Button type="primary" size="large">
            Home
          </Button>
        }
      />
    </div>
  );
};

export default End;
