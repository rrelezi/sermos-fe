import React from "react";

interface IAppIcon {
  icon?: string;
  className?: string;
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
