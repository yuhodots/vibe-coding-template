import { supabase } from './supabase';

// Type declaration for process.env
declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string;
    [key: string]: string | undefined;
  };
};

// API Base URL
// For client-side code, use the environment variable or localhost
// The environment variable is set in docker-compose.yml
const API_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  : 'http://backend:8000'; // When running server-side in Docker, use the service name

// Type definitions
export interface TextGenerationRequest {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  provider?: 'openai' | 'anthropic';
}

export interface TextGenerationResponse {
  text: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number | null;
    total_tokens: number;
  };
}

export interface EmbeddingRequest {
  text: string;
  model?: string;
  provider?: 'openai' | 'anthropic';
}

export interface EmbeddingResponse {
  embedding: number[];
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number | null;
    total_tokens: number;
  };
}

// Helper to get authentication token
async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
}

// Helper to make authenticated API requests
async function apiRequest(endpoint: string, method: string, body?: any) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    console.log(`Making request to ${API_URL}${endpoint}`);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        // If we can't parse the error as JSON, just use the status message
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// LLM API functions
export async function generateText(request: TextGenerationRequest): Promise<TextGenerationResponse> {
  return apiRequest('/api/llm/generate', 'POST', request);
}

export async function createEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse> {
  return apiRequest('/api/llm/embedding', 'POST', request);
}