"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Moon, Sun, Plus, Filter, Download } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Import all view components
import { DashboardView } from "@/components/dashboard-view"
import { ProjectManagementView } from "@/components/project-management-view"
import { ClientPortalView } from "@/components/client-portal-view"
import { ClientEnrollmentView } from "@/components/client-enrollment-view"
import { TeamCalendarView } from "@/components/team-calendar-view"
import { ResourceHubView } from "@/components/resource-hub-view"
import { VisualRoadmapView } from "@/components/visual-roadmap-view"
import { TimeTrackingView } from "@/components/time-tracking-view"
import { CommunicationHubView } from "@/components/communication-hub-view"
import { KnowledgeBaseView } from "@/components/knowledge-base-view"
import { AnalyticsView } from "@/components/analytics-view"
import { FinancialManagementView } from "@/components/financial-management-view"
import { CrmSalesView } from "@/components/crm-sales-view"
import { HrManagementView } from "@/components/hr-management-view"

const navigationTabs = [
  { id: "dashboard", label: "Dashboard", badge: null },
  { id: "projects", label: "Projects", badge: "24" },
  { id: "clients", label: "Clients", badge: null },
  { id: "enrollment", label: "Enrollment", badge: "3" },
  { id: "calendar", label: "Calendar", badge: null },
  { id: "resources", label: "Resources", badge: null },
  { id: "roadmap", label: "Roadmap", badge: "New" },
  { id: "time-tracking", label: "Time", badge: null },
  { id: "communication", label: "Chat", badge: "5" },
  { id: "knowledge", label: "Knowledge", badge: null },
  { id: "analytics", label: "Analytics", badge: null },
  { id: "financial", label: "Finance", badge: null },
  { id: "crm", label: "CRM", badge: "12" },
  { id: "hr", label: "HR", badge: null },
]

export function MainContent() {
  const [activeView, setActiveView] = useState("dashboard")
  const { theme, setTheme } = useTheme()

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />
      case "projects":
        return <ProjectManagementView />
      case "clients":
        return <ClientPortalView />
      case "enrollment":
        return <ClientEnrollmentView />
      case "calendar":
        return <TeamCalendarView />
      case "resources":
        return <ResourceHubView />
      case "roadmap":
        return <VisualRoadmapView />
      case "time-tracking":
        return <TimeTrackingView />
      case "communication":
        return <CommunicationHubView />
      case "knowledge":
        return <KnowledgeBaseView />
      case "analytics":
        return <AnalyticsView />
      case "financial":
        return <FinancialManagementView />
      case "crm":
        return <CrmSalesView />
      case "hr":
        return <HrManagementView />
      default:
        return <DashboardView />
    }
  }

  const getPageTitle = () => {
    const tab = navigationTabs.find((t) => t.id === activeView)
    return tab?.label || "Dashboard"
  }

  return (
    <SidebarInset>
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Search and Actions */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, tasks, clients..."
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New project assigned</p>
                  <p className="text-xs text-muted-foreground">Website redesign for TechCorp Inc.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Client approval received</p>
                  <p className="text-xs text-muted-foreground">Design mockups approved by Fashion Co.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Team meeting in 30 minutes</p>
                  <p className="text-xs text-muted-foreground">Sprint planning session</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="hidden md:flex">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-muted/30">
        <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto">
          {navigationTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeView === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView(tab.id)}
              className="relative whitespace-nowrap"
            >
              {tab.label}
              {tab.badge && (
                <Badge variant={activeView === tab.id ? "secondary" : "outline"} className="ml-2 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">{renderView()}</div>
      </main>
    </SidebarInset>
  )
}
