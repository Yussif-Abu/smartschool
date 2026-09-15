import {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      id,
      name,
      label,
      error,
      helperText,
      required,
      rows = 4,
      className = "",
      ...props
    },
    ref,
  ) {
    const textAreaId = id ?? name;
    const messageId = textAreaId
      ? `${textAreaId}-message`
      : undefined;

    return (
      <div className="form-field">
        {label && (
          <label htmlFor={textAreaId} className="form-label">
            {label}
            {required && <span className="form-required"> *</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textAreaId}
          name={name}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={[
            "form-textarea",
            error ? "form-input-error" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

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