from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from mcp_client_registry import register_client, get_clients, trigger_client

# Import MCP clients
from clients.open_browser import run as open_browser
from clients.send_email import run as send_email

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register MCP clients on startup
@app.on_event("startup")
def setup_clients():
    register_client("open_browser", open_browser)
    register_client("send_email", send_email)

@app.get("/clients")
def list_clients():
    return {"clients": get_clients()}

@app.post("/trigger/{client_name}")
def call_client(client_name: str):
    result = trigger_client(client_name)
    return result
