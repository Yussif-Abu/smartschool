import type { ChoiceOption } from "./form.types";

type RadioGroupProps = {
  name: string;
  label?: string;
  options: ChoiceOption[];
  defaultValue?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  orientation?: "horizontal" | "vertical";
};

export function RadioGroup({
  name,
  label,
  options,
  defaultValue,
  required,
  error,
  helperText,
  orientation = "vertical",
}: RadioGroupProps) {
  const messageId = `${name}-message`;

  return (
    <fieldset
      className="form-field"
      aria-invalid={Boolean(error)}
      aria-describedby={error || helperText ? messageId : undefined}
    >
      {label && (
        <legend className="form-label">
          {label}
          {required && <span className="form-required"> *</span>}
        </legend>
      )}

      <div
        className={
          orientation === "horizontal"
            ? "form-radio-group-horizontal"
            : "form-radio-group-vertical"
        }
      >
        {options.map((option, index) => {
          const optionId = `${name}-${index}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="form-choice-label"
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                required={required}
                disabled={option.disabled}
                defaultChecked={defaultValue === option.value}
                className="form-radio"
              />

              <span>{option.label}</span>
            </label>
          );
        })}
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
    </fieldset>
  );
}