import extractParams from '../utils/extractParams';
import axiosConfig from './axiosConfig';

const fetchChats = async () => {
	const { data } = await axiosConfig.get('/chats');
	return data;
};

const createChat = async (formData = {}) => {
	const { partnerId } = formData;
	const { data } = await axiosConfig.post('/chats', { partnerId });
	return data;
};

export { fetchChats, createChat };
