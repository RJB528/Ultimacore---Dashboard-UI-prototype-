"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, GitBranch, Target, Calendar, Users } from "lucide-react"
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
import { useRoadmap } from "@/hooks/use-roadmap"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function VisualRoadmapView() {
  const { nodes, connections, addNode, updateNode, deleteNode, addConnection } = useRoadmap()
  const [isNewNodeOpen, setIsNewNodeOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("1")
  const [viewMode, setViewMode] = useState<"timeline" | "kanban" | "graph">("timeline")

  const handleCreateNode = (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as "milestone" | "feature" | "epic" | "release"
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const priority = formData.get("priority") as "low" | "medium" | "high" | "critical"

    if (!title || !startDate || !endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    addNode({
      title,
      description,
      type,
      startDate,
      endDate,
      priority,
      status: "planned",
      dependencies: [],
      assignees: ["JD"],
      progress: 0,
      position: { x: Math.random() * 800 + 100, y: Math.random() * 400 + 100 },
      projectId: selectedProject,
    })

    setIsNewNodeOpen(false)
    toast.success("Roadmap item created successfully!")
  }

  const getNodesByProject = (projectId: string) => {
    return nodes.filter((node) => node.projectId === projectId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "default"
      case "planned":
        return "secondary"
      case "blocked":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Target className="h-4 w-4" />
      case "epic":
        return <GitBranch className="h-4 w-4" />
      case "feature":
        return <Calendar className="h-4 w-4" />
      case "release":
        return <Target className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const projectNodes = getNodesByProject(selectedProject)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visual Roadmap</h1>
          <p className="text-muted-foreground">Plan and visualize project timelines with interactive roadmaps</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="kanban">Kanban</SelectItem>
              <SelectItem value="graph">Graph</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isNewNodeOpen} onOpenChange={setIsNewNodeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Roadmap Item</DialogTitle>
                <DialogDescription>Create a new milestone, feature, or epic for your roadmap</DialogDescription>
              </DialogHeader>
              <form action={handleCreateNode}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-title">Title</Label>
                    <Input id="item-title" name="title" placeholder="Enter item title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea id="item-description" name="description" placeholder="Describe this roadmap item" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="item-type">Type</Label>
                      <Select name="type">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="milestone">Milestone</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="release">Release</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="item-priority">Priority</Label>
                      <Select name="priority">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="item-start">Start Date</Label>
                      <Input id="item-start" name="startDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="item-end">End Date</Label>
                      <Input id="item-end" name="endDate" type="date" required />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewNodeOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Website Redesign</SelectItem>
            <SelectItem value="2">Mobile App Development</SelectItem>
            <SelectItem value="3">Brand Identity</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Badge variant="outline">{projectNodes.filter((n) => n.status === "completed").length} Completed</Badge>
          <Badge variant="outline">{projectNodes.filter((n) => n.status === "in-progress").length} In Progress</Badge>
          <Badge variant="outline">{projectNodes.filter((n) => n.status === "planned").length} Planned</Badge>
        </div>
      </div>

      {viewMode === "timeline" && (
        <Card>
          <CardHeader>
            <CardTitle>Timeline View</CardTitle>
            <CardDescription>Visual timeline of project milestones and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

              <div className="space-y-6">
                {projectNodes
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .map((node, index) => (
                    <div key={node.id} className="relative flex items-start gap-4">
                      {/* Timeline Dot */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-background border-2 border-primary rounded-full">
                        {getTypeIcon(node.type)}
                      </div>

                      {/* Content */}
                      <Card className="flex-1">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{node.title}</h4>
                                <Badge variant={getStatusColor(node.status) as any}>{node.status}</Badge>
                                <Badge variant="outline">{node.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{node.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>
                                  {node.startDate} - {node.endDate}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{node.assignees.length} assignees</span>
                                </div>
                              </div>
                              {node.status === "in-progress" && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium">Progress</span>
                                    <span className="text-xs text-muted-foreground">{node.progress}%</span>
                                  </div>
                                  <Progress value={node.progress} className="h-2" />
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  deleteNode(node.id)
                                  toast.success("Roadmap item deleted!")
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "kanban" && (
        <div className="grid gap-4 md:grid-cols-4">
          {["planned", "in-progress", "completed", "blocked"].map((status) => (
            <Card key={status}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  <Badge variant="secondary">{projectNodes.filter((n) => n.status === status).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {projectNodes
                  .filter((node) => node.status === status)
                  .map((node) => (
                    <Card key={node.id} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{node.title}</h4>
                          <Badge variant="outline">{node.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-1">
                            {node.assignees.map((assignee, i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <AvatarFallback className="text-xs">{assignee}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <Badge
                            variant={
                              node.priority === "critical"
                                ? "destructive"
                                : node.priority === "high"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {node.priority}
                          </Badge>
                        </div>
                        {node.status === "in-progress" && <Progress value={node.progress} className="h-2" />}
                      </div>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === "graph" && (
        <Card>
          <CardHeader>
            <CardTitle>Dependency Graph</CardTitle>
            <CardDescription>Visual representation of task dependencies and relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-muted/20 rounded-lg p-4 overflow-hidden">
              <div className="text-center text-muted-foreground mt-32">
                <GitBranch className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Dependency Graph</p>
                <p className="text-sm">Drag and drop nodes to visualize project dependencies</p>
                <Button className="mt-4" onClick={() => toast.success("Graph view coming soon!")}>
                  Enable Interactive Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
