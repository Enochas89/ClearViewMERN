import { Router } from 'express'
const r = Router()

const projects = [
  { id: 'p1', name: 'HQ Renovation', address: '123 Main St', timeline: 'Aug–Oct 2025' },
  { id: 'p2', name: 'Water Park Expansion', address: '800 River Rd', timeline: 'Sep–Dec 2025' }
]

r.get('/', (_req, res) => res.json(projects))
r.get('/:id', (req, res) => {
  const p = projects.find(x => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json(p)
})

export default r
