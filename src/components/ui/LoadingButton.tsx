'use client';

import { motion } from 'framer-motion';
import { LoadingButtonProps } from '@/types';

const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
  />
);

export const LoadingButton = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: LoadingButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        relative inline-flex items-center justify-center px-6 py-3 
        bg-gradient-to-r from-rage-500 to-rage-600 
        text-white font-semibold rounded-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-rage-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:from-rage-600 hover:to-rage-700
        shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </motion.button>
  );
}; 