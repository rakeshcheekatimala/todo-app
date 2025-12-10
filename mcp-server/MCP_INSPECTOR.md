# Testing with MCP Inspector

MCP Inspector is the recommended way to test your MCP server. It provides a visual, interactive interface similar to Postman for testing MCP servers.

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Todo backend running on `http://localhost:4300`
- MCP server built (`npm run build`)

### 2. Launch MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

This will:
- Download and run the Inspector (no installation needed)
- Open a web interface at `http://localhost:6274`
- Automatically open in your default browser

### 3. Connect to Your Server

In the Inspector UI:

1. **Select Transport Type**: Choose **"STDIO"**

2. **Configure Server**:
   - **Command**: `node`
   - **Arguments**: `/Users/rakeshcheekatimala/Desktop/Work/WorkSpace/Learnings/todo-app/mcp-server/dist/index.js`
     - ⚠️ **Important**: Replace with your absolute path to `dist/index.js`
     - You can get your path by running: `cd mcp-server && pwd && echo "/dist/index.js"`

3. **Environment Variables** (Optional):
   - Click "Add Environment Variable"
   - Key: `TODO_API_URL`
   - Value: `http://localhost:4300`
   - (This is optional since `http://localhost:4300` is the default)

4. **Connect**: Click the "Connect" button

### 4. Test Your Tools

Once connected, you'll see:

- **Tools Panel**: Lists all 4 available tools
  - `get_all_todos`
  - `create_todo`
  - `update_todo`
  - `delete_todo`

- **Tool Details**: Click on any tool to see:
  - Tool description
  - Required/optional parameters
  - Input schema

#### Example: Testing `get_all_todos`

1. Click on `get_all_todos` in the tools list
2. This tool has no parameters, so just click "Call Tool"
3. View the response showing all todos from your API

#### Example: Testing `create_todo`

1. Click on `create_todo` in the tools list
2. Fill in the form:
   - **title**: "Test Todo from Inspector"
   - **description**: "This is a test"
   - **isCompleted**: `false` (optional)
3. Click "Call Tool"
4. View the response with the newly created todo

#### Example: Testing `update_todo`

1. First, get a todo ID by calling `get_all_todos`
2. Copy an `_id` from the response
3. Click on `update_todo`
4. Fill in:
   - **id**: (paste the ID you copied)
   - **isCompleted**: `true`
5. Click "Call Tool"
6. View the updated todo

#### Example: Testing `delete_todo`

1. Get a todo ID from `get_all_todos`
2. Click on `delete_todo`
3. Fill in:
   - **id**: (paste the ID)
4. Click "Call Tool"
5. View the success message

## Features

MCP Inspector provides:

- ✅ **Visual Interface**: Easy-to-use web UI
- ✅ **Tool Discovery**: Automatically lists all available tools
- ✅ **Schema Validation**: Validates your requests
- ✅ **Request History**: See all your previous requests
- ✅ **Response Analysis**: Detailed response information
- ✅ **Error Handling**: Clear error messages
- ✅ **Performance Metrics**: Response times

## Troubleshooting

### Inspector won't start
- Ensure Node.js 18+ is installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`

### Can't connect to server
- Verify the absolute path to `dist/index.js` is correct
- Ensure the server is built: `npm run build`
- Check that `dist/index.js` exists

### Tools not appearing
- Verify the server connected successfully (check connection status)
- Look for error messages in the Inspector console
- Check server logs (they appear in the terminal where you ran `npx`)

### API errors
- Verify your Todo backend is running: `curl http://localhost:4300/todos`
- Check the `TODO_API_URL` environment variable in Inspector
- Ensure the backend is accessible from your machine

## Alternative: Command Line

If you prefer command-line testing, you can also use:

```bash
npm test
```

This runs the automated test script (`test-mcp.js`).

## Resources

- [MCP Inspector GitHub](https://github.com/modelcontextprotocol/inspector)
- [MCP Documentation](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Stack](https://www.mcpstack.org/frameworks/testing/mcpjam-inspector)
