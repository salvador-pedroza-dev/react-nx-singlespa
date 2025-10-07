import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'filled' | 'outlined' | 'text';
  className?: string;
  ariaLabel?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'filled',
  className = '',
  ariaLabel,
}) => {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium font-sans transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-10 px-6 text-base';

  const variants = {
    filled:
      'bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-on-surface/12 disabled:text-on-surface/38 shadow-md',
    outlined:
      'border border-outline bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 disabled:border-on-surface/12 disabled:text-on-surface/38',
    text: 'bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 disabled:text-on-surface/38',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
