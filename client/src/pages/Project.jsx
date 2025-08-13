import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '../api/projects'
import { listTasks } from '../api/tasks'
import { listPosts, likePost } from '../api/posts'
import ProjectHeader from '../components/ProjectHeader'

export default function Project() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getProject(id).then(setProject)
    listTasks(id).then(setTasks)
    listPosts(id).then(setPosts)
  }, [id])

  return (
    <div className="h-screen flex flex-col">
      <ProjectHeader project={project} />
      <div className="flex-1 grid grid-cols-2 gap-3 p-3">
        <div className="bg-white rounded-xl shadow p-3 overflow-auto">
          <div className="font-semibold mb-2">Tasks</div>
          <ul className="text-sm space-y-1">
            {tasks.map(t => <li key={t.id} className="border rounded px-2 py-1">{t.title}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-3 overflow-auto">
          <div className="font-semibold mb-2">Posts (likes)</div>
          <ul className="text-sm space-y-2">
            {posts.map(p => (
              <li key={p.id} className="border rounded px-2 py-2">
                <div className="text-sm">{p.content}</div>
                <button className="mt-1 text-xs rounded bg-slate-800 text-white px-2 py-1"
                  onClick={async()=>{ const res = await likePost(p.id); setPosts(prev=>prev.map(x=>x.id===p.id?res:x))}}>
                  ♥ {p.likes}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
