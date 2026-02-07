import React, { useEffect } from 'react';

function CelebrationScreen({ userName }) {
  useEffect(() => {
    createConfetti();
    createFloatingHearts();
    
    setTimeout(() => {
      alert(`Happy Valentine's Day, ${userName}! 💕💕💕`);
    }, 1000);
  }, [userName]);

  const createConfetti = () => {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'];
    
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }, i * 30);
    }
  };

  const createFloatingHearts = () => {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-hearts';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 6000);
      }, i * 200);
    }
  };

  return (
    <div className="container">
      <div className="screen celebration-screen">
        <h1>YAYYYY!!!</h1>
        <div className="firework">🎆</div>
        <p className="subtitle">I knew you'd say yes! 💝</p>
      </div>
    </div>
  );
}

export default CelebrationScreen;