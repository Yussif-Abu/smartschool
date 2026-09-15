import type { LucideIcon } from "lucide-react";

import StatCard, {type StatCardColor} from "@/components/ui/stat-card";

export type StatItem = {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
};

type StatsGridProps = {
    stats: StatItem[];
};

const colors: StatCardColor[] = [
    "primary",
    "success",
    "info",
    "warning",
    "secondary",
    "danger",
];

const StatsGrid = ({ stats }: StatsGridProps) => {
    return (
        <div className="stats-grid mb-10">
            {stats.map((stat, index) => {
                const color =
                    colors[index % colors.length];

                return (
                    <StatCard
                        key={stat.title}
                        {...stat}
                        color={color}
                    />
                );
            })}
        </div>
    );
};

export default StatsGrid;
