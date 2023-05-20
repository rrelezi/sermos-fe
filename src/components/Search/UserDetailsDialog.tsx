import React, { useEffect, useState } from 'react';
import UserService, { InteractionType, RelationType } from '../../services/UserService';
import { IUser, IUserDetails } from '../Profile/components/User';
import { toast } from 'react-hot-toast';
import InteractionButton, { IInteraction } from '../Profile/components/InteractionButton';
import { useSelector } from 'react-redux';

const UserDetailsDialog: React.FC<{
  user: IUser;
  onClose: () => void;
  interactionFn: (interactionType: InteractionType) => void;
  closeLabel?: string;
  reloadTrigger?: number;
}> = ({ user, onClose, interactionFn, closeLabel = 'Close', reloadTrigger = 0 }) => {
  const myId: number = useSelector((state: any) => state.profile.id);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [interactions, setInteractions] = useState<Array<IInteraction>>([]);

  useEffect(() => {
    UserService.getUserDetailsById(user.id)
      .then(setUserDetails)
      .catch((error: Error) =>
        toast(error?.message ?? `Error while trying to load details for user "${user.name}"`)
      );
  }, [user, reloadTrigger]);

  useEffect(() => {
    if (userDetails && userDetails.id !== myId) {
      if (userDetails.relation === RelationType.None) {
        setInteractions([
          {
            className: '!bg-green-500 !hover:bg-green-600 !focus:bg-green-600',
            label: 'Add Friend',
            type: InteractionType.SEND
          },
          {
            className: '!bg-red-500 !hover:bg-red-600 !focus:bg-red-600',
            label: 'Block',
            type: InteractionType.BLOCK
          }
        ]);
      }
      if (userDetails.relation === RelationType.Active) {
        setInteractions([
          {
            className: '!bg-amber-500 !hover:bg-amber-600 !focus:bg-amber-600',
            label: 'Unfriend',
            type: InteractionType.UNFRIEND
          },
          {
            className: '!bg-red-500 !hover:bg-red-600 !focus:bg-red-600',
            label: 'Block',
            type: InteractionType.BLOCK
          }
        ]);
      }
      if (userDetails.relation === RelationType.Pending) {
        if (userDetails.isRelationCreatedByMe) {
          setInteractions([
            {
              className: '!bg-orange-500 !hover:bg-orange-600 !focus:bg-orange-600',
              label: 'Cancel Request',
              type: InteractionType.CANCEL
            },
            {
              className: '!bg-red-500 !hover:bg-red-600 !focus:bg-red-600',
              label: 'Block',
              type: InteractionType.BLOCK
            }
          ]);
        } else {
          setInteractions([
            {
              className: '!bg-green-500 !hover:bg-green-600 !focus:bg-green-600',
              label: 'Accept',
              type: InteractionType.ACCEPT
            },
            {
              className: '!bg-orange-500 !hover:bg-orange-600 !focus:bg-orange-600',
              label: 'Refuse',
              type: InteractionType.REFUSE
            }
          ]);
        }
      }
      if (userDetails.relation === RelationType.Blocked) {
        setInteractions([
          {
            label: 'Unblock',
            type: InteractionType.UNBLOCK
          }
        ]);
      }
    }
  }, [userDetails, myId]);

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='ml-2 text-3xl font-semibold'>Profile Details</h3>
            </div>
            <div
              role='main'
              className='min-w-[700px] max-w-[100vw] min-h-[300px] max-h-[100vh] p-6 flex-auto text-center'
            >
              {userDetails ? (
                <>
                  <div className='flex flex-wrap justify-center'>
                    <div className='w-full 2xl:w-3/12 px-4 flex justify-center'>
                      <img
                        draggable={false}
                        alt='...'
                        src={userDetails.avatar}
                        className='max-w-[150px] shadow-lg rounded-full'
                      ></img>
                    </div>
                  </div>
                  <h3 className='text-3xl font-semibold leading-normal mb-2 text-blueGray-700'>
                    {userDetails.name} {userDetails.id === myId ? '(you)' : ''}
                  </h3>
                  <pre className='text-center px-4 overflow-auto max-h-[100px] max-w-lg mx-auto mb-2 text-blueGray-600 mt-4 py-1 border border-gray-100 rounded shadow-sm'>
                    {userDetails.bio?.trim() || 'No bio yet'}
                  </pre>
                  {interactions?.length ? (
                    <div className='flex flex-wrap items-center justify-center mt-6'>
                      {interactions.map((interaction: IInteraction, index: number) => (
                        <InteractionButton key={index} {...interaction} onClick={interactionFn} />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                `Loading ${user.name}'s profile...`
              )}
            </div>
            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='bg-neutral-500 hover:bg-neutral-600 focus:bg-neutral-600 uppercase text-white font-bold hover:shadow-md shadow text-xs mx-1 px-4 py-2 rounded transition-colors'
                type='button'
                onClick={onClose}
              >
                {closeLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default UserDetailsDialog;
