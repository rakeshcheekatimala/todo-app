# Quick Testing Guide

## Prerequisites Check

1. ✅ Node.js 18+ installed: `node --version`
2. ✅ Todo backend running: `curl http://localhost:4300/todos`

## Step-by-Step Testing

### Option 1: Using MCP Inspector (Easiest & Recommended)

1. **Install & Build**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

2. **Start MCP Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

3. **Configure in Inspector UI**:
   - Transport: **STDIO**
   - Command: `node`
   - Args: `/absolute/path/to/todo-app/mcp-server/dist/index.js`
   - Env: `TODO_API_URL=http://localhost:4300` (optional)
   - Click "Connect"

4. **Test Tools**:
   - Click on any tool in the list
   - Fill parameters and click "Call Tool"
   - View results!

### Option 2: Automated Script

1. **Install & Build**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

2. **Run Automated Tests**:
   ```bash
   npm test
   ```

   This will automatically test:
   - ✅ Server can list tools
   - ✅ Server can get all todos
   - ✅ Server can create a todo

### 3. Test in Cursor

1. **Get the absolute path to your server**:
   ```bash
   pwd
   # Copy the full path, e.g., /Users/rakeshcheekatimala/Desktop/Work/WorkSpace/Learnings/todo-app/mcp-server
   ```

2. **Configure Cursor**:
   - Open Cursor Settings (`Cmd+,` or `Ctrl+,`)
   - Search for "MCP"
   - Add this configuration (replace the path):
   ```json
   {
     "mcpServers": {
       "todo-server": {
         "command": "node",
         "args": ["/Users/rakeshcheekatimala/Desktop/Work/WorkSpace/Learnings/todo-app/mcp-server/dist/index.js"],
         "env": {
           "TODO_API_URL": "http://localhost:4300"
         }
       }
     }
   }
   ```

3. **Restart Cursor**

4. **Verify in Cursor**:
   - Open MCP panel
   - Look for "todo-server" with 4 tools
   - Try asking: "Get all my todos" or "Create a todo to test MCP"

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm test` fails | Check backend is running: `curl http://localhost:4300/todos` |
| Build errors | Run `rm -rf dist && npm run build` |
| Tools not in Cursor | Verify absolute path is correct, restart Cursor |
| API connection errors | Check `TODO_API_URL` environment variable |

## Manual Test Commands

```bash
# Test backend directly
curl http://localhost:4300/todos

# Test MCP server (after build)
node test-mcp.js

# Run server manually (for debugging)
npm start
```
