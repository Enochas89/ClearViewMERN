import LeftPanel from '../components/LeftPanel'
import RightChat from '../components/RightChat'
import Timeline from '../components/Timeline'
import Topbar from '../components/Topbar'

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <LeftPanel />
        <div className="flex-1 p-3 overflow-hidden">
          <div className="bg-white rounded-xl shadow p-3 h-full">
            <div className="font-semibold mb-2">Calendar / Gantt (placeholder)</div>
            <Timeline />
          </div>
        </div>
        <RightChat />
      </div>
    </div>
  )
}
