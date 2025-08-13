import { Router } from 'express'
const r = Router()

let posts = [
  { id: 'post1', projectId: 'p1', content: 'Framing complete on level 2.', likes: 3 },
  { id: 'post2', projectId: 'p1', content: 'Inspection scheduled for Friday.', likes: 1 },
  { id: 'post3', projectId: 'p2', content: 'Slide supports delivered.', likes: 5 }
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
