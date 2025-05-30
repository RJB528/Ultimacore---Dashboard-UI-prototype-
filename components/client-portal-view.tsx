import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, FileText, CheckCircle, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientPortalView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Portal</h1>
          <p className="text-muted-foreground">Manage client relationships and project communications</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Badge variant="secondary">Active</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+2 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Badge variant="secondary">Running</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Across all clients</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Badge variant="outline">Waiting</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Require client review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
                <Badge variant="default">Excellent</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">Based on recent feedback</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Client Activity</CardTitle>
                <CardDescription>Latest interactions and updates from clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">TechCorp Inc.</p>
                    <p className="text-xs text-muted-foreground">Approved website mockups - 2 hours ago</p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>SX</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">StartupXYZ</p>
                    <p className="text-xs text-muted-foreground">
                      Requested changes to mobile app design - 4 hours ago
                    </p>
                  </div>
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>FC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Fashion Co.</p>
                    <p className="text-xs text-muted-foreground">Downloaded brand guidelines - 6 hours ago</p>
                  </div>
                  <FileText className="h-4 w-4 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Project Status</CardTitle>
                <CardDescription>Overview of project progress for each client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">TechCorp Inc.</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                  <p className="text-xs text-muted-foreground">Website Redesign</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">StartupXYZ</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} />
                  <p className="text-xs text-muted-foreground">Mobile App Development</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fashion Co.</span>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} />
                  <p className="text-xs text-muted-foreground">Brand Identity</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                client: "TechCorp Inc.",
                project: "Website Redesign",
                status: "In Progress",
                progress: 75,
                deadline: "2024-02-15",
                team: ["JD", "SM", "AB"],
              },
              {
                client: "StartupXYZ",
                project: "Mobile App Development",
                status: "In Progress",
                progress: 45,
                deadline: "2024-03-01",
                team: ["CD", "EF", "GH", "IJ"],
              },
              {
                client: "Fashion Co.",
                project: "Brand Identity",
                status: "Review",
                progress: 90,
                deadline: "2024-01-30",
                team: ["KL", "MN"],
              },
            ].map((project, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{project.project}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{project.progress}% Complete</p>
                        <p className="text-xs text-muted-foreground">Due: {project.deadline}</p>
                      </div>
                      <Progress value={project.progress} className="w-24" />
                      <Badge variant={project.status === "Review" ? "outline" : "secondary"}>{project.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs">{member}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Messages and interactions with clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  client: "TechCorp Inc.",
                  message: "The website mockups look great! Can we schedule a call to discuss the next steps?",
                  time: "2 hours ago",
                  type: "message",
                },
                {
                  client: "StartupXYZ",
                  message: "Uploaded new requirements document for the mobile app features.",
                  time: "4 hours ago",
                  type: "file",
                },
                {
                  client: "Fashion Co.",
                  message: "Approved the final brand guidelines. Ready for implementation!",
                  time: "6 hours ago",
                  type: "approval",
                },
              ].map((comm, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>
                      {comm.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{comm.client}</p>
                      <Badge variant="outline" className="text-xs">
                        {comm.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{comm.message}</p>
                    <p className="text-xs text-muted-foreground">{comm.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Track invoices and payments from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    client: "TechCorp Inc.",
                    amount: "$12,500",
                    status: "Paid",
                    date: "2024-01-15",
                    invoice: "INV-001",
                  },
                  { client: "StartupXYZ", amount: "$8,750", status: "Pending", date: "2024-01-20", invoice: "INV-002" },
                  {
                    client: "Fashion Co.",
                    amount: "$5,200",
                    status: "Overdue",
                    date: "2024-01-10",
                    invoice: "INV-003",
                  },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {invoice.invoice} - {invoice.client}
                      </p>
                      <p className="text-sm text-muted-foreground">Due: {invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">{invoice.amount}</p>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {invoice.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
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
