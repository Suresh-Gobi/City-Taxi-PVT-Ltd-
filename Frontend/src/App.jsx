import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./Components/Header/header";
import Home from "./Page/Home/home";
import DriverSignup from "./Page/Signup/DriverSignup";
import UserSignup from "./Page/Signup/UserSignup";
import UserLogin from "./Page/Login/UserLogin";
import DriverLogin from "./Page/Login/DriverLogin";

import DriverDashboard from "./Page/Driver/DriverDashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driver/signup" element={<DriverSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/dash" element={<DriverDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
