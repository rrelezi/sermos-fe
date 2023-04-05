import React from "react";
import AppIcon from "./AppIcon";
import AppRIIcon from "./AppRIIcon";

interface IAppButton {
  text?: string;
  remixIcon?: boolean;
  icon?: string;
  iconClass?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: any;
}

const AppButton = ({
  text,
  remixIcon = false,
  icon,
  iconClass,
  loading = false,
  className = "btn btn-primary",
  ...props
}: IAppButton) => {
  const _onClick = (e: any) => {
    if (loading || props.disabled) {
      if (e) {
        e.preventDefault();
      }
    } else if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      {...props}
      className={className}
      onClick={_onClick}
      disabled={props.disabled || loading}
    >
      <div className={"relative"}>
        <span className={loading ? "invisible" : "visible"}>{text}</span>
        {icon &&
          (remixIcon ? (
            <AppRIIcon icon={icon} className={iconClass} />
          ) : (
            <AppIcon icon={icon} className={iconClass} />
          ))}
        {loading && (
          <p className="absolute top-0 left-0 right-0 bottom-0">
            <AppIcon icon={"loading"} className={"animate-spin"} />
          </p>
        )}
      </div>
    </button>
  );
};

export default AppButton;
