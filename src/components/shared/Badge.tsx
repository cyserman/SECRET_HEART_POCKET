import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'category' | 'memory' | 'price';
  className?: string;
}

export const Badge = ({ children, variant = 'category', className = '' }: BadgeProps) => {
  const variantClasses = {
    category: 'bg-ember-500/90 backdrop-blur-sm text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider border border-ember-300/30',
    memory: 'glass-warm text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/15',
    price: 'bg-ember-400/90 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-xs border border-ember-300/30'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};
