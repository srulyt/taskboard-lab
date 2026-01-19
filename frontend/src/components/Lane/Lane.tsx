import { useState } from 'react';
import type { Lane as LaneType, Task } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import { TaskForm } from '../TaskForm/TaskForm';
import { LaneForm } from '../LaneForm/LaneForm';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import './Lane.css';

interface LaneProps {
  lane: LaneType;
  onAddTask?: (laneId: string, data: { title: string; description: string }) => Promise<void>;
  onEditTask?: (task: Task, data: { title: string; description: string }) => Promise<void>;
  onDeleteTask?: (task: Task) => void;
  onMoveTask?: (taskId: string, targetLaneId: string) => Promise<void>;
  onEditLane?: (laneId: string, name: string) => Promise<void>;
  onDeleteLane?: (laneId: string) => Promise<void>;
}

export function Lane({ lane, onAddTask, onEditTask, onDeleteTask, onMoveTask, onEditLane, onDeleteLane }: LaneProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLane, setIsEditingLane] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onMoveTask) {
      await onMoveTask(taskId, lane.id);
    }
  };

  const handleAddTask = async (data: { title: string; description: string }) => {
    if (!onAddTask) return;
    setIsSubmitting(true);
    try {
      await onAddTask(lane.id, data);
      setShowAddForm(false);
    } catch {
      // Error is handled by parent via useBoard hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditLane = async (name: string) => {
    if (!onEditLane) return;
    setIsEditingLane(true);
    try {
      await onEditLane(lane.id, name);
      setIsEditing(false);
    } catch {
      // Error is handled by parent via useBoard hook
    } finally {
      setIsEditingLane(false);
    }
  };

  const handleDeleteLane = async () => {
    if (!onDeleteLane) return;
    try {
      await onDeleteLane(lane.id);
    } catch {
      // Error is handled by parent via useBoard hook
    }
    setShowDeleteConfirm(false);
  };

  const canDelete = lane.tasks.length === 0;

  return (
    <div
      className={`lane${isDragOver ? ' lane-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="lane-header">
        {isEditing ? (
          <LaneForm
            initialName={lane.name}
            onSubmit={(data) => handleEditLane(data.name)}
            onCancel={() => setIsEditing(false)}
            submitLabel="Save"
            isLoading={isEditingLane}
          />
        ) : (
          <>
            <h3 className="lane-title">{lane.name}</h3>
            <div className="lane-actions">
              {onEditLane && (
                <button
                  className="lane-action-btn"
                  type="button"
                  onClick={() => setIsEditing(true)}
                  title="Edit lane"
                >
                  ✏️
                </button>
              )}
              {onDeleteLane && (
                <button
                  className="lane-action-btn lane-delete-btn"
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={!canDelete}
                  title={canDelete ? 'Delete lane' : 'Cannot delete lane with tasks'}
                >
                  🗑️
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="lane-tasks">
        {lane.tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
      <div className="lane-footer">
        {showAddForm ? (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowAddForm(false)}
            submitLabel="Create"
            isLoading={isSubmitting}
          />
        ) : (
          <button
            className="add-task-btn"
            type="button"
            onClick={() => setShowAddForm(true)}
          >
            + Add Task
          </button>
        )}
      </div>
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Lane"
          message={`Are you sure you want to delete "${lane.name}"?`}
          confirmLabel="Delete"
          onConfirm={handleDeleteLane}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
