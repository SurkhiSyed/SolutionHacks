# backend/mcp_client_registry.py

mcp_clients = {}

def register_client(name, func):
    mcp_clients[name] = func

def get_clients():
    return list(mcp_clients.keys())

def trigger_client(name):
    client = mcp_clients.get(name)
    if not client:
        return {"status": "error", "message": f"Client '{name}' not found"}
    try:
        result = client()
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
