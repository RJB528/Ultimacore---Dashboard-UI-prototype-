"use client"

import { useState } from "react"
import {
  mockRoadmapNodes,
  mockRoadmapConnections,
  mockTimeEntries,
  mockGoals,
  type RoadmapNode,
  type RoadmapConnection,
  type TimeEntry,
  type Goal,
} from "@/lib/roadmap-data"

export function useRoadmap() {
  const [nodes, setNodes] = useState<RoadmapNode[]>(mockRoadmapNodes)
  const [connections, setConnections] = useState<RoadmapConnection[]>(mockRoadmapConnections)

  const addNode = (node: Omit<RoadmapNode, "id">) => {
    const newNode = {
      ...node,
      id: Date.now().toString(),
    }
    setNodes((prev) => [...prev, newNode])
  }

  const updateNode = (id: string, updates: Partial<RoadmapNode>) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, ...updates } : node)))
  }

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id))
    setConnections((prev) => prev.filter((conn) => conn.from !== id && conn.to !== id))
  }

  const addConnection = (connection: Omit<RoadmapConnection, "id">) => {
    const newConnection = {
      ...connection,
      id: Date.now().toString(),
    }
    setConnections((prev) => [...prev, newConnection])
  }

  return {
    nodes,
    connections,
    addNode,
    updateNode,
    deleteNode,
    addConnection,
  }
}

export function useTimeTracking() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries)
  const [activeTimer, setActiveTimer] = useState<string | null>(null)

  const startTimer = (entry: Omit<TimeEntry, "id" | "endTime" | "duration">) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      duration: 0,
    }
    setTimeEntries((prev) => [...prev, newEntry])
    setActiveTimer(newEntry.id)
  }

  const stopTimer = (id: string, endTime: string) => {
    setTimeEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const start = new Date(`${entry.date} ${entry.startTime}`)
          const end = new Date(`${entry.date} ${endTime}`)
          const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60))
          return { ...entry, endTime, duration }
        }
        return entry
      }),
    )
    setActiveTimer(null)
  }

  const addTimeEntry = (entry: Omit<TimeEntry, "id">) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    setTimeEntries((prev) => [...prev, newEntry])
  }

  const deleteTimeEntry = (id: string) => {
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return {
    timeEntries,
    activeTimer,
    startTimer,
    stopTimer,
    addTimeEntry,
    deleteTimeEntry,
  }
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)

  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)))
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  }
}
