import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  FolderKanban,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Target,
  Sparkles,
} from "lucide-react"

export function DashboardView() {
  return (
    <div className="space-y-8 page-transition">
      {/* Welcome Section */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-5xl font-bold tracking-tight gradient-text mb-2">Welcome back, John!</h1>
          <p className="text-xl text-muted-foreground">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="btn-animate interactive">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button className="gradient-bg btn-animate interactive shadow-lg shadow-primary/25">
            <Sparkles className="mr-2 h-4 w-4" />
            Quick Start
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Active Projects",
            value: "24",
            change: "+3 from last month",
            icon: FolderKanban,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            title: "Team Members",
            value: "47",
            change: "+2 new this week",
            icon: Users,
            color: "text-chart-2",
            bgColor: "bg-chart-2/10",
          },
          {
            title: "Tasks Completed",
            value: "342",
            change: "+12% from last week",
            icon: CheckCircle,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
          },
          {
            title: "Revenue",
            value: "$45,231",
            change: "+20.1% from last month",
            icon: DollarSign,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
          },
        ].map((metric, index) => (
          <Card
            key={metric.title}
            className="card-hover animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${metric.bgColor} rounded-full -translate-y-12 translate-x-12 opacity-50`}
            ></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Projects */}
        <Card className="lg:col-span-4 card-hover animate-fade-in" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Projects</CardTitle>
                <CardDescription className="text-base">Your most recent project activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="interactive">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Website Redesign",
                client: "TechCorp Inc.",
                progress: 75,
                status: "On Track",
                team: ["JD", "SM", "AB"],
                dueDate: "Feb 15",
                statusColor: "bg-green-500",
              },
              {
                name: "Mobile App Development",
                client: "StartupXYZ",
                progress: 45,
                status: "In Progress",
                team: ["CD", "EF", "GH"],
                dueDate: "Mar 1",
                statusColor: "bg-blue-500",
              },
              {
                name: "Brand Identity",
                client: "Fashion Co.",
                progress: 90,
                status: "Review",
                team: ["IJ", "KL"],
                dueDate: "Jan 30",
                statusColor: "bg-yellow-500",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-all duration-200 interactive animate-fade-in"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.statusColor}`}></div>
                    <h4 className="font-semibold text-lg">{project.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{project.client}</p>
                  <div className="flex items-center gap-6 ml-6">
                    <div className="flex items-center gap-3">
                      <Progress value={project.progress} className="w-24 h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <Avatar
                          key={i}
                          className="h-7 w-7 border-2 border-background transition-transform hover:scale-110"
                        >
                          <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                            {member}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Due {project.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-3 card-hover animate-fade-in" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Deadlines</CardTitle>
            <CardDescription className="text-base">Tasks and projects due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Website Launch",
                type: "Project Milestone",
                dueDate: "2 days",
                priority: "high",
                icon: AlertCircle,
                color: "text-red-500",
                bgColor: "bg-red-500/10",
              },
              {
                title: "Client Presentation",
                type: "Meeting",
                dueDate: "5 days",
                priority: "medium",
                icon: Calendar,
                color: "text-yellow-500",
                bgColor: "bg-yellow-500/10",
              },
              {
                title: "Design Review",
                type: "Task",
                dueDate: "1 week",
                priority: "low",
                icon: Target,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                title: "Team Meeting",
                type: "Recurring",
                dueDate: "Tomorrow",
                priority: "medium",
                icon: Users,
                color: "text-green-500",
                bgColor: "bg-green-500/10",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-all duration-200 interactive animate-fade-in"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">Due in {item.dueDate}</p>
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover animate-fade-in" style={{ animationDelay: "700ms" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Team Performance</CardTitle>
            <CardDescription className="text-base">
              Track your team's productivity and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Task Completion Rate", value: 87, trend: "+5%", color: "bg-primary" },
                { label: "On-Time Delivery", value: 92, trend: "+3%", color: "bg-chart-2" },
                { label: "Client Satisfaction", value: 95, trend: "+2%", color: "bg-green-500" },
                { label: "Team Efficiency", value: 89, trend: "-1%", color: "bg-yellow-500" },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="space-y-3 animate-fade-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                      <span className={`text-xs ${metric.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={metric.value} className="h-3" />
                    <div
                      className={`absolute top-0 left-0 h-3 rounded-full ${metric.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover animate-fade-in" style={{ animationDelay: "800ms" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Quick Actions</CardTitle>
            <CardDescription className="text-base">Frequently used actions and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {[
                { title: "Create New Project", description: "Start a new project with templates", icon: FolderKanban },
                { title: "Add Team Member", description: "Invite new team members", icon: Users },
                { title: "Schedule Meeting", description: "Book a meeting with clients", icon: Calendar },
                { title: "Generate Report", description: "Create performance reports", icon: Activity },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-start interactive card-hover animate-fade-in"
                  style={{ animationDelay: `${900 + index * 100}ms` }}
                >
                  <action.icon className="h-6 w-6 mr-4 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
