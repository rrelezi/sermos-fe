import React, {useEffect} from 'react';
import UserService from "../../services/UserService";

const GoogleLogin = () => {

    const code = new URLSearchParams(window.location.search).get('code');

    useEffect(() => {
        UserService.googleAuth(code).then();
    }, []);
}

export default GoogleLogin;