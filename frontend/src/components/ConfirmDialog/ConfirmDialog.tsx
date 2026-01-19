import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmLabel?: string;
}

export function ConfirmDialog({ message, onConfirm, onCancel, title, confirmLabel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  useEffect(() => {
    // Focus the dialog when it mounts
    dialogRef.current?.focus();
  }, []);

  // Use createPortal to render outside the DOM hierarchy
  return createPortal(
    <div className="dialog-overlay" onClick={onCancel}>
      <div
        className="dialog"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="dialog-title">{title}</h3>}
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-confirm" onClick={onConfirm}>{confirmLabel || 'Confirm'}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
