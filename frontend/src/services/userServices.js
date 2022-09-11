import extractParams from '../utils/extractParams';
import axiosConfig from './axiosConfig';

const fetchUsers = async (formData = {}) => {
	const params = extractParams(formData, 'id', 'query');
	const { data } = await axiosConfig.get('/users', { params });
	return data;
};

const updateUser = async (formData = {}) => {
	const params = extractParams(formData, 'name', 'about', 'location');
	const { data } = await axiosConfig.patch('/users', params);
	return data;
};

const updateDP = async (formData = {}) => {
	const headers = { 'Content-Type': 'multipart/form-data' };
	const { data } = await axiosConfig.patch('/users/dp', formData, { headers });
	return data;
};

export { fetchUsers, updateUser, updateDP };
