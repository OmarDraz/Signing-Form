import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: 'user' | 'envelope' | 'lock';
  required?: boolean;
  minLength?: number;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  minLength,
  error,
  className = ''
}) => {
  const getIconClass = () => {
    switch (icon) {
      case 'user':
        return 'fas fa-user';
      case 'envelope':
        return 'fas fa-envelope';
      case 'lock':
        return 'fas fa-lock';
      default:
        return '';
    }
  };

  return (
    <div className={`input-field ${className}`}>
      {icon && <i className={getIconClass()}></i>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;
