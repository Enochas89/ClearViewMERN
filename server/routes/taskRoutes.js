import { Router } from 'express'
const r = Router()
const tasks = {json.dumps(mock_tasks, indent=2)}

r.get('/', (req, res) => {{
  const {{ projectId }} = req.query
  const list = projectId ? tasks.filter(t => t.projectId === projectId) : tasks
  res.json(list)
}})

export default r
