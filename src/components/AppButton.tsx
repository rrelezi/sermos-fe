import React from "react";
import AppIcon from "./AppIcon";

interface IAppButton {
  text?: string;
  icon?: string;
  iconClass?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: any;
  type?: any;
}

const AppButton = ({
  text,
  icon,
  iconClass,
  loading = false,
  className = `btn btn-primary ${loading ? 'login-button-disabled' : 'login-button'}`,
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
        {icon && !loading && <AppIcon icon={icon} className={iconClass} />}
        {loading && (
          <p className="absolute top-0 left-0 right-0 bottom-0 animate-spin">
            <AppIcon icon={"ri-loader-2-fill"} className={'flex justify-center'} scale={1.4}/>
          </p>
        )}
      </div>
    </button>
  );
};

export default AppButton;
