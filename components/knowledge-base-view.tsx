"use client"

import { useState } from "react"

interface Article {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  author: string
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  status: "draft" | "published" | "archived"
}

export function KnowledgeBaseView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "Project Onboarding Guide",
      content: "Complete guide for onboarding new projects and clients...",
      category: "processes",
      tags: ["onboarding", "projects", "clients"],
      author: "JD",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      views: 45,
      likes: 12,
      status: "published",
    },
    {
      id: "2",
      title: "Design System Guidelines",
      content: "Our comprehensive design system and brand guidelines...",
      category: "design",
      tags: ["design", "branding", "guidelines"],
      author: "SM",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      views: 67
