import React, {useEffect} from 'react';
import UserService, {exchangeToken} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const code = new URLSearchParams(window.location.search).get('code');

    useEffect(() => {
        UserService.googleAuth(code).then((response)=>{
            UserService.exchangeToken(response.data.id_token).then((response)=>{
                navigate("/main/home");
                toast.success("Auth with google");
                }).catch((error)=>{
                navigate("/login");
                toast.error("Something went wrong");
            })
        });
    }, []);
}

export default GoogleLogin;