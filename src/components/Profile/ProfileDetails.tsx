import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppIcon from '../AppIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserService, { InteractionType } from '../../services/UserService';
import { toast } from 'react-hot-toast';
import { setUserProfileBio } from '../../store/User';
import User, { IUser } from './components/User';
import { IInteraction } from './components/InteractionButton';

const ProfileDetails: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const bioTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null);
  const [profileViews, setProfileViews] = useState<Array<IUser> | null>(null);
  const [friendList, setFriendList] = useState<Array<IUser> | null>(null);
  const [requestList, setRequestList] = useState<Array<IUser> | null>(null);
  const [blockList, setBlockList] = useState<Array<IUser> | null>(null);

  const logout = (): void => {
    UserService.logout()
      .then(() =>
        setTimeout(() => {
          toast.success('Log out was successful');
          navigate('/login');
        }, 200)
      )
      .catch(({ message }) => toast.error(message));
  };

  const saveBio = (): void => {
    const newBio: string = bioTextareaRef.current?.value?.trim() || '';
    if (newBio.length) {
      dispatch(setUserProfileBio(newBio))
        .then(() => setIsEditingBio(false))
        .catch(({ message }: any) => toast.error(message));
    }
  };

  const loadProfileViews = (): void => {
    UserService.getProfileViews().then(setProfileViews);
  };

  const loadFriendList = (): void => {
    UserService.getFriendList().then(setFriendList);
  };

  const loadRequestList = (): void => {
    UserService.getRequestList().then(setRequestList);
  };

  const loadBlockList = (): void => {
    UserService.getBlockList().then(setBlockList);
  };

  const interactionFn = useCallback((user: IUser, interactionType: InteractionType): void => {
    // Do not prompt user if "Accept" or "Unblock" (non-destructive actions), but proceed directly with the API call
    if (
      interactionType === InteractionType.ACCEPT ||
      interactionType === InteractionType.UNBLOCK ||
      window.confirm(`Are you sure you want to perform this action to user "${user.name}"?`)
    ) {
      UserService.interact({ friendId: user.id, interactionType })
        .then(() => {
          toast(`Successfully performed action "${interactionType}" on user ${user.name}`);
          if (
            [InteractionType.UNFRIEND, InteractionType.ACCEPT, InteractionType.BLOCK].includes(
              interactionType
            )
          ) {
            loadFriendList();
            if (interactionType === InteractionType.ACCEPT) {
              loadRequestList();
            } else if (InteractionType.BLOCK) {
              loadBlockList();
            }
          } else if (interactionType === InteractionType.REFUSE) {
            loadRequestList();
          } else if (interactionType === InteractionType.UNBLOCK) {
            loadBlockList();
          }
        })
        .catch((error: Error) => {
          toast(
            error?.message ??
              `Error while trying to perform action "${interactionType}" on user ${user.name}`
          );
        });
    }
  }, []);

  const getUserInteractions = useCallback(
    (relationType: 'friend' | 'request' | 'block'): Array<IInteraction> => {
      if (relationType === 'friend') {
        return [
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
        ];
      }
      if (relationType === 'request') {
        return [
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
        ];
      }
      if (relationType === 'block') {
        return [
          {
            label: 'Unblock',
            type: InteractionType.UNBLOCK
          }
        ];
      }
      return [];
    },
    []
  );

  useEffect(() => {
    loadProfileViews();
    loadFriendList();
    loadRequestList();
    loadBlockList();
  }, []);

  return (
    <div className={'flex flex-col bg-white rounded w-full h-full p-5'}>
      <div className='flex items-center mb-5'>
        <AppIcon
          icon={'ri-arrow-left-circle-line'}
          scale={2}
          className={'cursor-pointer mx-5'}
          onClick={() => navigate('/main/home')}
        />
        <h1 className='font-medium text-lg'>My Profile</h1>
      </div>
      <main className='profile-page text-gray-700 overflow-y-auto'>
        <section className='relative block h-[350px]'>
          <div className='absolute top-0 w-full h-full rounded-lg bg-neutral-50'></div>
        </section>
        <section className='relative mt-16 bg-blueGray-200'>
          <div className='container mx-auto px-4'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg -mt-64'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full 2xl:w-3/12 px-4 2xl:order-2 flex justify-center'>
                    <img
                      draggable={false}
                      alt='...'
                      src={profile.profilePhotoPath}
                      className='shadow-lg rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                    ></img>
                  </div>
                  <div className='w-full 2xl:w-4/12 px-4 2xl:order-3 text-right self-center'>
                    <div className='py-6 px-3 mt-32 sm:mt-0'>
                      <button
                        className='bg-red-500 hover:bg-red-600 focus:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded transition-colors'
                        type='button'
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className='w-full 2xl:w-4/12 px-4 2xl:order-1'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block tracking-wide text-blueGray-600'>
                          {profileViews ? profileViews.length || 0 : '...'}
                        </span>
                        <span className='text-sm text-blueGray-400'>{`View${
                          profileViews?.length === 1 ? '' : 's'
                        }`}</span>
                      </div>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block tracking-wide text-blueGray-600'>
                          {friendList ? friendList.length || 0 : '...'}
                        </span>
                        <span className='text-sm text-blueGray-400'>{`Friend${
                          friendList?.length === 1 ? '' : 's'
                        }`}</span>
                      </div>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block tracking-wide text-blueGray-600'>
                          {profile.convos?.length || 0}
                        </span>
                        <span className='text-sm text-blueGray-400'>{`Conversation${
                          profile.convos?.length === 1 ? '' : 's'
                        }`}</span>
                      </div>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block tracking-wide text-blueGray-600'>
                          {requestList ? requestList.length || 0 : '...'}
                        </span>
                        <span className='text-sm text-blueGray-400'>{`Request${
                          requestList?.length === 1 ? '' : 's'
                        }`}</span>
                      </div>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block tracking-wide text-blueGray-600'>
                          {blockList ? blockList.length || 0 : '...'}
                        </span>
                        <span className='text-sm text-blueGray-400'>{`Block${
                          blockList?.length === 1 ? '' : 's'
                        }`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-4'>
                  <h3 className='text-3xl font-semibold leading-normal mb-2 text-blueGray-700'>
                    {profile.name}
                  </h3>
                  <div className='relative text-md leading-normal mt-0 mb-2 text-blueGray-400 font-medium'>
                    <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                    {profile.email}
                    <small className='absolute top-[50%] -translate-y-[50%] ml-1 font-normal'>{`${
                      profile.email_verified_at ? '(verified)' : '(not verified)'
                    }`}</small>
                  </div>
                  <div className='relative flex items-center justify-between max-w-lg mx-auto mb-2 text-blueGray-600 mt-10 px-4 py-1 border border-gray-100 rounded shadow-sm'>
                    {isEditingBio ? (
                      <textarea
                        className='w-full max-h-[100px] resize-y'
                        ref={bioTextareaRef}
                        defaultValue={profile.bio?.trim() || ''}
                      ></textarea>
                    ) : (
                      <pre className='flex-1 text-center px-4 overflow-auto max-h-[100px]'>
                        {profile.bio?.trim() || 'No bio yet'}
                      </pre>
                    )}
                    <button
                      className={`absolute top-0 right-0 xl:-right-4 -translate-y-full xl:translate-y-0 xl:translate-x-full uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded transition-colors ${
                        isEditingBio
                          ? 'bg-green-500 hover:bg-green-600 focus:bg-green-600'
                          : 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600'
                      }`}
                      type='button'
                      onClick={isEditingBio ? saveBio : setIsEditingBio.bind(null, true)}
                    >
                      {isEditingBio ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  {profile.roles?.length ? (
                    <div className='mb-2 text-blueGray-600'>{profile.roles.join(' ')}</div>
                  ) : null}
                </div>
                <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                  <div className='grid grid-cols-1 xl:grid-cols-2 min-[1920px]:grid-cols-3 gap-4 font-medium'>
                    <section className='p-4 rounded bg-neutral-50 shadow-sm'>
                      <h1 className='mb-4'>Views {profileViews ? `(${profileViews.length || 0})` : null}</h1>
                      {profileViews?.length ? (
                        <ul className='max-h-[300px] overflow-y-auto'>
                          {profileViews.map((profileView: IUser, index: number) => (
                            <li key={`${profileView.id}_${index}`}>
                              <User user={profileView} interactionFn={interactionFn} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                    <section className='p-4 rounded bg-neutral-50 shadow-sm'>
                      <h1 className='mb-4'>Friends {friendList ? `(${friendList.length || 0})` : null}</h1>
                      {friendList?.length ? (
                        <ul className='max-h-[300px] overflow-y-auto'>
                          {friendList.map((friend: IUser) => (
                            <li key={friend.id}>
                              <User
                                user={friend}
                                interactions={getUserInteractions('friend')}
                                interactionFn={interactionFn}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                    <section className='p-4 rounded bg-neutral-50 shadow-sm'>
                      <h1 className='mb-4'>Requests {requestList ? `(${requestList.length || 0})` : null}</h1>
                      {requestList?.length ? (
                        <ul className='max-h-[300px] overflow-y-auto'>
                          {requestList.map((request: IUser) => (
                            <li key={request.id}>
                              <User
                                user={request}
                                interactions={getUserInteractions('request')}
                                interactionFn={interactionFn}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                    <section className='p-4 rounded bg-neutral-50 shadow-sm'>
                      <h1 className='mb-4'>Block List {blockList ? `(${blockList.length || 0})` : null}</h1>
                      {blockList?.length ? (
                        <ul className='max-h-[300px] overflow-y-auto'>
                          {blockList.map((block: IUser) => (
                            <li key={block.id}>
                              <User
                                user={block}
                                interactions={getUserInteractions('block')}
                                interactionFn={interactionFn}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileDetails;
