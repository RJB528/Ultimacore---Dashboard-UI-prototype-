import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Image, FileArchive, Upload } from 'lucide-react'

export default function ResourceHub() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Resource Hub</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Project-related documents</CardDescription>
          </CardHeader>
          <CardContent>
            <FileText className="h-12 w-12 mb-2" />
            <Button>View Documents</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Project images and assets</CardDescription>
          </CardHeader>
          <CardContent>
            <Image className="h-12 w-12 mb-2" />
            <Button>View Images</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Archives</CardTitle>
            <CardDescription>Archived project files</CardDescription>
          </CardHeader>
          <CardContent>
            <FileArchive className="h-12 w-12 mb-2" />
            <Button>View Archives</Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload New Resource</CardTitle>
          <CardDescription>Add a new file to the resource hub</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
