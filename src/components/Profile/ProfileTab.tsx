import React, {useState} from "react";
import {Avatar} from "react-chat-elements";
import AppDropDown from "../AppDropDown";
import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import AppIcon from "../AppIcon";

const ProfileTab = () => {
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false);

    const options = [
        {
            id: 'profile',
            label: 'View Profile'
        },
        {
            id:'logOut',
            label: 'Log Out'
        }
    ]
    const onSelect = (element: any) => {
        switch (element.target.id){
            case 'profile': navigate('/main/home/profile')
                break;
            case 'logOut': UserService.logout().then(()=> navigate('/login'))
                break;
        }
    }

    return(
        <div className={'profile-card'}
             onClick={()=> setIsOpen(!isOpen)}
        >
            <div className={'flex flex-row items-center'}>
                <Avatar
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z'%3E%3C/path%3E%3C/svg%3E"
                    size='xlarge'
                    type='circle'
                    className={'profile-icon'}
                />

                <div className={'ml-4 text-lg font-medium'}>
                    Profile
                </div>
            </div>

            <AppDropDown isOpen={isOpen} options={options} onSelect={onSelect} className={'float-right'}/>
            <AppIcon icon={'ri-more-2-line'} scale={1.5} />
        </div>
    )
}

export default ProfileTab;