import React from 'react';

const Button = ({ children, className = '',  }) => {
  return (
    <button
      className={`px-4 py-2 bg-red text-white rounded-md hover:bg-[#0e302f]/90 
        transition-colors duration-200 ${className}`}
    
    >
      {children}
    </button>
  );
};

export default Button;
