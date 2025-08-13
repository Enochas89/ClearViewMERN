import { api } from './axios'

export const listTasks = async (projectId, params={}) =>
  (await api.get('/api/tasks', { params: { projectId, ...params } })).data

export const createTask = async (payload) =>
  (await api.post('/api/tasks', payload)).data

export const updateTask = async (id, patch) =>
  (await api.patch(`/api/tasks/${id}`, patch)).data

export const getTaskComments = async (id) =>
  (await api.get(`/api/tasks/${id}/comments`)).data

export const addTaskComment = async (id, text) =>
  (await api.post(`/api/tasks/${id}/comments`, { text })).data

export const getActivities = async (projectId) =>
  (await api.get('/api/tasks/activities/feed', { params:{ projectId } })).data
