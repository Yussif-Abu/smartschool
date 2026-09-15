export type Guardian = {
  authorisedPickup: "Yes" | "No";
  alternativePhone: string;
  digitalAddress: string;
  email: string;
  emergencyContact: string;
  firstName: string;
  gender: "Male" | "Female" | "Other";
  guardianId: string;
  lastName: string;
  linkedStudent: string;
  middleName: string;
  nationalIdNumber: string;
  occupation: string;
  portalAccess: "Enabled" | "Disabled";
  preferredCommunication: "SMS" | "Email" | "Phone";
  primaryPhone: string;
  residentialAddress: string;
  townCity: string;
};

export const guardians: Guardian[] = [
  {
    guardianId: "GDN-1001",
    firstName: "Abdul",
    middleName: "Rahman",
    lastName: "Yusuf",
    gender: "Male",
    occupation: "Civil Engineer",
    employer: "Accra Works Ltd",
    nationalIdNumber: "GHA-123456789-1",
    primaryPhone: "+233 24 555 1001",
    alternativePhone: "+233 20 555 1001",
    email: "abdul.yusuf@example.com",
    residentialAddress: "12 Independence Avenue",
    digitalAddress: "GA-123-4567",
    townCity: "Accra",
    linkedStudent: "STU-1001",
    authorisedPickup: "Yes",
    emergencyContact: "Fatima Yusuf - +233 24 555 1002",
    portalAccess: "Enabled",
    preferredCommunication: "SMS",
  },
  {
    guardianId: "GDN-1002",
    firstName: "Linda",
    middleName: "",
    lastName: "Williams",
    gender: "Female",
    occupation: "Accountant",
    employer: "North Star Finance",
    nationalIdNumber: "GHA-987654321-2",
    primaryPhone: "+233 24 555 1003",
    alternativePhone: "",
    email: "linda.williams@example.com",
    residentialAddress: "8 Oxford Street",
    digitalAddress: "GA-456-7890",
    townCity: "Accra",
    linkedStudent: "STU-1002",
    authorisedPickup: "Yes",
    emergencyContact: "Mark Williams - +233 20 555 1004",
    portalAccess: "Enabled",
    preferredCommunication: "Email",
  },
  {
    guardianId: "GDN-1003",
    firstName: "Joseph",
    middleName: "Kofi",
    lastName: "Mensah",
    gender: "Male",
    occupation: "Business Owner",
    employer: "Self-employed",
    nationalIdNumber: "GHA-246813579-3",
    primaryPhone: "+233 24 555 1005",
    alternativePhone: "+233 20 555 1005",
    email: "joseph.mensah@example.com",
    residentialAddress: "4 Ridge Road",
    digitalAddress: "GA-890-1234",
    townCity: "Accra",
    linkedStudent: "STU-1013",
    authorisedPickup: "No",
    emergencyContact: "Ama Mensah - +233 24 555 1006",
    portalAccess: "Disabled",
    preferredCommunication: "Phone",
  },
];
