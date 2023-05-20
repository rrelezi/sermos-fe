import React, { useState } from 'react';
import UserService, { InteractionType, RelationType } from '../../../services/UserService';
import InteractionButton, { IInteraction } from './InteractionButton';
import UserDetailsDialog from '../../Search/UserDetailsDialog';

export interface IUser {
  id: number;
  name: string;
  avatar?: string;
  visited_at?: string;
}

export interface IUserDetails extends IUser {
  bio?: string;
  relation?: RelationType;
  isRelationCreatedByMe?: boolean;
}

const User: React.FC<
  {
    user: IUser;
    interactionFn: (user: IUser, interactionType: InteractionType) => void;
    interactions?: Array<IInteraction>;
    closeDetailsButtonLabel?: string;
    reloadTrigger?: number;
  } & Partial<HTMLDivElement>
> = ({
  className = '',
  user,
  interactions,
  interactionFn,
  closeDetailsButtonLabel,
  reloadTrigger,
  ...otherProps
}) => {
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);

  return (
    <>
      <div
        {...(otherProps as any)}
        className={`w-full flex items-center justify-between py-3 px-2 border-t cursor-pointer hover:bg-neutral-100 transition-colors ${className}`}
        onClick={setIsUserDetailsDialogOpen.bind(null, true)}
      >
        <span className='w-full flex items-center'>
          <img
            draggable={false}
            alt='...'
            src={user.avatar || UserService.defaultAvatar}
            className='w-12 h-12 mr-4 shadow-md rounded-full'
          ></img>
          <h1>{user.name}</h1>
        </span>
        {user.visited_at ? (
          <small className='ml-auto whitespace-nowrap'>
            {user.visited_at
              ? `${new Date(user.visited_at).toLocaleDateString()} ${new Date(
                  user.visited_at
                ).toLocaleTimeString()}`
              : null}
          </small>
        ) : null}
        {interactions?.length ? (
          <span className='flex items-center'>
            {interactions.map((interaction: IInteraction, index: number) => (
              <InteractionButton
                key={index}
                {...interaction}
                onClick={interactionFn.bind(null, user)}
              />
            ))}
          </span>
        ) : null}
      </div>
      {isUserDetailsDialogOpen ? (
        <UserDetailsDialog
          reloadTrigger={reloadTrigger}
          closeLabel={closeDetailsButtonLabel}
          user={user}
          interactionFn={interactionFn.bind(null, user)}
          onClose={setIsUserDetailsDialogOpen.bind(null, false)}
        />
      ) : null}
    </>
  );
};

export default User;
