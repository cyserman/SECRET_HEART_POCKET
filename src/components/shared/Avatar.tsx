import { ReactNode } from 'react';

interface AvatarProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-5 h-5 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-3xl'
};

export const Avatar = ({ children, size = 'md', className = '' }: AvatarProps) => {
  return (
    <div className={`rounded-full bg-gradient-to-br from-ember-400 to-ember-500 flex items-center justify-center text-white font-bold shadow-lg ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};
