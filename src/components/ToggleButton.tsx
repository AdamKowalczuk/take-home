import React from 'react';

type ToggleButtonProps = {
  isToggled?: boolean;
  onToggle: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled = true,
  onToggle,
  activeLabel,
  inactiveLabel,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1`}
    >
      {isToggled ? activeLabel : inactiveLabel}
    </button>
  );
};
