import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'

export default function TeamCalendar() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Team Calendar</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage team events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Team Meeting - Monday, 10:00 AM</li>
              <li>Project Deadline - Wednesday, 5:00 PM</li>
              <li>Client Presentation - Friday, 2:00 PM</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
