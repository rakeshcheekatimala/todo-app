/**
 * Type definitions for Todo MCP Server
 */

export interface Todo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoParams {
  title: string;
  description: string;
  isCompleted?: boolean;
}

export interface UpdateTodoParams {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface DeleteTodoParams {
  id: string;
}

export interface TodoApiResponse {
  success: boolean;
  data?: Todo | Todo[];
  message?: string;
  error?: string;
}
