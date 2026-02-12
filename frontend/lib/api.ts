export interface PrepTopic {
  _id: string;
  title: string;
  category: 'DSA' | 'DBMS' | 'OS' | 'CN' | 'System Design' | 'Projects' | 'HR';
  status: 'Not Started' | 'In Progress' | 'Revised';
  confidenceLevel: number;
  lastRevisedDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for demonstration
// Mock data removed - using real backend API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/prep-topics';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || response.statusText);
  }
  const data = await response.json();
  return data.data; // Assumes backend returns { success: true, data: ... }
}

export const api = {
  // Get all prep topics
  getTopics: async (): Promise<PrepTopic[]> => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse<PrepTopic[]>(response);
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  },

  // Create new topic
  createTopic: async (data: Omit<PrepTopic, '_id' | 'createdAt' | 'updatedAt'>): Promise<PrepTopic> => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<PrepTopic>(response);
    } catch (error) {
      console.error('Error creating topic:', error);
      throw error;
    }
  },

  // Get single topic
  getTopic: async (id: string): Promise<PrepTopic> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse<PrepTopic>(response);
    } catch (error) {
      console.error('Error fetching topic:', error);
      throw error;
    }
  },

  // Update topic
  updateTopic: async (id: string, data: Partial<PrepTopic>): Promise<PrepTopic> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<PrepTopic>(response);
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  },

  // Delete topic
  deleteTopic: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      await handleResponse<void>(response);
    } catch (error) {
      console.error('Error deleting topic:', error);
      throw error;
    }
  },
};
