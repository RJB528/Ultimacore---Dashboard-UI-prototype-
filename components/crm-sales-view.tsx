"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
} from "lucide-react"

export function CrmSalesView() {
  const [activeTab, setActiveTab] = useState("pipeline")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM & Sales Pipeline</h1>
          <p className="text-muted-foreground">Manage leads, deals, and customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Call
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* CRM Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +23 this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,500</div>
            <p className="text-xs text-muted-foreground">Potential revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { stage: "Prospecting", deals: 12, value: 45000, color: "bg-gray-100" },
              { stage: "Qualification", deals: 8, value: 32000, color: "bg-blue-100" },
              { stage: "Proposal", deals: 5, value: 28000, color: "bg-yellow-100" },
              { stage: "Negotiation", deals: 3, value: 18000, color: "bg-orange-100" },
              { stage: "Closed Won", deals: 2, value: 15000, color: "bg-green-100" },
            ].map((stage, index) => (
              <Card key={index} className={stage.color}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{stage.stage}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{stage.deals} deals</span>
                    <span className="text-xs font-medium">${stage.value.toLocaleString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array.from({ length: Math.min(stage.deals, 3) }).map((_, i) => (
                    <div key={i} className="p-2 bg-white rounded border text-xs">
                      <p className="font-medium">Deal {i + 1}</p>
                      <p className="text-muted-foreground">$5,000 - Company {i + 1}</p>
                    </div>
                  ))}
                  {stage.deals > 3 && (
                    <p className="text-xs text-muted-foreground text-center">+{stage.deals - 3} more deals</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>New leads and prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    company: "TechStart Inc.",
                    email: "sarah@techstart.com",
                    phone: "+1 (555) 123-4567",
                    source: "Website",
                    status: "New",
                    value: 15000,
                    lastContact: "2 hours ago",
                  },
                  {
                    name: "Michael Chen",
                    company: "Global Retail Co.",
                    email: "mike@globalretail.com",
                    phone: "+1 (555) 234-5678",
                    source: "Referral",
                    status: "Qualified",
                    value: 25000,
                    lastContact: "1 day ago",
                  },
                  {
                    name: "Emily Rodriguez",
                    company: "Creative Agency",
                    email: "emily@creative.com",
                    phone: "+1 (555) 345-6789",
                    source: "LinkedIn",
                    status: "Contacted",
                    value: 12000,
                    lastContact: "3 days ago",
                  },
                ].map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{lead.email}</span>
                          <span className="text-xs text-muted-foreground">{lead.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${lead.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Last contact: {lead.lastContact}</p>
                      </div>
                      <Badge
                        variant={
                          lead.status === "New" ? "default" : lead.status === "Qualified" ? "secondary" : "outline"
                        }
                      >
                        {lead.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
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

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Database</CardTitle>
              <CardDescription>Manage all your business contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Smith",
                    title: "CEO",
                    company: "TechCorp Inc.",
                    email: "john@techcorp.com",
                    phone: "+1 (555) 111-2222",
                    lastInteraction: "Meeting scheduled",
                    tags: ["Decision Maker", "Hot Lead"],
                  },
                  {
                    name: "Lisa Wang",
                    title: "Marketing Director",
                    company: "StartupXYZ",
                    email: "lisa@startupxyz.com",
                    phone: "+1 (555) 333-4444",
                    lastInteraction: "Proposal sent",
                    tags: ["Influencer", "Warm Lead"],
                  },
                  {
                    name: "David Brown",
                    title: "CTO",
                    company: "Fashion Co.",
                    email: "david@fashion.com",
                    phone: "+1 (555) 555-6666",
                    lastInteraction: "Demo completed",
                    tags: ["Technical", "Qualified"],
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact.title} at {contact.company}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {contact.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">{contact.email}</p>
                        <p className="text-xs text-muted-foreground">{contact.lastInteraction}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>Track and manage your sales opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Website Redesign Project",
                    company: "TechCorp Inc.",
                    value: 25000,
                    stage: "Proposal",
                    probability: 75,
                    closeDate: "2024-02-15",
                    owner: "John Doe",
                  },
                  {
                    name: "Mobile App Development",
                    company: "StartupXYZ",
                    value: 40000,
                    stage: "Negotiation",
                    probability: 60,
                    closeDate: "2024-03-01",
                    owner: "Sarah Miller",
                  },
                  {
                    name: "Brand Identity Package",
                    company: "Fashion Co.",
                    value: 15000,
                    stage: "Qualification",
                    probability: 40,
                    closeDate: "2024-02-28",
                    owner: "Alex Brown",
                  },
                ].map((deal, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{deal.name}</h4>
                        <p className="text-sm text-muted-foreground">{deal.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${deal.value.toLocaleString()}</p>
                        <Badge variant="outline">{deal.stage}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Probability</p>
                        <div className="flex items-center gap-2">
                          <Progress value={deal.probability} className="flex-1 h-2" />
                          <span className="font-medium">{deal.probability}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Close Date</p>
                        <p className="font-medium">{deal.closeDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Owner</p>
                        <p className="font-medium">{deal.owner}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Track your sales metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metric: "Monthly Revenue", value: "$127,450", change: "+12.5%" },
                  { metric: "Deals Closed", value: "38", change: "+8.2%" },
                  { metric: "Average Deal Size", value: "$3,354", change: "+5.1%" },
                  { metric: "Sales Cycle", value: "28 days", change: "-3.2%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.value}</span>
                      <span className={`text-xs ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { source: "Website", leads: 45, percentage: 35 },
                  { source: "Referrals", leads: 32, percentage: 25 },
                  { source: "LinkedIn", leads: 28, percentage: 22 },
                  { source: "Cold Outreach", leads: 23, percentage: 18 },
                ].map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm">{source.leads} leads</span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
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
