import React, { useCallback, useEffect, useState } from 'react';
import User, { IUser } from '../Profile/components/User';
import AppIcon from '../AppIcon';
import UserService, { InteractionType } from '../../services/UserService';
import { toast } from 'react-hot-toast';

const SearchUserDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [query, setQuery] = useState<string>('');
  const [reloadUserDetailsTrigger, setReloadUserDetailsTrigger] = useState<number>(0);

  const search = () => {
    if (query?.trim()) {
      UserService.search(query)
        .then(setUsers)
        .catch((error: Error) => toast(error?.message ?? 'Error while searching for people!'));
    } else {
      setUsers([]);
    }
  };

  const interactionFn = useCallback(
    (user: IUser, interactionType: InteractionType, event?: Event) => {
      // Do not prompt user if "Add Friend", "Accept" or "Unblock" (non-destructive actions), but proceed directly with the API call
      if (
        interactionType === InteractionType.SEND ||
        interactionType === InteractionType.ACCEPT ||
        interactionType === InteractionType.UNBLOCK ||
        window.confirm(`Are you sure you want to perform this action to user "${user.name}"?`)
      ) {
        UserService.interact({ friendId: user.id, interactionType })
          .then(() => {
            toast(`Successfully performed action "${interactionType}" on user ${user.name}`);
            setReloadUserDetailsTrigger((prev: number) => prev + 1);
          })
          .catch((error: Error) => {
            toast(
              error?.message ??
                `Error while trying to perform action "${interactionType}" on user ${user.name}`
            );
          });
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimeoutRef = setTimeout(search, 1000);
    return () => clearTimeout(debounceTimeoutRef);
  }, [query]);

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='ml-2 text-3xl font-semibold'>Search People</h3>
            </div>
            <div role='main' className='relative p-6 flex-auto'>
              <div className='flex items-center'>
                <label htmlFor='search' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <AppIcon icon={'ri-search-line'} scale={1} />
                  </div>
                  <input
                    autoCapitalize='off'
                    autoComplete='off'
                    autoFocus
                    type='text'
                    id='search'
                    className='min-w-[512px] max-w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                    placeholder='Search'
                    required
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              {users?.length ? (
                <ul>
                  {users.map((user: IUser, index: number) => (
                    <li key={user.id}>
                      <User
                        reloadTrigger={reloadUserDetailsTrigger}
                        className={!index ? '!border-t-0' : ''}
                        closeDetailsButtonLabel='Back'
                        user={user}
                        interactionFn={interactionFn}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='bg-neutral-500 hover:bg-neutral-600 focus:bg-neutral-600 uppercase text-white font-bold hover:shadow-md shadow text-xs mx-1 px-4 py-2 rounded transition-colors'
                type='button'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default SearchUserDialog;
