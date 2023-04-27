import React from "react";
import AppIcon from "../AppIcon";
import {useNavigate} from "react-router-dom";

const ProfileDetails = () => {
    const navigate = useNavigate();

    return(
        <div className={'flex flex-col bg-white rounded w-full h-full p-5'}>
            <AppIcon icon={'ri-arrow-left-circle-line'}
                     scale={2}
                     className={'cursor-pointer w-8 mx-5 mb-5'}
                     onClick={() => navigate('/main/home')}/>
            Profile Details to do....
        </div>
    )
}

export default ProfileDetails;
