// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false }) => {
  let baseStyles = 'font-semibold rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white shadow-md';
      break;
    case 'outline':
      variantStyles = 'border border-indigo-500 text-indigo-600 hover:bg-indigo-50';
      break;
    default:
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md';
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
    default:
      sizeStyles = 'px-4 py-2 text-base';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;