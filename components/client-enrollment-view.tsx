"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  UserPlus,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Clock,
  Download,
  Send,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
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
import { useEnrollments } from "@/hooks/use-data"
import { toast } from "sonner"

export function ClientEnrollmentView() {
  const { enrollments, addEnrollment, updateEnrollment, approveEnrollment } = useEnrollments()
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)

  const handleCreateEnrollment = (formData: FormData) => {
    const company = formData.get("company-name") as string
    const contact = formData.get("contact-name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const industry = formData.get("industry") as string
    const projectType = formData.get("project-type") as string
    const description = formData.get("project-description") as string

    if (!company || !contact || !email) {
      toast.error("Please fill in all required fields")
      return
    }

    addEnrollment({
      company,
      contact,
      email,
      phone,
      industry,
      projectType,
      status: "initial-contact",
      progress: 10,
      startDate: new Date().toISOString().split("T")[0],
      nextStep: "Initial consultation scheduled",
      priority: "medium",
      documents: [],
    })

    setIsNewClientDialogOpen(false)
    toast.success("Client enrollment started successfully!")
  }

  const handleApproveEnrollment = (id: string) => {
    approveEnrollment(id)
    toast.success("Enrollment approved and completed!")
  }

  const handleUpdateStatus = (id: string, status: string, progress: number) => {
    updateEnrollment(id, {
      status: status as any,
      progress,
      nextStep: getNextStepForStatus(status),
    })
    toast.success("Enrollment status updated!")
  }

  const getNextStepForStatus = (status: string) => {
    switch (status) {
      case "initial-contact":
        return "Schedule discovery call"
      case "information-gathering":
        return "Collect project requirements"
      case "document-review":
        return "Review and approve documents"
      case "contract-signing":
        return "Finalize contract terms"
      case "completed":
        return "Project kickoff scheduled"
      default:
        return "Next step to be determined"
    }
  }

  const getEnrollmentsByStatus = (status: string) => {
    return enrollments.filter((e) => e.status === status)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "initial-contact":
        return "secondary"
      case "information-gathering":
        return "outline"
      case "document-review":
        return "default"
      case "contract-signing":
        return "default"
      case "completed":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Enrollment</h1>
          <p className="text-muted-foreground">Manage client onboarding and enrollment processes</p>
        </div>
        <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Enroll New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Enroll New Client</DialogTitle>
              <DialogDescription>
                Start the enrollment process for a new client. Fill in their basic information to begin.
              </DialogDescription>
            </DialogHeader>
            <form action={handleCreateEnrollment}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input id="company-name" name="company-name" placeholder="Enter company name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select name="industry">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Primary Contact *</Label>
                    <Input id="contact-name" name="contact-name" placeholder="Contact person name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-title">Title</Label>
                    <Input id="contact-title" name="contact-title" placeholder="Job title" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="contact@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select name="project-type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                      <SelectItem value="branding">Branding & Design</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="maintenance">Maintenance & Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Project Description</Label>
                  <Textarea
                    id="project-description"
                    name="project-description"
                    placeholder="Brief description of the project requirements"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Start Enrollment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">
            Active Enrollments ({enrollments.filter((e) => e.status !== "completed").length})
          </TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({getEnrollmentsByStatus("document-review").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({getEnrollmentsByStatus("completed").length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollments.length}</div>
                <p className="text-xs text-muted-foreground">
                  +
                  {
                    enrollments.filter((e) => {
                      const enrollmentDate = new Date(e.startDate)
                      const monthAgo = new Date()
                      monthAgo.setMonth(monthAgo.getMonth() - 1)
                      return enrollmentDate > monthAgo
                    }).length
                  }{" "}
                  this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollments.filter((e) => e.status !== "completed").length}</div>
                <p className="text-xs text-muted-foreground">Currently onboarding</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enrollments.length > 0
                    ? Math.round((getEnrollmentsByStatus("completed").length / enrollments.length) * 100)
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2 days</div>
                <p className="text-xs text-muted-foreground">To complete enrollment</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>Latest client enrollment activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrollments.slice(0, 4).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {enrollment.company
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{enrollment.company}</p>
                      <p className="text-xs text-muted-foreground">{enrollment.contact}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={enrollment.progress} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">{enrollment.progress}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(enrollment.status) as any}>
                        {enrollment.status.replace("-", " ")}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{enrollment.startDate}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Pipeline</CardTitle>
                <CardDescription>Current status distribution of all enrollments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { status: "initial-contact", label: "Initial Contact", progress: 20 },
                  { status: "information-gathering", label: "Information Gathering", progress: 35 },
                  { status: "document-review", label: "Document Review", progress: 60 },
                  { status: "contract-signing", label: "Contract Signing", progress: 85 },
                  { status: "completed", label: "Onboarding Complete", progress: 100 },
                ].map((stage) => {
                  const count = getEnrollmentsByStatus(stage.status).length
                  return (
                    <div key={stage.status} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stage.label}</span>
                        <span className="text-sm text-muted-foreground">{count} clients</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {enrollments
              .filter((e) => e.status !== "completed")
              .map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {client.company
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{client.company}</h3>
                          <p className="text-sm text-muted-foreground">{client.contact}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">{client.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={client.status}
                          onValueChange={(value) => {
                            const progressMap = {
                              "initial-contact": 20,
                              "information-gathering": 40,
                              "document-review": 60,
                              "contract-signing": 80,
                              completed: 100,
                            }
                            handleUpdateStatus(client.id, value, progressMap[value as keyof typeof progressMap])
                          }}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="initial-contact">Initial Contact</SelectItem>
                            <SelectItem value="information-gathering">Information Gathering</SelectItem>
                            <SelectItem value="document-review">Document Review</SelectItem>
                            <SelectItem value="contract-signing">Contract Signing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{client.progress}%</span>
                        </div>
                        <Progress value={client.progress} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Next Step</p>
                        <p className="text-sm text-muted-foreground">{client.nextStep}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-4">
                      <div>
                        <p className="text-sm font-medium">Industry</p>
                        <p className="text-sm text-muted-foreground">{client.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Project Type</p>
                        <p className="text-sm text-muted-foreground">{client.projectType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Start Date</p>
                        <p className="text-sm text-muted-foreground">{client.startDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Send Update
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Enrollments waiting for your review and approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getEnrollmentsByStatus("document-review").map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {item.company
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.company}</p>
                      <p className="text-sm text-muted-foreground">{item.contact}</p>
                      <p className="text-xs text-muted-foreground">Submitted: {item.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority} Priority
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.documents.length} documents</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                      <Button size="sm" onClick={() => handleApproveEnrollment(item.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {getEnrollmentsByStatus("document-review").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No enrollments pending review</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Enrollments</CardTitle>
              <CardDescription>Successfully onboarded clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEnrollmentsByStatus("completed").map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {client.company
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.company}</p>
                        <p className="text-sm text-muted-foreground">{client.contact}</p>
                        <p className="text-xs text-muted-foreground">
                          Completed: {client.startDate} • Duration: 5 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">$25,000</p>
                        <Badge variant="default">Active Project</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Project
                      </Button>
                    </div>
                  </div>
                ))}
                {getEnrollmentsByStatus("completed").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No completed enrollments yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Templates</CardTitle>
                <CardDescription>Pre-configured templates for different client types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Standard Web Development",
                    description: "For typical web development projects",
                    steps: 6,
                    duration: "5-7 days",
                  },
                  {
                    name: "Enterprise Client",
                    description: "For large enterprise clients with complex requirements",
                    steps: 10,
                    duration: "10-14 days",
                  },
                  {
                    name: "Mobile App Development",
                    description: "Specialized for mobile application projects",
                    steps: 8,
                    duration: "7-10 days",
                  },
                  {
                    name: "Consulting Services",
                    description: "For consulting and advisory services",
                    steps: 4,
                    duration: "3-5 days",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {template.steps} steps • {template.duration}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => toast.success("Template applied!")}>
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>Standard documents for client enrollment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Welcome Package",
                    type: "PDF Template",
                    description: "Introduction and getting started guide",
                  },
                  {
                    name: "Service Agreement",
                    type: "Contract Template",
                    description: "Standard terms and conditions",
                  },
                  {
                    name: "Project Questionnaire",
                    type: "Form Template",
                    description: "Detailed project requirements form",
                  },
                  {
                    name: "NDA Template",
                    type: "Legal Document",
                    description: "Non-disclosure agreement template",
                  },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.success("Document downloaded!")}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
