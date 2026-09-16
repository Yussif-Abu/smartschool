'use client'

import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ExternalAtoms,
  type RowData,
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { capturePostHogEvent } from '@/helper/posthog'

/** The complete, stable capability registry shared by product data grids. */
export const dataGridFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    equalsString: filterFn_equalsString,
    includesString: filterFn_includesString,
  },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

export type DataGridColumn<TData extends RowData> = ColumnDef<
  typeof dataGridFeatures,
  TData,
  unknown
>

export type DataGridAtoms = Pick<
  ExternalAtoms<typeof dataGridFeatures>,
  'globalFilter' | 'pagination' | 'sorting'
>

export type DataGridFilter = {
  allLabel?: string
  columnId: string
  label: string
  options: readonly {
    label: string
    value: string
  }[]
}

type DataGridProps<TData extends RowData> = {
  atoms?: DataGridAtoms
  columns: DataGridColumn<TData>[]
  data: TData[]
  emptyMessage?: string
  exportFileName?: string
  filters?: readonly DataGridFilter[]
  getRowId: (row: TData) => string
  onCreate?: () => void
  onDelete?: (row: TData) => void
  onEdit?: (row: TData) => void
  searchLabel?: string
}

type ExportData = {
  headers: string[]
  rows: string[][]
}

function stringifyCell(value: unknown) {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function escapeCsvCell(value: string) {
  // Keep spreadsheet applications from interpreting exported data as formulas.
  const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safeValue.replaceAll('"', '""')}"`
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function escapeXml(value: string) {
  return escapeHtml(value).replaceAll('\r', '&#13;').replaceAll('\n', '&#10;')
}

function downloadFile(contents: BlobPart, type: string, fileName: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function getColumnDefinitionId<TData extends RowData>(column: DataGridColumn<TData>) {
  if (typeof column.id === 'string') return column.id
  if ('accessorKey' in column && typeof column.accessorKey === 'string') return column.accessorKey
  return undefined
}

export function DataGrid<TData extends RowData>({
  atoms,
  columns,
  data,
  emptyMessage = 'No records found.',
  exportFileName = 'table-export',
  filters = [],
  getRowId,
  onCreate,
  onDelete,
  onEdit,
  searchLabel = 'Search records',
}: DataGridProps<TData>) {
  const [exportMessage, setExportMessage] = useState('')
  const tableColumns = useMemo<DataGridColumn<TData>[]>(() => {
    const filterColumnIds = new Set(filters.map((filter) => filter.columnId))
    const filterableColumns = columns.map((column) => (
      filterColumnIds.has(getColumnDefinitionId(column) ?? '')
        ? { ...column, filterFn: 'equalsString' as const }
        : column
    ))

    if (!onEdit && !onDelete) return filterableColumns

    return [
      ...filterableColumns,
      {
        id: 'actions',
        enableGlobalFilter: false,
        enableSorting: false,
        header: 'Actions',
        cell: ({ row }) => (
          <div className="data-grid-actions">
            {onEdit ? (
              <button
                aria-label={`Edit ${row.id}`}
                className="data-grid-action data-grid-action-edit"
                onClick={() => onEdit(row.original)}
                type="button"
              >
                <Pencil aria-hidden="true" size={16} />
              </button>
            ) : null}
            {onDelete ? (
              <button
                aria-label={`Delete ${row.id}`}
                className="data-grid-action data-grid-action-delete"
                onClick={() => onDelete(row.original)}
                type="button"
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            ) : null}
          </div>
        ),
      },
    ]
  }, [columns, filters, onDelete, onEdit])

  const table = useTable(
    {
      atoms,
      columns: tableColumns,
      data,
      features: dataGridFeatures,
      getColumnCanGlobalFilter: (column) => column.id !== 'actions',
      getRowId,
      globalFilterFn: 'includesString',
      initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
    },
    (state) => ({
      columnFilters: state.columnFilters,
      globalFilter: state.globalFilter,
      pagination: state.pagination,
      sorting: state.sorting,
    }),
  )

  const rows = table.getRowModel().rows
  const { pageIndex, pageSize } = table.state.pagination
  const rowCount = table.getRowCount()
  const firstRow = rowCount === 0 ? 0 : pageIndex * pageSize + 1
  const lastRow = Math.min((pageIndex + 1) * pageSize, rowCount)

  const getExportData = (): ExportData => {
    const exportColumns = table.getAllLeafColumns().filter((column) => column.id !== 'actions')
    const exportRows = table.getPrePaginatedRowModel().rows

    return {
      headers: exportColumns.map((column) => (
        typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id
      )),
      rows: exportRows.map((row) => (
        exportColumns.map((column) => stringifyCell(row.getValue(column.id)))
      )),
    }
  }

  const showExportMessage = (message: string) => {
    setExportMessage(message)
    window.setTimeout(() => setExportMessage(''), 2500)
  }

  const handleCopy = async () => {
    const { headers, rows: exportRows } = getExportData()
    const text = [headers, ...exportRows].map((row) => row.join('\t')).join('\n')

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    showExportMessage('Table copied to clipboard')
  }

  const handleCsv = () => {
    const { headers, rows: exportRows } = getExportData()
    const csv = [headers, ...exportRows]
      .map((row) => row.map(escapeCsvCell).join(','))
      .join('\r\n')
    downloadFile(`\uFEFF${csv}`, 'text/csv;charset=utf-8', `${exportFileName}.csv`)
    showExportMessage('CSV downloaded')
  }

  const handleExcel = () => {
    const { headers, rows: exportRows } = getExportData()
    const excelRows = [headers, ...exportRows]
      .map((row) => `<Row>${row.map((value) => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join('')}</Row>`)
      .join('')
    const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Data"><Table>${excelRows}</Table></Worksheet></Workbook>`
    downloadFile(workbook, 'application/vnd.ms-excel;charset=utf-8', `${exportFileName}.xls`)
    showExportMessage('Excel file downloaded')
  }

  const handlePrint = () => {
    const { headers, rows: exportRows } = getExportData()
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      showExportMessage('Allow pop-ups to print the table')
      return
    }

    const heading = exportFileName.replaceAll('-', ' ')
    printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(heading)}</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#172033}h1{font-size:20px;text-transform:capitalize}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #d9dee8;padding:8px;text-align:left}th{background:#f3f6fa}@media print{body{margin:0}}</style></head><body><h1>${escapeHtml(heading)}</h1><table><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${exportRows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  const handleExport = (action: string) => {
    capturePostHogEvent('table_exported', {
      export_format: action,
      row_count: table.getPrePaginatedRowModel().rows.length,
      table_name: exportFileName,
    })

    if (action === 'copy') void handleCopy()
    else if (action === 'excel') handleExcel()
    else if (action === 'csv') handleCsv()
    else if (action === 'print') handlePrint()
  }

  return (
    <section aria-label="Data grid" className="card">
      <div className="data-grid-toolbar">
        <label className="data-grid-search">
          <span className="sr-only">{searchLabel}</span>
          <Search aria-hidden="true" className="data-grid-search-icon" size={18} />
          <input
            className="data-grid-search-input"
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={searchLabel}
            type="search"
            value={String(table.state.globalFilter ?? '')}
          />
        </label>
        <div className="data-grid-toolbar-controls">
          {onCreate ? (
            <button className="btn btn-primary btn-md" onClick={onCreate} type="button">
              <Plus aria-hidden="true" size={17} />
              Add student
            </button>
          ) : null}
          <label className="data-grid-export">
            <select
              aria-label="Export table"
              className="data-grid-export-select"
              onChange={(event) => handleExport(event.target.value)}
              value=""
            >
              <option disabled value="">Export</option>
              <option value="copy">Copy</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="print">Print</option>
            </select>
          </label>
          <div className="data-grid-filter-group">
            {filters.map((filter) => {
              const column = table.getColumn(filter.columnId)
              if (!column) return null

              return (
                <label className="data-grid-filter" key={filter.columnId}>
                  <span className="sr-only">{filter.label}</span>
                  <select
                    aria-label={filter.label}
                    className="data-grid-filter-select"
                    onChange={(event) => column.setFilterValue(event.target.value || undefined)}
                    value={String(column.getFilterValue() ?? '')}
                  >
                    <option value="">{filter.allLabel ?? `All ${filter.label.toLowerCase()}`}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
              )
            })}
          </div>
        </div>
        <p aria-live="polite" className="sr-only">{exportMessage}</p>
      </div>

      <div className="data-grid-scroll-area">
        <table className="data-grid-table">
          <thead className="data-grid-head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <th className="data-grid-header-cell" key={header.id} scope="col">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          aria-label={`Sort by ${header.column.id}`}
                          className="data-grid-sort-button"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          <table.FlexRender header={header} />
                          {sorted === 'asc' ? (
                            <ArrowUp aria-hidden="true" className="data-grid-sort-icon data-grid-sort-icon-active" size={15} />
                          ) : sorted === 'desc' ? (
                            <ArrowDown aria-hidden="true" className="data-grid-sort-icon data-grid-sort-icon-active" size={15} />
                          ) : (
                            <ArrowUpDown aria-hidden="true" className="data-grid-sort-icon" size={15} />
                          )}
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="data-grid-body">
            {rows.length ? rows.map((row) => (
              <tr className="data-grid-row" key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td className="data-grid-cell" key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td className="data-grid-empty" colSpan={tableColumns.length}>{emptyMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="data-grid-footer">
        <p className="data-grid-results">Showing {firstRow}-{lastRow} of {rowCount}</p>
        <div className="data-grid-pagination">
          <label className="data-grid-pagination-label" htmlFor="data-grid-page-size">Rows</label>
          <select
            className="data-grid-page-size"
            id="data-grid-page-size"
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            value={pageSize}
          >
            {[5, 10, 15].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <span className="data-grid-page-status">Page {pageIndex + 1} of {Math.max(table.getPageCount(), 1)}</span>
          <button aria-label="Previous page" className="data-grid-page-button" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} type="button">
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button aria-label="Next page" className="data-grid-page-button" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} type="button">
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
