import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center font-bold border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary keeps black text usually, but for dark mode we might want to ensure it pops. 
    // Keeping it yellow with black text is the most consistent brand look.
    primary: "bg-primary text-[#181711] border-black dark:border-[#f8f8f5] shadow-hard dark:shadow-hard-white hover:bg-[#ffe140]",
    
    // Secondary turns dark in dark mode
    secondary: "bg-white dark:bg-black text-[#181711] dark:text-white border-black dark:border-[#f8f8f5] shadow-hard dark:shadow-hard-white hover:bg-gray-50 dark:hover:bg-gray-900",
    
    // Icon turns dark in dark mode
    icon: "bg-white dark:bg-black text-[#181711] dark:text-white border-black dark:border-[#f8f8f5] rounded-full p-2 shadow-hard dark:shadow-hard-white hover:bg-gray-50 dark:hover:bg-gray-900 aspect-square"
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const roundedClass = variant === 'icon' ? 'rounded-full' : 'rounded-lg';
  const paddingClass = variant === 'icon' ? '' : 'px-6 py-3';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${roundedClass} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};