import * as React from "react";
import {getQueryParams} from "../../services/UtilityService";
import {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Message from "./Message";

const RegisterConfirm = () => {
    const navigate = useNavigate();

    const [confirmed,setConfirmed] = useState(false);
    const params = getQueryParams(decodeURI(window.location.href));


    const confirmRegister = (token: string) => {
        UserService.confirmPassword(token)
            .then(()=>{
                toast.success('Account created successfully!')
                setConfirmed(true);
            })
            .catch((e)=>{
                toast.error(e.message)
                navigate('/login', {replace : true})
            })
    }

    useEffect(()=>{
        confirmRegister(params.token);
    },[])

    return (
        <div className={"background"}>
            {   confirmed &&
                <Message icon={'checkbox-circle-line'}  message={' Account confirmed successfully!'} />
            }
        </div>
    );
};

export default RegisterConfirm;
