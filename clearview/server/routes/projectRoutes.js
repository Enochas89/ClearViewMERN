import { Router } from 'express'
import { protect } from '../middleware/auth.js'

const r = Router()

// minimal in-memory mock data
const projects = [
  { id: 'p1', name: 'Demo Project' }
]

r.use(protect)

r.get('/', (req, res) => res.json(projects))
r.get('/:id', (req, res) => {
  const p = projects.find(x => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json(p)
})

export default r

