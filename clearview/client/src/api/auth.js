import { api } from './axios'

export const login = async (email) => {
  // placeholder auth: server will accept any email
  const { data } = await api.post('/api/auth/login', { email })
  return data
}
