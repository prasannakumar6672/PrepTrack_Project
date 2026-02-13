export interface PrepTopic {
  _id: string;
  title: string;
  category:
  | 'DSA'
  | 'DBMS'
  | 'OS'
  | 'CN'
  | 'System Design'
  | 'Projects'
  | 'HR';
  status: 'Not Started' | 'In Progress' | 'Revised';
  confidenceLevel: number;
  lastRevisedDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Base URL handling
 * NEXT_PUBLIC_API_URL must be defined in .env.local or production environment
 */
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/prep-topics`;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = response.statusText;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // ignore JSON parse errors
    }

    throw new ApiError(response.status, errorMessage);
  }

  const data = await response.json();

  // If backend returns wrapped response
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data;
  }

  // If backend returns raw JSON
  return data;
}

export const api = {
  // Get all prep topics
  getTopics: async (): Promise<PrepTopic[]> => {
    const response = await fetch(API_BASE_URL, {
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse<PrepTopic[]>(response);
  },

  // Create new topic
  createTopic: async (
    data: Omit<PrepTopic, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<PrepTopic> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse<PrepTopic>(response);
  },

  // Get single topic
  getTopic: async (id: string): Promise<PrepTopic> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse<PrepTopic>(response);
  },

  // Update topic
  updateTopic: async (
    id: string,
    data: Partial<PrepTopic>
  ): Promise<PrepTopic> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse<PrepTopic>(response);
  },

  // Delete topic
  deleteTopic: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    await handleResponse(response);
  },
};