import type { Task, WeeklySummary, ApiResponse } from '../../types/task';
import { api } from "../axios";

export const apiService = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const res = await api.get<ApiResponse<Task[]>>('/');
    return res.data.data;
  },

  // Get a single task
  getTaskById: async (id: string): Promise<Task> => {
    const res = await api.get<ApiResponse<Task>>(`/${id}`);
    return res.data.data;
  },

  // Create a new task
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const res = await api.post<ApiResponse<Task>>('/', taskData);
    return res.data.data;
  },

  // Update a task
  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    const res = await api.patch<ApiResponse<Task>>(`/${id}`, taskData);
    return res.data.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete<void>(`/${id}`);
  },

  // Search tasks
  searchTasks: async (keyword: string): Promise<Task[]> => {
    const res = await api.get<ApiResponse<Task[]>>(`/search?keyword=${encodeURIComponent(keyword)}`);
    return res.data.data;
  },

  // Get weekly summary
  getWeeklySummary: async (): Promise<WeeklySummary[]> => {
    const res = await api.get<ApiResponse<WeeklySummary[]>>('/weekly-summary');
    return res.data.data;
  }
};
