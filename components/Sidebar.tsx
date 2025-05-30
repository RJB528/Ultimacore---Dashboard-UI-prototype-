import { Home, Briefcase, FolderOpen, Calendar, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Sidebar({ setActiveComponent }) {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('dashboard')}>
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('projectManagement')}>
          <Briefcase className="mr-3 h-5 w-5" />
          Project Management
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('resourceHub')}>
          <FolderOpen className="mr-3 h-5 w-5" />
          Resource Hub
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('teamCalendar')}>
          <Calendar className="mr-3 h-5 w-5" />
          Team Calendar
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveComponent('settings')}>
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>
      </nav>
    </aside>
  )
}
