import type { LucideIcon } from "lucide-react";

export type StatCardColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: StatCardColor;
  description?: string;
};

const colorClassNames: Record<
  StatCardColor,
  { card: string; icon: string }
> = {
  primary: {
    card: "stat-card-primary",
    icon: "stat-card-icon-primary",
  },
  secondary: {
    card: "stat-card-secondary",
    icon: "stat-card-icon-secondary",
  },
  success: {
    card: "stat-card-success",
    icon: "stat-card-icon-success",
  },
  danger: {
    card: "stat-card-danger",
    icon: "stat-card-icon-danger",
  },
  warning: {
    card: "stat-card-warning",
    icon: "stat-card-icon-warning",
  },
  info: {
    card: "stat-card-info",
    icon: "stat-card-icon-info",
  },
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  description,
}: StatCardProps) => {
  const colorClasses = colorClassNames[color];

  return (
    <div className={`stat-card ${colorClasses.card}`}>
      <div className={`stat-card-icon ${colorClasses.icon}`}>
        <Icon size={22} />
      </div>

      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>

        <p className="stat-card-value">{value}</p>

        {description && (
          <p className="stat-card-description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
