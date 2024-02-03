import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Home from "./Page/Home/home";
import DriverSignup from "./Page/Signup/DriverSignup";
import UserSignup from "./Page/Signup/UserSignup";
import UserLogin from "./Page/Login/UserLogin";
import DriverLogin from "./Page/Login/DriverLogin";
import Confirmed from "./Page/Driver/Booking/Confirmed";
import Rate from "./Page/Driver/Booking/Rate";
import End from "./Page/Driver/Booking/End";

import DriverDashboard from "./Page/Driver/DriverDashboard";

import AdminDashboard from "./Page/Admin/Admin";

import AdminLogin from "./Page/Admin/login";

import Dashboard from "./Page/User/Dashboard";
import SearchRoute from "./Page/User/SearchRoute";

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dash" element={<AdminDashboard />} />
          <Route path="/user/dash" element={<Dashboard />} />
          <Route path="/user/search" element={<SearchRoute />} />
          <Route path="/user/confirmed" element={<Confirmed />} />
          <Route path="/user/rate" element={<Rate />} />
          <Route path="/user/end" element={<End />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
