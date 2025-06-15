import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smashlabs-backend-production.up.railway.app/api';

// Backend-specific response type
export interface BackendResponse<T = any> extends ApiResponse<T> {
  errors?: string[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Registration Types
export interface SmashLabsRegistration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interests: string[];
  hearAbout: string;
  message?: string;
  status: 'active' | 'inactive' | 'unsubscribed';
  registrationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  hearAbout: string;
  message?: string;
}

// API Error Class
export class SmashLabsApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'SmashLabsApiError';
  }
}

// Base API request function
async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<BackendResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data: BackendResponse<T> = await response.json();

    if (!response.ok) {
      throw new SmashLabsApiError(
        response.status,
        data.message || data.error || 'API request failed',
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof SmashLabsApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new SmashLabsApiError(
      500,
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

// Registration API functions
export const registrationApi = {
  // Create new registration
  create: async (data: CreateRegistrationRequest): Promise<BackendResponse<{ registration: SmashLabsRegistration; registrationId: string }>> => {
    return makeApiRequest('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get registration by ID
  getById: async (id: string): Promise<BackendResponse<SmashLabsRegistration>> => {
    return makeApiRequest(`/registrations/${id}`);
  },

  // Get all registrations with pagination (admin)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    interest?: string;
    hearAbout?: string;
  }): Promise<BackendResponse<{ registrations: SmashLabsRegistration[]; pagination: any }>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return makeApiRequest(`/registrations${query}`);
  },

  // Update registration status
  updateStatus: async (id: string, status: 'active' | 'inactive' | 'unsubscribed'): Promise<BackendResponse<SmashLabsRegistration>> => {
    return makeApiRequest(`/registrations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Get registration statistics (admin)
  getStats: async (): Promise<BackendResponse<{
    total: number;
    active: number;
    inactive: number;
    unsubscribed: number;
    lastMonth: number;
    interestDistribution: Array<{ _id: string; count: number }>;
  }>> => {
    return makeApiRequest('/registrations/stats/overview');
  },
};

// Convenience export
export const submitRegistration = registrationApi.create;

export default registrationApi; 