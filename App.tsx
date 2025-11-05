
import React, { useState, useCallback } from 'react';
import type { User } from './types';
import LoginScreen from './components/LoginScreen';
import ManholeSelector from './components/ManholeSelector';
import Dashboard from './components/Dashboard';

type View = 'login' | 'selector' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedManholeId, setSelectedManholeId] = useState<string | null>(null);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('selector');
  }, []);

  const handleSelectManhole = useCallback((manholeId: string) => {
    setSelectedManholeId(manholeId);
    setCurrentView('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setSelectedManholeId(null);
    setCurrentView('login');
  }, []);

  const handleBackToSelector = useCallback(() => {
    setSelectedManholeId(null);
    setCurrentView('selector');
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'selector':
        return <ManholeSelector onSelectManhole={handleSelectManhole} onLogout={handleLogout} />;
      case 'dashboard':
        if (selectedManholeId) {
          return <Dashboard manholeId={selectedManholeId} onBack={handleBackToSelector} onLogout={handleLogout} />;
        }
        // Fallback if ID is somehow null
        setCurrentView('selector');
        return null;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 antialiased">
      {renderContent()}
    </div>
  );
};

export default App;
