import { useEffect, useState } from 'react'
import { listUsers } from '../api/meta'

export default function FilterBar({ value, onChange }) {
  const [users, setUsers] = useState([])
  useEffect(()=>{ listUsers().then(setUsers) },[])
  const set = (k,v) => onChange({ ...value, [k]: v })

  return (
    <div className="bg-white border rounded-xl p-3 flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs text-slate-600">Status</label>
        <select className="border rounded p-2 text-sm" value={value.status||''} onChange={e=>set('status', e.target.value||undefined)}>
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-slate-600">Assignee</label>
        <select className="border rounded p-2 text-sm" value={value.assigneeId||''} onChange={e=>set('assigneeId', e.target.value||undefined)}>
          <option value="">Anyone</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs text-slate-600">Search</label>
        <input className="border rounded p-2 text-sm w-full" placeholder="title or label…" value={value.q||''} onChange={e=>set('q', e.target.value||undefined)} />
      </div>
    </div>
  )
}
