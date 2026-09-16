import {
  BookOpen,
  Building2,
  GraduationCap,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import type { StatItem } from "@/components/ui/stat-grid";

export {
  students,
  type Student,
  type StudentStatsSummary,
  studentStats,
} from "./students";
export { guardians, type Guardian } from "./guardians";
export { teachers, type Teacher } from "./teachers";
export { staff, type Staff } from "./staff";
export { campuses, type Campus } from "./campuses";
export { academics, type Academic } from "./academics";
export { classes, type AcademicClass } from "./class";
export { subjects, type Subject } from "./subject";
export { academicTerms, type AcademicTerm } from "./academicTerm";

export const dashboardStats: StatItem[] = [
  {
    title: "Students",
    value: 1248,
    description: "Across all campuses",
    icon: GraduationCap,
  },
  {
    title: "Teachers",
    value: 84,
    description: "Active teachers",
    icon: Users,
  },
  {
    title: "Campuses",
    value: 4,
    description: "Active campuses",
    icon: Building2,
  },
  {
    title: "Revenue",
    value: "GH₵86,450",
    description: "This term",
    icon: Wallet,
  },
  {
    title: "Courses",
    value: 32,
    description: "Active courses",
    icon: BookOpen,
  },
  {
    title: "Guardians",
    value: 986,
    description: "Registered guardians",
    icon: UserRound,
  },
];
