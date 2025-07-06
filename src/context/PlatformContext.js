// src/context/PlatformContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); 
  const [solvedProblems, setSolvedProblems] = useState([]);

  // Fetch solved problems when user logs in
  useEffect(() => {
    if (currentUser) {
      async function fetchSolved() {
        try {
          const res = await axios.get(`http://localhost:5000/api/user/${currentUser._id}/solved`, {
            withCredentials: true
          });
          setSolvedProblems(res.data.solvedProblems);
        } catch (err) {
          console.error('Failed to fetch solved problems:', err);
        }
      }
      fetchSolved();
    } else {
      setSolvedProblems([]); // Reset if user logs out
    }
  }, [currentUser]);

  // Function to mark problem as solved (locally + optional API call)
  const markAsSolved = (problemId) => {
    if (!solvedProblems.includes(problemId)) {
      setSolvedProblems(prev => [...prev, problemId]);
      // Optional: send to server
      // axios.post(`http://localhost:5000/api/user/${currentUser._id}/solved`, { problemId }, { withCredentials: true });
    }
  };

  return (
    <PlatformContext.Provider value={{
      currentUser,
      setCurrentUser,
      solvedProblems,
      setSolvedProblems,
      markAsSolved
    }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);
