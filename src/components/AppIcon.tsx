import React from "react";

interface IAppIcon {
  icon?: string;
  className?: string;
  onClick?: any;
}
const AppIcon = ({ icon, className, ...props }: IAppIcon) => {
  return (
    <span
      className={` ${icon} ${className ? className : ""} `}
      {...props}
    />
  );
};

export default AppIcon;
