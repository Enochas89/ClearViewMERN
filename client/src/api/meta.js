import { api } from './axios'
export const getMeta = async () => (await api.get('/api/meta')).data
export const listUsers = async () => (await api.get('/api/users')).data
export const searchAll = async (q) => (await api.get('/api/search', { params:{ q } })).data
