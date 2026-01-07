import { ReactNode, cloneElement, isValidElement } from 'react';

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavButton = ({ icon, label, isActive, onClick }: NavButtonProps) => {
  // Clone icon element and add fill class if active
  const enhancedIcon = isValidElement(icon)
    ? cloneElement(icon as any, { 
        className: isActive ? 'fill-ember-400' : ''
      })
    : icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-6 py-2 transition-all relative rounded-xl ${
        isActive ? 'text-ember-400' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {isActive && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-ember-400 to-transparent rounded-full"></div>
      )}
      <div className={isActive ? 'drop-shadow-lg' : ''}>
        {enhancedIcon}
      </div>
      <span className="text-[11px] font-semibold tracking-wide">{label}</span>
    </button>
  );
};
