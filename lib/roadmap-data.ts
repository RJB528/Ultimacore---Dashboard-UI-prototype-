export interface RoadmapNode {
  id: string
  title: string
  description: string
  type: "milestone" | "feature" | "epic" | "release"
  status: "planned" | "in-progress" | "completed" | "blocked"
  startDate: string
  endDate: string
  dependencies: string[]
  assignees: string[]
  priority: "low" | "medium" | "high" | "critical"
  progress: number
  position: { x: number; y: number }
  projectId: string
}

export interface RoadmapConnection {
  id: string
  from: string
  to: string
  type: "dependency" | "blocks" | "relates-to"
}

export const mockRoadmapNodes: RoadmapNode[] = [
  {
    id: "1",
    title: "Project Kickoff",
    description: "Initial project setup and team alignment",
    type: "milestone",
    status: "completed",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    dependencies: [],
    assignees: ["JD", "SM"],
    priority: "high",
    progress: 100,
    position: { x: 100, y: 100 },
    projectId: "1",
  },
  {
    id: "2",
    title: "Design Phase",
    description: "UI/UX design and wireframing",
    type: "epic",
    status: "in-progress",
    startDate: "2024-01-06",
    endDate: "2024-01-20",
    dependencies: ["1"],
    assignees: ["SM", "AB"],
    priority: "high",
    progress: 65,
    position: { x: 300, y: 100 },
    projectId: "1",
  },
  {
    id: "3",
    title: "Development Sprint 1",
    description: "Core functionality implementation",
    type: "feature",
    status: "planned",
    startDate: "2024-01-21",
    endDate: "2024-02-05",
    dependencies: ["2"],
    assignees: ["AB", "CD"],
    priority: "high",
    progress: 0,
    position: { x: 500, y: 100 },
    projectId: "1",
  },
  {
    id: "4",
    title: "Testing & QA",
    description: "Quality assurance and bug fixes",
    type: "feature",
    status: "planned",
    startDate: "2024-02-06",
    endDate: "2024-02-15",
    dependencies: ["3"],
    assignees: ["EF"],
    priority: "medium",
    progress: 0,
    position: { x: 700, y: 100 },
    projectId: "1",
  },
  {
    id: "5",
    title: "Release v1.0",
    description: "First major release",
    type: "release",
    status: "planned",
    startDate: "2024-02-16",
    endDate: "2024-02-16",
    dependencies: ["4"],
    assignees: ["JD"],
    priority: "critical",
    progress: 0,
    position: { x: 900, y: 100 },
    projectId: "1",
  },
]

export const mockRoadmapConnections: RoadmapConnection[] = [
  { id: "c1", from: "1", to: "2", type: "dependency" },
  { id: "c2", from: "2", to: "3", type: "dependency" },
  { id: "c3", from: "3", to: "4", type: "dependency" },
  { id: "c4", from: "4", to: "5", type: "dependency" },
]

export interface TimeEntry {
  id: string
  userId: string
  projectId: string
  taskId?: string
  description: string
  startTime: string
  endTime?: string
  duration: number // in minutes
  date: string
  billable: boolean
  hourlyRate?: number
}

export const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    userId: "JD",
    projectId: "1",
    taskId: "1",
    description: "Working on homepage design",
    startTime: "09:00",
    endTime: "12:00",
    duration: 180,
    date: "2024-01-22",
    billable: true,
    hourlyRate: 75,
  },
  {
    id: "2",
    userId: "SM",
    projectId: "1",
    taskId: "2",
    description: "API integration development",
    startTime: "13:00",
    endTime: "17:00",
    duration: 240,
    date: "2024-01-22",
    billable: true,
    hourlyRate: 85,
  },
]

export interface Goal {
  id: string
  title: string
  description: string
  type: "objective" | "key-result"
  parentId?: string
  ownerId: string
  teamId?: string
  status: "not-started" | "on-track" | "at-risk" | "completed"
  progress: number
  targetValue?: number
  currentValue?: number
  unit?: string
  startDate: string
  endDate: string
  priority: "low" | "medium" | "high"
}

export const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Increase Client Satisfaction",
    description: "Improve overall client satisfaction scores",
    type: "objective",
    ownerId: "JD",
    teamId: "team1",
    status: "on-track",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    priority: "high",
  },
  {
    id: "2",
    title: "Achieve 4.8/5 satisfaction rating",
    description: "Reach 4.8 out of 5 stars in client feedback",
    type: "key-result",
    parentId: "1",
    ownerId: "SM",
    status: "on-track",
    progress: 80,
    targetValue: 4.8,
    currentValue: 4.6,
    unit: "rating",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    priority: "high",
  },
]
