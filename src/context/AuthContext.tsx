import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/authAPI';
import { User, AuthResponse, SignupData, SigninData, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile()
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
      const response = await authAPI.signup(userData);
      const { access_token, user: userInfo } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(userInfo);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const signin = async (credentials: SigninData): Promise<AuthResponse> => {
    try {
      const response = await authAPI.signin(credentials);
      const { access_token, user: userInfo } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(userInfo);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const fetchProfile = async (): Promise<User> => {
    try {
      const response = await authAPI.getProfile();
      const profileData = response.data;
      
      setUser(prevUser => ({
        ...prevUser,
        ...profileData
      }));
      
      return profileData;
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signup,
    signin,
    logout,
    fetchProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
