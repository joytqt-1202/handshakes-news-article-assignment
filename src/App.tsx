import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import ChangeArticles from './pages/ChangeArticles';

function App() {
  return (
    <Router>
      <nav className='navbar'>
        <Link to="/">
          <button className='navbar_button'>Home</button>
        </Link>
        <Link to="/change">
          <button className='navbar_button'>
            Add Articles
          </button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/change" element={<ChangeArticles />} />
      </Routes>
    </Router>
  );
}

export default App;
