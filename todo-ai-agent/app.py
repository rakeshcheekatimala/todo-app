from flask import Flask, request, jsonify
import requests
from langchain_community.llms import Ollama
from langgraph.graph import StateGraph, END
from config import BACKEND_API_URL
from dataclasses import dataclass, field
import json

llm = Ollama(model="llama3")  # Ollama must be running locally
app = Flask(__name__)

# --- 1. Define State ---
@dataclass
class TodoState:
    user_input: str = ""
    intent: str = ""
    data: dict = field(default_factory=dict)
    result: dict = field(default_factory=dict)

# --- 2. LLM-based Intent Extractor ---
def extract_intent_node(state: TodoState):
    prompt = (
        "You are an assistant for a to-do app. "
        "Your job is to understand user's intent and extract relevant info. "
        "Respond ONLY in JSON format like: "
        "{\"intent\": \"create_task\", \"data\": {\"title\": \"Buy milk\", \"description\": \"At 5pm\"}} "
        "\n\n"
        "Supported intents: create_task, read_tasks, update_task, delete_task\n"
        f"User: {state.user_input}"
    )
    response = llm.invoke(prompt)
    try:
        parsed = json.loads(response)
        state.intent = parsed.get("intent", "")
        state.data = parsed.get("data", {})
    except Exception as e:
        print(f"LLM parsing error: {e}")
        state.intent = "unknown"
        state.data = {}
    return state

# --- 3. CRUD Nodes ---
def create_task_node(state: TodoState):
    payload = {
        "title": state.data.get("title"),
        "description": state.data.get("description", ""),
        "isCompleted": state.data.get("isCompleted", False)
    }
    r = requests.post(BACKEND_API_URL + "todos", json=payload)
    state.result = r.json()
    return state

def read_tasks_node(state: TodoState):
    r = requests.get(BACKEND_API_URL + "todos")
    state.result = r.json()
    return state

def update_task_node(state: TodoState):
    todo_id = state.data.get("id")
    payload = {
        "title": state.data.get("title", ""),
        "description": state.data.get("description", ""),
        "isCompleted": state.data.get("isCompleted", False)
    }
    r = requests.put(BACKEND_API_URL + f"todos/{todo_id}", json=payload)
    state.result = r.json()
    return state

def delete_task_node(state: TodoState):
    todo_id = state.data.get("id")
    r = requests.delete(BACKEND_API_URL + f"todos/{todo_id}")
    try:
        state.result = r.json()
    except:
        state.result = {"status": "deleted" if r.status_code == 200 else "failed"}
    return state

def unknown_node(state: TodoState):
    state.result = {"error": "Unknown intent or input."}
    return state

# --- 4. Graph Building ---
graph = StateGraph(TodoState)
graph.add_node("extract_intent", extract_intent_node)
graph.add_node("create_task", create_task_node)
graph.add_node("read_tasks", read_tasks_node)
graph.add_node("update_task", update_task_node)
graph.add_node("delete_task", delete_task_node)
graph.add_node("unknown", unknown_node)

graph.set_entry_point("extract_intent")

# Routing logic based on intent
def router(state: TodoState):
    return {
        "create_task": "create_task",
        "read_tasks": "read_tasks",
        "update_task": "update_task",
        "delete_task": "delete_task"
    }.get(state.intent, "unknown")

graph.add_conditional_edges("extract_intent", router, {
    "create_task": "create_task",
    "read_tasks": "read_tasks",
    "update_task": "update_task",
    "delete_task": "delete_task",
    "unknown": "unknown"
})

# End all CRUD nodes
for node in ["create_task", "read_tasks", "update_task", "delete_task", "unknown"]:
    graph.add_edge(node, END)

todo_graph = graph.compile()

# --- 5. Flask Route ---
@app.route("/nlp", methods=["POST"])
def nlp_endpoint():
    data = request.json
    user_input = data.get("query")
    if not user_input:
        return jsonify({"error": "Missing query"}), 400
    state = TodoState(user_input=user_input)
    final_state = todo_graph.invoke(state)
    return jsonify(final_state.get("result", {}))

if __name__ == "__main__":
    app.run(port=5001, debug=True)
