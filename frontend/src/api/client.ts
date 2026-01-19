// API client for Taskboard backend
import { API_URL } from '../config';
import type {
  Board,
  Task,
  Lane,
  CreateTaskRequest,
  UpdateTaskRequest,
  MoveTaskRequest,
  CreateLaneRequest,
  UpdateLaneRequest,
} from '../types';

// Error handling helper
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${response.status}: ${message}`);
  }
  return response.json();
}

// Board operations
export async function getBoard(): Promise<Board> {
  const response = await fetch(`${API_URL}/board`);
  return handleResponse<Board>(response);
}

// Task operations
export async function createTask(request: CreateTaskRequest): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<Task>(response);
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  return handleResponse<Task>(response);
}

export async function updateTask(id: string, request: UpdateTaskRequest): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const message = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${response.status}: ${message}`);
  }
}

export async function moveTask(id: string, request: MoveTaskRequest): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<Task>(response);
}

// Lane operations
export async function createLane(request: CreateLaneRequest): Promise<Lane> {
  const response = await fetch(`${API_URL}/lanes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<Lane>(response);
}

export async function updateLane(id: string, request: UpdateLaneRequest): Promise<Lane> {
  const response = await fetch(`${API_URL}/lanes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return handleResponse<Lane>(response);
}

export async function deleteLane(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/lanes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const message = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${response.status}: ${message}`);
  }
}
