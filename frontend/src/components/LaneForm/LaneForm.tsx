import { useState } from 'react';
import './LaneForm.css';

interface LaneFormProps {
  initialName?: string;
  onSubmit: (data: { name: string }) => void;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function LaneForm({
  initialName = '',
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  isLoading = false
}: LaneFormProps) {
  const [name, setName] = useState(initialName);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError('Lane name is required');
      return;
    }

    onSubmit({ name: name.trim() });
  };

  return (
    <form className="lane-form" onSubmit={handleSubmit}>
      {validationError && (
        <div className="lane-form-error">{validationError}</div>
      )}
      <div className="lane-form-input-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter lane name"
          autoFocus
          disabled={isLoading}
        />
      </div>
      <div className="lane-form-actions">
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
          disabled={!name.trim() || isLoading}
          className="btn-submit"
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
