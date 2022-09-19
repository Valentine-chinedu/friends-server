import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound from '../../assets/NotFound.png';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className='notfound'>
			<img src={notfound} alt='not-found' />
			<h1>Not Found</h1>
			<button onClick={() => navigate('/')}>Go Home</button>
		</div>
	);
};

export default NotFound;
