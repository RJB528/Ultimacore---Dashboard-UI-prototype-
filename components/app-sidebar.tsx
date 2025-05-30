"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  UserPlus,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Shield,
  Bot,
  Building2,
  Clock,
  GitBranch,
  BookOpen,
  Target,
  DollarSign,
  UserCheck,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "#dashboard",
    badge: null,
  },
  {
    title: "Project Management",
    icon: FolderKanban,
    url: "#projects",
    badge: "24",
  },
  {
    title: "Client Portal",
    icon: Users,
    url: "#clients",
    badge: null,
  },
  {
    title: "Client Enrollment",
    icon: UserPlus,
    url: "#enrollment",
    badge: "3",
  },
  {
    title: "Team Calendar",
    icon: Calendar,
    url: "#calendar",
    badge: null,
  },
  {
    title: "Resource Hub",
    icon: FileText,
    url: "#resources",
    badge: null,
  },
  {
    title: "Visual Roadmap",
    icon: GitBranch,
    url: "#roadmap",
    badge: "New",
  },
  {
    title: "Time Tracking",
    icon: Clock,
    url: "#time-tracking",
    badge: null,
  },
  {
    title: "Communication",
    icon: MessageSquare,
    url: "#communication",
    badge: "5",
  },
  {
    title: "Knowledge Base",
    icon: BookOpen,
    url: "#knowledge",
    badge: null,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "#analytics",
    badge: null,
  },
]

const businessTools = [
  {
    title: "Financial Management",
    icon: DollarSign,
    url: "#financial",
    badge: null,
  },
  {
    title: "CRM & Sales",
    icon: Target,
    url: "#crm",
    badge: "12",
  },
  {
    title: "HR Management",
    icon: UserCheck,
    url: "#hr",
    badge: null,
  },
  {
    title: "Invoice & Payroll",
    icon: CreditCard,
    url: "#invoicing",
    badge: null,
  },
  {
    title: "Legal & Contracts",
    icon: Shield,
    url: "#legal",
    badge: null,
  },
  {
    title: "AI Assistant",
    icon: Bot,
    url: "#ai-assistant",
    badge: "Beta",
  },
  {
    title: "Automation",
    icon: Zap,
    url: "#automation",
    badge: "Pro",
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r animate-slide-in">
      <SidebarHeader className="border-b bg-gradient-to-br from-primary/5 via-primary/10 to-chart-2/5">
        <div className="flex items-center gap-3 px-4 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/25 interactive">
            <Building2 className="h-7 w-7" />
          </div>
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold gradient-text">Ultima Core</h1>
            <p className="text-sm text-muted-foreground">Business Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <SidebarMenuButton
                    asChild
                    className="group rounded-xl hover:bg-primary/10 transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center justify-between px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 transition-all duration-200 group-hover:text-primary group-hover:scale-110" />
                        <span className="font-medium transition-colors group-hover:text-primary">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={
                            item.badge === "New" || item.badge === "Beta" || item.badge === "Pro"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs animate-pulse"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">
            Business Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {businessTools.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + navigationItems.length) * 50}ms` }}
                >
                  <SidebarMenuButton
                    asChild
                    className="group rounded-xl hover:bg-primary/10 transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center justify-between px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 transition-all duration-200 group-hover:text-primary group-hover:scale-110" />
                        <span className="font-medium transition-colors group-hover:text-primary">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={item.badge === "Beta" || item.badge === "Pro" ? "default" : "secondary"}
                          className="text-xs animate-pulse"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="group rounded-xl hover:bg-primary/10 transition-all duration-200">
                  <a href="#settings" className="flex items-center gap-3 px-3 py-2.5">
                    <Settings className="h-5 w-5 transition-all duration-200 group-hover:text-primary group-hover:scale-110" />
                    <span className="font-medium transition-colors group-hover:text-primary">Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-gradient-to-r from-muted/30 to-muted/50">
        <div className="flex items-center gap-3 px-4 py-4 animate-fade-in">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20 transition-all duration-200 hover:ring-primary/40">
            <AvatarImage src="/placeholder.svg?height=44&width=44" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-primary-foreground font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Admin • john@ultimacore.com</p>
          </div>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
