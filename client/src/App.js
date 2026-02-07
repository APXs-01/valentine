import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './pages/WelcomeScreen';
import QuestionScreen from './pages/QuestionScreen';
import CelebrationScreen from './pages/CelebrationScreen';
import AdminDashboard from './pages/AdminDashboard';
import axios from 'axios';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

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

  const handleNextScreen = async (screenNumber, buttonClicked) => {
    try {
      // Save the response to database
      await axios.post('/api/responses/save-response', {
        userId,
        screenNumber: currentScreen,
        response: buttonClicked
      });

      setCurrentScreen(screenNumber);
    } catch (error) {
      console.error('Error saving response:', error);
      // Continue anyway even if saving fails
      setCurrentScreen(screenNumber);
    }
  };

  const handleCelebrate = async () => {
    try {
      // Save final response
      await axios.post('/api/responses/save-response', {
        userId,
        screenNumber: currentScreen,
        response: 'Yes'
      });

      // Mark as completed
      await axios.post('/api/responses/complete', { userId });

      setCurrentScreen(6);
    } catch (error) {
      console.error('Error completing celebration:', error);
      setCurrentScreen(6);
    }
  };

  // Admin access (press Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(!showAdmin);
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
      {currentScreen === 0 && (
        <WelcomeScreen onStart={handleStartSurprise} />
      )}
      
      {currentScreen >= 1 && currentScreen <= 5 && (
        <QuestionScreen
          screenNumber={currentScreen}
          onNext={handleNextScreen}
          onCelebrate={handleCelebrate}
        />
      )}
      
      {currentScreen === 6 && (
        <CelebrationScreen userName={userName} />
      )}
    </div>
  );
}

export default App;