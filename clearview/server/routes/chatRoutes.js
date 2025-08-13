import { Router } from 'express'
const r = Router()
const msgs = {json.dumps(mock_messages, indent=2)}

r.get('/:projectId/messages', (req, res) => {{
  res.json(msgs.filter(m => m.projectId === req.params.projectId))
}})

export default r
