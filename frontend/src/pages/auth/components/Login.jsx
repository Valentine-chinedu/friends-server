import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { setIsLoading } from '../../../redux/slices/modalSlice';
import { login } from '../../../redux/slices/userSlice';
import DataList from '../../../sharedcomponents/DataList';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const customFetch = useFetch();

	const loginHandler = async (e) => {
		e.preventDefault();
		dispatch(setIsLoading(true));
		const data = await customFetch(loginService, { email, password });
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
	};

	const navigate = useNavigate();

	return (
		<form onSubmit={loginHandler} className='login'>
			<div className='email'>
				<label htmlFor='login-email'>Email</label>
				<input
					type='email'
					id='login-email'
					placeholder='johndoe@example.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<DataList email={email} setEmail={setEmail} />
			</div>
			<label htmlFor='login-password'>Password</label>
			<input
				type='password'
				id='login-password'
				placeholder='Top secret'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type='submit'>Login</button>
			<p>
				Don't have an account?
				<span onClick={() => navigate('/register')}>Register</span>
			</p>
		</form>
	);
};

export default Login;
