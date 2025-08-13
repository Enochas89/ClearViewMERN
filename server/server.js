import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import postRoutes from './routes/postRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import inviteRoutes from './routes/inviteRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_, res) => res.json({ ok: true, ts: "{now}" }))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/invites', inviteRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${{}}`.replace("{}", PORT)))
