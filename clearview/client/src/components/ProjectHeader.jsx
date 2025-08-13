export default function ProjectHeader({ project }) {
  if (!project) return null
  return (
    <div className="bg-white border-b p-3">
      <div className="text-lg font-semibold">{project.name}</div>
      <div className="text-xs text-slate-600">
        ID: {project.id} • Address: {project.address} • Timeline: {project.timeline}
      </div>
    </div>
  )
}
