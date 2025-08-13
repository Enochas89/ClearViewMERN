import { Router } from 'express'
const r = Router()

const msgs = [
  { projectId: 'p1', id: 'm1', from: 'Site', text: 'Material delivery at 9am.' }
]

r.get('/:projectId/messages', (req, res) => {
  res.json(msgs.filter(m => m.projectId === req.params.projectId))
})

export default r
