"use client"

import { useState } from "react"
import {
  mockProjects,
  mockTasks,
  mockClients,
  mockTeamMembers,
  mockFiles,
  mockEnrollments,
  type Project,
  type Task,
  type Client,
  type TeamMember,
  type FileItem,
  type Enrollment,
} from "@/lib/data"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [loading, setLoading] = useState(false)

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const moveTask = (id: string, newStatus: Task["status"]) => {
    updateTask(id, { status: newStatus })
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  }
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>(mockClients)

  const addClient = (client: Omit<Client, "id">) => {
    const newClient = {
      ...client,
      id: Date.now().toString(),
    }
    setClients((prev) => [...prev, newClient])
  }

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  return {
    clients,
    addClient,
    updateClient,
  }
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)

  const updateMemberStatus = (id: string, status: TeamMember["status"]) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
  }

  return {
    teamMembers,
    updateMemberStatus,
  }
}

export function useFiles() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)

  const addFile = (file: Omit<FileItem, "id">) => {
    const newFile = {
      ...file,
      id: Date.now().toString(),
    }
    setFiles((prev) => [...prev, newFile])
  }

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return {
    files,
    addFile,
    deleteFile,
  }
}

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments)

  const addEnrollment = (enrollment: Omit<Enrollment, "id">) => {
    const newEnrollment = {
      ...enrollment,
      id: Date.now().toString(),
    }
    setEnrollments((prev) => [...prev, newEnrollment])
  }

  const updateEnrollment = (id: string, updates: Partial<Enrollment>) => {
    setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const approveEnrollment = (id: string) => {
    updateEnrollment(id, {
      status: "completed",
      progress: 100,
      nextStep: "Project kickoff scheduled",
    })
  }

  return {
    enrollments,
    addEnrollment,
    updateEnrollment,
    approveEnrollment,
  }
}
