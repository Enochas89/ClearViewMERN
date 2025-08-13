import { Router } from 'express'
const r = Router()

export const META = {
  statuses: ['todo','in_progress','blocked','done'],
  priorities: ['low','medium','high','urgent'],
  labels: ['Design','Procurement','Site','QA','Urgent']
}

export const USERS = [
  { id: 'u_demo', name: 'Demo User', email: 'demo@clearview.local' },
  { id: 'u_amy',  name: 'Amy Foreman', email: 'amy@example.com' },
  { id: 'u_lee',  name: 'Lee Scheduler', email: 'lee@example.com' }
]

r.get('/meta', (_req, res) => res.json(META))
r.get('/users', (_req, res) => res.json(USERS))
export default r
