import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || { detail: 'Network request failed' })
)

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
}

export const secretApi = {
  create: async (payload) => {
    try {
      return await api.post('/secrets', payload)
    } catch {
      return api.post('/secrets/', payload)
    }
  },
  viewByToken: async (token, payload) => {
    try {
      return await api.post(`/secrets/${token}/view`, payload)
    } catch {
      return api.post(`/secrets/s/${token}`, payload)
    }
  },
  list: async () => {
    try {
      return await api.get('/secrets')
    } catch {
      return { data: [] }
    }
  },
  remove: async (id) => {
    try {
      return await api.delete(`/secrets/${id}`)
    } catch {
      return api.delete(`/secrets/${id}/`)
    }
  },
}

export default api
