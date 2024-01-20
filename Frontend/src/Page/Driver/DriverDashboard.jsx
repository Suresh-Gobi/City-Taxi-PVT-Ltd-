import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Dashboard', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),
  getItem('Manage Vehicle', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  {
    type: 'divider',
  },
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const App = () => {
  const [additionalButtonsVisible, setAdditionalButtonsVisible] = useState(false);

  const onClick = (e) => {
    console.log('click ', e);

    // Check if the clicked menu is "Option 5"
    if (e.key === '5') {
      // Toggle the visibility of additional buttons
      setAdditionalButtonsVisible(!additionalButtonsVisible);
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      {/* Render additional buttons if "Option 5" is selected */}
      {additionalButtonsVisible && (
        <div style={{ marginTop: '20px' }}>
          <Button type="primary">Button 1</Button>
          <Button type="primary" style={{ marginLeft: '10px' }}>
            Button 2
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }}>
            Button 3
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }}>
            Button 4
          </Button>
        </div>
      )}
    </>
  );
};

export default App;
