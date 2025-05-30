"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, MoreHorizontal, Users, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useProjects, useTasks } from "@/hooks/use-data"
import { toast } from "sonner"

export function ProjectManagementView() {
  const { projects, addProject, updateProject, deleteProject } = useProjects()
  const { tasks, addTask, updateTask, moveTask } = useTasks()
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const handleCreateProject = (formData: FormData) => {
    const name = formData.get("name") as string
    const client = formData.get("client") as string
    const description = formData.get("description") as string
    const deadline = formData.get("deadline") as string
    const budget = Number.parseInt(formData.get("budget") as string)

    if (!name || !client || !deadline) {
      toast.error("Please fill in all required fields")
      return
    }

    addProject({
      name,
      client,
      description,
      deadline,
      budget,
      status: "planning",
      progress: 0,
      team: ["JD"],
      priority: "medium",
    })

    setIsNewProjectOpen(false)
    toast.success("Project created successfully!")
  }

  const handleCreateTask = (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const assignee = formData.get("assignee") as string
    const priority = formData.get("priority") as "low" | "medium" | "high"
    const dueDate = formData.get("dueDate") as string

    if (!title || !selectedProject) {
      toast.error("Please fill in all required fields")
      return
    }

    addTask({
      title,
      description,
      assignee,
      priority,
      dueDate,
      projectId: selectedProject,
      status: "todo",
    })

    setIsNewTaskOpen(false)
    toast.success("Task created successfully!")
  }

  const handleTaskMove = (taskId: string, newStatus: "todo" | "in-progress" | "done") => {
    moveTask(taskId, newStatus)
    toast.success("Task moved successfully!")
  }

  const handleProjectStatusChange = (projectId: string, newStatus: string) => {
    updateProject(projectId, { status: newStatus as any })
    toast.success("Project status updated!")
  }

  const getTasksByStatus = (status: "todo" | "in-progress" | "done") => {
    return tasks.filter((task) => task.status === status)
  }

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground">Manage your projects, tasks, and team collaboration</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your project</DialogDescription>
              </DialogHeader>
              <form action={handleCreateTask}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input id="task-title" name="title" placeholder="Enter task title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea id="task-description" name="description" placeholder="Task description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-assignee">Assignee</Label>
                      <Select name="assignee">
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="JD">John Doe</SelectItem>
                          <SelectItem value="SM">Sarah Miller</SelectItem>
                          <SelectItem value="AB">Alex Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-priority">Priority</Label>
                      <Select name="priority">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-project">Project</Label>
                    <Select name="project" value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-due">Due Date</Label>
                    <Input id="task-due" name="dueDate" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewTaskOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Add a new project to your workspace</DialogDescription>
              </DialogHeader>
              <form action={handleCreateProject}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" name="name" placeholder="Enter project name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-client">Client</Label>
                    <Input id="project-client" name="client" placeholder="Client name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea id="project-description" name="description" placeholder="Project description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-deadline">Deadline</Label>
                      <Input id="project-deadline" name="deadline" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-budget">Budget ($)</Label>
                      <Input id="project-budget" name="budget" type="number" placeholder="25000" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* To Do Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  To Do
                  <Badge variant="secondary">{getTasksByStatus("todo").length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTasksByStatus("todo").map((task) => (
                  <Card key={task.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <Button variant="ghost" size="sm" onClick={() => setEditingTask(task.id)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                        </Avatar>
                        <Badge variant="outline">{task.priority}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleTaskMove(task.id, "in-progress")}
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* In Progress Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  In Progress
                  <Badge variant="secondary">{getTasksByStatus("in-progress").length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTasksByStatus("in-progress").map((task) => (
                  <Card key={task.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                      <Progress value={65} className="h-2" />
                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                        </Avatar>
                        <Badge variant="outline">{task.priority}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleTaskMove(task.id, "todo")}
                        >
                          Back
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="text-xs"
                          onClick={() => handleTaskMove(task.id, "done")}
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Done Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Done
                  <Badge variant="secondary">{getTasksByStatus("done").length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTasksByStatus("done").map((task) => (
                  <Card key={task.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                        </Avatar>
                        <Badge variant="default">Completed</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Complete list of all projects and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                      <p className="text-xs text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{project.team.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-20" />
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                      <Select
                        value={project.status}
                        onValueChange={(value) => handleProjectStatusChange(project.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            deleteProject(project.id)
                            toast.success("Project deleted successfully!")
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Gantt chart view of project schedules and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">Due: {project.deadline}</p>
                      </div>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <div className="relative">
                      <Progress value={project.progress} className="h-6" />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {project.progress}%
                      </span>
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
