import './App.css';
import React, { useState } from 'react';
import TradingViewWidget from './components/TradingViewWidget';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [symbol,setSymbol] =useState("")
  return (
    <div className="App">
      <div class="glitch" data-text="GLITCH">Crypto Tracker</div>
      <Router>
        <Routes>
          <Route path="/" element={<Home  setSymbol={setSymbol}/>} />
          <Route path="/Trading" element={<TradingViewWidget symbol={symbol} />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
