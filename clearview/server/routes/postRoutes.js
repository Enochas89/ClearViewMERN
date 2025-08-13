import { Router } from 'express'

const r = Router()

let posts = [
  { id: 'post1', projectId: 'p1', title: 'Demo Post', likes: 0 }
]

r.get('/', (req, res) => {
  const { projectId } = req.query
  const list = projectId ? posts.filter(p => p.projectId === projectId) : posts
  res.json(list)
})

r.post('/:id/like', (req, res) => {
  const idx = posts.findIndex(p => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  posts[idx] = { ...posts[idx], likes: posts[idx].likes + 1 }
  res.json(posts[idx])
})

export default r

