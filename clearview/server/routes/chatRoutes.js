import { Router } from 'express'

const r = Router()

const msgs = [
  { id: 'm1', projectId: 'p1', text: 'Hello' }
]

r.get('/:projectId/messages', (req, res) => {
  res.json(msgs.filter(m => m.projectId === req.params.projectId))
})

export default r

