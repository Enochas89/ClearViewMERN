import { api } from './axios'

export const listPosts = async (projectId) => (await api.get('/api/posts', { params: { projectId } })).data
export const likePost = async (postId) => (await api.post(`/api/posts/${postId}/like`)).data
