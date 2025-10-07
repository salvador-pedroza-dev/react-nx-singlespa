import React from 'react';

type TextFieldProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
  'aria-describedby'?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value = '',
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  helperText,
  error = false,
  'aria-describedby': ariaDescribedby,
}) => {
  const inputId = id;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className="mb-6 w-full">
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          required={required}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={ariaDescribedby || helperId}
          className={`
    peer w-full px-3 h-14 rounded-md border text-on-surface font-sans text-base outline-none transition-colors
    ${error ? 'border-error' : 'border-outline'}
    ${disabled ? 'bg-surface-container-low cursor-not-allowed opacity-60' : ''}
    focus:border-primary
  `}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <label
          htmlFor={inputId}
          className={`
            absolute left-3 -top-2.5 bg-surface px-1 text-on-surface-variant font-medium pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant
            peer-focus:-top-2.5 peer-focus:bg-surface peer-focus:px-1 peer-focus:text-sm peer-focus:text-primary
            ${value ? '-top-2.5 bg-surface px-1 text-sm' : ''}
            ${error ? 'text-error peer-focus:text-error' : ''}
            ${disabled ? 'opacity-60' : ''}
            text-sm
          `}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-error ml-0.5">
              *
            </span>
          )}
        </label>
      </div>
      {helperText && (
        <div
          id={helperId}
          className={`mt-1 text-sm ${
            error ? 'text-error' : 'text-on-surface-variant'
          }`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
