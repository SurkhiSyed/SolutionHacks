"use client"

import * as React from "react"
import {
  Camera,
  Mail,
  Phone,
  Music,
  Settings,
  Plus,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  MessageSquare,
  Calendar,
  FileText,
  Lightbulb,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Functionality {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  status?: "active" | "inactive"
}

const defaultFunctionalities: Functionality[] = [
  {
    id: "email",
    title: "Send Email",
    icon: Mail,
    description: "Send quick emails",
    status: "inactive",
  },
  {
    id: "phone",
    title: "Make Call",
    icon: Phone,
    description: "Start a phone call",
    status: "inactive",
  },
  {
    id: "music",
    title: "Music Control",
    icon: Music,
    description: "Control music playback",
    status: "active",
  },
  {
    id: "message",
    title: "Send Message",
    icon: MessageSquare,
    description: "Send text messages",
    status: "inactive",
  },
  {
    id: "calendar",
    title: "Schedule Meeting",
    icon: Calendar,
    description: "Create calendar events",
    status: "inactive",
  },
  {
    id: "notes",
    title: "Take Notes",
    icon: FileText,
    description: "Quick note taking",
    status: "inactive",
  },
]

const availableIcons = [
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Settings", icon: Settings },
  { name: "Volume", icon: Volume2 },
  { name: "Microphone", icon: Mic },
  { name: "Video", icon: Video },
]

export default function CameraControlApp() {
  const [functionalities, setFunctionalities] = React.useState<Functionality[]>(defaultFunctionalities)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [newFunctionality, setNewFunctionality] = React.useState({
    title: "",
    description: "",
    icon: "Lightbulb",
  })
  const [cameraStatus, setCameraStatus] = React.useState({
    video: true,
    audio: true,
    recording: false,
  })

  const handleAddFunctionality = () => {
    if (newFunctionality.title && newFunctionality.description) {
      const selectedIcon = availableIcons.find((icon) => icon.name === newFunctionality.icon)
      const newFunc: Functionality = {
        id: Date.now().toString(),
        title: newFunctionality.title,
        icon: selectedIcon?.icon || Lightbulb,
        description: newFunctionality.description,
        status: "inactive",
      }
      setFunctionalities([...functionalities, newFunc])
      setNewFunctionality({ title: "", description: "", icon: "Lightbulb" })
      setIsAddDialogOpen(false)
    }
  }

  const toggleFunctionality = (id: string) => {
    setFunctionalities(
      functionalities.map((func) =>
        func.id === id ? { ...func, status: func.status === "active" ? "inactive" : "active" } : func,
      ),
    )
  }

  const toggleCameraFeature = (feature: "video" | "audio" | "recording") => {
    setCameraStatus((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }))
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r-0">
        <SidebarHeader className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Camera className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Camera Control</span>
              <span className="text-xs text-muted-foreground">Smart Interface</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-2">
              <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add functionality</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Functionality</DialogTitle>
                    <DialogDescription>Create a new quick action for your camera interface.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newFunctionality.title}
                        onChange={(e) => setNewFunctionality({ ...newFunctionality, title: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., Smart Lights"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newFunctionality.description}
                        onChange={(e) => setNewFunctionality({ ...newFunctionality, description: e.target.value })}
                        className="col-span-3"
                        placeholder="Control smart lighting"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="icon" className="text-right">
                        Icon
                      </Label>
                      <select
                        id="icon"
                        value={newFunctionality.icon}
                        onChange={(e) => setNewFunctionality({ ...newFunctionality, icon: e.target.value })}
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {availableIcons.map((icon) => (
                          <option key={icon.name} value={icon.name}>
                            {icon.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddFunctionality}>Add Functionality</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {functionalities.map((func) => (
                  <SidebarMenuItem key={func.id}>
                    <SidebarMenuButton
                      onClick={() => toggleFunctionality(func.id)}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <func.icon className="h-4 w-4" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{func.title}</span>
                          <span className="text-xs text-muted-foreground">{func.description}</span>
                        </div>
                      </div>
                      <Badge variant={func.status === "active" ? "default" : "secondary"} className="text-xs">
                        {func.status === "active" ? "ON" : "OFF"}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          <SidebarGroup>
            <SidebarGroupLabel>Camera Controls</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => toggleCameraFeature("video")}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      {cameraStatus.video ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      <span>Video</span>
                    </div>
                    <Badge variant={cameraStatus.video ? "default" : "secondary"}>
                      {cameraStatus.video ? "ON" : "OFF"}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => toggleCameraFeature("audio")}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      {cameraStatus.audio ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      <span>Audio</span>
                    </div>
                    <Badge variant={cameraStatus.audio ? "default" : "secondary"}>
                      {cameraStatus.audio ? "ON" : "OFF"}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => toggleCameraFeature("recording")}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${cameraStatus.recording ? "bg-red-500" : "bg-gray-400"}`}
                      />
                      <span>Recording</span>
                    </div>
                    <Badge variant={cameraStatus.recording ? "destructive" : "secondary"}>
                      {cameraStatus.recording ? "REC" : "OFF"}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">Camera Active</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">
              {functionalities.filter((f) => f.status === "active").length} functions active
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="relative flex-1 rounded-xl bg-black overflow-hidden min-h-[600px]">
            {/* Camera Feed Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center">
                <Camera className="h-16 w-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Camera Feed</h3>
                <p className="text-white/70">Live camera stream would appear here</p>
              </div>
            </div>

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              {!cameraStatus.video && (
                <Badge variant="destructive" className="bg-red-500/90">
                  <VideoOff className="h-3 w-3 mr-1" />
                  Video Off
                </Badge>
              )}
              {!cameraStatus.audio && (
                <Badge variant="destructive" className="bg-red-500/90">
                  <MicOff className="h-3 w-3 mr-1" />
                  Audio Off
                </Badge>
              )}
              {cameraStatus.recording && (
                <Badge variant="destructive" className="bg-red-600 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-white mr-2" />
                  Recording
                </Badge>
              )}
            </div>

            {/* Active Functions Overlay */}
            <div className="absolute bottom-4 right-4">
              <div className="flex flex-col gap-2">
                {functionalities
                  .filter((func) => func.status === "active")
                  .map((func) => (
                    <Badge key={func.id} className="bg-primary/90 backdrop-blur">
                      <func.icon className="h-3 w-3 mr-1" />
                      {func.title}
                    </Badge>
                  ))}
              </div>    
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
