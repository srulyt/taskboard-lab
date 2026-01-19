import { useState, useEffect, useCallback } from 'react';
import type { Board, CreateTaskRequest, UpdateTaskRequest, CreateLaneRequest, UpdateLaneRequest } from '../types';
import { getBoard, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask, moveTask as apiMoveTask, createLane as apiCreateLane, updateLane as apiUpdateLane, deleteLane as apiDeleteLane } from '../api/client';

export function useBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBoard();
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load board');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const createTask = useCallback(async (request: CreateTaskRequest) => {
    try {
      const task = await apiCreateTask(request);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.map(lane =>
            lane.id === request.laneId
              ? { ...lane, tasks: [...lane.tasks, task] }
              : lane
          )
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, request: UpdateTaskRequest) => {
    try {
      const updatedTask = await apiUpdateTask(taskId, request);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.map(lane => ({
            ...lane,
            tasks: lane.tasks.map(task =>
              task.id === taskId ? updatedTask : task
            )
          }))
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await apiDeleteTask(taskId);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.map(lane => ({
            ...lane,
            tasks: lane.tasks.filter(task => task.id !== taskId)
          }))
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  }, []);

  const moveTask = useCallback(async (taskId: string, targetLaneId: string) => {
    try {
      const movedTask = await apiMoveTask(taskId, { targetLaneId, position: 0 });
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.map(lane => {
            // Remove task from its current lane
            const filteredTasks = lane.tasks.filter(task => task.id !== taskId);
            // Add task to target lane
            if (lane.id === targetLaneId) {
              return { ...lane, tasks: [...filteredTasks, movedTask] };
            }
            return { ...lane, tasks: filteredTasks };
          })
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move task');
      throw err;
    }
  }, []);

  const createLane = useCallback(async (request: CreateLaneRequest) => {
    try {
      const lane = await apiCreateLane(request);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: [...prev.lanes, { ...lane, tasks: [] }]
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lane');
      throw err;
    }
  }, []);

  const updateLane = useCallback(async (laneId: string, request: UpdateLaneRequest) => {
    try {
      const updatedLane = await apiUpdateLane(laneId, request);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.map(lane =>
            lane.id === laneId ? { ...lane, name: updatedLane.name } : lane
          )
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lane');
      throw err;
    }
  }, []);

  const deleteLane = useCallback(async (laneId: string) => {
    try {
      await apiDeleteLane(laneId);
      setBoard(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          lanes: prev.lanes.filter(lane => lane.id !== laneId)
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lane');
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { board, loading, error, refetch: fetchBoard, createTask, updateTask, deleteTask, moveTask, createLane, updateLane, deleteLane, clearError };
}
