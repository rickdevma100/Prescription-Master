import axios, { AxiosError } from 'axios';

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// TypeScript types for API requests and responses
export type AgentMessageRequest = {
  message: string;
};

export type AgentMessageResponse = {
  prescription: string;
  agentResponse: string;
};

export type CurrentPrescriptionResponse = {
  prescription: string;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

/**
 * Sanitize user input by removing HTML tags to prevent XSS attacks
 * Meets PRD security requirement: "Sanitize user inputs before sending to API"
 */
export function sanitizeMessage(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Map API errors to user-friendly messages
 */
export function mapErrorToMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with error status
      const status = axiosError.response.status;
      
      switch (status) {
        case 400:
          return 'Invalid request. Please check your input and try again.';
        case 401:
          return 'Authentication required. Please log in.';
        case 403:
          return 'Access denied. You do not have permission to perform this action.';
        case 404:
          return 'Service not found. Please contact support.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service temporarily unavailable. Please try again later.';
        default:
          return `An error occurred (${status}). Please try again.`;
      }
    } else if (axiosError.request) {
      // Request made but no response received
      return 'Network error. Please check your connection and try again.';
    }
  }
  
  // Generic error
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Send doctor input to backend and receive prescription update
 * POST /api/agent/message
 * 
 * @param message - Doctor's input message (will be sanitized)
 * @returns Promise resolving to prescription and agent response
 */
export async function sendDoctorInput(message: string): Promise<AgentMessageResponse> {
  try {
    const payload: AgentMessageRequest = {
      message: sanitizeMessage(message)
    };
    
    const { data } = await api.post<AgentMessageResponse>('/api/agent/message', payload);
    return data;
  } catch (error) {
    const errorMessage = mapErrorToMessage(error);
    throw new Error(errorMessage);
  }
}

/**
 * Fetch the current complete prescription
 * GET /api/prescription/current
 * 
 * @returns Promise resolving to prescription string
 */
export async function fetchCurrentPrescription(): Promise<string> {
  try {
    const { data } = await api.get<CurrentPrescriptionResponse>('/api/prescription/current');
    return data.prescription || '';
  } catch (error) {
    const errorMessage = mapErrorToMessage(error);
    throw new Error(errorMessage);
  }
}

// Export the api instance for potential direct use or testing
export default api;

