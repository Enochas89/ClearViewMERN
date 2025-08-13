import { Router } from 'express'
const r = Router()
const invites = {json.dumps(mock_invites, indent=2)}

r.get('/', (req, res) => res.json(invites))

export default r
