const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API helper function
const fetchAPI = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// User API
export const userAPI = {
  register: (userData) =>
    fetchAPI('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => fetchAPI('/users/profile'),

  updateProfile: (userData) =>
    fetchAPI('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  getAllUsers: () => fetchAPI('/users'),
};

// Items API
export const itemsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/items${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => fetchAPI(`/items/${id}`),

  create: (itemData) =>
    fetchAPI('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    }),

  update: (id, itemData) =>
    fetchAPI(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    }),

  delete: (id) =>
    fetchAPI(`/items/${id}`, {
      method: 'DELETE',
    }),
};
