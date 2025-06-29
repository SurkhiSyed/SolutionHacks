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

mcp = FastApiMCP(app, name="Facial-MCP")
mcp.mount()
