export default function DayTile({ date, onAdd }) {
  const d = new Date(date)
  return (
    <div className="min-w-[160px] border-r bg-white p-2">
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">{d.toDateString()}</div>
        <button className="rounded bg-slate-800 text-white text-xs px-2 py-1" onClick={onAdd}>+ Add</button>
      </div>
      <div className="mt-2 text-xs text-slate-500">No items</div>
    </div>
  )
}
