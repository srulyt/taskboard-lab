import { useEffect } from 'react';
import './ErrorToast.css';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
}

export function ErrorToast({ message, onClose, autoClose = true }: ErrorToastProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  return (
    <div className="error-toast">
      <span className="error-message">{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}
