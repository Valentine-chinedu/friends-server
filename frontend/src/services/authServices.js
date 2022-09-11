import extractParams from '../utils/extractParams';
import axiosConfig from './axiosConfig';

const login = async (formData = {}) => {
	const params = extractParams(formData, 'email', 'password');
	const { data } = await axiosConfig.post('/auth/login', params);
	return data;
};

const register = async (formData = {}) => {
	const params = extractParams(formData, 'name', 'email', 'password', 'dob');
	const { data } = await axiosConfig.post('/auth/register', params);
	return data;
};

export { login, register };
