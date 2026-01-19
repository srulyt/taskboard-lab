// TypeScript interfaces for Taskboard API

export interface Task {
  id: string;
  title: string;
  description: string;
  laneId: string;
  order: number;
  createdAt: string;
}

export interface Lane {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  lanes: Lane[];
}

// Request types for API operations
export interface CreateTaskRequest {
  title: string;
  description?: string;
  laneId: string;
}

export interface UpdateTaskRequest {
  title: string;
  description?: string;
}

export interface MoveTaskRequest {
  targetLaneId: string;
  position: number;
}

export interface CreateLaneRequest {
  name: string;
}

export interface UpdateLaneRequest {
  name: string;
}
