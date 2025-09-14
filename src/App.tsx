import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthForm from './components/AuthForm';
import Application from './components/Application';
import { AuthProvider, useAuth } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/application" element={<ProtectedRoute />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  
  return user ? <Application /> : <Navigate to="/" />;
};

export default App;
