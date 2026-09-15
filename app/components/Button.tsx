import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "outline"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = SharedButtonProps &
  Omit<ComponentProps<typeof Link>, "children" | "href"> & {
    href: ComponentProps<typeof Link>["href"];
  };

const isLinkButton = (
  props: ButtonProps | LinkButtonProps,
): props is LinkButtonProps => props.href !== undefined;

const Button = (props: ButtonProps | LinkButtonProps) => {
  if (isLinkButton(props)) {
    const {
      children,
      variant = "primary",
      size = "md",
      className = "",
      ...linkProps
    } = props;
    const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...buttonProps
  } = props;
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
