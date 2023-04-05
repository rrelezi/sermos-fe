import React from "react";
import AppIcon from "./AppIcon";
import AppTooltip from "./AppTooltip";

interface IAppLabel {
  label: string;
  hasError?: any;
  labelTooltip?: string;
  labelIcon?: string;
}

const AppLabel = ({
  label,
  hasError,
  labelTooltip,
  labelIcon = "help-circled",
}: IAppLabel) => {
  if (!label) {
    return null;
  }
  return (
    <div className={`app-input-label ${hasError ? "error" : ""}`}>
      <div className={"flex flex-1 flex-row"}>
        {label}
        {!!labelTooltip && (
          <AppTooltip
            content={() => (
              <p className={"text-white text-center"}>{labelTooltip}</p>
            )}
            placement={"top"}
            type={"small"}
          >
            <AppIcon icon={labelIcon} />
          </AppTooltip>
        )}
      </div>
    </div>
  );
};

export default AppLabel;
