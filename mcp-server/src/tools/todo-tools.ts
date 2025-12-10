import axios, { AxiosError } from 'axios';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Todo, CreateTodoParams, UpdateTodoParams, DeleteTodoParams } from '../types.js';

const API_BASE_URL = process.env.TODO_API_URL || 'http://localhost:4300';

/**
 * Get all todos from the API
 */
export async function getAllTodos(): Promise<Todo[]> {
  try {
    const response = await axios.get<Todo[]>(`${API_BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to fetch todos: ${axiosError.response?.status} - ${axiosError.message}`
    );
  }
}

/**
 * Create a new todo
 */
export async function createTodo(params: CreateTodoParams): Promise<Todo> {
  try {
    const response = await axios.post<Todo>(`${API_BASE_URL}/todos`, {
      title: params.title,
      description: params.description,
      isCompleted: params.isCompleted ?? false,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to create todo: ${axiosError.response?.status} - ${axiosError.message}`
    );
  }
}

/**
 * Update an existing todo
 */
export async function updateTodo(params: UpdateTodoParams): Promise<Todo> {
  try {
    const updateData: Partial<Todo> = {};
    if (params.title !== undefined) updateData.title = params.title;
    if (params.description !== undefined) updateData.description = params.description;
    if (params.isCompleted !== undefined) updateData.isCompleted = params.isCompleted;

    const response = await axios.put<Todo>(`${API_BASE_URL}/todos/${params.id}`, updateData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error(`Todo with ID ${params.id} not found`);
    }
    throw new Error(
      `Failed to update todo: ${axiosError.response?.status} - ${axiosError.message}`
    );
  }
}

/**
 * Delete a todo
 */
export async function deleteTodo(params: DeleteTodoParams): Promise<{ message: string }> {
  try {
    const response = await axios.delete<{ message: string }>(`${API_BASE_URL}/todos/${params.id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error(`Todo with ID ${params.id} not found`);
    }
    throw new Error(
      `Failed to delete todo: ${axiosError.response?.status} - ${axiosError.message}`
    );
  }
}

/**
 * Define MCP tools for Todo operations
 */
export const todoTools: Tool[] = [
  {
    name: 'get_all_todos',
    description: 'Retrieve all todos from the Todo API. Returns a list of all todo items with their details including ID, title, description, completion status, and creation date.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'create_todo',
    description: 'Create a new todo item. Requires a title and description. Optionally can set the completion status.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the todo item',
        },
        description: {
          type: 'string',
          description: 'The description or details of the todo item',
        },
        isCompleted: {
          type: 'boolean',
          description: 'Whether the todo is completed (defaults to false)',
        },
      },
      required: ['title', 'description'],
    },
  },
  {
    name: 'update_todo',
    description: 'Update an existing todo item. Requires the todo ID. Can update title, description, and/or completion status.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier of the todo to update',
        },
        title: {
          type: 'string',
          description: 'The new title for the todo (optional)',
        },
        description: {
          type: 'string',
          description: 'The new description for the todo (optional)',
        },
        isCompleted: {
          type: 'boolean',
          description: 'The completion status of the todo (optional)',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_todo',
    description: 'Delete a todo item by its ID. Returns a success message if the todo was deleted.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier of the todo to delete',
        },
      },
      required: ['id'],
    },
  },
];
