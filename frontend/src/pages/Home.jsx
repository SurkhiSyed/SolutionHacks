import { useState, useEffect } from "react";
import Webcam from "react-webcam";

// Simple SVG icons as components
const Camera = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Mail = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Music = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const Settings = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Plus = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Video = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const Mic = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 16.5v1.25m0-1.25a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
  </svg>
);

const MicOff = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16.95A7 7 0 015 12M12 19v4M8 23h8" />
  </svg>
);

const VideoOff = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2l2.5-2.5M21 14l-4-4m4 0l-4 4m-2-9h3a2 2 0 012 2v8" />
  </svg>
);

const Volume2 = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M19.07 4.93A10 10 0 0 1 21 12a10 10 0 0 1-1.93 7.07" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M15.54 8.46A5 5 0 0 1 17 12a5 5 0 0 1-1.46 3.54" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const MessageSquare = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const Calendar = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const FileText = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="10,9 9,9 8,9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const Lightbulb = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Menu = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const availableExpressions = [
  { id: "smile", label: "Smile" },
  { id: "wink", label: "Wink" },
  { id: "eyebrow_raise", label: "Eyebrow Raise" },
  // Add more as needed
];

const availableIcons = [
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Settings", icon: Settings },
  { name: "Volume", icon: Volume2 },
  { name: "Microphone", icon: Mic },
  { name: "Video", icon: Video },
];

function CameraControlApp() {
  const [functionalities, setFunctionalities] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newFunctionality, setNewFunctionality] = useState({
    title: "",
    description: "",
    icon: "Lightbulb",
  });
  const [cameraStatus, setCameraStatus] = useState({
    video: true,
    audio: true,
    recording: false,
  });
  const [clients, setClients] = useState([]);
  const [gestureMappings, setGestureMappings] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/clients")
      .then(res => res.json())
      .then(data => setClients(data.clients || []));
    fetch("http://localhost:8000/gesture-mappings")
      .then(res => res.json())
      .then(data => setGestureMappings(data.gesture_mappings || {}));
  }, []);

  const handleAddFunctionality = () => {
    if (newFunctionality.title && newFunctionality.description) {
      const selectedIcon = availableIcons.find((icon) => icon.name === newFunctionality.icon);
      const newFunc = {
        id: Date.now().toString(),
        title: newFunctionality.title,
        icon: selectedIcon?.icon || Lightbulb,
        description: newFunctionality.description,
        status: "inactive",
      };
      setFunctionalities([...functionalities, newFunc]);
      setNewFunctionality({ title: "", description: "", icon: "Lightbulb" });
      setIsAddDialogOpen(false);
    }
  };

  const sendConfigToBackend = (activeIds) => {
    fetch("http://localhost:8000/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled_clients: activeIds }),
    });
  };
  
  const toggleFunctionality = (id) => {
    const updated = functionalities.map((func) =>
      func.id === id ? { ...func, status: func.status === "active" ? "inactive" : "active" } : func
    );
    setFunctionalities(updated);
    
    // Send only the active ones to backend
    const activeIds = updated.filter((f) => f.status === "active").map((f) => f.id);
    sendConfigToBackend(activeIds);
  };
  

  const toggleCameraFeature = (feature) => {
    setCameraStatus((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Camera Control</h1>
              <p className="text-xs text-gray-500">Smart Interface</p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Quick Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">Quick Actions</h2>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              {functionalities.map((func) => {
                const IconComponent = func.icon;
                return (
                  <button
                    key={func.id}
                    onClick={() => toggleFunctionality(func.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{func.title}</div>
                        <div className="text-xs text-gray-500">{func.description}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                      func.status === "active" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {func.status === "active" ? "ON" : "OFF"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mx-4"></div>

          {/* Camera Controls */}
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Camera Controls</h2>
            <div className="space-y-1">
              <button
                onClick={() => toggleCameraFeature("video")}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {cameraStatus.video ? <Video className="w-4 h-4 text-gray-600" /> : <VideoOff className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm font-medium text-gray-900">Video</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  cameraStatus.video 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {cameraStatus.video ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={() => toggleCameraFeature("audio")}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {cameraStatus.audio ? <Mic className="w-4 h-4 text-gray-600" /> : <MicOff className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm font-medium text-gray-900">Audio</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  cameraStatus.audio 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {cameraStatus.audio ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={() => toggleCameraFeature("recording")}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${cameraStatus.recording ? "bg-red-500" : "bg-gray-400"}`} />
                  <span className="text-sm font-medium text-gray-900">Recording</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  cameraStatus.recording 
                    ? "bg-red-100 text-red-800" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {cameraStatus.recording ? "REC" : "OFF"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center gap-4 px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Camera Active</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="text-sm text-gray-500">
              {functionalities.filter((f) => f.status === "active").length} functions active
            </span>
          </div>
        </header>

        {/* Camera Feed */}
        <div className="flex-1 p-4">
          <div className="relative w-full h-full bg-black rounded-xl overflow-hidden min-h-[600px]">
            {/* Live Camera Feed */}
            <Webcam className="absolute inset-0 w-full h-full object-cover" />

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              {!cameraStatus.video && (
                <div className="bg-red-500/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                  <VideoOff className="w-3 h-3" />
                  Video Off
                </div>
              )}
              {!cameraStatus.audio && (
                <div className="bg-red-500/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                  <MicOff className="w-3 h-3" />
                  Audio Off
                </div>
              )}
              {cameraStatus.recording && (
                <div className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  Recording
                </div>
              )}
            </div>

            {/* Active Functions Overlay */}
            <div className="absolute bottom-4 right-4">
              <div className="flex flex-col gap-2">
                {functionalities
                  .filter((func) => func.status === "active")
                  .map((func) => {
                    const IconComponent = func.icon;
                    return (
                      <div key={func.id} className="bg-blue-600/90 backdrop-blur text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <IconComponent className="w-3 h-3" />
                        {func.title}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expression-to-Client Mapping UI */}
      <div className="p-4 bg-white border-t border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Expression to Client Mapping</h2>
        {availableExpressions.map(expr => (
          <div key={expr.id} className="mb-4">
            <label className="font-medium mr-2">{expr.label}</label>
            <select
              multiple
              value={gestureMappings[expr.id] || []}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                setGestureMappings(prev => ({ ...prev, [expr.id]: selected }));
              }}
              className="border rounded px-2 py-1 min-w-[200px]"
            >
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={() => {
            fetch("http://localhost:8000/gesture-mappings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ gesture_mappings: gestureMappings }),
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Mappings
        </button>
      </div>

      {/* Add Functionality Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Functionality</h3>
              <p className="text-sm text-gray-600">Create a new quick action for your camera interface.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newFunctionality.title}
                  onChange={(e) => setNewFunctionality({ ...newFunctionality, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Smart Lights"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={newFunctionality.description}
                  onChange={(e) => setNewFunctionality({ ...newFunctionality, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Control smart lighting"
                />
              </div>
              
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  id="icon"
                  value={newFunctionality.icon}
                  onChange={(e) => setNewFunctionality({ ...newFunctionality, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon.name} value={icon.name}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFunctionality}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Functionality
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraControlApp;