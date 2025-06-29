# main.py

import json
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi_mcp import FastApiMCP
from fastapi.middleware.cors import CORSMiddleware
from clients.client_functions import client_functions

CONFIG_PATH = "user_config.json"

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

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

mcp = FastApiMCP(app, name="Facial-MCP")
mcp.mount()
