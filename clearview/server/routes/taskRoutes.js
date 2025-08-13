import { Router } from 'express'

const r = Router()

const tasks = [
  { id: 't1', projectId: 'p1', title: 'Demo Task' }
]

r.get('/', (req, res) => {
  const { projectId } = req.query
  const list = projectId ? tasks.filter(t => t.projectId === projectId) : tasks
  res.json(list)
})

export default r

