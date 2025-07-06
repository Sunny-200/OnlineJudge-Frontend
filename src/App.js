import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ContributeProblem from './components/ContributeProblem';
import ProblemsList from './components/ProblemsList';
import ProblemDetails from './components/ProblemDetails';
import { PlatformProvider } from './context/PlatformContext';
import './App.css';

function App() {
  return (
    <PlatformProvider>
      <Router>
        <div className="main-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contribute" element={<ContributeProblem />} />
            <Route path="/problems" element={<ProblemsList />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
          </Routes>
        </div>
      </Router>
    </PlatformProvider>
  );
}

export default App;
