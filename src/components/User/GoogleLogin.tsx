import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import UserService from "../../services/UserService";

const GoogleLogin = () => {
    const location = useLocation();

    useEffect(() => {
        UserService.googleAuth(location.search)
            .then((response) => response.json())
    }, []);
}

export default GoogleLogin;