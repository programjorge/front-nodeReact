// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Games from "./components/games";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
