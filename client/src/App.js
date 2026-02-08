import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeScreen from './pages/WelcomeScreen';
import QuestionScreen from './pages/QuestionScreen';
import CelebrationScreen from './pages/CelebrationScreen';
import AdminDashboard from './pages/AdminDashboard';
import axios from 'axios';

// --- API CONFIGURATION ---
// This directs all frontend requests to your Render backend instead of Vercel
const API_URL = process.env.REACT_APP_API_URL || 'https://valentine-r19s.onrender.com';
axios.defaults.baseURL = API_URL;

console.log('API Connected to:', API_URL);

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // 1. Initial Call: Create a user when "Open Surprise" is clicked
  const handleStartSurprise = async (name) => {
    try {
      const response = await axios.post('/api/responses/create-user', { name });
      setUserName(name);
      setUserId(response.data.userId);
      setCurrentScreen(1);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error starting the surprise. Please try again.');
    }
  };

  // 2. Sequential Call: Save responses for each question
  const handleNextScreen = async (screenNumber, buttonClicked) => {
    try {
      await axios.post('/api/responses/save-response', {
        userId,
        screenNumber: currentScreen,
        response: buttonClicked
      });
      setCurrentScreen(screenNumber);
    } catch (error) {
      console.error('Error saving response:', error);
      // Move to next screen even if DB save fails to keep user experience smooth
      setCurrentScreen(screenNumber);
    }
  };

  // 3. Final Call: Mark the process as complete
  const handleCelebrate = async () => {
    try {
      await axios.post('/api/responses/save-response', {
        userId,
        screenNumber: currentScreen,
        response: 'Yes'
      });

      await axios.post('/api/responses/complete', { userId });
      setCurrentScreen(6);
    } catch (error) {
      console.error('Error completing celebration:', error);
      setCurrentScreen(6);
    }
  };

  // Admin access (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="App">
      {/* Welcome Screen (Screen 0) */}
      {currentScreen === 0 && (
        <WelcomeScreen onStart={handleStartSurprise} />
      )}
      
      {/* Question Screens (Screens 1-5) */}
      {currentScreen >= 1 && currentScreen <= 5 && (
        <QuestionScreen
          screenNumber={currentScreen}
          onNext={handleNextScreen}
          onCelebrate={handleCelebrate}
        />
      )}
      
      {/* Final Celebration (Screen 6) */}
      {currentScreen === 6 && (
        <CelebrationScreen userName={userName} />
      )}
    </div>
  );
}

export default App;