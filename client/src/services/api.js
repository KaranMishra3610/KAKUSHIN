import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getDrives = () => API.get('/drives');
export const postDrive = (data, token) => API.post('/drives', data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const rsvpDrive = (id, token) => API.post(`/drives/${id}/rsvp`, {}, {
  headers: { Authorization: `Bearer ${token}` }
});
export const generatePost = (data, token) => API.post('/posts/generate', data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const createPost = (data, token) => API.post('/posts', data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const getPosts = () => API.get('/posts');
