import DayTile from './DayTile'

export default function Timeline() {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => new Date(today.getTime() + i*86400000).toISOString())

  return (
    <div className="flex overflow-x-auto scrollbar-thin">
      {days.map(d => <DayTile key={d} date={d} onAdd={() => alert('Placeholder add')} />)}
    </div>
  )
}
