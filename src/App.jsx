import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import "./style/app.scss";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Context, server } from "./main";
import { useContext } from "react";
const App = () => {
  const { setIsAuthenticated, setUsers, setLoading, users, isAuthenticated } =
    useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setUsers({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [isAuthenticated]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
