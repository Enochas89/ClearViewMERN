import { Router } from 'express'
import {{ protect }} from '../middleware/auth.js' assert {{ type: 'json' }};

const r = Router()

// simple import of mock data (inline to avoid fs reads)
const projects = {json.dumps(mock_projects, indent=2)}

r.get('/', (req, res) => res.json(projects))
r.get('/:id', (req, res) => {{
  const p = projects.find(x => x.id === req.params.id)
  if (!p) return res.status(404).json({{ error: 'Not found' }})
  res.json(p)
}})

export default r
