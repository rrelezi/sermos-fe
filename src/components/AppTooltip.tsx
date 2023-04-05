import React from "react";
import { createPopper } from "@popperjs/core";
import { isMobile } from "react-device-detect";

interface IAppTooltip {
  type?: string;
  placement?: any;
  children?: any;
  content?: any;
  wrapperClass?: string;
  tooltipClass?: string;
}

const AppTooltip = ({
  type = "large",
  placement = "bottom",
  children,
  content,
  wrapperClass = "",
  tooltipClass = "",
}: IAppTooltip) => {
  const btnRef = React.createRef();
  const tooltipRef = React.createRef();

  const openTooltip = () =>
    createPopper(btnRef.current as any, tooltipRef.current as any, {
      placement,
    });

  return (
    <>
      <div className="flex flex-wrap cursor-pointer">
        <div
          className="app-wg-tooltip w-full text-center"
          ref={btnRef as any}
          onMouseEnter={openTooltip}
        >
          <div className={"inline cursor-pointer " + wrapperClass}>
            {children}
          </div>

          <div
            className={
              `app-wg-tooltip-content max-w-xs text-left no-underline break-words rounded-lg shadow-lg z-50 ${
                type === "large" ? "p-4 " : "p-1 "
              }` +
              tooltipClass +
              `${isMobile ? " mobile" : ""}`
            }
            style={{ backgroundColor: "#263860cc" }}
            ref={tooltipRef as any}
          >
            {content()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppTooltip;
