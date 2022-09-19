import { render } from 'react-dom';
import { Routes, Route } from 'react-router-dom';

const Auth = () => {
	return (
		<Routes>
			<Route path='auth' element={<Auth />} />
			<Route index element={<Login />} />
			<Route path='register' element={<Register />} />
			<Route path='login' element={<Login />} />
		</Routes>
	);
};

export default Auth;
