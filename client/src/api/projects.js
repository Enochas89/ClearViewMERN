import { api } from './axios'

export const listProjects = async () => (await api.get('/api/projects')).data
export const getProject = async (id) => (await api.get(`/api/projects/${id}`)).data
