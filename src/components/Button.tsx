import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'transparent' | 'logout';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  loading = false,
  loadingText = 'Loading...'
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    transparent: 'btn-transparent',
    logout: 'btn-logout'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
