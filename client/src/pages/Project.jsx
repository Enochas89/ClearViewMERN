import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '../api/projects'
import { listTasks, createTask, getActivities } from '../api/tasks'
import { listPosts, likePost } from '../api/posts'
import { getMeta, listUsers } from '../api/meta'
import ProjectHeader from '../components/ProjectHeader'
import FilterBar from '../components/FilterBar'
import TaskItem from '../components/TaskItem'

export default function Project() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [posts, setPosts] = useState([])
  const [filters, setFilters] = useState({})
  const [meta, setMeta] = useState(null)
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ title:'', assigneeId:'', dueDate:'', priority:'medium', labels:'' })
  const [feed, setFeed] = useState([])

  useEffect(() => { getProject(id).then(setProject) }, [id])
  useEffect(() => { getMeta().then(setMeta); listUsers().then(setUsers) }, [])
  useEffect(() => { listPosts(id).then(setPosts) }, [id])
  const refreshTasks = () => listTasks(id, filters).then(setTasks)
  useEffect(refreshTasks, [id, JSON.stringify(filters)])
  useEffect(()=>{ getActivities(id).then(setFeed) }, [id])

  const onTaskChanged = (nt) => setTasks(prev => prev.map(t => t.id === nt.id ? nt : t))

  const submitTask = async (e) => {
    e.preventDefault()
    const payload = {
      projectId: id,
      title: form.title.trim(),
      assigneeId: form.assigneeId || undefined,
      dueDate: form.dueDate || undefined,
      priority: form.priority || 'medium',
      labels: form.labels ? form.labels.split(',').map(s=>s.trim()).filter(Boolean) : []
    }
    if (!payload.title) return alert('Title required')
    const t = await createTask(payload)
    setForm({ title:'', assigneeId:'', dueDate:'', priority:'medium', labels:'' })
    setTasks(prev => [t, ...prev])
  }

  return (
    <div className="h-screen flex flex-col">
      <ProjectHeader project={project} />
      <div className="p-3 grid grid-cols-6 gap-3 flex-1 overflow-hidden">
        <div className="col-span-4 flex flex-col overflow-hidden">
          <FilterBar value={filters} onChange={setFilters} />
          <div className="bg-white rounded-xl shadow p-3 mt-3 flex-1 overflow-auto">
            <div className="font-semibold mb-2">Tasks</div>
            <ul className="text-sm space-y-2">
              {tasks.map(t => <TaskItem key={t.id} t={t} users={users} onChanged={onTaskChanged} />)}
            </ul>
          </div>

          <form onSubmit={submitTask} className="bg-white rounded-xl shadow p-3 mt-3">
            <div className="font-semibold mb-2">New Task</div>
            <div className="grid grid-cols-6 gap-2">
              <input className="border rounded p-2 text-sm col-span-2" placeholder="Title"
                value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} />
              <select className="border rounded p-2 text-sm" value={form.assigneeId}
                onChange={e=>setForm({ ...form, assigneeId:e.target.value })}>
                <option value="">Assignee</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
              <input className="border rounded p-2 text-sm" type="date" value={form.dueDate}
                onChange={e=>setForm({ ...form, dueDate:e.target.value })} />
              <select className="border rounded p-2 text-sm" value={form.priority}
                onChange={e=>setForm({ ...form, priority:e.target.value })}>
                {(['low','medium','high','urgent']).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input className="border rounded p-2 text-sm col-span-2" placeholder="labels (comma separated)"
                value={form.labels} onChange={e=>setForm({ ...form, labels:e.target.value })} />
              <button className="rounded bg-slate-800 text-white text-sm px-3 py-2 col-span-1">Add</button>
            </div>
          </form>
        </div>

        <div className="col-span-2 flex flex-col gap-3 overflow-hidden">
          <div className="bg-white rounded-xl shadow p-3 overflow-auto">
            <div className="font-semibold mb-2">Posts (likes)</div>
            <ul className="text-sm space-y-2">
              {posts.map(p => (
                <li key={p.id} className="border rounded px-2 py-2">
                  <div className="text-sm">{p.content}</div>
                  <button className="mt-1 text-xs rounded bg-slate-800 text-white px-2 py-1"
                    onClick={async()=>{ const res = await likePost(p.id); setPosts(prev=>prev.map(x=>x.id===p.id?res:x))}}>
                    ♥ {p.likes}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-3 overflow-auto">
            <div className="font-semibold mb-2">Activity</div>
            <ul className="text-xs space-y-1">
              {feed.map(a => <li key={a.id}>[{a.kind}] {new Date(a.ts).toLocaleString()}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
