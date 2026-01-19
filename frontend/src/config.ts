// API configuration
// Uses VITE_API_URL environment variable if set, otherwise defaults to localhost:5156
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5156';
