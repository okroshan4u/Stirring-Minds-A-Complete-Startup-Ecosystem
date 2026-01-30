'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/api';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hoverable = false,
  onClick,
}: CardProps) {
  const baseStyles = 'bg-white rounded-2xl border border-neutral-200 overflow-hidden';
  
  const CardWrapper = hoverable ? motion.div : 'div';
  const motionProps = hoverable ? {
    whileHover: { 
      y: -4,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    },
    transition: { duration: 0.2 },
  } : {};

  return (
    <CardWrapper
      className={cn(
        baseStyles,
        hoverable && 'cursor-pointer transition-shadow',
        className
      )}
      onClick={onClick}
      {...(hoverable ? motionProps : {})}
    >
      {children}
    </CardWrapper>
  );
}