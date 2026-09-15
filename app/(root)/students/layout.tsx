import type { ReactNode } from 'react'
import { Plus, UserRound, Users, UserX } from 'lucide-react'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import StatsGrid, { type StatItem } from '@/components/ui/stat-grid'
import { studentStats } from '@/constants/students'

  const studentSummaryStats: StatItem[] = [
    {
      title: 'All Students',
      value: studentStats.allStudents,
      description: 'Across all campuses',
      icon: Users,
    },
    {
      title: 'Boys',
      value: studentStats.boys,
      description: `${studentStats.boysToGirlsRatio} ratio`,
      icon: UserRound,
    },
    {
      title: 'Girls',
      value: studentStats.girls,
      description: 'Female students enrolled',
      icon: UserRound,
    },
    {
      title: 'Inactive',
      value: `${studentStats.inactivePercentage}%`,
      description: `${studentStats.inactiveStudents} students inactive`,
      icon: UserX,
    },
  ]


const StudentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-container">
      <Heading title="Students" subtitle="Manage student records across every campus.">
        <Button variant="primary" size="sm" href="/students/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </Heading>
      <StatsGrid stats={studentSummaryStats} />
      {children}
    </div>
  )
}

export default StudentLayout