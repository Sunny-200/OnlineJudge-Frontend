import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar'; // ✅ New import
import ContributeProblem from './components/ContributeProblem';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Navbar /> {/* ✅ Navbar now inside Router context */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contribute" element={<ContributeProblem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
