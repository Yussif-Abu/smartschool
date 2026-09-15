import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";
import type { SelectOption } from "./form.types";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      id,
      name,
      label,
      error,
      helperText,
      placeholder = "Select an option",
      options,
      required,
      className = "",
      ...props
    },
    ref,
  ) {
    const selectId = id ?? name;
    const messageId = selectId ? `${selectId}-message` : undefined;

    return (
      <div className="form-field">
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
            {required && <span className="form-required"> *</span>}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={[
            "form-select",
            error ? "form-input-error" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

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