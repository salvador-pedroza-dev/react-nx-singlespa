import React from 'react';

type SelectOption = {
  value?: string;
  label: string;
};

type SelectProps = {
  id?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
  'aria-describedby'?: string;
};

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  helperText,
  error = false,
  'aria-describedby': ariaDescribedby,
}) => {
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className="mb-6 w-full">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={ariaDescribedby || helperId}
          className={`
            peer w-full px-3 h-14 rounded-md border bg-surface text-on-surface font-sans text-base outline-none transition-colors
            appearance-none
            ${error ? 'border-error' : 'border-outline'}
            ${
              disabled
                ? 'bg-surface-container-low cursor-not-allowed opacity-60'
                : ''
            }
            focus:border-primary
          `}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <option value="" disabled hidden>
            {/* Placeholder for floating label */}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
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
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant flex items-center">
          <span
            className="material-symbols-outlined text-xl"
            aria-hidden="true"
          >
            arrow_drop_down
          </span>
        </span>
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

export default Select;
