import React from 'react';
import '../App.css';

function Home() {
  return (
    <div className="home">
      <h2 className="subtitle">~ An Online Judge built with MERN Stack</h2>
      <img src="/cat.gif" alt="Typing Cat" className="cat-img" />
      <p className="desc">Have fun and improve your skills</p>
      <p className="desc">Beat the challenge faster than your opponent using your ❤️ language</p>
      <button className="go-button">Go To Problems List</button>
    </div>
  );
}

export default Home;
