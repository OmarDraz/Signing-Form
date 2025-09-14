import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignupData, SigninData } from '../types/auth';
import { validateEmail, validateName, validatePassword } from '../utils/validation';
import Button from './Button';
import Input from './Input';

const AuthForm: React.FC = () => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { signup, signin, user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in and redirect to application page
  useEffect(() => {
    if (!loading && user) {
      navigate('/application');
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading">Checking authentication...</div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (success) setSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Name validation (only for signup)
    if (isSignUpMode) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      } else if (!validateName(formData.name)) {
        newErrors.name = 'Name must be at least 3 characters long';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignUpMode) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0]; // Show first error
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrors({});
    setSuccess('');
    setIsSubmitting(true);

    try {
      if (isSignUpMode) {
        await signup(formData);
        setSuccess('Account created successfully! Redirecting...');
        // Redirect to application page after successful signup
        setTimeout(() => {
          navigate('/application');
        }, 1500);
      } else {
        const signinData: SigninData = {
          email: formData.email,
          password: formData.password
        };
        await signin(signinData);
        setSuccess('Signed in successfully! Redirecting...');
        // Redirect to application page after successful signin
        setTimeout(() => {
          navigate('/application');
        }, 1500);
      }
    } catch (err: any) {
      setErrors({ 
        general: err.response?.data?.message || err.message || 'An error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setSuccess('');
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              icon="envelope"
              required
              error={errors.email}
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon="lock"
              required
              error={errors.password}
            />
            
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              loadingText="Signing in..."
            >
              Login
            </Button>
            {errors.general && <div className="error-message">{errors.general}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>

          <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              icon="user"
              required
              error={errors.name}
            />
            
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              icon="envelope"
              required
              error={errors.email}
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon="lock"
              required
              minLength={8}
              error={errors.password}
            />
            
            <div className="password-requirements">
              <small>Password must contain:</small>
              <ul>
                <li>At least 8 characters</li>
                <li>At least one letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              loadingText="Creating Account..."
            >
              Sign up
            </Button>
            {errors.general && <div className="error-message">{errors.general}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Create an account to access the application and enjoy our services!
            </p>
            <Button
              variant="transparent"
              onClick={toggleMode}
            >
              Sign up
            </Button>
          </div>
          <img src="/img/log.svg" className="image" alt="Sign in" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Welcome back! Sign in to access your account and continue your journey.
            </p>
            <Button
              variant="transparent"
              onClick={toggleMode}
            >
              Sign in
            </Button>
          </div>
          <img src="/img/register.svg" className="image" alt="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
