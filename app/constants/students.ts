export type Student = {
  campus: 'Central Campus' | 'North Campus' | 'West Campus'
  email: string
  grade: string
  id: string
  name: string
  status: 'Active' | 'Inactive' | 'Pending'
}

export type StudentStatsSummary = {
  allStudents: number
  boys: number
  girls: number
  boysToGirlsRatio: string
  inactiveStudents: number
  inactivePercentage: number
}

export const students: Student[] = [
  { id: 'STU-1001', name: 'Amina Yusuf', email: 'amina.yusuf@smartschool.edu', grade: 'Grade 10', campus: 'North Campus', status: 'Active' },
  { id: 'STU-1002', name: 'Noah Williams', email: 'noah.williams@smartschool.edu', grade: 'Grade 8', campus: 'Central Campus', status: 'Active' },
  { id: 'STU-1003', name: 'Leila Hassan', email: 'leila.hassan@smartschool.edu', grade: 'Grade 11', campus: 'North Campus', status: 'Pending' },
  { id: 'STU-1004', name: 'Ethan Chen', email: 'ethan.chen@smartschool.edu', grade: 'Grade 7', campus: 'West Campus', status: 'Active' },
  { id: 'STU-1005', name: 'Sofia Garcia', email: 'sofia.garcia@smartschool.edu', grade: 'Grade 9', campus: 'Central Campus', status: 'Inactive' },
  { id: 'STU-1006', name: 'Omar Ali', email: 'omar.ali@smartschool.edu', grade: 'Grade 12', campus: 'North Campus', status: 'Active' },
  { id: 'STU-1007', name: 'Maya Patel', email: 'maya.patel@smartschool.edu', grade: 'Grade 6', campus: 'West Campus', status: 'Active' },
  { id: 'STU-1008', name: 'Lucas Martin', email: 'lucas.martin@smartschool.edu', grade: 'Grade 10', campus: 'Central Campus', status: 'Pending' },
  { id: 'STU-1009', name: 'Zara Ahmed', email: 'zara.ahmed@smartschool.edu', grade: 'Grade 8', campus: 'North Campus', status: 'Active' },
  { id: 'STU-1010', name: 'Henry Brown', email: 'henry.brown@smartschool.edu', grade: 'Grade 11', campus: 'West Campus', status: 'Active' },
  { id: 'STU-1011', name: 'Nora Johnson', email: 'nora.johnson@smartschool.edu', grade: 'Grade 7', campus: 'Central Campus', status: 'Inactive' },
  { id: 'STU-1012', name: 'Samir Khan', email: 'samir.khan@smartschool.edu', grade: 'Grade 9', campus: 'North Campus', status: 'Active' },
  { id: 'STU-1013', name: 'Grace Mensah', email: 'grace.mensah@smartschool.edu', grade: 'Grade 12', campus: 'Central Campus', status: 'Active' },
  { id: 'STU-1014', name: 'Daniel Owusu', email: 'daniel.owusu@smartschool.edu', grade: 'Grade 6', campus: 'West Campus', status: 'Pending' },
  { id: 'STU-1015', name: 'Fatima Diallo', email: 'fatima.diallo@smartschool.edu', grade: 'Grade 10', campus: 'North Campus', status: 'Active' },
]

const boyNames = new Set(['Noah Williams', 'Ethan Chen', 'Omar Ali', 'Lucas Martin', 'Henry Brown', 'Samir Khan', 'Daniel Owusu'])
const girlNames = new Set(['Amina Yusuf', 'Leila Hassan', 'Sofia Garcia', 'Maya Patel', 'Zara Ahmed', 'Nora Johnson', 'Grace Mensah', 'Fatima Diallo'])

export const studentStats: StudentStatsSummary = {
  allStudents: students.length,
  boys: boyNames.size,
  girls: girlNames.size,
  boysToGirlsRatio: `${boyNames.size}:${girlNames.size}`,
  inactiveStudents: students.filter((student) => student.status === 'Inactive').length,
  inactivePercentage: Number(((students.filter((student) => student.status === 'Inactive').length / students.length) * 100).toFixed(1)),
}

