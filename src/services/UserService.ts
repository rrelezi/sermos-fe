import ApiService from "./ApiService";
import UtilityService, { setAuthCookie } from "./UtilityService";
import axios from "axios";

const prepareUser = ({}) => {
  //..get user data
  return {};
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
        //dispatch(setCustomerData(prepareCustomer(user))); set customer data
        setAuthCookie(token);
        resolve(response.data);
      })
      .catch((error) => {
        // dispatch(setCustomerData({}));
        setAuthCookie("");
        reject(error);
      });
  });

export const getCustomerData = () =>
  async (dispatch: any, currentCustomer = {}) => {
    return new Promise((resolve, reject) => {
      const authCookie = UtilityService.getAuthCookie();
      if (!authCookie) {
        //  dispatch(setCustomerData({}));
        reject();
        return;
      }
      ApiService.get("/user", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
        .then((response) => {
          const user = prepareUser(response.data);
          if (!UtilityService.areObjectsIdentical(currentCustomer, user)) {
            //  dispatch(setCustomerData(customer));
          }
          resolve(user);
        })
        .catch((error) => {
          //dispatch(setCustomerData({}));
          reject(error);
        });
    });
  };

export const logout = () => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/logout`)
      .then(() => {
        setTimeout(() => {
          setAuthCookie("");
          // dispatch(setCustomerData({}));
        }, 100);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const update = (payload: any) => {
  return new Promise((resolve, reject) => {
    ApiService.put(`/user`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
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

export const updatePassword = (payload: any) => {
  return new Promise((resolve, reject) => {
    ApiService.post(`/user/update_password`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  });
};

export const verifyLink = (token: string) => {
  return new Promise((resolve, reject) => {
    ApiService.get(`/user/verify_reset_password_token?token=${token}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

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
      .catch((error) => reject(error))
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

export default {
  login,
  prepareUser,
  getCustomerData,
  logout,
  update,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyLink,
  confirmPassword,
  register,
  getGoogleAuth,
  googleAuth,
};
