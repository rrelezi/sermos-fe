import ApiService from './ApiService';
import UtilityService, { setAuthCookie } from './UtilityService';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { IUser, IUserDetails } from '../components/Profile/components/User';

export enum InteractionType {
  SEND = 'send',
  CANCEL = 'cancel',
  UNFRIEND = 'unfriend',
  BLOCK = 'block',
  UNBLOCK = 'unblock',
  ACCEPT = 'accept',
  REFUSE = 'refuse',
  DETAILS = 'details' // Details -> FE-only case
}

export enum RelationType {
  None = 'none',
  Pending = 'pending',
  Active = 'active',
  Blocked = 'blocked'
}

export interface IInteraction {
  friendId: number;
  interactionType: InteractionType;
}

const defaultAvatar =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAMFBMVEXFxcX////CwsL7+/vS0tLw8PD09PTIyMjMzMzY2Njr6+v39/fj4+Pd3d2/v7/m5uYhGKWhAAAC9klEQVR4nO2aW3qEIAyFFVG84v53W6i12lHHJJw4feBfwflyD6EoMplMJpPJZDKZTIaL+eGDElxrp7nv+3myrSs+oMT4dqqrckc92odNYoppKI9UY/ucRYybzzQsFrEPyTBTdaUhMrsHdBh7aYeVzqurGO80BHplDYYiIkSHU1XRkESEbGkVg4MqIsrQ0mB6soiybJScQoyJlVrFJ6ZjiQiFQ0NG+7ZWnWEVVMxcEeUADw1j2SLKcoT7hJ6kG+h0ZYfmAjhAvcQUAawKJxNRTkgZzIK1UQNFyGIzAo3PVigiTDw4lwgzJNIDVXCa6V8anAppngYqXBU3chXAlsZvpxsdTIWkk/2qgAVGVvHfVCRFJ65g3K6m1+AyNaVq4drZ/6jgZpKrAL4iyJMEOYY7cXhCp3D+SrQA3ZlFO1EEuxd5Yd3CrkXCLKnB72yyIo4bLhZExlB46xNUcfzblmAbwD8cCLZEYAvZU7NEKL01mpZVx4HjzYsMRrpqiYiFnCxDT0S0Bi1fK00RAUeRUakfjPx9wvb6V5oQHO8zdkA3j3MV/m3hGJzXv5uZorsrXnWnfM68uKMe7DEp6gh2oDbWRs0e3nKae2M1MsU47oLW48+7zFb2zYA+JHrZQjIjvWIcb7TYqHFeofawMxqUV1hjxQHQlVm8Ha4gGixjsrmyBkBGkjt+ZKTOwWkxsclIswZptLon7RnDSOvEKymnf/HR7oh8W0zO0T3iRIFE5oo0URLeWs+Q3fESnlrPkd2Zkf6IVBIRuPxYGfki5Ofka/gBiqpXe9i3f2Sp2GCebBLuMu9g3il0TME0BrhgbbBKl0aCLDDSBNhLX+H01oTL5Q0DXYT868k95JcetdiMkOPTofvYHurnlIS/QBSIT6GqDqG7RNMh5DFDr2QtkAoXfNJ7hTb56YYF9aan09Q3GooI7bCgBYbWaLFBGDLUg5MUnl47OEn3k5Sfg0Qoh9YHVNyLUG2oC4S2qp+olFTVT1RKquoOFwuHqe8Loi4lQmPzD5MAAAAASUVORK5CYII=';

const setProfileData = (state: any, user: any) => {
  for (const prop in user) {
    state[prop] = user[prop];
  }
};

export const login = ({ email, password }: { email: string; password: string }) =>
  new Promise((resolve, reject) => {
    ApiService.post('/login', { email, password })
      .then((response) => {
        const { token } = response.data;
        setAuthCookie(token);
        toast.success('Login was successful');
        resolve(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
        setAuthCookie('');
        reject(error);
      });
  });

export const getUserProfile = () => async () => {
  return new Promise((resolve, reject) => {
    const authCookie = UtilityService.getAuthCookie();
    if (!authCookie) {
      reject();
      return;
    }
    ApiService.get('/me')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserProfileBio = (bio: string) => {
  return new Promise((resolve, reject) => {
    ApiService.post('/me/bio', { bio })
      .then(() => {
        toast.success('Bio updated successfully!');
        resolve(bio);
      })
      .catch((error) => reject(error));
  });
};

export const getProfileViews = () => {
  return new Promise<Array<IUser>>((resolve, reject) => {
    ApiService.get('/me/profileViews')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getFriendList = () => {
  return new Promise<Array<IUser>>((resolve, reject) => {
    ApiService.get('/me/friends')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getRequestList = () => {
  return new Promise<Array<IUser>>((resolve, reject) => {
    ApiService.get('/me/friendRequests')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getBlockList = () => {
  return new Promise<Array<IUser>>((resolve, reject) => {
    ApiService.get('/me/blocks')
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const interact = (request: IInteraction) => {
  return new Promise<boolean>((resolve, reject) => {
    ApiService.post('/user/interact', request)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const search = (keyword: string) => {
  return new Promise<Array<IUser>>((resolve, reject) => {
    ApiService.get('/user/search', { params: { keyword } })
      .then((response) => resolve(response.data?.data))
      .catch((error) => reject(error));
  });
};

export const getUserDetailsById = (id: number) => {
  return new Promise<IUserDetails>((resolve, reject) => {
    ApiService.get('/user', { params: { id } })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/logout`)
      .then((response) => {
        setTimeout(() => {
          setAuthCookie('');
        }, 100);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgotPassword = ({ email }: { email: string }) => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/forget`, { email }).then(resolve, reject);
  });
};

export const resetPassword = ({
  token,
  newPassword,
  confirmPassword
}: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) =>
  ApiService.post(`/resetPassword`, {
    token,
    newPassword,
    confirmPassword
  }).then((response) => response.data);

export const confirmPassword = (token: string) => {
  return new Promise((resolve, reject) => {
    ApiService.get(`/verify?token=${token}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const register = (payload: any) => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/register`, payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getGoogleAuth = () => ApiService.get(`/auth/google`).then((response) => response.data);

export const googleAuth = (code: string | null) =>
  axios.post('https://oauth2.googleapis.com/token', {
    code: code,
    client_id: '227682060456-083qepr3gge7332bn82isrjkno04riur.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uri: 'http://localhost:3000/auth/google',
    grant_type: 'authorization_code'
  });

export const getUserConvos = (id: string) =>
  new Promise((resolve, reject) => {
    ApiService.get(`/conversations?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const getMessages = (payload: any) =>
  new Promise((resolve, reject) => {
    ApiService.get(
      `/message?${Object.keys(payload)
        .map((key) => `${key}=${encodeURIComponent(payload[key])}`)
        .join('&')}`
    )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const store = {
  login: {
    pending: (state: any) => {
      state.loading = true;
    },
    fulfilled: (state: any, { payload }: any) => {
      setProfileData(state, payload.user);
      state.loading = false;
    },
    rejected: (state: any) => {
      state.loading = false;
    }
  },
  getProfileData: {
    fulfilled: (state: any, action: any) => {},
    rejected: (state: any) => {
      state.profile = {};
    }
  },
  setUserProfileBio: {
    fulfilled: (state: any, { payload }: any) => {
      console.log(payload);
      state.bio = payload;
    }
  },
  logout: {
    fulfilled: () => {
      Cookies.remove('Cookie');
      window.open('/login', '_self');
    },
    rejected: () => {
      Cookies.remove('Cokkie');
      window.open('/login', '_self');
    }
  },
  getUserConvos: {
    fulfilled: (state: any, { payload }: any) => {
      state.convos = payload;
    },
    rejected: (state: any) => {
      state.profile = {};
    }
  }
};

export default {
  defaultAvatar,
  login,
  getUserProfile,
  setUserProfileBio,
  getProfileViews,
  getFriendList,
  getRequestList,
  getBlockList,
  interact,
  search,
  getUserDetailsById,
  logout,
  forgotPassword,
  resetPassword,
  confirmPassword,
  register,
  getGoogleAuth,
  googleAuth,
  getUserConvos,
  getMessages,
  store
};
