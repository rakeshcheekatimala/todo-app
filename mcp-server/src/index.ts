#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  todoTools,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './tools/todo-tools.js';
import type { CreateTodoParams, UpdateTodoParams, DeleteTodoParams } from './types.js';

// Use stderr for logging to avoid interfering with JSON-RPC on stdout
const log = (...args: unknown[]) => {
  console.error('[Todo MCP Server]', ...args);
};

async function main() {
  // Create MCP server
  const server = new Server(
    {
      name: 'todo-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: todoTools,
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'get_all_todos': {
          log('Calling get_all_todos');
          const todos = await getAllTodos();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(todos, null, 2),
              },
            ],
          };
        }

        case 'create_todo': {
          log('Calling create_todo with args:', args);
          if (!args) {
            throw new Error('Arguments are required');
          }
          const params = args as unknown as CreateTodoParams;
          if (!params.title || !params.description) {
            throw new Error('Title and description are required');
          }
          const todo = await createTodo(params);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(todo, null, 2),
              },
            ],
          };
        }

        case 'update_todo': {
          log('Calling update_todo with args:', args);
          if (!args) {
            throw new Error('Arguments are required');
          }
          const params = args as unknown as UpdateTodoParams;
          if (!params.id) {
            throw new Error('Todo ID is required');
          }
          const todo = await updateTodo(params);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(todo, null, 2),
              },
            ],
          };
        }

        case 'delete_todo': {
          log('Calling delete_todo with args:', args);
          if (!args) {
            throw new Error('Arguments are required');
          }
          const params = args as unknown as DeleteTodoParams;
          if (!params.id) {
            throw new Error('Todo ID is required');
          }
          const result = await deleteTodo(params);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`Error executing tool ${name}:`, errorMessage);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                error: errorMessage,
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
    }
  });

  // Connect to STDIO transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  log('Todo MCP Server running on STDIO');
}

main().catch((error) => {
  log('Fatal error:', error);
  process.exit(1);
});
