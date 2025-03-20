
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import AnimatedContainer from './AnimatedContainer';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  animationDelay?: number;
}

const FormField = ({
  label,
  children,
  className,
  containerClassName,
  labelClassName,
  animationDelay = 0,
}: FormFieldProps) => {
  return (
    <AnimatedContainer 
      className={cn('mb-5', containerClassName)} 
      delay={animationDelay}
    >
      <label className={cn('form-label', labelClassName)}>
        {label}
      </label>
      <div className={cn('mt-1', className)}>
        {children}
      </div>
    </AnimatedContainer>
  );
};

export default FormField;
