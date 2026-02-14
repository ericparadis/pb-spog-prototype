import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PageContent } from '@/components/PageContent'
import { FigmaDataTable } from '@/features/_shared/components/FigmaDataTable'
import { taskColumns } from './components/TaskTableColumns'
import { getTaskTableData } from './data/task-table-data'
import { TasksToolbar } from './components/TasksToolbar'

export default function Tasks() {
  const allData = getTaskTableData()
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    if (!search.trim()) return allData
    const term = search.toLowerCase()
    return allData.filter(
      (row) =>
        row.title.toLowerCase().includes(term) ||
        row.assignedTo.toLowerCase().includes(term) ||
        row.category.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term) ||
        (row.relatedMember && row.relatedMember.toLowerCase().includes(term))
    )
  }, [allData, search])

  return (
    <PageContent>
      <PageHeader
        title="Tasks"
        description="Track and manage team tasks and action items"
      />
      <TasksToolbar searchValue={search} onSearchChange={setSearch} />
      <FigmaDataTable
        columns={taskColumns}
        data={filteredData}
        enableRowSelection
      />
    </PageContent>
  )
}
