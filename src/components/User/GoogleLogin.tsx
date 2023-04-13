import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import UserService from "../../services/UserService";

const GoogleLogin = () => {

    const code = new URLSearchParams(window.location.search).get('code');

    useEffect(() => {
        const token = UserService.googleAuth(code);
        console.log(token);
    }, []);
}

export default GoogleLogin;