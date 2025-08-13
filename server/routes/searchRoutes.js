import { Router } from 'express'

const r = Router()

const projects = [
  { id:'p1', name:'HQ Renovation', address:'123 Main St', timeline:'Aug–Oct 2025' },
  { id:'p2', name:'Water Park Expansion', address:'800 River Rd', timeline:'Sep–Dec 2025' }
]
let posts = [
  { id:'post1', projectId:'p1', content:'Framing complete on level 2.', likes:3 },
  { id:'post2', projectId:'p1', content:'Inspection scheduled for Friday.', likes:1 },
  { id:'post3', projectId:'p2', content:'Slide supports delivered.', likes:5 }
]

r.get('/', (req,res)=>{
  const { q='' } = req.query
  const s = String(q).toLowerCase()
  const projectMatches = projects.filter(p =>
    p.name.toLowerCase().includes(s) || p.address.toLowerCase().includes(s))
  // tasks & posts via inline imports avoided here; keep simple
  // clients should call /api/tasks?q=... for task matches
  const postMatches = posts.filter(p => p.content.toLowerCase().includes(s))
  res.json({ projects: projectMatches.slice(0,10), posts: postMatches.slice(0,10) })
})

export default r
