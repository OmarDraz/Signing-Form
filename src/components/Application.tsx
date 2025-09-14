import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Application: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="application-container">
      <div className="application-card">
        <h1>Welcome to the application.</h1>
        <p>Hello, {user?.name || 'User'}!</p>
        <div className="logout-section">
          <Button
            variant="logout"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Application;
