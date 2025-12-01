import type { ApiResponse } from "../types";

const API_BASE_URL = `${window.location.origin}/api`;

class ApplicationService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");

    const config: RequestInit = {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {} // ❗ Do NOT set Content-Type for FormData — browser will set the boundary
          : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T = any>(payload: any): Promise<T> {
    const isFormData = payload instanceof FormData;

    return this.request<T>("/applications", {
      method: "POST",
      body: isFormData ? payload : JSON.stringify(payload),
    });
  }

  async put<T = any>(payload: any, id: string): Promise<T> {
    const isFormData = payload instanceof FormData;

    return this.request<T>(`/applications/${id}`, {
      method: "PUT",
      body: isFormData ? payload : JSON.stringify(payload),
    });
  }

  // async get(): Promise<ApiResponse> {
  //   return this.request<ApiResponse>("/applications", {
  //     method: "GET",
  //   });
  // }

  async get(filters: any = {}): Promise<ApiResponse> {
  const queryString = new URLSearchParams(filters).toString();
  return this.request<ApiResponse>(`/applications?${queryString}`, {
    method: "GET",
  });
}

  async getById(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/applications/${id}`, {
      method: "GET",
    });
  }
}

export const applicationService = new ApplicationService();
