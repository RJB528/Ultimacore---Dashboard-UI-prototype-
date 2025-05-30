"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Phone, Video, Paperclip, Smile, Search, Hash, Users, Settings } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  type: "text" | "file" | "image"
  channel?: string
}

interface Channel {
  id: string
  name: string
  type: "public" | "private" | "direct"
  members: string[]
  unread: number
}

export function CommunicationHubView() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "JD",
      content: "Good morning team! Ready for today's sprint review?",
      timestamp: "09:00",
      type: "text",
      channel: "general",
    },
    {
      id: "2",
      sender: "SM",
      content: "Yes! I've prepared the design updates for review.",
      timestamp: "09:05",
      type: "text",
      channel: "general",
    },
    {
      id: "3",
      sender: "AB",
      content: "API integration is complete. Ready to demo!",
      timestamp: "09:10",
      type: "text",
      channel: "general",
    },
  ])

  const [channels] = useState<Channel[]>([
    { id: "general", name: "general", type: "public", members: ["JD", "SM", "AB", "CD"], unread: 0 },
    { id: "design", name: "design", type: "public", members: ["SM", "AB"], unread: 2 },
    { id: "development", name: "development", type: "public", members: ["AB", "CD", "EF"], unread: 1 },
    { id: "client-updates", name: "client-updates", type: "private", members: ["JD", "SM"], unread: 0 },
  ])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "JD",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      channel: activeChannel,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    toast.success("Message sent!")
  }

  const getChannelMessages = (channelId: string) => {
    return messages.filter((msg) => msg.channel === channelId)
  }

  const getActiveChannel = () => {
    return channels.find((ch) => ch.id === activeChannel)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication Hub</h1>
          <p className="text-muted-foreground">Real-time team communication and collaboration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Voice Call
          </Button>
          <Button>
            <Video className="mr-2 h-4 w-4" />
            Video Meeting
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={activeChannel === channel.id ? "default" : "ghost"}
                className="w-full justify-between"
                onClick={() => setActiveChannel(channel.id)}
              >
                <div className="flex items-center gap-2">
                  {channel.type === "private" ? <Users className="h-4 w-4" /> : <Hash className="h-4 w-4" />}
                  <span>{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {channel.unread}
                  </Badge>
                )}
              </Button>
            ))}

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Direct Messages</p>
              <div className="space-y-1">
                {["Sarah Miller", "Alex Brown", "Chris Davis"].map((name) => (
                  <Button key={name} variant="ghost" className="w-full justify-start" size="sm">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                <CardTitle>{getActiveChannel()?.name}</CardTitle>
                <Badge variant="outline">{getActiveChannel()?.members.length} members</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {getChannelMessages(activeChannel).map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{message.sender}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder={`Message #${getActiveChannel()?.name}`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => toast.success("File picker opened!")}>
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.success("Emoji picker opened!")}>
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Team Status</CardTitle>
            <CardDescription>Current availability of team members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "John Doe", status: "online", activity: "In a meeting" },
              { name: "Sarah Miller", status: "online", activity: "Available" },
              { name: "Alex Brown", status: "away", activity: "Lunch break" },
              { name: "Chris Davis", status: "offline", activity: "Offline" },
            ].map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      member.status === "online"
                        ? "bg-green-500"
                        : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.activity}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>Files shared in conversations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "design-mockup.fig", sender: "SM", time: "2h ago" },
              { name: "project-brief.pdf", sender: "JD", time: "4h ago" },
              { name: "api-docs.md", sender: "AB", time: "1d ago" },
            ].map((file) => (
              <div key={file.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Shared by {file.sender} • {file.time}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toast.success(`Opening ${file.name}...`)}>
                  Open
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connected communication tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Slack", status: "Connected", color: "bg-purple-100 text-purple-600" },
              { name: "Microsoft Teams", status: "Connected", color: "bg-blue-100 text-blue-600" },
              { name: "Discord", status: "Not connected", color: "bg-gray-100 text-gray-600" },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <Hash className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.status}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.success(
                      `${integration.name} ${integration.status === "Connected" ? "disconnected" : "connected"}!`,
                    )
                  }
                >
                  {integration.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
