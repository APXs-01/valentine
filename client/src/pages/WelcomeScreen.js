import React, { useState } from 'react';

function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="container">
      <div className="screen welcome-screen">
        <h1>Hi babe 💕</h1>
        <p>Check this out (it's safe I swear)</p>
        <p>-Love, your babe</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
          <br />
          <button 
            type="submit" 
            className="surprise-btn"
            disabled={!name.trim()}
          >
            Open Surprise
          </button>
        </form>
      </div>
    </div>
  );
}

export default WelcomeScreen;