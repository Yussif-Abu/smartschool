import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: ReactNode;
  error?: string;
  helperText?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      name,
      label,
      error,
      helperText,
      className = "",
      ...props
    },
    ref,
  ) {
    const checkboxId = id ?? name;
    const messageId = checkboxId
      ? `${checkboxId}-message`
      : undefined;

    return (
      <div className="form-choice-field">
        <label className="form-choice-label" htmlFor={checkboxId}>
          <input
            ref={ref}
            id={checkboxId}
            name={name}
            type="checkbox"
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? messageId : undefined}
            className={`form-checkbox ${className}`}
            {...props}
          />

          <span>{label}</span>
        </label>

        {(error || helperText) && (
          <p
            id={messageId}
            role={error ? "alert" : undefined}
            className={error ? "form-error-message" : "form-helper-text"}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

{/* <Checkbox
  name="isActive"
  value="true"
  label="Student is active"
  defaultChecked
/> */}