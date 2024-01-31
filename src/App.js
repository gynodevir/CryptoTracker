import './App.css';
import React, { useState } from 'react';
import TradingViewWidget from './components/TradingViewWidget';
import Home from "../src/components/Home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [symbol,setSymbol] =useState("")
  return (
    <div className="App">
    
    
      <Router>
        <Routes>
          <Route path="/CryptoTracker" element={<Home  setSymbol={setSymbol}/>} />
          <Route path="/Trading" element={<TradingViewWidget symbol={symbol} />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
