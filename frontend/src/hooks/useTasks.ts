import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../lib/api/task';
import { toast } from 'react-toastify';
import type { Task } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on initial load
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiService.getTasks();
      setTasks(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      toast.error('Failed to load tasks from server');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTaskStatus = async (id: string) => {
    // Find task to get current status
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const newStatus = task.status === 'in-progress' ? 'completed' : 'in-progress';

    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)));

    try {
      await apiService.updateTask(id, { status: newStatus });
      toast.success(newStatus === 'completed' ? 'Task marked as completed!' : 'Task moved to in-progress');
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status: task.status } : t)));
      toast.error('Failed to update task status');
      console.error('Failed to toggle task status:', err);
    }
  };

  const deleteTask = async (id: string) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));

    try {
      await apiService.deleteTask(id);
      toast.success('Task deleted successfully');
    } catch (err) {
      setTasks(previousTasks);
      toast.error('Failed to delete task');
      console.error('Failed to delete task:', err);
    }
  };

  const saveTask = async (taskData: Partial<Task>) => {
    try {
      if (taskData._id) {
        setTasks((prev) => prev.map((t) => (t._id === taskData._id ? { ...t, ...taskData } as Task : t)));
        const updatedTask = await apiService.updateTask(taskData._id, taskData);
        setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
        toast.success('Task updated successfully');
      } else {
        const newTask = await apiService.createTask(taskData);
        setTasks((prev) => [...prev, newTask]);
        toast.success('New task created successfully');
      }
    } catch (err) {
      toast.error('Failed to save task');
      console.error('Failed to save task:', err);
      throw err;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    toggleTaskStatus,
    deleteTask,
    saveTask,
    refreshTasks: fetchTasks,
  };
}
