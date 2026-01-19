import './OfflineBanner.css';

interface OfflineBannerProps {
  isOnline: boolean;
}

/**
 * Banner component that displays when the app is offline.
 * Shows a visual indicator with an icon and message.
 */
export function OfflineBanner({ isOnline }: OfflineBannerProps) {
  if (isOnline) {
    return null;
  }

  return (
    <div className="offline-banner" role="alert" aria-live="polite">
      <span className="offline-banner-icon">⚠️</span>
      <span className="offline-banner-message">
        You are offline. Some features may be unavailable.
      </span>
    </div>
  );
}
