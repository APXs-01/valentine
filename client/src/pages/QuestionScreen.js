import React, { useRef, useState } from 'react';

function QuestionScreen({ screenNumber, onNext, onCelebrate }) {
  const noBtnRef = useRef(null);
  const [noButtonText, setNoButtonText] = useState('No');

  const screens = {
    1: { emoji: '😘', warning: null },
    2: { emoji: '💖', warning: 'Are you sure?' },
    3: { emoji: '❤️', warning: 'You better say yes...' },
    4: { emoji: '😍', warning: 'Last chance!' }
  };

  const currentScreen = screens[screenNumber];

  const handleYesClick = () => {
    // ANY Yes click goes directly to celebration!
    onCelebrate();
  };

  const handleNoClick = (e) => {
    // Only move button on screen 4 (Last chance!)
    if (screenNumber === 4) {
      e.preventDefault();
      moveButton();
      changeButtonText();
    } else {
      onNext(screenNumber + 1, 'No');
    }
  };

  const changeButtonText = () => {
    setNoButtonText("No no, you're mine!!!! 💕");
    setTimeout(() => setNoButtonText('No'), 3000);
  };

  const moveButton = () => {
    const button = noBtnRef.current;
    if (!button) return;

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const buttonRect = button.getBoundingClientRect();
    const margin = 100;
    
    let newX, newY;
    let attempts = 0;

    do {
      newX = margin + Math.random() * (vw - buttonRect.width - 2 * margin);
      newY = margin + Math.random() * (vh - buttonRect.height - 2 * margin);
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(newX - buttonRect.left) < 150 && 
      Math.abs(newY - buttonRect.top) < 150
    );

    button.style.position = 'fixed';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transition = 'all 0.3s ease';
  };

  const handleNoHover = () => {
    if (screenNumber === 4) {
      moveButton();
      changeButtonText();
    }
  };

  return (
    <div className="container">
      <div className="screen question-screen">
        <div className="emoji-box">{currentScreen.emoji}</div>
        <p className="question-text">Will you be my valentine?</p>
        {currentScreen.warning && (
          <p className="warning-text">{currentScreen.warning}</p>
        )}
        
        <div className="button-container">
          <button className="answer-btn" onClick={handleYesClick}>
            Yes
          </button>
          <button 
            ref={noBtnRef}
            className="no-btn" 
            onClick={handleNoClick}
            onMouseOver={handleNoHover}
          >
            {noButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;