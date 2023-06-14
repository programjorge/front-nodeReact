// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Games from "./components/games";
import Shop from "./components/shop"
import Consolas from "./components/consolas";
import UserProvider from "./context/userContext";
import { CartProvider } from "./context/shop.context";
import Accesorios from "./components/accesorios";
import Packs from "./components/packs";

function App() {
  return (
    <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/shopcard" element={<Shop />} />
          <Route path="/consolas" element={<Consolas />} />
          <Route path="/accesories" element={<Accesorios />} />
          <Route path="/packs" element={<Packs />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </UserProvider>
    
  );
}

export default App;
