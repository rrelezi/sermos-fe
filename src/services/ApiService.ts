import Axios from 'axios';
import { getAuthCookie, setAuthCookie } from './UtilityService';

const unauthorizedCodes = [401, 403];

const skipUnAuthRedirectionRoutes = ['/login'];

const isUnAuthorized = (error: any) => {
    try {
        return unauthorizedCodes.indexOf(error.response.status) > -1;
    } catch (e) {
        return false;
    }
};

const onUnauthorizedResponse = (error: any) => {
    try {
        setAuthCookie('');
        const url = error.response.config.url.split('?')[0];
        if (skipUnAuthRedirectionRoutes.indexOf(url) === -1) {
            window.open('/login/', '_self');
        }
    } catch (e) {}
};

const ApiService = Axios.create({
    baseURL: 'localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.request.use(
    (config) => {
        const token = getAuthCookie();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        if (isUnAuthorized(error)) {
            onUnauthorizedResponse(error);
        }
        return Promise.reject(error.response.data);
    }
);

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isUnAuthorized(error)) {
            onUnauthorizedResponse(error);
        }
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default ApiService;
