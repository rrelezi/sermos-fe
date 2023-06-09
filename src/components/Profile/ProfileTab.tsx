import React, {useEffect, useRef, useState} from "react";
import { Avatar } from "react-chat-elements";
import AppDropDown from "../AppDropDown";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import AppIcon from "../AppIcon";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import SearchUserDialog from '../Search/SearchUserDialog';

const ProfileTab = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchUserDialogOpen, setIsSearchUserDialogOpen] = useState(false);

  const dropdownRef = useRef(null) as any;


  const profile = useSelector((state: any) => state.profile);


  const options = [
    {
      id: "profile",
      label: "View Profile",
    },
    {
      id: "logOut",
      label: "Log Out",
    },
  ];

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!dropdownRef?.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

  const onSelect = (element: any) => {
    switch (element.target.id) {
      case "profile":
          navigate("/main/home/profile");
        break;
      case "logOut":
        UserService.logout()
          .then(() =>
            setTimeout(() => {
              toast.success("Log out was successful");
              navigate("/login");
            }, 200)
          )
          .catch(({ message }) => toast.error(message));
        break;
    }
  };

  return (
    <div className={"profile-card"}>
      <div className={"flex flex-row items-center"}>
        <Avatar
          src={profile.profilePhotoPath}
          size="xlarge"
          type="circle"
          className={"profile-icon"}
        />

        <div className={"ml-4 text-lg font-medium"}>{profile.name}</div>
      </div>

      <span className='flex items-center'>
          <div className={'flex justify-center hover:bg-gray-300 hover:shadow-gray-200 rounded-md cursor-pointer px-2 py-1 mr-2'}
              onClick={setIsSearchUserDialogOpen.bind(null, true)}
          >
              <AppIcon icon={"ri-search-line"} scale={1.5}  />
          </div>

          <div className={'flex justify-center hover:bg-gray-300 hover:shadow-gray-200 rounded-md cursor-pointer px-2 py-1'}
              onClick={() => setIsOpen(true)}
              ref={dropdownRef}
          >
              <AppDropDown
                  isOpen={isOpen}
                  options={options}
                  onSelect={onSelect}
                  className={"float-right cursor-pointer"}
              />
              <AppIcon icon={"ri-more-2-line "} scale={1.5}  />
          </div>
      </span>
      {isSearchUserDialogOpen ? <SearchUserDialog onClose={setIsSearchUserDialogOpen.bind(null, false)} /> : null}
    </div>
  );
};

export default ProfileTab;
