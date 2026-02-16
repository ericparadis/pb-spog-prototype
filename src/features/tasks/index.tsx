import { useState, useMemo } from 'react'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { TableCategorySelector } from '@/features/_shared/components/TableCategorySelector'
import { taskColumns } from './components/TaskTableColumns'
import { getTaskTableData } from './data/task-table-data'
import { TasksToolbar } from './components/TasksToolbar'
import { TaskDetailDrawer } from './components/TaskDetailDrawer'
import { TaskFilterPanel } from './components/TaskFilterPanel'
import { TaskStats } from './components/TaskStats'
import type { TaskFilters } from './components/TaskFilterPanel'
import type { TaskType, TaskTableRow } from './types'

type TaskFilterValue = 'all' | TaskType

const taskFilterOptions = [
  { label: 'All Tasks', value: 'all' as TaskFilterValue },
  { label: 'Lead Followup', value: 'lead-followup' as TaskFilterValue },
  { label: 'Member Followup', value: 'member-followup' as TaskFilterValue },
  { label: 'Revenue', value: 'revenue' as TaskFilterValue },
]

export default function Tasks() {
  const allData = getTaskTableData()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<TaskFilterValue>('all')
  const [selectedTask, setSelectedTask] = useState<TaskTableRow | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    type: 'all',
    assignedTo: 'all',
  })

  const staffNames = useMemo(() => {
    const names = new Set(allData.map((row) => row.assignedTo))
    return Array.from(names).sort()
  }, [allData])

  const filteredData = useMemo(() => {
    let data = allData

    if (typeFilter !== 'all') {
      data = data.filter((row) => row.type === typeFilter)
    }

    if (filters.status !== 'all') {
      data = data.filter((row) => row.status === filters.status)
    }

    if (filters.type !== 'all') {
      data = data.filter((row) => row.type === filters.type)
    }

    if (filters.assignedTo !== 'all') {
      data = data.filter((row) => row.assignedTo === filters.assignedTo)
    }

    if (search.trim()) {
      const term = search.toLowerCase()
      data = data.filter(
        (row) =>
          row.title.toLowerCase().includes(term) ||
          row.assignedTo.toLowerCase().includes(term) ||
          row.category.toLowerCase().includes(term) ||
          row.status.toLowerCase().includes(term) ||
          row.relatedMember.toLowerCase().includes(term)
      )
    }

    return data
  }, [allData, search, typeFilter, filters])

  function handleComplete(taskId: string) {
    setSelectedTask(null)
    // In a real app this would update the task status via API
    console.log(`Task ${taskId} marked as complete`)
  }

  return (
    <PageContent>
      <TaskStats data={allData} />
      <div className="flex items-center justify-between mb-4">
        <TableCategorySelector
          options={taskFilterOptions}
          value={typeFilter}
          onChange={setTypeFilter}
        />
        <TasksToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onFiltersClick={() => setShowFilters(!showFilters)}
        />
      </div>
      {showFilters && (
        <TaskFilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
          staffNames={staffNames}
        />
      )}
      <FigmaDataTable
        columns={taskColumns}
        data={filteredData}
        className="table-standard"
        enableRowSelection
        onRowClick={(row) => setSelectedTask(row)}
      />
      {selectedTask && (
        <TaskDetailDrawer
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={handleComplete}
        />
      )}
    </PageContent>
  )
}
