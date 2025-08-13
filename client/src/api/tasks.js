import { api } from './axios'

export const listTasks = async (projectId) => (await api.get('/api/tasks', { params: { projectId } })).data
