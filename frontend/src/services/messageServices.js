import extractParams from '../utils/extractParams';
import axiosConfig from './axiosConfig';

const fetchMessages = async (formData = {}) => {
	const params = extractParams(formData, 'chatId');
	const { data } = await axiosConfig.get('/messages', { params });
	return data;
};

export { fetchMessages };
