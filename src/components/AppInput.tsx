import React from "react";
import AppLabel from "./AppLabel";
import renderErrorMessage from "../constants/ErrorMessages";

interface IAppInput {
  label: string;
  showErrorMessage?: boolean;
  errors?: any;
  containerClassName?: string;
  defaultErrorMessage?: string;
  successMessage?: string;
  message?: string;
  labelIcon?: string;
  labelTooltip?: string;
  className?: string;
  disabled?: boolean;
  onChange: any;
  type?: string;
  maxLength?: number;
  placeholder?:string;
}

const AppInput = React.forwardRef(
  (
    {
      label,
      showErrorMessage = true,
      errors,
      containerClassName,
      defaultErrorMessage = "",
      successMessage = "",
      message = "",
      labelIcon,
      labelTooltip,
      ...props
    }: IAppInput,
    ref
  ) => {
    const { name } = props as any;

    const shouldShowErrorMessage = !!(
      showErrorMessage &&
      errors &&
      errors[name]
    );

    const renderMessage = (text: any) => {
      if (typeof text === "string" || typeof text === "number") {
        return text;
      }
      return text();
    };

    return (
      <div className={`mb-4 ${containerClassName ? containerClassName : ""}`}>
        <AppLabel
          label={label}
          hasError={errors && errors[name]}
          labelIcon={labelIcon}
          labelTooltip={labelTooltip}
        />
        <input
          ref={ref as any}
          {...props}
          className={`app-input ${errors && errors[name] ? "error" : ""} ${
            props.className ? props.className : ""
          }`}
          autoComplete="autocomplete_off_hack_rsp!b"
          onChange={(e) => {
            if (!props.disabled) {
              props.onChange(e);
            }
          }}
        />
        <span
          className={`app-input-error-message ${
            shouldShowErrorMessage ? "visible" : "invisible"
          }`}
        >
          {errors &&
            errors[name] &&
            renderErrorMessage(
              errors[name].type,
              props,
              defaultErrorMessage,
              errors[name].message
            )}
        </span>
        <span
          className={`app-input-success-message ${
            successMessage ? "visible" : "invisible"
          }`}
        >
          {renderMessage(successMessage)}
        </span>
        <span
          className={`app-input-message ${message ? "visible" : "invisible"}`}
        >
          {renderMessage(message)}
        </span>
      </div>
    );
  }
);

export default AppInput;
