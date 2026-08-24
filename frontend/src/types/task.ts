export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export interface Task {
  _id: string; 
  title: string;
  description?: string;
  dateTime: string;
  priority?: Priority;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string; 
  completedCount: number;
  pendingCount: number;
  tasks: Task[];
}
