export type Teacher = {
  accountNumber: string;
  bankName: string;
  branch: string;
  campus: string;
  classTeacher: "Yes" | "No";
  dateOfBirth: string;
  department: string;
  email: string;
  employmentDate: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  firstName: string;
  gender: "Male" | "Female" | "Other";
  highestQualification: string;
  institution: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  primarySubjects: string[];
  professionalLicenceNumber: string;
  residentialAddress: string;
  ssnitNumber: string;
  staffCategory: string;
  status: "Active" | "Inactive" | "Pending";
  teacherNumber: string;
  title: "Mr." | "Mrs." | "Ms." | "Dr.";
  yearCompleted: number;
};

export const teachers: Teacher[] = [
  {
    teacherNumber: "TCH-1001",
    title: "Mrs.",
    firstName: "Ama",
    middleName: "Serwaa",
    lastName: "Mensah",
    gender: "Female",
    dateOfBirth: "1988-04-12",
    phoneNumber: "+233 24 600 1001",
    email: "ama.mensah@smartschool.edu",
    residentialAddress: "12 Mango Street, Accra",
    campus: "North Campus",
    department: "Mathematics",
    primarySubjects: ["Mathematics"],
    employmentType: "Full-time",
    employmentDate: "2018-09-01",
    status: "Active",
    classTeacher: "Yes",
    staffCategory: "Teaching Staff",
    highestQualification: "MSc Mathematics Education",
    institution: "University of Cape Coast",
    yearCompleted: 2016,
    professionalLicenceNumber: "GTE-2016-1001",
    ssnitNumber: "SSNIT-1001",
    bankName: "GCB Bank",
    accountNumber: "1001001001",
    branch: "Accra Main",
  },
  {
    teacherNumber: "TCH-1002",
    title: "Mr.",
    firstName: "Kwame",
    middleName: "",
    lastName: "Owusu",
    gender: "Male",
    dateOfBirth: "1985-11-20",
    phoneNumber: "+233 24 600 1002",
    email: "kwame.owusu@smartschool.edu",
    residentialAddress: "6 Lake Road, Accra",
    campus: "Central Campus",
    department: "Science",
    primarySubjects: ["Science", "Biology"],
    employmentType: "Full-time",
    employmentDate: "2019-01-14",
    status: "Active",
    classTeacher: "No",
    staffCategory: "Teaching Staff",
    highestQualification: "BSc Biology",
    institution: "University of Ghana",
    yearCompleted: 2012,
    professionalLicenceNumber: "GTE-2012-1002",
    ssnitNumber: "SSNIT-1002",
    bankName: "Ecobank Ghana",
    accountNumber: "1001001002",
    branch: "Legon",
  },
  {
    teacherNumber: "TCH-1003",
    title: "Ms.",
    firstName: "Nana",
    middleName: "Abena",
    lastName: "Boateng",
    gender: "Female",
    dateOfBirth: "1990-07-08",
    phoneNumber: "+233 24 600 1003",
    email: "nana.boateng@smartschool.edu",
    residentialAddress: "22 Palm Avenue, Accra",
    campus: "West Campus",
    department: "English",
    primarySubjects: ["English", "Literature"],
    employmentType: "Part-time",
    employmentDate: "2022-09-05",
    status: "Active",
    classTeacher: "Yes",
    staffCategory: "Teaching Staff",
    highestQualification: "BA English",
    institution: "University of Education, Winneba",
    yearCompleted: 2014,
    professionalLicenceNumber: "GTE-2014-1003",
    ssnitNumber: "SSNIT-1003",
    bankName: "Absa Bank Ghana",
    accountNumber: "1001001003",
    branch: "Osu",
  },
];
