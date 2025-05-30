'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ProjectManagement from './ProjectManagement'
import ResourceHub from './ResourceHub'
import TeamCalendar from './TeamCalendar'

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('projectManagement')

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'projectManagement':
        return <ProjectManagement />
      case 'resourceHub':
        return <ResourceHub />
      case 'teamCalendar':
        return <TeamCalendar />
      default:
        return <ProjectManagement />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  )
}
