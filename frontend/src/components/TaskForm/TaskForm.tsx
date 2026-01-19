import { useState } from 'react';
import './TaskForm.css';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (data: { title: string; description: string }) => void;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function TaskForm({
  initialTitle = '',
  initialDescription = '',
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  isLoading = false,
  error = null
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }

    onSubmit({ title: title.trim(), description: description.trim() });
  };

  const displayError = validationError || error;

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {displayError && (
        <div className="task-form-error">{displayError}</div>
      )}
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          autoFocus
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
          disabled={isLoading}
        />
      </div>
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn-cancel"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="btn-submit"
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
