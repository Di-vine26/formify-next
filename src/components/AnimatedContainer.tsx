
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedContainer = ({ 
  children, 
  className, 
  delay = 0 
}: AnimatedContainerProps) => {
  const animationStyle = {
    animationDelay: `${delay}ms`,
    opacity: 0, // Start with opacity 0
    animationFillMode: 'forwards' as const // Keep the final state
  };

  return (
    <div 
      className={cn(
        'animate-fade-in-up',
        className
      )}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
