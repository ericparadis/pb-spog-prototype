import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { PillFilter } from '@/features/_shared/components/PillFilter'
import { taskColumns } from './components/TaskTableColumns'
import { getTaskTableData } from './data/task-table-data'
import { TasksToolbar } from './components/TasksToolbar'
import type { TaskType } from './types'

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

  const filteredData = useMemo(() => {
    let data = allData

    if (typeFilter !== 'all') {
      data = data.filter((row) => row.type === typeFilter)
    }

    if (search.trim()) {
      const term = search.toLowerCase()
      data = data.filter(
        (row) =>
          row.title.toLowerCase().includes(term) ||
          row.assignedTo.toLowerCase().includes(term) ||
          row.category.toLowerCase().includes(term) ||
          row.status.toLowerCase().includes(term) ||
          (row.relatedMember && row.relatedMember.toLowerCase().includes(term))
      )
    }

    return data
  }, [allData, search, typeFilter])

  return (
    <PageContent>
      <PageHeader
        title="Tasks"
        description="Track and manage team tasks and action items"
      />
      <PillFilter
        options={taskFilterOptions}
        value={typeFilter}
        onChange={setTypeFilter}
      />
      <div className="mt-4">
        <TasksToolbar searchValue={search} onSearchChange={setSearch} />
      </div>
      <FigmaDataTable
        columns={taskColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
