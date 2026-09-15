import {Activity,BarChart3,BookOpen,Briefcase,Building2,Bus,CalendarCheck,CalendarDays,
  ClipboardCheck,ClipboardList,FileSpreadsheet,FileText,GraduationCap,HeartPulse,Library,
  LogOut,MessageSquare,Package,Settings,ShieldCheck,ShieldAlert,ShoppingCart,
  UserCog,UserRound,Users,Wallet,LayoutDashboard,type LucideIcon,} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "School",
    items: [
      {
        title: "Campuses",
        href: "/campuses",
        icon: Building2,
      },
      {
        title: "Students",
        href: "/students",
        icon: GraduationCap,
      },
      {
        title: "Guardians",
        href: "/guardians",
        icon: UserRound,
      },
      {
        title: "Teachers",
        href: "/teachers",
        icon: Users,
      },
      {
        title: "Staff",
        href: "/staff",
        icon: Briefcase,
      },
    ],
  },

  {
    title: "Academic",
    items: [
      {
        title: "Academics",
        href: "/academics",
        icon: BookOpen,
      },
      {
        title: "Attendance",
        href: "/attendance",
        icon: CalendarCheck,
      },
      {
        title: "Assessments",
        href: "/assessments",
        icon: ClipboardCheck,
      },
      {
        title: "Examinations",
        href: "/examinations",
        icon: FileText,
      },
      {
        title: "Results",
        href: "/results",
        icon: BarChart3,
      },
      {
        title: "Report Cards",
        href: "/report-cards",
        icon: FileSpreadsheet,
      },
      {
        title: "Timetable",
        href: "/timetable",
        icon: CalendarDays,
      },
    ],
  },

  {
    title: "Operations",
    items: [
      {
        title: "Finance",
        href: "/finance",
        icon: Wallet,
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: Package,
      },
      {
        title: "Procurement",
        href: "/procurement",
        icon: ShoppingCart,
      },
      {
        title: "Library",
        href: "/library",
        icon: Library,
      },
      {
        title: "Transport",
        href: "/transport",
        icon: Bus,
      },
      {
        title: "Health",
        href: "/health",
        icon: HeartPulse,
      },
      {
        title: "Discipline",
        href: "/discipline",
        icon: ShieldAlert,
      },
      {
        title: "Communication",
        href: "/communication",
        icon: MessageSquare,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
      {
        title: "Users",
        href: "/users",
        icon: Users,
      },
      {
        title: "Roles",
        href: "/roles",
        icon: ShieldCheck,
      },
      {
        title: "Audit Logs",
        href: "/audit-logs",
        icon: Activity,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export const portalNavigationItems: NavigationItem[] = [
  {
    title: "Parent Portal",
    href: "/parent-portal",
    icon: UserRound,
  },
  {
    title: "Student Portal",
    href: "/student-portal",
    icon: GraduationCap,
  },
  {
    title: "Teacher Portal",
    href: "/teacher-portal",
    icon: BookOpen,
  },
];

export const logoutNavigationItem: NavigationItem = {
  title: "Sign out",
  href: "/login",
  icon: LogOut,
};