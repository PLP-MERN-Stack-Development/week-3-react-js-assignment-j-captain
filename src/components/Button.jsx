 import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  const baseClasses = "font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg",
    secondary: "bg-white/70 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600",
    danger: "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;