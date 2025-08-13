import { Router } from 'express'
const r = Router()

const tasks = [
  { id: 't1', projectId: 'p1', title: 'Demo existing drywall' },
  { id: 't2', projectId: 'p1', title: 'Pour new slab section A' },
  { id: 't3', projectId: 'p2', title: 'Irrigation trenching phase 1' }
]

r.get('/', (req, res) => {
  const { projectId } = req.query
  const list = projectId ? tasks.filter(t => t.projectId === projectId) : tasks
  res.json(list)
})

export default r
