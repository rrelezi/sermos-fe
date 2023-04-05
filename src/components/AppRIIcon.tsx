import React from "react";

interface IRIIcon {
  icon?: string;
  className?: string;
}

const AppRIIcon = ({ icon, className, ...props }: IRIIcon) => {
  return (
    <span
      className={`app-icon font-medium ri-${icon} ${
        className ? className : ""
      } `}
      {...props}
    />
  );
};

export default AppRIIcon;
