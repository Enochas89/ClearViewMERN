import { Router } from 'express'
import { USERS, META } from './metaRoutes.js'

const r = Router()

let tasks = [
  { id:'t1', projectId:'p1', title:'Demo existing drywall', status:'todo', priority:'medium',
    labels:['Site'], assigneeId:'u_demo', dueDate:'2025-08-20', createdAt: new Date().toISOString() },
  { id:'t2', projectId:'p1', title:'Pour new slab section A', status:'in_progress', priority:'high',
    labels:['Site','Urgent'], assigneeId:'u_amy', dueDate:'2025-08-22', createdAt: new Date().toISOString() },
  { id:'t3', projectId:'p2', title:'Irrigation trenching phase 1', status:'todo', priority:'low',
    labels:['Procurement'], assigneeId:'u_lee', dueDate:'2025-09-01', createdAt: new Date().toISOString() }
]

const commentsByTask = {
  t1: [{ id:'c1', taskId:'t1', authorId:'u_demo', text:'Scope confirmed with GC', createdAt:new Date().toISOString() }]
}
let activities = []

function byId(id){ return tasks.find(t=>t.id===id) }
function pushActivity(kind, payload){
  activities.unshift({ id:'a'+Date.now(), kind, payload, ts:new Date().toISOString() })
  activities = activities.slice(0,200)
}

r.get('/', (req, res) => {
  const { projectId, status, assigneeId, q } = req.query
  let list = tasks
  if (projectId) list = list.filter(t => t.projectId === projectId)
  if (status) list = list.filter(t => t.status === status)
  if (assigneeId) list = list.filter(t => t.assigneeId === assigneeId)
  if (q) {
    const s = String(q).toLowerCase()
    list = list.filter(t =>
      t.title.toLowerCase().includes(s) ||
      (t.labels||[]).some(l=>l.toLowerCase().includes(s))
    )
  }
  res.json(list)
})

r.post('/', (req, res) => {
  const { projectId, title, assigneeId, dueDate, labels=[], priority='medium' } = req.body
  if (!projectId || !title) return res.status(400).json({ error: 'projectId and title required' })
  const id = 't' + Date.now()
  const t = { id, projectId, title, status:'todo', priority, labels, assigneeId: assigneeId || 'u_demo',
              dueDate: dueDate || null, createdAt:new Date().toISOString() }
  tasks.push(t)
  pushActivity('task_created', { id, projectId, title })
  res.status(201).json(t)
})

r.patch('/:id', (req, res) => {
  const t = byId(req.params.id)
  if (!t) return res.status(404).json({ error:'Not found' })
  const allowed = ['title','status','priority','labels','assigneeId','dueDate']
  for (const k of allowed) if (k in req.body) t[k] = req.body[k]
  pushActivity('task_updated', { id:t.id, fields:Object.keys(req.body) })
  res.json(t)
})

r.get('/:id/comments', (req,res)=>{
  const list = commentsByTask[req.params.id] || []
  res.json(list)
})

r.post('/:id/comments', (req,res)=>{
  const t = byId(req.params.id); if (!t) return res.status(404).json({ error:'Not found' })
  const { text, authorId='u_demo' } = req.body
  if (!text) return res.status(400).json({ error:'text required' })
  const c = { id:'c'+Date.now(), taskId:t.id, authorId, text, createdAt:new Date().toISOString() }
  commentsByTask[t.id] = commentsByTask[t.id] || []
  commentsByTask[t.id].push(c)
  pushActivity('task_comment_added', { taskId:t.id, commentId:c.id })
  res.status(201).json(c)
})

r.get('/activities/feed', (req,res)=>{
  const { projectId } = req.query
  const feed = projectId ? activities.filter(a => (a.payload?.projectId||'') === projectId) : activities
  res.json(feed.slice(0,50))
})

export default r
