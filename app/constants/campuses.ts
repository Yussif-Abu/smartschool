export type Campus = {
  campusCode: string;
  campusHead: string;
  campusName: string;
  cityTown: string;
  email: string;
  openingDate: string;
  phone: string;
  region: string;
  status: "Active" | "Inactive";
  streetAddress: string;
  studentCapacity: number;
};

export const campuses: Campus[] = [
  {
    campusName: "Central Campus",
    campusCode: "CEN",
    status: "Active",
    phone: "+233 30 200 1001",
    email: "central@smartschool.edu",
    campusHead: "Dr. Richard Arthur",
    streetAddress: "15 Independence Avenue",
    cityTown: "Accra",
    region: "Greater Accra",
    studentCapacity: 1000,
    openingDate: "2010-09-01",
  },
  {
    campusName: "North Campus",
    campusCode: "NOR",
    status: "Active",
    phone: "+233 30 200 1002",
    email: "north@smartschool.edu",
    campusHead: "Mrs. Patricia Osei",
    streetAddress: "24 School Road",
    cityTown: "Accra",
    region: "Greater Accra",
    studentCapacity: 800,
    openingDate: "2015-09-01",
  },
  {
    campusName: "West Campus",
    campusCode: "WES",
    status: "Active",
    phone: "+233 30 200 1003",
    email: "west@smartschool.edu",
    campusHead: "Mr. Daniel Adjei",
    streetAddress: "7 West Hills Avenue",
    cityTown: "Accra",
    region: "Greater Accra",
    studentCapacity: 700,
    openingDate: "2019-09-01",
  },
  {
    campusName: "East Campus",
    campusCode: "EAS",
    status: "Inactive",
    phone: "+233 30 200 1004",
    email: "east@smartschool.edu",
    campusHead: "Mrs. Evelyn Aidoo",
    streetAddress: "3 Community Road",
    cityTown: "Tema",
    region: "Greater Accra",
    studentCapacity: 500,
    openingDate: "2023-09-01",
  },
];
