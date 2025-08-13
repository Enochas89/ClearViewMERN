import { Router } from 'express'

const r = Router()

const invites = [
  { id: 'i1', email: 'demo@example.com' }
]

r.get('/', (req, res) => res.json(invites))

export default r

