import axios from 'axios';

const axiosConfig = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});

export default axiosConfig;
