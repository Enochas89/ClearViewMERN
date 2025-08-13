import { Router } from 'express'
const r = Router()

const invites = [
  { id: 'i1', email: 'worker@example.com', projectId: 'p1', status: 'pending' }
]

r.get('/', (_req, res) => res.json(invites))

export default r
