import * as React from "react";
import {getQueryParams} from "../../services/UtilityService";
import {useEffect, useState} from "react";
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

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
            {
                confirmed &&
                <div className={'flex flex-col items-center text-xl pt-20'}>
                    Account confirmed successfully!
                    <AppIcon
                        icon={'ri-checkbox-circle-line'}
                    />
                    <AppButton
                        text={'Login'}
                        className={'login-button text-base mx-auto'}
                    />
                </div>
            }

        </div>
    );
};

export default RegisterConfirm;
