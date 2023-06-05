// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Games from "./components/games";
import Shop from "./components/shop"
import UserProvider from "./context/userContext";
import { CartProvider } from "./context/shop.context";

function App() {
  return (
    <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/shopcard" element={<Shop />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </UserProvider>
    
  );
}

export default App;
