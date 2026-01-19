import { useState } from 'react';
import { useBoard } from '../../hooks/useBoard';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { Lane } from '../Lane/Lane';
import { LaneForm } from '../LaneForm/LaneForm';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ErrorToast } from '../ErrorToast/ErrorToast';
import { OfflineBanner } from '../OfflineBanner/OfflineBanner';
import type { Task } from '../../types';
import './Board.css';

export function Board() {
  const { board, loading, error, createTask, updateTask, deleteTask, moveTask, createLane, updateLane, deleteLane, clearError } = useBoard();
  const isOnline = useOnlineStatus();
  const [showAddLaneForm, setShowAddLaneForm] = useState(false);
  const [isAddingLane, setIsAddingLane] = useState(false);

  const handleAddTask = async (laneId: string, data: { title: string; description: string }) => {
    await createTask({
      laneId,
      title: data.title,
      description: data.description,
    });
  };

  const handleEditTask = async (task: Task, data: { title: string; description: string }) => {
    await updateTask(task.id, {
      title: data.title,
      description: data.description,
    });
  };

  const handleDeleteTask = async (task: Task) => {
    await deleteTask(task.id);
  };

  const handleMoveTask = async (taskId: string, targetLaneId: string) => {
    await moveTask(taskId, targetLaneId);
  };

  const handleAddLane = async (data: { name: string }) => {
    setIsAddingLane(true);
    try {
      await createLane(data);
      setShowAddLaneForm(false);
    } catch {
      // Error is handled by useBoard hook
    } finally {
      setIsAddingLane(false);
    }
  };

  const handleEditLane = async (laneId: string, name: string) => {
    await updateLane(laneId, { name });
  };

  const handleDeleteLane = async (laneId: string) => {
    await deleteLane(laneId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!board) {
    return <div className="error">Failed to load board</div>;
  }

  return (
    <div className="board">
      <OfflineBanner isOnline={isOnline} />
      {board.lanes.map(lane => (
        <Lane
          key={lane.id}
          lane={lane}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
          onEditLane={handleEditLane}
          onDeleteLane={handleDeleteLane}
        />
      ))}
      <div className="add-lane-container">
        {showAddLaneForm ? (
          <LaneForm
            onSubmit={handleAddLane}
            onCancel={() => setShowAddLaneForm(false)}
            submitLabel="Create Lane"
            isLoading={isAddingLane}
          />
        ) : (
          <button
            className="add-lane-btn"
            type="button"
            onClick={() => setShowAddLaneForm(true)}
          >
            + Add Lane
          </button>
        )}
      </div>
      {error && (
        <ErrorToast message={error} onClose={clearError} />
      )}
    </div>
  );
}
