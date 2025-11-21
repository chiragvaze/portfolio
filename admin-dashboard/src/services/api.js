import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  changePassword: (passwords) => api.put('/auth/password', passwords)
};

// Profile APIs
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  uploadImage: (formData) => api.post('/profile/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  addSkill: (skill) => api.post('/profile/skills', skill),
  updateSkill: (skillId, skill) => api.put(`/profile/skills/${skillId}`, skill),
  deleteSkill: (skillId) => api.delete(`/profile/skills/${skillId}`)
};

// Project APIs
export const projectAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  uploadImage: (id, formData) => api.post(`/projects/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (id, imageId) => api.delete(`/projects/${id}/images/${imageId}`)
};

// Experience APIs
export const experienceAPI = {
  getAll: (params) => api.get('/experience', { params }),
  getOne: (id) => api.get(`/experience/${id}`),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`)
};

// Certification APIs
export const certificationAPI = {
  getAll: () => api.get('/certifications'),
  getOne: (id) => api.get(`/certifications/${id}`),
  create: (data) => api.post('/certifications', data),
  update: (id, data) => api.put(`/certifications/${id}`, data),
  delete: (id) => api.delete(`/certifications/${id}`)
};

// Message APIs
export const messageAPI = {
  getAll: (params) => api.get('/messages', { params }),
  getOne: (id) => api.get(`/messages/${id}`),
  getStats: () => api.get('/messages/stats'),
  updateStatus: (id, status) => api.put(`/messages/${id}/status`, { status }),
  reply: (id, replyText) => api.put(`/messages/${id}/reply`, { replyText }),
  delete: (id) => api.delete(`/messages/${id}`)
};

export default api;
