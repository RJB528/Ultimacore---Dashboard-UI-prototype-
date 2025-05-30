"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Upload,
  Search,
  FileText,
  ImageIcon,
  Video,
  Archive,
  Download,
  Share,
  Folder,
  Clock,
  Trash2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useFiles } from "@/hooks/use-data"
import { toast } from "sonner"

export function ResourceHubView() {
  const { files, addFile, deleteFile } = useFiles()
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFileUpload = (formData: FormData) => {
    const fileName = formData.get("fileName") as string
    const fileType = formData.get("fileType") as string
    const projectId = formData.get("projectId") as string

    if (!fileName || !fileType) {
      toast.error("Please fill in all required fields")
      return
    }

    addFile({
      name: fileName,
      type: fileType,
      size: "2.4 MB",
      modified: "Just now",
      author: "JD",
      url: `/files/${fileName}`,
      projectId: projectId || undefined,
    })

    setIsUploadOpen(false)
    toast.success("File uploaded successfully!")
  }

  const handleFileDelete = (fileId: string) => {
    deleteFile(fileId)
    toast.success("File deleted successfully!")
  }

  const handleFileDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`)
  }

  const handleFileShare = (fileName: string) => {
    navigator.clipboard.writeText(`https://app.remotebiz.com/files/${fileName}`)
    toast.success("File link copied to clipboard!")
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFilesByType = (type: string) => {
    return filteredFiles.filter((file) => {
      switch (type) {
        case "documents":
          return ["PDF", "DOC", "DOCX", "TXT"].includes(file.type.toUpperCase())
        case "images":
          return ["JPG", "PNG", "GIF", "SVG", "Figma"].includes(file.type)
        case "videos":
          return ["MP4", "AVI", "MOV"].includes(file.type.toUpperCase())
        default:
          return true
      }
    })
  }

  const getRecentFiles = () => {
    return filteredFiles.slice(0, 5)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
          <p className="text-muted-foreground">Centralized repository for all project files and documents</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New File</DialogTitle>
              <DialogDescription>Add a new file to the resource hub</DialogDescription>
            </DialogHeader>
            <form action={handleFileUpload}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file-name">File Name</Label>
                  <Input id="file-name" name="fileName" placeholder="document.pdf" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-type">File Type</Label>
                  <Input id="file-type" name="fileType" placeholder="PDF" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-id">Project (Optional)</Label>
                  <Input id="project-id" name="projectId" placeholder="Project ID" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload File</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files and folders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => toast.success("New folder created!")}>
          <Folder className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files ({filteredFiles.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({getFilesByType("documents").length})</TabsTrigger>
          <TabsTrigger value="images">Images ({getFilesByType("images").length})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({getFilesByType("videos").length})</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{files.length}</div>
                <p className="text-xs text-muted-foreground">+{Math.floor(files.length * 0.1)} this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.7 GB</div>
                <p className="text-xs text-muted-foreground">of 100 GB available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shared Files</CardTitle>
                <Share className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(files.length * 0.7)}</div>
                <p className="text-xs text-muted-foreground">With team members</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(files.length * 0.2)}</div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.modified}</span>
                          <span>•</span>
                          <span>{file.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{file.author}</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => handleFileDownload(file.name)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleFileShare(file.name)}>
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleFileDelete(file.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredFiles.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No files found matching your search</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {getFilesByType("documents").map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} • {doc.modified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{doc.author}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" onClick={() => handleFileDownload(doc.name)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getFilesByType("images").map((image) => (
              <Card key={image.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{image.name}</p>
                      <p className="text-sm text-muted-foreground">{image.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleFileDownload(image.name)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleFileShare(image.name)}>
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {getFilesByType("videos").map((video) => (
              <Card key={video.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg">
                      <Video className="h-16 w-16 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{video.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.size} • {video.modified}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => toast.success("Playing video...")}
                      >
                        Play
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleFileDownload(video.name)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed</CardTitle>
              <CardDescription>Files you've viewed or edited recently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getRecentFiles().map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.type} • Accessed {file.modified}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.success(`Opening ${file.name}...`)}>
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
