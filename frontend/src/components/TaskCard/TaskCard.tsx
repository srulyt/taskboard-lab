import { useState } from 'react';
import type { Task } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task, data: { title: string; description: string }) => Promise<void>;
  onDelete?: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleEdit = async (data: { title: string; description: string }) => {
    if (!onEdit) return;
    setIsSubmitting(true);
    try {
      await onEdit(task, data);
      setIsEditing(false);
    } catch {
      // Error is handled by parent via useBoard hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    onDelete?.(task);
  };

  if (isEditing) {
    return (
      <div className="task-card task-card-editing">
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          submitLabel="Save"
          isLoading={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div
      className={`task-card${isDragging ? ' task-card-dragging' : ''}${showDeleteConfirm ? ' task-card-no-hover' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h4 className="task-title">{task.title}</h4>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-actions">
        <button
          className="task-btn task-edit-btn"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="task-btn task-delete-btn"
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete
        </button>
      </div>
      {showDeleteConfirm && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${task.title}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
