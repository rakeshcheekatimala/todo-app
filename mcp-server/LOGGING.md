# Understanding MCP Server Logs

## How Logging Works

The MCP server uses **stderr** (not stdout) for logging. This is a best practice for STDIO-based MCP servers because:
- JSON-RPC messages go through **stdout**
- Log messages go through **stderr**
- This prevents logs from interfering with protocol communication

## Viewing Logs

### Method 1: Running Server Directly

When you run the server directly, you'll see logs in your terminal:

```bash
cd mcp-server
npm start
```

**Output:**
```
[Todo MCP Server] Todo MCP Server running on STDIO
```

When tools are called, you'll also see:
```
[Todo MCP Server] Calling get_all_todos
[Todo MCP Server] Calling create_todo with args: { title: '...', description: '...' }
```

### Method 2: With MCP Inspector

When using MCP Inspector, the server runs in the background. Logs appear in:
- The terminal where you ran `npx @modelcontextprotocol/inspector`
- Or check the Inspector's console/debug panel

### Method 3: With Cursor/VSCode

When Cursor/VSCode runs the MCP server:
- Logs appear in Cursor's MCP server logs panel
- Or in the terminal/console where Cursor is running
- Check Cursor's developer tools or MCP panel for logs

## Log Messages

The server logs the following:

1. **Server Start**: `[Todo MCP Server] Todo MCP Server running on STDIO`
2. **Tool Calls**: `[Todo MCP Server] Calling <tool_name> with args: <arguments>`
3. **Errors**: `[Todo MCP Server] Error executing tool <name>: <error_message>`
4. **Fatal Errors**: `[Todo MCP Server] Fatal error: <error>`

## Enabling More Verbose Logging

To see more detailed logs, you can modify the logging in `src/index.ts`:

```typescript
const log = (...args: unknown[]) => {
  console.error('[Todo MCP Server]', new Date().toISOString(), ...args);
};
```

Or add debug logging:

```typescript
const DEBUG = process.env.DEBUG === 'true';

const log = (...args: unknown[]) => {
  console.error('[Todo MCP Server]', ...args);
};

const debug = (...args: unknown[]) => {
  if (DEBUG) {
    console.error('[Todo MCP Server] [DEBUG]', ...args);
  }
};
```

Then run with:
```bash
DEBUG=true npm start
```

## Redirecting Logs to a File

To save logs to a file:

```bash
npm start 2> mcp-server.log
```

Or view logs in real-time:
```bash
npm start 2>&1 | tee mcp-server.log
```

## Troubleshooting

### Not seeing logs?

1. **Check stderr**: Logs go to stderr, not stdout
2. **Check terminal**: Make sure you're looking at the right terminal window
3. **Check MCP client**: If using Cursor/Inspector, check their log panels
4. **Verify server is running**: The server must be running to see logs

### Too many logs?

The server only logs:
- Server startup
- Tool calls (with arguments)
- Errors

If you want fewer logs, you can remove or comment out the `log()` calls in `src/index.ts`.

## Example Log Output

```
[Todo MCP Server] Todo MCP Server running on STDIO
[Todo MCP Server] Calling get_all_todos
[Todo MCP Server] Calling create_todo with args: { title: 'Test', description: 'Test todo', isCompleted: false }
[Todo MCP Server] Calling update_todo with args: { id: '507f1f77bcf86cd799439011', isCompleted: true }
[Todo MCP Server] Calling delete_todo with args: { id: '507f1f77bcf86cd799439011' }
```




