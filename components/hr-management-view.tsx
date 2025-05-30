"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserPlus, Calendar, Target, Award, Clock, Edit, Eye, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function HrManagementView() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Management</h1>
          <p className="text-muted-foreground">Manage team members, performance, and HR processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* HR Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PTO Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Overview</CardTitle>
                <CardDescription>Current performance metrics across teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { team: "Development", members: 12, performance: 4.5, projects: 8 },
                  { team: "Design", members: 8, performance: 4.3, projects: 6 },
                  { team: "Marketing", members: 6, performance: 4.1, projects: 4 },
                  { team: "Sales", members: 10, performance: 4.4, projects: 12 },
                ].map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{team.team}</p>
                      <p className="text-sm text-muted-foreground">
                        {team.members} members • {team.projects} active projects
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{team.performance}/5</p>
                      <Progress value={team.performance * 20} className="w-16 h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest HR activities and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    action: "Performance review completed",
                    employee: "Sarah Miller",
                    time: "2 hours ago",
                    type: "review",
                  },
                  { action: "New employee onboarded", employee: "Mike Johnson", time: "1 day ago", type: "onboarding" },
                  { action: "PTO request approved", employee: "Alex Brown", time: "2 days ago", type: "leave" },
                  { action: "Goal updated", employee: "Emma Wilson", time: "3 days ago", type: "goal" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "review"
                          ? "bg-blue-500"
                          : activity.type === "onboarding"
                            ? "bg-green-500"
                            : activity.type === "leave"
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.employee} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>Manage your team members and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    role: "Project Manager",
                    department: "Operations",
                    email: "john@ultimacore.com",
                    phone: "+1 (555) 123-4567",
                    startDate: "2023-01-15",
                    status: "Active",
                    performance: 4.5,
                  },
                  {
                    name: "Sarah Miller",
                    role: "Senior Designer",
                    department: "Design",
                    email: "sarah@ultimacore.com",
                    phone: "+1 (555) 234-5678",
                    startDate: "2023-03-20",
                    status: "Active",
                    performance: 4.8,
                  },
                  {
                    name: "Alex Brown",
                    role: "Full Stack Developer",
                    department: "Development",
                    email: "alex@ultimacore.com",
                    phone: "+1 (555) 345-6789",
                    startDate: "2023-02-10",
                    status: "Active",
                    performance: 4.3,
                  },
                ].map((employee, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {employee.role} • {employee.department}
                        </p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Performance: {employee.performance}/5</p>
                        <p className="text-xs text-muted-foreground">Started: {employee.startDate}</p>
                      </div>
                      <Badge variant="default">{employee.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Track and manage employee performance evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    employee: "Sarah Miller",
                    role: "Senior Designer",
                    reviewDate: "2024-01-15",
                    reviewer: "John Doe",
                    score: 4.8,
                    status: "Completed",
                    goals: 5,
                    achievements: 4,
                  },
                  {
                    employee: "Alex Brown",
                    role: "Full Stack Developer",
                    reviewDate: "2024-01-20",
                    reviewer: "John Doe",
                    score: 4.3,
                    status: "In Progress",
                    goals: 4,
                    achievements: 3,
                  },
                  {
                    employee: "Emma Wilson",
                    role: "Marketing Specialist",
                    reviewDate: "2024-01-25",
                    reviewer: "Lisa Wang",
                    score: 0,
                    status: "Scheduled",
                    goals: 3,
                    achievements: 0,
                  },
                ].map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{review.employee}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                      <Badge
                        variant={
                          review.status === "Completed"
                            ? "default"
                            : review.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {review.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Review Date</p>
                        <p className="font-medium">{review.reviewDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reviewer</p>
                        <p className="font-medium">{review.reviewer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Score</p>
                        <p className="font-medium">{review.score > 0 ? `${review.score}/5` : "Pending"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Goals</p>
                        <p className="font-medium">{review.goals} set</p>
                      </div>
                    </div>
                    {review.score > 0 && <Progress value={review.score * 20} className="h-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Manage time-off requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    employee: "Mike Johnson",
                    type: "Vacation",
                    startDate: "2024-02-15",
                    endDate: "2024-02-19",
                    days: 5,
                    status: "Pending",
                    reason: "Family vacation",
                  },
                  {
                    employee: "Sarah Miller",
                    type: "Sick Leave",
                    startDate: "2024-01-22",
                    endDate: "2024-01-22",
                    days: 1,
                    status: "Approved",
                    reason: "Medical appointment",
                  },
                  {
                    employee: "Alex Brown",
                    type: "Personal",
                    startDate: "2024-02-10",
                    endDate: "2024-02-12",
                    days: 3,
                    status: "Approved",
                    reason: "Personal matters",
                  },
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{request.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.type} • {request.startDate} to {request.endDate} ({request.days} days)
                      </p>
                      <p className="text-xs text-muted-foreground">{request.reason}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          request.status === "Approved"
                            ? "default"
                            : request.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {request.status}
                      </Badge>
                      {request.status === "Pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" onClick={() => toast.success("Leave request approved!")}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => toast.error("Leave request denied!")}>
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Deny
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Onboarding</CardTitle>
              <CardDescription>Track new employee onboarding progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Jennifer Lee",
                    role: "UX Designer",
                    startDate: "2024-02-01",
                    progress: 85,
                    status: "In Progress",
                    completedTasks: 17,
                    totalTasks: 20,
                    buddy: "Sarah Miller",
                  },
                  {
                    name: "David Chen",
                    role: "Backend Developer",
                    startDate: "2024-01-15",
                    progress: 100,
                    status: "Completed",
                    completedTasks: 20,
                    totalTasks: 20,
                    buddy: "Alex Brown",
                  },
                  {
                    name: "Maria Rodriguez",
                    role: "Marketing Manager",
                    startDate: "2024-02-05",
                    progress: 45,
                    status: "In Progress",
                    completedTasks: 9,
                    totalTasks: 20,
                    buddy: "Lisa Wang",
                  },
                ].map((onboarding, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{onboarding.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {onboarding.role} • Started {onboarding.startDate}
                        </p>
                      </div>
                      <Badge variant={onboarding.status === "Completed" ? "default" : "secondary"}>
                        {onboarding.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {onboarding.completedTasks}/{onboarding.totalTasks} tasks completed
                        </span>
                      </div>
                      <Progress value={onboarding.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Onboarding Buddy: {onboarding.buddy}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
