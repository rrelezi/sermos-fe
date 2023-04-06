import ApiService from './ApiService';
import UtilityService, { setAuthCookie } from './UtilityService';

const prepareCustomer = (user: any) => {
    const data = {};
//..get user data
    return data;
};

export const login =
    ({ email, password } : {email: string, password: string}) =>
        async (dispatch: any) => {
    console.log('test')
            return new Promise((resolve, reject) => {
                ApiService.post('/login', { email, password })
                    .then((response) => {
                        console.log('test')
                        const { token, user } = response.data;
                        //dispatch(setCustomerData(prepareCustomer(user))); set customer data
                        setAuthCookie(token);
                        resolve(response.data);
                    })
                    .catch((error) => {
                       // dispatch(setCustomerData({}));
                        setAuthCookie('');
                        reject(error);
                    });
            });
        };

export const getCustomerData =
    () =>
        async (dispatch: any, currentCustomer = {}) => {
            return new Promise((resolve, reject) => {
                const authCookie = UtilityService.getAuthCookie();
                if (!authCookie) {
                  //  dispatch(setCustomerData({}));
                    reject();
                    return;
                }
                ApiService.get('/user', {
                    headers: {
                        'Cache-Control': 'no-cache',
                        Pragma: 'no-cache',
                        Expires: '0',
                    },
                })
                    .then((response) => {
                        const user = prepareCustomer(response.data);
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

export const logout = () => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        ApiService.post(`/logout`)
            .then(() => {
                //navigate(`/login?logout=true`);
                setTimeout(() => {
                    setAuthCookie('');
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
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const forgotPassword = ({ email, token } : {email: string; token: string;}) => {
    return new Promise((resolve, reject) => {
        ApiService.post(`/user/forgot_password`, { email, token }).then(resolve, reject);
    });
};

export const resetPassword =
    ({ token, password, new_password } : {token : string; password : string; new_password : string;}) =>
        async (dispatch: any) => {
            return new Promise((resolve, reject) => {
                ApiService.post(`/user/reset_password`, { token, password, new_password })
                    .then((response) => {
                        const { token, customer } = response.data;
                      //  dispatch(setCustomerData(prepareCustomer(customer)));
                        setAuthCookie(token);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        };

export const updatePassword = (payload: any) => {
    return new Promise((resolve, reject) => {
        ApiService.post(`/user/update_password`, payload)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const verifyLink = (token: string) => {
    return new Promise((resolve, reject) => {
        ApiService.get(`/user/verify_reset_password_token?token=${token}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};




const register = (payload: any, dispatch: any) => {
    return new Promise((resolve, reject) => {
        ApiService.post(`/register`, payload)
            .then((response) => {
                const { token, customer } = response.data;
                //dispatch(setCustomerData(prepareCustomer(customer))); to do
               // dispatch(getNotifications()); to do
                setAuthCookie(token);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export default {
    login,
    prepareCustomer,
    getCustomerData,
    logout,
    update,
    forgotPassword,
    resetPassword,
    updatePassword,
    verifyLink,
    register
};
