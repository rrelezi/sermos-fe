import React from "react";

interface IAppDropDown {
  isOpen: boolean;
  options: { id: string; label: string }[];
  onSelect: any;
  width?: string;
  height?: string;
  className?: string;
  ref?: any;
}
const AppDropDown = ({
  isOpen,
  width = "auto",
  height = "auto",
  options,
  onSelect,
  className,
  ref,
}: IAppDropDown) => {
  return (
    <div className={`${className}`} ref={ref}>
      {isOpen && (
        <div
          className={"app-dropdown"}
          style={{
            width: `${width}`,
            height: `${height}`,
          }}
        >
          {options.map((option, index) => (
            <span
              className={`flex-1 text-gray-600 hover:scale-y-110 hover:text-black mx-3 mt-2 ${
                index + 1 < options.length
                  ? "border-b-2 border-b-black"
                  : "mb-2"
              }`}
              id={option.id}
              onClick={onSelect}
              key={index}
            >
              {option.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppDropDown;
