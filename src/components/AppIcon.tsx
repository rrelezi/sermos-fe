import React from "react";

interface IAppIcon {
  icon?: string;
  className?: string;
  onClick?: any;
  scale?: number;
}
const AppIcon = ({ icon, className,scale, ...props }: IAppIcon) => {
  return (
    <span
      className={`${icon} ${className ? className : ""} `}
      {...props}
        style={{
          transform: `scale(${scale})`
        }}
    />
  );
};

export default AppIcon;
