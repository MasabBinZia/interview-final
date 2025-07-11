import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  signup: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", {
      email,
      password,
      name,
    });
    return response.data;
  },
};

export const users = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/users/profile");
    return response.data;
  },

  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  updateRole: async (userId: string, role: User["role"]): Promise<User> => {
    const response = await api.put<{ user: User }>(`/users/${userId}/role`, {
      role,
    });
    return response.data.user;
  },
};
