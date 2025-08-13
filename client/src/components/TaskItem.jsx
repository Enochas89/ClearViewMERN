import { useState } from 'react'
import { updateTask, addTaskComment } from '../api/tasks'

export default function TaskItem({ t, users, onChanged }) {
  const [saving, setSaving] = useState(false)
  const user = users.find(u => u.id === t.assigneeId)

  const setStatus = async (status) => {
    setSaving(true)
    try { const nt = await updateTask(t.id, { status }); onChanged(nt) } finally { setSaving(false) }
  }

  const addComment = async () => {
    const text = prompt('Add comment:')
    if (!text) return
    setSaving(true)
    try { await addTaskComment(t.id, text); alert('Comment added') } finally { setSaving(false) }
  }

  return (
    <li className="border rounded px-3 py-2 flex items-center justify-between">
      <div>
        <div className="font-medium">{t.title}</div>
        <div className="text-xs text-slate-600">
          <span className="mr-2">Status: <span className="uppercase">{t.status}</span></span>
          <span className="mr-2">Priority: {t.priority}</span>
          {t.dueDate && <span className="mr-2">Due: {t.dueDate}</span>}
          {user && <span>Assignee: {user.name}</span>}
          {t.labels?.length ? <span className="ml-2">• {t.labels.join(', ')}</span> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select className="border rounded p-1 text-xs" disabled={saving}
          value={t.status} onChange={e=>setStatus(e.target.value)}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
        <button className="text-xs rounded bg-slate-800 text-white px-2 py-1" onClick={addComment} disabled={saving}>Comment</button>
      </div>
    </li>
  )
}
