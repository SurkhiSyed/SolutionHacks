# main.py

import json
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi_mcp import FastApiMCP
from fastapi.middleware.cors import CORSMiddleware
from clients.client_functions import client_functions
from fastapi.responses import StreamingResponse
import cv2

CONFIG_PATH = "user_config.json"

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

def load_config():
    if not os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "w") as f:
            json.dump({"clients": [], "gesture_mappings": {}, "enabled_clients": []}, f)
    with open(CONFIG_PATH) as f:
        return json.load(f)

def save_config(config):
    with open(CONFIG_PATH, "w") as f:
        json.dump(config, f, indent=2)

@app.get("/config")
def get_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)

@app.post("/config")
def update_config(new_config: dict):
    with open(CONFIG_PATH, "w") as f:
        json.dump(new_config, f)
    return {"status": "updated"}

@app.post("/trigger/{client_name}", operation_id="trigger_client")
def trigger_client(client_name: str):
    with open(CONFIG_PATH) as f:
        config = json.load(f)
    if client_name not in config["enabled_clients"]:
        raise HTTPException(403, f"Client '{client_name}' is not enabled.")
    
    func = client_functions.get(client_name)
    if not func:
        raise HTTPException(404, "Client not found")
    return {"result": func()}

@app.post("/trigger-expression")
async def trigger_expression(request: Request):
    data = await request.json()
    expression = data["expression"]
    config = load_config()
    mappings = config.get("gesture_mappings", {})
    clients_to_trigger = mappings.get(expression, [])
    results = []
    for client_id in clients_to_trigger:
        func = client_functions.get(client_id)
        if func:
            results.append(func())
    return {"status": "triggered", "clients": clients_to_trigger}

@app.get("/gesture-mappings")
def get_gesture_mappings():
    config = load_config()
    return {"gesture_mappings": config.get("gesture_mappings", {})}

@app.post("/gesture-mappings")
async def update_gesture_mappings(request: Request):
    data = await request.json()
    config = load_config()
    config["gesture_mappings"] = data.get("gesture_mappings", {})
    save_config(config)
    return {"status": "updated", "gesture_mappings": config["gesture_mappings"]}

# --- Live Video Streaming Endpoint for Frontend ---
def gen_frames():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if not success:
            break
        # Optionally, do your OpenCV processing here!
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.get("/video_feed")
def video_feed():
    """
    Streams the webcam feed as MJPEG for the frontend to display.
    """
    return StreamingResponse(gen_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

mcp = FastApiMCP(app, name="Facial-MCP")
mcp.mount()
