import { Router } from 'express'
const r = Router()

r.post('/login', (req, res) => {
  const { email } = req.body
  res.json({ id: 'u_demo', email, name: 'Demo User' })
})

export default r
