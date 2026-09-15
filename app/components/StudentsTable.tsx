'use client'

import { useCreateAtom, useSelector } from '@tanstack/react-store'
import { createColumnHelper, type PaginationState, type SortingState } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'
import type { Student } from '@/constants/students'
import { DataGrid, dataGridFeatures, type DataGridFilter } from './DataGrid'

export type StudentsTableUrlState = {
  pageIndex: number
  pageSize: number
  query: string
  sorting: SortingState
}

const columnHelper = createColumnHelper<typeof dataGridFeatures, Student>()

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Student',
    sortFn: 'text',
    cell: ({ getValue, row }) => (
      <div>
        <p className="data-grid-primary-value">{getValue()}</p>
        <p className="data-grid-secondary-value">{row.original.email}</p>
      </div>
    ),
  }),
  columnHelper.accessor('id', { header: 'Student ID', sortFn: 'alphanumeric' }),
  columnHelper.accessor('grade', { header: 'Grade', sortFn: 'alphanumeric' }),
  columnHelper.accessor('campus', { header: 'Campus', sortFn: 'text' }),
  columnHelper.accessor('status', {
    header: 'Status',
    sortFn: 'text',
    cell: ({ getValue }) => {
      const status = getValue()
      const color = status === 'Active'
        ? 'status-badge-active'
        : status === 'Pending'
          ? 'status-badge-pending'
          : 'status-badge-inactive'
      return <span className={`status-badge ${color}`}>{status}</span>
    },
  }),
])

const filters: DataGridFilter[] = [
  {
    allLabel: 'All campuses',
    columnId: 'campus',
    label: 'Campus',
    options: [
      { label: 'Central Campus', value: 'Central Campus' },
      { label: 'North Campus', value: 'North Campus' },
      { label: 'West Campus', value: 'West Campus' },
    ],
  },
  {
    allLabel: 'All statuses',
    columnId: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Inactive', value: 'Inactive' },
    ],
  },
]

function syncTableUrl(query: string, sorting: SortingState, pagination: PaginationState) {
  const params = new URLSearchParams(window.location.search)

  if (query) params.set('q', query)
  else params.delete('q')

  if (sorting[0]) params.set('sort', `${sorting[0].id}.${sorting[0].desc ? 'desc' : 'asc'}`)
  else params.delete('sort')

  if (pagination.pageIndex) params.set('page', String(pagination.pageIndex + 1))
  else params.delete('page')

  if (pagination.pageSize !== 5) params.set('size', String(pagination.pageSize))
  else params.delete('size')

  const queryString = params.toString()
  window.history.replaceState(null, '', `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`)
}

type StudentsTableProps = {
  initialData: Student[]
  initialUrlState: StudentsTableUrlState
}

export function StudentsTable({ initialData, initialUrlState }: StudentsTableProps) {
  const [rows, setRows] = useState(initialData)

  // Routing owns only the state users should be able to share or refresh.
  const globalFilter = useCreateAtom<unknown>(initialUrlState.query)
  const sorting = useCreateAtom<SortingState>(initialUrlState.sorting)
  const pagination = useCreateAtom<PaginationState>({
    pageIndex: initialUrlState.pageIndex,
    pageSize: initialUrlState.pageSize,
  })

  const queryValue = useSelector(globalFilter, (value) => String(value ?? ''))
  const sortingValue = useSelector(sorting)
  const paginationValue = useSelector(pagination)

  useEffect(() => {
    syncTableUrl(queryValue, sortingValue, paginationValue)
  }, [paginationValue, queryValue, sortingValue])

  const handleCreate = useCallback(() => {
    window.alert('Connect this action to the create-student form.')
  }, [])

  const handleEdit = useCallback((student: Student) => {
    window.alert(`Edit ${student.name}`)
  }, [])

  const handleDelete = useCallback((student: Student) => {
    if (!window.confirm(`Delete ${student.name}?`)) return
    setRows((current) => current.filter((row) => row.id !== student.id))
  }, [])

  return (
    <DataGrid
      atoms={{ globalFilter, pagination, sorting }}
      columns={columns}
      data={rows}
      exportFileName="students"
      filters={filters}
      getRowId={(student) => student.id}
      onDelete={handleDelete}
      onEdit={handleEdit}
      searchLabel="Search students"
    />
  )
}
