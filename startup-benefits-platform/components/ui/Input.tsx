'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/api';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative"
        >
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-neutral-300',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              'transition-all duration-200 outline-none',
              'placeholder:text-neutral-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;