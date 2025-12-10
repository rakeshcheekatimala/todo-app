# Todo MCP Server

A Model Context Protocol (MCP) server that exposes Todo API endpoints as tools for AI assistants in Cursor and VSCode.

## Overview

This MCP server provides four tools for interacting with the Todo API:
- `get_all_todos` - Retrieve all todos
- `create_todo` - Create a new todo
- `update_todo` - Update an existing todo
- `delete_todo` - Delete a todo

## Prerequisites

- Node.js 18+ 
- The Todo backend API running on `http://localhost:4300` (or configure via environment variable)

## Installation

1. Install dependencies:
```bash
cd mcp-server
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file (or copy from `.env.example`):
```bash
TODO_API_URL=http://localhost:4300
```

The default API URL is `http://localhost:4300` if not specified.

## Running the Server

### Development Mode (with watch)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## Testing in Cursor

1. **Open Cursor Settings**:
   - Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Search for "MCP" or navigate to MCP settings

2. **Add MCP Server Configuration**:
   
   Add the following to your Cursor settings (JSON):
   ```json
   {
     "mcpServers": {
       "todo-server": {
         "command": "node",
         "args": ["/absolute/path/to/todo-app/mcp-server/dist/index.js"],
         "env": {
           "TODO_API_URL": "http://localhost:4300"
         }
       }
     }
   }
   ```

   **Important**: Replace `/absolute/path/to/todo-app` with your actual project path.

3. **Restart Cursor**:
   - Close and reopen Cursor for the changes to take effect

4. **Verify Installation**:
   - Open the MCP panel in Cursor
   - You should see "todo-server" listed with 4 available tools

## Testing in VSCode

1. **Install MCP Extension** (if available) or configure via settings

2. **Add to VSCode Settings**:
   
   Open `.vscode/settings.json` in your workspace:
   ```json
   {
     "mcp.servers": {
       "todo-server": {
         "command": "node",
         "args": ["${workspaceFolder}/mcp-server/dist/index.js"],
         "env": {
           "TODO_API_URL": "http://localhost:4300"
         }
       }
     }
   }
   ```

3. **Restart VSCode**

## Testing the Server

### Method 1: Using MCP Inspector (Recommended)

MCP Inspector is a web-based tool (like Postman for MCP servers) that provides an intuitive interface for testing MCP servers.

1. **Ensure the Todo backend is running**:
   ```bash
   # In the root directory
   docker-compose up
   # Or start your backend on http://localhost:4300
   ```

2. **Build the MCP server**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

3. **Start MCP Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

   This will:
   - Launch the Inspector tool
   - Open a web interface at `http://localhost:6274`
   - Automatically open in your default browser

4. **Configure the Server in Inspector**:
   - In the Inspector UI, you'll see a "Connect to Server" section
   - Select "STDIO" as the transport type
   - Enter the command: `node`
   - Enter the arguments: `/absolute/path/to/todo-app/mcp-server/dist/index.js`
     - **Important**: Use the absolute path to your `dist/index.js` file
   - Add environment variable (optional):
     - Key: `TODO_API_URL`
     - Value: `http://localhost:4300`
   - Click "Connect"

5. **Test the Tools**:
   - Once connected, you'll see all 4 tools listed:
     - `get_all_todos`
     - `create_todo`
     - `update_todo`
     - `delete_todo`
   - Click on any tool to test it
   - Fill in the required parameters
   - Click "Call Tool" to execute
   - View the response in the results panel

**Benefits of MCP Inspector:**
- ✅ Visual interface for testing
- ✅ Automatic tool discovery
- ✅ Request/response history
- ✅ Schema validation
- ✅ Performance metrics
- ✅ Easy debugging

### Method 2: Quick Start Testing (Automated Script)

1. **Ensure the Todo backend is running**:
   ```bash
   # In the root directory
   docker-compose up
   # Or start your backend on http://localhost:4300
   ```

2. **Build the MCP server**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

3. **Run the automated test script**:
   ```bash
   npm test
   # Or directly:
   node test-mcp.js
   ```

   This will test:
   - Listing available tools
   - Getting all todos
   - Creating a new todo

### Method 3: Manual Testing Steps

#### Step 1: Verify the Server Starts

```bash
cd mcp-server
npm run build
npm start
```

The server should start without errors. It uses STDIO, so you won't see output unless there's an error (which goes to stderr).

#### Step 2: Test with the Test Script

The included `test-mcp.js` script sends JSON-RPC requests to the server:

```bash
node test-mcp.js
```

Expected output:
```
🧪 Testing MCP Server
==================================================

📋 Test: List Tools
✅ Passed
   Response: { "tools": [...] }

📋 Test: Get All Todos
✅ Passed
   Response: { "content": [...] }

📋 Test: Create Todo
✅ Passed
   Response: { "content": [...] }

==================================================
📊 Test Results: 3 passed, 0 failed
```

#### Step 3: Test Individual Tools

You can modify `test-mcp.js` to test specific tools or create custom test cases.

#### Step 4: Test in Cursor/VSCode

After configuring the MCP server in Cursor (see "Testing in Cursor" section above), you can:

1. Open the MCP panel in Cursor
2. Look for "todo-server" in the list
3. Try using the tools through the AI chat interface:
   - "Get all my todos"
   - "Create a todo to buy groceries"
   - "Update todo with ID X to mark it as completed"
   - "Delete todo with ID X"

### Testing API Connection Directly

Before testing the MCP server, verify your Todo API is working:

```bash
# Get all todos
curl http://localhost:4300/todos

# Create a todo
curl -X POST http://localhost:4300/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test todo"}'
```

### Debugging

If tests fail:

1. **Check backend is running**: `curl http://localhost:4300/todos`
2. **Check server logs**: The test script shows stderr output
3. **Verify build**: Ensure `dist/index.js` exists and is up to date
4. **Check environment**: Verify `TODO_API_URL` is set correctly

## Available Tools

### get_all_todos
Retrieves all todos from the API.

**Parameters**: None

**Example**:
```json
{
  "name": "get_all_todos",
  "arguments": {}
}
```

### create_todo
Creates a new todo item.

**Parameters**:
- `title` (string, required) - The title of the todo
- `description` (string, required) - The description of the todo
- `isCompleted` (boolean, optional) - Completion status (default: false)

**Example**:
```json
{
  "name": "create_todo",
  "arguments": {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "isCompleted": false
  }
}
```

### update_todo
Updates an existing todo.

**Parameters**:
- `id` (string, required) - The todo ID
- `title` (string, optional) - New title
- `description` (string, optional) - New description
- `isCompleted` (boolean, optional) - New completion status

**Example**:
```json
{
  "name": "update_todo",
  "arguments": {
    "id": "507f1f77bcf86cd799439011",
    "isCompleted": true
  }
}
```

### delete_todo
Deletes a todo by ID.

**Parameters**:
- `id` (string, required) - The todo ID to delete

**Example**:
```json
{
  "name": "delete_todo",
  "arguments": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

## Troubleshooting

### Server not starting
- Ensure Node.js 18+ is installed: `node --version`
- Check that dependencies are installed: `npm install`
- Verify the build completed: `npm run build`
- Check that `dist/index.js` exists

### Tools not appearing in Cursor/VSCode
- Verify the path in settings is absolute and correct
- Ensure the server builds without errors
- Restart Cursor/VSCode after configuration changes
- Check the MCP server logs in Cursor's MCP panel

### API connection errors
- Verify the Todo backend is running on the configured port
- Check the `TODO_API_URL` environment variable
- Test the API directly: `curl http://localhost:4300/todos`

### Build errors
- Ensure TypeScript is installed: `npm install`
- Clear and rebuild: `rm -rf dist && npm run build`
- Check `tsconfig.json` is valid

## Development

### Project Structure
```
mcp-server/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── tools/
│   │   └── todo-tools.ts # Tool implementations
│   └── types.ts          # TypeScript types
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled server

## License

MIT
