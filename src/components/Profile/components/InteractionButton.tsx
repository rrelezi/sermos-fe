import React from 'react';
import { InteractionType } from '../../../services/UserService';

export interface IInteraction extends Partial<HTMLButtonElement> {
  label: string;
  type: InteractionType;
}

export interface IInteractionButtonProps extends IInteraction {
  onClick: (type: InteractionType) => void;
}

const InteractionButton: React.FC<IInteractionButtonProps> = ({
  className = '',
  label,
  type,
  onClick,
  ...otherProps
}: IInteractionButtonProps) => {
  return (
    <button
      {...(otherProps as any)}
      type='button'
      className={`bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs mx-1 px-4 py-2 rounded transition-colors whitespace-nowrap ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(type);
      }}
    >
      {label}
    </button>
  );
};

export default InteractionButton;
