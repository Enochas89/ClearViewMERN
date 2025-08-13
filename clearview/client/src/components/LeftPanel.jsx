import { useEffect, useState } from 'react'
import { listProjects } from '../api/projects'
import { Link, useLocation } from 'react-router-dom'

export default function LeftPanel() {
  const [projects, setProjects] = useState([])
  const loc = useLocation()

  useEffect(() => { listProjects().then(setProjects) }, [])

  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-3 font-semibold">Projects</div>
      {projects.map(p => (
        <Link key={p.id} to={`/project/${p.id}`}>
          <div className={`px-3 py-2 text-sm hover:bg-slate-50 ${loc.pathname.includes(p.id) ? 'bg-slate-100 font-medium' : ''}`}>
            {p.name}
          </div>
        </Link>
      ))}
    </div>
  )
}
