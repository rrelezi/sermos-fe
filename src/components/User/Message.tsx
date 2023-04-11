import React from 'react';
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";
import {useNavigate} from "react-router-dom";

interface IMessage {
    icon?: string;
    message?:string;
    showLogin?: boolean;
}

const Message = ({icon = 'checkbox-circle-line', message, showLogin = true} : IMessage) => {
    const navigate = useNavigate();

    return (
    <div className={'background'}>
        <div className={'flex flex-col items-center text-xl pt-20'}>
            {message}
            <AppIcon
                icon={`ri-${icon}`}
            />

            {
                showLogin &&
                <AppButton
                    text={'Login'}
                    className={'login-button text-base mx-auto pt-5'}
                    onClick={() => navigate('/login')}
                />
            }
        </div>
    </div>
    );
}

export default Message;