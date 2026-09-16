export type Subject = {
  code: string;
  subject: string;
  department: string;
};

export const subjects: Subject[] = [
  { code: "MAT-101", subject: "Mathematics", department: "STEM" },
  { code: "ENG-201", subject: "English Language", department: "Humanities" },
  { code: "BIO-301", subject: "Biology", department: "Science" },
  { code: "CHE-302", subject: "Chemistry", department: "Science" },
  { code: "PHY-303", subject: "Physics", department: "Science" },
  { code: "GEO-401", subject: "Geography", department: "Social Studies" },
  { code: "HIS-402", subject: "History", department: "Humanities" },
  { code: "ICT-501", subject: "Information Technology", department: "STEM" },
  { code: "BUS-601", subject: "Business Studies", department: "Commerce" },
  { code: "ART-701", subject: "Visual Arts", department: "Creative Arts" },
];
