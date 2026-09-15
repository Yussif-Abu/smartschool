export type Staff = {
  accountNumber: string;
  bankName: string;
  campus: string;
  dateOfBirth: string;
  department: string;
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  employmentDate: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  firstName: string;
  gender: "Male" | "Female" | "Other";
  jobRole: string;
  lastName: string;
  middleName: string;
  phone: string;
  photo?: string;
  residentialAddress: string;
  shift: string;
  ssnitNumber: string;
  staffNumber: string;
  status: "Active" | "Inactive" | "Pending";
  supervisor: string;
  taxIdentificationNumber: string;
};

export const staff: Staff[] = [
  {
    staffNumber: "STF-1001",
    firstName: "Michael",
    middleName: "Kojo",
    lastName: "Addo",
    gender: "Male",
    dateOfBirth: "1982-03-15",
    phone: "+233 24 700 1001",
    email: "michael.addo@smartschool.edu",
    residentialAddress: "5 Cedar Road, Accra",
    photo: "",
    campus: "Central Campus",
    department: "Administration",
    jobRole: "Operations Manager",
    employmentType: "Full-time",
    employmentDate: "2017-06-01",
    status: "Active",
    supervisor: "School Director",
    shift: "Morning",
    ssnitNumber: "SSNIT-2001",
    taxIdentificationNumber: "TIN-2001",
    bankName: "GCB Bank",
    accountNumber: "2002002001",
    emergencyContact: "Esi Addo",
    emergencyPhone: "+233 20 700 1001",
  },
  {
    staffNumber: "STF-1002",
    firstName: "Evelyn",
    middleName: "",
    lastName: "Asare",
    gender: "Female",
    dateOfBirth: "1991-10-03",
    phone: "+233 24 700 1002",
    email: "evelyn.asare@smartschool.edu",
    residentialAddress: "18 Ringway, Accra",
    photo: "",
    campus: "North Campus",
    department: "Finance",
    jobRole: "Accounts Officer",
    employmentType: "Full-time",
    employmentDate: "2020-02-17",
    status: "Active",
    supervisor: "Operations Manager",
    shift: "Morning",
    ssnitNumber: "SSNIT-2002",
    taxIdentificationNumber: "TIN-2002",
    bankName: "Absa Bank Ghana",
    accountNumber: "2002002002",
    emergencyContact: "Daniel Asare",
    emergencyPhone: "+233 20 700 1002",
  },
  {
    staffNumber: "STF-1003",
    firstName: "Samuel",
    middleName: "Yaw",
    lastName: "Kwarteng",
    gender: "Male",
    dateOfBirth: "1979-12-22",
    phone: "+233 24 700 1003",
    email: "samuel.kwarteng@smartschool.edu",
    residentialAddress: "9 Garden Street, Accra",
    photo: "",
    campus: "West Campus",
    department: "Facilities",
    jobRole: "Facilities Supervisor",
    employmentType: "Contract",
    employmentDate: "2021-08-09",
    status: "Inactive",
    supervisor: "Operations Manager",
    shift: "Evening",
    ssnitNumber: "SSNIT-2003",
    taxIdentificationNumber: "TIN-2003",
    bankName: "Ecobank Ghana",
    accountNumber: "2002002003",
    emergencyContact: "Akosua Kwarteng",
    emergencyPhone: "+233 20 700 1003",
  },
];
