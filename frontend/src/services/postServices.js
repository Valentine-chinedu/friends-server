import extractParams from '../utils/extractParams';
import axiosConfig from './axiosConfig';

const createPost = async (formData = {}) => {
	const headers = { 'Content-Type': 'multipart/form-data' };
	const { data } = await axiosConfig.post('/posts', formData, { headers });
	return data;
};

const fetchPosts = async (formData = {}) => {
	const params = extractParams(formData, 'id', 'query', 'page', 'userId');
	const { data } = await axiosConfig.get('/posts', { params });
	return data;
};

const likePost = async (formData = {}) => {
	const params = extractParams(formData, 'id', 'add');
	const { data } = await axiosConfig.patch('/posts/like', params);
	return data;
};

const commentPost = async (formData = {}) => {
	const params = extractParams(formData, 'id', 'comment');
	const { data } = await axiosConfig.patch('/posts/comment', params);
	return data;
};

const deletePost = async (formData = {}) => {
	const { id } = formData;
	const { data } = await axiosConfig.delete(`/posts/${id}`);
	return data;
};

const updatePost = async (formData = {}) => {
	const { id, form } = formData;
	const { data } = await axiosConfig.patch(`/posts/${id}`, form);
	return data;
};

export {
	fetchPosts,
	createPost,
	likePost,
	commentPost,
	deletePost,
	updatePost,
};
