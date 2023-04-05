import React from "react";

interface IAppIcon {
  icon?: string;
  className?: string;
}
const AppIcon = ({ icon, className, ...props }: IAppIcon) => {
  return (
    <span
      className={`app-icon icon-${icon} ${className ? className : ""} `}
      {...props}
    />
  );
};

export default AppIcon;
