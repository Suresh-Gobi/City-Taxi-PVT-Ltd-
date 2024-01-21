import React, { useState, lazy, Suspense } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

// Lazy-loaded dummy components
const Overview = lazy(() => import("./Dashboard/Overview"));

const VehicleDetails = lazy(() => import("./Vehicle/VehicleDetails"));

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
  getItem("Dashboard", "sub1", <MailOutlined />, [getItem("Overview", "1")]),
  getItem("Manage Vehicle", "sub2", <AppstoreOutlined />, [
    getItem("My Vehicle", "2"),
  ]),
  {
    type: "divider",
  },
  getItem("Settings", "sub4", <SettingOutlined />, [getItem("Option 9", "9")]),
];

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onClick = (e) => {
    console.log("click ", e);
    setSelectedMenuItem(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      {/* Conditionally render the content based on the selected menu item */}
      <Suspense fallback={<div>Loading...</div>}>
      {selectedMenuItem === "1" && <Overview />}
        {selectedMenuItem === "2" && <VehicleDetails />}
      </Suspense>
    </>
  );
};

export default App;
