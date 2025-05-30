"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  PieChart,
  FileText,
  Plus,
  Download,
  Eye,
  Send,
} from "lucide-react"
import { toast } from "sonner"

export function FinancialManagementView() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">Manage invoices, expenses, and financial analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$127,450</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,750</div>
            <p className="text-xs text-muted-foreground">8 pending invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,920</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -5.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="projects">Project P&L</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "January", revenue: 95000, growth: 8 },
                    { month: "February", revenue: 102000, growth: 12 },
                    { month: "March", revenue: 118000, growth: 15 },
                    { month: "April", revenue: 125000, growth: 6 },
                    { month: "May", revenue: 127450, growth: 2 },
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">${data.revenue.toLocaleString()}</span>
                        <Badge variant={data.growth > 0 ? "default" : "destructive"}>
                          {data.growth > 0 ? "+" : ""}
                          {data.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current month expense categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Salaries", amount: 12500, percentage: 66 },
                  { category: "Software & Tools", amount: 2800, percentage: 15 },
                  { category: "Marketing", amount: 1900, percentage: 10 },
                  { category: "Office & Utilities", amount: 1720, percentage: 9 },
                ].map((expense, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{expense.category}</span>
                      <span className="text-sm">${expense.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={expense.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Manage and track your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "INV-001",
                    client: "TechCorp Inc.",
                    amount: 12500,
                    status: "Paid",
                    date: "2024-01-15",
                    dueDate: "2024-02-15",
                  },
                  {
                    id: "INV-002",
                    client: "StartupXYZ",
                    amount: 8750,
                    status: "Pending",
                    date: "2024-01-20",
                    dueDate: "2024-02-20",
                  },
                  {
                    id: "INV-003",
                    client: "Fashion Co.",
                    amount: 5200,
                    status: "Overdue",
                    date: "2024-01-10",
                    dueDate: "2024-02-10",
                  },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {invoice.id} - {invoice.client}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Issued: {invoice.date} • Due: {invoice.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
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
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>Track and categorize business expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    description: "Adobe Creative Suite",
                    category: "Software",
                    amount: 599,
                    date: "2024-01-22",
                    status: "Approved",
                  },
                  {
                    description: "Client Lunch Meeting",
                    category: "Meals",
                    amount: 125,
                    date: "2024-01-21",
                    status: "Pending",
                  },
                  {
                    description: "Office Supplies",
                    category: "Office",
                    amount: 89,
                    date: "2024-01-20",
                    status: "Approved",
                  },
                ].map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {expense.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">${expense.amount}</p>
                      <Badge variant={expense.status === "Approved" ? "default" : "secondary"}>{expense.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Profitability</CardTitle>
              <CardDescription>Track profit and loss for each project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Website Redesign",
                    client: "TechCorp Inc.",
                    budget: 25000,
                    spent: 18750,
                    revenue: 25000,
                    profit: 6250,
                    margin: 25,
                  },
                  {
                    name: "Mobile App",
                    client: "StartupXYZ",
                    budget: 40000,
                    spent: 28000,
                    revenue: 35000,
                    profit: 7000,
                    margin: 20,
                  },
                  {
                    name: "Brand Identity",
                    client: "Fashion Co.",
                    budget: 15000,
                    spent: 12000,
                    revenue: 15000,
                    profit: 3000,
                    margin: 20,
                  },
                ].map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <Badge variant="outline">{project.margin}% margin</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spent</p>
                        <p className="font-medium">${project.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${project.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit</p>
                        <p className="font-medium text-green-600">${project.profit.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create custom financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Profit & Loss</option>
                    <option>Cash Flow</option>
                    <option>Invoice Summary</option>
                    <option>Expense Report</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input type="date" id="start-date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input type="date" id="end-date" />
                  </div>
                </div>
                <Button className="w-full" onClick={() => toast.success("Report generated!")}>
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Q1 2024 P&L Report", date: "2024-01-20", type: "PDF" },
                  { name: "January Expense Report", date: "2024-01-15", type: "Excel" },
                  { name: "Client Invoice Summary", date: "2024-01-10", type: "PDF" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.date} • {report.type}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
