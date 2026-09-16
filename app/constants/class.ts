export type AcademicClass = {
  id: string;
  className: string;
  grade: string;
  stream: string;
  formTeacher: string;
  campus: string;
  students: number;
};

export const classes: AcademicClass[] = [
  {
    id: "CLS-1001",
    className: "Grade 7A",
    grade: "Grade 7",
    stream: "General",
    formTeacher: "Mrs. Ama Mensah",
    campus: "Central Campus",
    students: 42,
  },
  {
    id: "CLS-1002",
    className: "Grade 8B",
    grade: "Grade 8",
    stream: "Science",
    formTeacher: "Mr. Kwame Owusu",
    campus: "North Campus",
    students: 38,
  },
  {
    id: "CLS-1003",
    className: "Grade 9C",
    grade: "Grade 9",
    stream: "Arts",
    formTeacher: "Ms. Nana Boateng",
    campus: "West Campus",
    students: 35,
  },
  {
    id: "CLS-1004",
    className: "Grade 10A",
    grade: "Grade 10",
    stream: "Business",
    formTeacher: "Mrs. Evelyn Asare",
    campus: "Central Campus",
    students: 40,
  },
  {
    id: "CLS-1005",
    className: "Grade 11S",
    grade: "Grade 11",
    stream: "Science",
    formTeacher: "Dr. Richard Arthur",
    campus: "North Campus",
    students: 31,
  },
  {
    id: "CLS-1006",
    className: "Grade 12A",
    grade: "Grade 12",
    stream: "General",
    formTeacher: "Mr. Daniel Adjei",
    campus: "West Campus",
    students: 29,
  },
];
