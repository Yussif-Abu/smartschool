
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      name,
      label,
      type = "text",
      error,
      helperText,
      startIcon,
      endIcon,
      required,
      className = "",
      ...props
    },
    ref,
  ) {
    const inputId = id ?? name;
    const messageId = inputId ? `${inputId}-message` : undefined;

    return (
      <div className="form-field">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="form-required"> *</span>}
          </label>
        )}

        <div className="form-input-wrapper">
          {startIcon && (
            <span className="form-input-icon form-input-icon-start">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? messageId : undefined}
            className={[
              "form-input",
              startIcon ? "form-input-with-start-icon" : "",
              endIcon ? "form-input-with-end-icon" : "",
              error ? "form-input-error" : "",
              type === "file" ? "form-file-input" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {endIcon && (
            <span className="form-input-icon form-input-icon-end">
              {endIcon}
            </span>
          )}
        </div>

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



{/* <TextField
  label="Full name"
  name="fullName"
  placeholder="Enter your full name"
  required
/>

<TextField
  label="Profile photo"
  name="profilePhoto"
  type="file"
  accept="image/png,image/jpeg"
/>

<TextField
  label="Documents"
  name="documents"
  type="file"
  accept=".pdf,.doc,.docx"
  multiple
/> */}