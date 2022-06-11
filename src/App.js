import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import AddShop from "./components/AddShop";
import EditShop from "./components/EditShop";
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddShop />} />
        <Route path="/edit/:id" element={<EditShop />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
