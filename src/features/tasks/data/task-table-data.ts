import type { TaskTableRow } from '../types'
import tasksJson from '@/data/tasks.json'
import leadsJson from '@/data/leads.json'
import membersJson from '@/data/members.json'

function getContactInfo(relatedMemberId: string | null, relatedMemberType: string | null): { email: string | null; phone: string | null } {
  if (!relatedMemberId || !relatedMemberType) return { email: null, phone: null }

  if (relatedMemberType === 'lead') {
    const lead = leadsJson.find((l) => l.id === relatedMemberId)
    return { email: lead?.email ?? null, phone: lead?.phone ?? null }
  }

  if (relatedMemberType === 'member') {
    const member = membersJson.find((m) => m.id === relatedMemberId)
    return { email: member?.email ?? null, phone: member?.phone ?? null }
  }

  return { email: null, phone: null }
}

export function getTaskTableData(): TaskTableRow[] {
  return tasksJson.map((task) => {
    const contact = getContactInfo(task.relatedMemberId, task.relatedMemberType)
    return {
      id: task.id,
      title: task.title,
      type: task.type as TaskTableRow['type'],
      category: task.category as TaskTableRow['category'],
      status: task.status as TaskTableRow['status'],
      priority: task.priority as TaskTableRow['priority'],
      assignedTo: task.assignedTo,
      relatedMember: task.relatedMember as string,
      relatedMemberType: task.relatedMemberType as TaskTableRow['relatedMemberType'],
      relatedMemberId: task.relatedMemberId as string,
      relatedMemberEmail: contact.email,
      relatedMemberPhone: contact.phone,
      dueDate: task.dueDate,
      createdDate: task.createdDate,
      description: task.description,
      communicationHistory: task.communicationHistory as TaskTableRow['communicationHistory'],
      notes: task.notes as TaskTableRow['notes'],
    }
  })
}
