// Mock data and state management
export interface Project {
  id: string
  name: string
  client: string
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold"
  progress: number
  deadline: string
  team: string[]
  priority: "low" | "medium" | "high"
  description: string
  budget: number
}

export interface Client {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  company: string
  avatar: string
  projects: string[]
  status: "active" | "inactive"
  satisfaction: number
}

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  assignee: string
  projectId: string
  priority: "low" | "medium" | "high"
  dueDate: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
  status: "available" | "busy" | "in-meeting" | "offline"
  tasksCompleted: number
  efficiency: number
}

export interface FileItem {
  id: string
  name: string
  type: string
  size: string
  modified: string
  author: string
  url: string
  projectId?: string
}

export interface Enrollment {
  id: string
  company: string
  contact: string
  email: string
  phone: string
  status: "initial-contact" | "information-gathering" | "document-review" | "contract-signing" | "completed"
  progress: number
  startDate: string
  industry: string
  projectType: string
  nextStep: string
  priority: "low" | "medium" | "high"
  documents: string[]
}

// Mock data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "TechCorp Inc.",
    status: "in-progress",
    progress: 75,
    deadline: "2024-02-15",
    team: ["JD", "SM", "AB"],
    priority: "high",
    description: "Complete website redesign with modern UI/UX",
    budget: 25000,
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "StartupXYZ",
    status: "in-progress",
    progress: 45,
    deadline: "2024-03-01",
    team: ["CD", "EF", "GH"],
    priority: "high",
    description: "Native mobile app for iOS and Android",
    budget: 40000,
  },
  {
    id: "3",
    name: "Brand Identity",
    client: "Fashion Co.",
    status: "review",
    progress: 90,
    deadline: "2024-01-30",
    team: ["IJ", "KL"],
    priority: "medium",
    description: "Complete brand identity and guidelines",
    budget: 15000,
  },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage Mockup",
    description: "Create initial homepage design mockup",
    status: "in-progress",
    assignee: "SM",
    projectId: "1",
    priority: "high",
    dueDate: "2024-01-25",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate third-party payment API",
    status: "todo",
    assignee: "AB",
    projectId: "1",
    priority: "medium",
    dueDate: "2024-01-28",
  },
  {
    id: "3",
    title: "User Authentication",
    description: "Implement user login and registration",
    status: "done",
    assignee: "CD",
    projectId: "2",
    priority: "high",
    dueDate: "2024-01-20",
  },
]

export const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    contact: "CEO",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    avatar: "TC",
    projects: ["1"],
    status: "active",
    satisfaction: 4.8,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    contact: "CTO",
    email: "sarah@startupxyz.com",
    phone: "+1 (555) 234-5678",
    company: "StartupXYZ",
    avatar: "SX",
    projects: ["2"],
    status: "active",
    satisfaction: 4.5,
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Project Manager",
    avatar: "JD",
    email: "john@company.com",
    status: "available",
    tasksCompleted: 24,
    efficiency: 92,
  },
  {
    id: "2",
    name: "Sarah Miller",
    role: "Designer",
    avatar: "SM",
    email: "sarah@company.com",
    status: "in-meeting",
    tasksCompleted: 18,
    efficiency: 94,
  },
  {
    id: "3",
    name: "Alex Brown",
    role: "Developer",
    avatar: "AB",
    email: "alex@company.com",
    status: "busy",
    tasksCompleted: 32,
    efficiency: 88,
  },
]

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Project_Proposal_v3.pdf",
    type: "PDF",
    size: "2.4 MB",
    modified: "2 hours ago",
    author: "JD",
    url: "/files/proposal.pdf",
    projectId: "1",
  },
  {
    id: "2",
    name: "Website_Mockup_Final.fig",
    type: "Figma",
    size: "15.7 MB",
    modified: "4 hours ago",
    author: "SM",
    url: "/files/mockup.fig",
    projectId: "1",
  },
]

export const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    company: "TechStart Inc.",
    contact: "Sarah Johnson",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "document-review",
    progress: 75,
    startDate: "2024-01-15",
    industry: "Technology",
    projectType: "Web Development",
    nextStep: "Contract review and approval",
    priority: "high",
    documents: ["Business License", "Tax ID", "Insurance Certificate"],
  },
  {
    id: "2",
    company: "Global Retail Co.",
    contact: "Mike Chen",
    email: "mike@globalretail.com",
    phone: "+1 (555) 234-5678",
    status: "contract-signing",
    progress: 90,
    startDate: "2024-01-12",
    industry: "Retail",
    projectType: "E-commerce Platform",
    nextStep: "Final contract signature",
    priority: "medium",
    documents: ["Business Plan", "Financial Statements"],
  },
]
