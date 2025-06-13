'use client';

import { motion } from 'framer-motion';
import { FormFieldProps } from '@/types';

export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
}: FormFieldProps) => {
  const inputId = `${name}-input`;

  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="text-rage-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`
            w-full px-4 py-3 
            bg-dark-800/50 border border-dark-700/50 
            rounded-lg text-white placeholder-gray-400 
            focus:ring-2 focus:ring-rage-500 focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3 
            bg-dark-800/50 border border-dark-700/50 
            rounded-lg text-white 
            focus:ring-2 focus:ring-rage-500 focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        >
          <option value="">Select {label}</option>
          <option value="basic">Quick Smash</option>
          <option value="group">Group Smash</option>
          <option value="corporate">Corporate Smash</option>
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
          className={`
            w-full px-4 py-3 
            bg-dark-800/50 border border-dark-700/50 
            rounded-lg text-white placeholder-gray-400 
            focus:ring-2 focus:ring-rage-500 focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
      )}
      
      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}; 