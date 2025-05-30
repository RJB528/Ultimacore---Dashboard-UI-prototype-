"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Play, Square, Clock, DollarSign, Calendar, Download } from "lucide-react"
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
import { useTimeTracking } from "@/hooks/use-roadmap"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TimeTrackingView() {
  const { timeEntries, activeTimer, startTimer, stopTimer, addTimeEntry, deleteTimeEntry } = useTimeTracking()
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  // Update current time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  })

  const handleStartTimer = (formData: FormData) => {
    const description = formData.get("description") as string
    const projectId = formData.get("projectId") as string
    const taskId = formData.get("taskId") as string

    if (!description || !projectId) {
      toast.error("Please fill in required fields")
      return
    }

    startTimer({
      userId: "JD",
      projectId,
      taskId: taskId || undefined,
      description,
      startTime: new Date().toLocaleTimeString("en-US", { hour12: false }),
      date: new Date().toISOString().split("T")[0],
      billable: true,
      hourlyRate: 75,
    })

    toast.success("Timer started!")
  }

  const handleStopTimer = () => {
    if (activeTimer) {
      stopTimer(activeTimer, new Date().toLocaleTimeString("en-US", { hour12: false }))
      toast.success("Timer stopped!")
    }
  }

  const handleManualEntry = (formData: FormData) => {
    const description = formData.get("description") as string
    const projectId = formData.get("projectId") as string
    const date = formData.get("date") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const billable = formData.get("billable") === "true"

    if (!description || !projectId || !date || !startTime || !endTime) {
      toast.error("Please fill in all required fields")
      return
    }

    const start = new Date(`${date} ${startTime}`)
    const end = new Date(`${date} ${endTime}`)
    const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60))

    addTimeEntry({
      userId: "JD",
      projectId,
      description,
      startTime,
      endTime,
      duration,
      date,
      billable,
      hourlyRate: billable ? 75 : undefined,
    })

    setIsManualEntryOpen(false)
    toast.success("Time entry added!")
  }

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => total + entry.duration, 0) / 60
  }

  const getTotalEarnings = () => {
    return timeEntries
      .filter((entry) => entry.billable && entry.hourlyRate)
      .reduce((total, entry) => total + (entry.duration / 60) * (entry.hourlyRate || 0), 0)
  }

  const getTodaysEntries = () => {
    const today = new Date().toISOString().split("T")[0]
    return timeEntries.filter((entry) => entry.date === today)
  }

  const getThisWeekEntries = () => {
    const today = new Date()
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekStartStr = weekStart.toISOString().split("T")[0]

    return timeEntries.filter((entry) => entry.date >= weekStartStr)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground">Track time spent on projects and generate timesheets</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Manual Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Manual Time Entry</DialogTitle>
                <DialogDescription>Record time spent on a task manually</DialogDescription>
              </DialogHeader>
              <form action={handleManualEntry}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-description">Description</Label>
                    <Textarea id="manual-description" name="description" placeholder="What did you work on?" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-project">Project</Label>
                      <Select name="projectId">
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Website Redesign</SelectItem>
                          <SelectItem value="2">Mobile App Development</SelectItem>
                          <SelectItem value="3">Brand Identity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manual-date">Date</Label>
                      <Input id="manual-date" name="date" type="date" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-start">Start Time</Label>
                      <Input id="manual-start" name="startTime" type="time" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manual-end">End Time</Label>
                      <Input id="manual-end" name="endTime" type="time" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-billable">Billable</Label>
                    <Select name="billable">
                      <SelectTrigger>
                        <SelectValue placeholder="Is this billable?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes - Billable</SelectItem>
                        <SelectItem value="false">No - Non-billable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsManualEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Entry</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button onClick={() => toast.success("Timesheet exported!")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Timer Section */}
      <Card>
        <CardHeader>
          <CardTitle>Active Timer</CardTitle>
          <CardDescription>Start tracking time for your current task</CardDescription>
        </CardHeader>
        <CardContent>
          {!activeTimer ? (
            <form action={handleStartTimer} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="timer-description">Task Description</Label>
                  <Input id="timer-description" name="description" placeholder="What are you working on?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timer-project">Project</Label>
                  <Select name="projectId">
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Website Redesign</SelectItem>
                      <SelectItem value="2">Mobile App Development</SelectItem>
                      <SelectItem value="3">Brand Identity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timer-task">Task (Optional)</Label>
                  <Select name="taskId">
                    <SelectTrigger>
                      <SelectValue placeholder="Select task" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Design Homepage</SelectItem>
                      <SelectItem value="2">API Integration</SelectItem>
                      <SelectItem value="3">User Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-4xl font-mono font-bold text-green-600">{currentTime}</div>
              <p className="text-muted-foreground">{timeEntries.find((e) => e.id === activeTimer)?.description}</p>
              <Button onClick={handleStopTimer} variant="destructive">
                <Square className="mr-2 h-4 w-4" />
                Stop Timer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalHours().toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">All time tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(getTodaysEntries().reduce((total, entry) => total + entry.duration, 0) / 60).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">Tracked today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(getThisWeekEntries().reduce((total, entry) => total + entry.duration, 0) / 60).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">This week's total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalEarnings().toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Billable hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today ({getTodaysEntries().length})</TabsTrigger>
          <TabsTrigger value="week">This Week ({getThisWeekEntries().length})</TabsTrigger>
          <TabsTrigger value="all">All Entries ({timeEntries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Time Entries</CardTitle>
              <CardDescription>Time tracked for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getTodaysEntries().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{entry.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {entry.startTime} - {entry.endTime || "Running"}
                        </span>
                        <span>
                          {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                        </span>
                        <Badge variant={entry.billable ? "default" : "secondary"}>
                          {entry.billable ? "Billable" : "Non-billable"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.billable && entry.hourlyRate && (
                        <span className="font-semibold">${((entry.duration / 60) * entry.hourlyRate).toFixed(2)}</span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          deleteTimeEntry(entry.id)
                          toast.success("Time entry deleted!")
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                {getTodaysEntries().length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No time entries for today</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Time Entries</CardTitle>
              <CardDescription>All time entries for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getThisWeekEntries().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{entry.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{entry.date}</span>
                        <span>
                          {entry.startTime} - {entry.endTime || "Running"}
                        </span>
                        <span>
                          {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                        </span>
                        <Badge variant={entry.billable ? "default" : "secondary"}>
                          {entry.billable ? "Billable" : "Non-billable"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.billable && entry.hourlyRate && (
                        <span className="font-semibold">${((entry.duration / 60) * entry.hourlyRate).toFixed(2)}</span>
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Time Entries</CardTitle>
              <CardDescription>Complete history of tracked time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{entry.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{entry.date}</span>
                        <span>
                          {entry.startTime} - {entry.endTime || "Running"}
                        </span>
                        <span>
                          {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                        </span>
                        <Badge variant={entry.billable ? "default" : "secondary"}>
                          {entry.billable ? "Billable" : "Non-billable"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{entry.userId}</AvatarFallback>
                      </Avatar>
                      {entry.billable && entry.hourlyRate && (
                        <span className="font-semibold">${((entry.duration / 60) * entry.hourlyRate).toFixed(2)}</span>
                      )}
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
