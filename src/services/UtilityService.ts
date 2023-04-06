import Cookies from "js-cookie";
import Resizer from 'react-image-file-resizer';

export const scrollToTop = () => {
    window.scrollTo(0, 0);
    window.postMessage({ name: 'onTtgScrollTop', scrollTop: 0 }, window.origin);
};

export const emailRegex = /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

export const getQueryParams = (url: string) => {
    const params = {} as any;
    const qs = url.split('?')[1];
    if (!qs) {
        return params;
    }
    const pieces = qs.split('&');
    pieces.map((piece) => {
        const tmp = piece.split('=');
        params[tmp[0]] = tmp[1];
    });
    return params;
};

export const serializeQueryString = function (obj: any, prefix: any) {
    let str = [] as any, p;
    for (p in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + '[' + p + ']' : p,
                v = obj[p];
            if (v !== null && v !== undefined) {
                str.push(
                    typeof v === 'object'
                        ? serializeQueryString(v, k)
                        : encodeURIComponent(k) + '=' + encodeURIComponent(v)
                );
            }
        }
    }
    return str.join('&');
};

export const getAuthCookie = () => {
    const token = Cookies.get('Cookie');
    if (token && token !== 'undefined') {
        return token;
    }
    return null;
};

export const setAuthCookie = (token: any) => {
    Cookies.set('Cookie', token, { expires: (1 / 24) * 1.5 });
};

export const updateAuthCookieExpiration = () => {
    Cookies.set('Cookie', Cookies.get('Cookie') as any, { expires: (1 / 24) * 1.5 });
};

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const file = (to: any) => {
    return /\.[0-9a-z]+$/i.test(to);
};

export const splitArray = (inputArray: any, chunk: any) => {
    return inputArray.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / chunk);
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);
};

export const setCookieIfPresent = (location: any) => {
    const autoLoginPaths = ['/home'];
    const { search, pathname } = location;
    const { token } = getQueryParams(search);
    const strippedDownPath = pathname.replace(/\//g, '');
    if (autoLoginPaths.indexOf(strippedDownPath) > -1 && token) {
        setAuthCookie(token.split('@')[0]);
        return true;
    }
    return false;
};

export const findIntersection = (array1: any, array2: any) => {
    return array1.filter((n: any) => {
        return array2.indexOf(n) !== -1;
    });
};

const areObjectsIdentical = (object1: any, object2: any) => {
    return JSON.stringify(object1) === JSON.stringify(object2);
};

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const niceBytes = (x: string) => {
    let l = 0,
        n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
};

const resizeImage = (image: any, w = 200, h = 100) => {
    const { type } = image;
    let format = type ? type.substring(type.indexOf('/') + 1).toUpperCase() : 'PNG';

    if (!['JPEG', 'PNG', 'WEBP'].includes(type)) {
        format = 'PNG';
    }

    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            image,
            w,
            h,
            format,
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            'file'
        );
    });
};

const isValidEmail = (val: any) => {
    if (!val) {
        return false;
    }

    return !(!val.match(emailRegex) || val.match(emailRegex)[0] !== val);
};


const UtilityService = {
    scrollToTop,
    getAuthCookie,
    splitArray,
    serializeQueryString,
    niceBytes,
    resizeImage,
    isValidEmail,
    setCookieIfPresent,
    areObjectsIdentical,
    findIntersection,
    updateAuthCookieExpiration
};

export default UtilityService;
