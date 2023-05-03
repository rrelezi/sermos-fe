import ApiService from "./ApiService";
import UtilityService, { setAuthCookie } from "./UtilityService";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const setProfileData = (state: any, user: any) => {
  for(const prop in user){
    state[prop] = user[prop];
  }
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  new Promise((resolve, reject) => {
    ApiService.post("/login", { email, password })
      .then((response) => {
        const { token } = response.data;
        setAuthCookie(token);
        toast.success('Login was successful')
        resolve(response.data);
      })
      .catch((error) => {
        toast.error(error.message)
        setAuthCookie("");
        reject(error);
      })
  });

export const getUserProfile = () => async () => {
    return new Promise((resolve, reject) => {
      const authCookie = UtilityService.getAuthCookie();
      if (!authCookie) {
        reject();
        return;
      }
      ApiService.get("/me")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const logout = () => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/logout`)
      .then((response) => {
        setTimeout(() => {
          setAuthCookie("");
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
  confirmPassword,
}: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) =>
  ApiService.post(`/resetPassword`, {
    token,
    newPassword,
    confirmPassword,
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

export const getGoogleAuth = () =>
    ApiService.get(`/auth/google`).then((response) => response.data);

export const googleAuth = (code: string | null) =>
  axios.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id:
      "227682060456-083qepr3gge7332bn82isrjkno04riur.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:3000/auth/google",
    grant_type: "authorization_code",
  });

const store = {
  login: {
    pending: (state: any) => {
      state.loading = true;
    },
    fulfilled: (state: any, { payload } : any) => {
      setProfileData(state,payload.user);
      state.loading = false;
    },
    rejected: (state: any) => {
      state.loading = false;
    },
  },
  getProfileData: {
    fulfilled: (state: any, action: any) => {},
    rejected: (state: any) => {
      state.profile = {}
    },
  },
  logout: {
    fulfilled: () => {
      Cookies.remove("Cookie");
      window.open("/login", "_self");
    },
    rejected: () => {
      Cookies.remove("Cokkie");
      window.open("/login", "_self");
    },
  },
};

export default {
  login,
  getUserProfile,
  logout,
  forgotPassword,
  resetPassword,
  confirmPassword,
  register,
  getGoogleAuth,
  googleAuth,
  store,
};
