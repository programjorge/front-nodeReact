// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react'
import Header from './components/header'
import Home from './components/home'
import Games from './components/games'
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/games" element={<Games/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
