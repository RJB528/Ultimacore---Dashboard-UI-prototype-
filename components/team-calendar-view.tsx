"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Video, Edit, Trash2 } from "lucide-react"
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
import { useTeamMembers } from "@/hooks/use-data"
import { toast } from "sonner"

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  attendees: string[]
  type: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
}

export function TeamCalendarView() {
  const { teamMembers, updateMemberStatus } = useTeamMembers()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false)
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Team Standup",
      date: "2024-01-22",
      time: "09:00",
      attendees: ["JD", "SM", "AB"],
      type: "Team Meeting",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Client Review",
      date: "2024-01-22",
      time: "14:00",
      attendees: ["JD", "SM"],
      type: "Client Meeting",
      status: "scheduled",
    },
    {
      id: "3",
      title: "Sprint Planning",
      date: "2024-01-23",
      time: "10:00",
      attendees: ["JD", "AB", "CD"],
      type: "Planning",
      status: "scheduled",
    },
  ])

  const handleCreateMeeting = (formData: FormData) => {
    const title = formData.get("title") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const type = formData.get("type") as string
    const attendees = (formData.get("attendees") as string).split(",").map((a) => a.trim())

    if (!title || !date || !time) {
      toast.error("Please fill in all required fields")
      return
    }

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      date,
      time,
      attendees,
      type,
      status: "scheduled",
    }

    setMeetings((prev) => [...prev, newMeeting])
    setIsNewMeetingOpen(false)
    toast.success("Meeting scheduled successfully!")
  }

  const handleStatusChange = (memberId: string, newStatus: any) => {
    updateMemberStatus(memberId, newStatus)
    toast.success("Team member status updated!")
  }

  const handleJoinMeeting = (meetingId: string) => {
    setMeetings((prev) => prev.map((m) => (m.id === meetingId ? { ...m, status: "in-progress" } : m)))
    toast.success("Joined meeting successfully!")
  }

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== meetingId))
    toast.success("Meeting deleted successfully!")
  }

  const getTodaysMeetings = () => {
    const today = new Date().toISOString().split("T")[0]
    return meetings.filter((m) => m.date === today)
  }

  const getUpcomingMeetings = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return meetings.filter((m) => {
      const meetingDate = new Date(m.date)
      return meetingDate > today && meetingDate <= nextWeek
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Calendar</h1>
          <p className="text-muted-foreground">Schedule meetings, track deadlines, and manage team availability</p>
        </div>
        <Dialog open={isNewMeetingOpen} onOpenChange={setIsNewMeetingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>Create a new meeting and invite team members</DialogDescription>
            </DialogHeader>
            <form action={handleCreateMeeting}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-title">Meeting Title</Label>
                  <Input id="meeting-title" name="title" placeholder="Enter meeting title" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meeting-date">Date</Label>
                    <Input id="meeting-date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meeting-time">Time</Label>
                    <Input id="meeting-time" name="time" type="time" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-type">Meeting Type</Label>
                  <Select name="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                      <SelectItem value="Client Meeting">Client Meeting</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="One-on-One">One-on-One</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-attendees">Attendees (comma separated)</Label>
                  <Input id="meeting-attendees" name="attendees" placeholder="JD, SM, AB" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-description">Description</Label>
                  <Textarea id="meeting-description" name="description" placeholder="Meeting agenda and notes" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewMeetingOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Meeting</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage team events and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Upcoming events for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getTodaysMeetings().map((meeting) => (
                <div key={meeting.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <Video className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">{meeting.time}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline">{meeting.type}</Badge>
                    <Button size="sm" variant="outline" onClick={() => handleJoinMeeting(meeting.id)}>
                      Join
                    </Button>
                  </div>
                </div>
              ))}
              {getTodaysMeetings().length === 0 && (
                <div className="text-center py-4 text-muted-foreground">No meetings scheduled for today</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Availability</CardTitle>
              <CardDescription>Current status of team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{member.name}</p>
                  </div>
                  <Select value={member.status} onValueChange={(value) => handleStatusChange(member.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="in-meeting">In Meeting</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Scheduled meetings for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getUpcomingMeetings().map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {meeting.date} at {meeting.time}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {meeting.attendees.map((attendee, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{meeting.attendees.length} attendees</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline">{meeting.type}</Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteMeeting(meeting.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleJoinMeeting(meeting.id)}>
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meeting Integrations</CardTitle>
            <CardDescription>Connected video conferencing platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Zoom</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Video className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Google Meet</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Microsoft Teams</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast.success("Teams connected!")}>
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
