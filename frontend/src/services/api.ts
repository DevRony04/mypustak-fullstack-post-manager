import axios from 'axios';
import { Post } from '../types/Post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all posts from the backend.
 */
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

/**
 * Create a new post.
 * Trimming is done in input validation prior to this call and also on the backend.
 */
export const createPost = async (post: { title: string; body: string }): Promise<Post> => {
  const response = await api.post<Post>('/posts', post);
  return response.data;
};

/**
 * Delete a post by ID.
 */
export const deletePost = async (id: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/posts/${id}`);
  return response.data;
};

export default api;
